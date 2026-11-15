import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import type { Task, TaskStatus } from '@/types/database.types'

const INITIAL_DEMO_TASKS: Task[] = [
  {
    id: 'demo-task-1',
    title: 'Analyze Google content violation guidelines for Case #104',
    description: 'Review policy criteria for commercial conflict of interest evidence dossier.',
    priority: 'high',
    status: 'pending',
    due_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-task-2',
    title: 'Prepare executive removal status brief for Apex Dental Care',
    description: 'Formal policy assessment documentation packet for managing partner.',
    priority: 'urgent',
    status: 'pending',
    due_date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-task-3',
    title: 'Follow up with Google Merchant Support on ticket #8942',
    description: 'Check status of third-party delivery driver defamation appeal.',
    priority: 'medium',
    status: 'completed',
    completed_at: new Date().toISOString(),
    due_date: new Date().toISOString().split('T')[0],
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const getMockTasks = (): Task[] => {
  if (typeof window === 'undefined') return INITIAL_DEMO_TASKS
  const cached = localStorage.getItem('riserepute_tasks_cache')
  if (cached) {
    try {
      const parsed = JSON.parse(cached)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    } catch {}
  }
  localStorage.setItem('riserepute_tasks_cache', JSON.stringify(INITIAL_DEMO_TASKS))
  return INITIAL_DEMO_TASKS
}

export const saveMockTasks = (tasks: Task[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('riserepute_tasks_cache', JSON.stringify(tasks))
  }
}

export const taskService = {
  async getTasks(): Promise<Task[]> {
    if (!isSupabaseConfigured()) return getMockTasks()

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('due_date', { ascending: true, nullsFirst: false })

    if (error || !data || data.length === 0) {
      return getMockTasks()
    }
    return data as Task[]
  },

  async createTask(taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task | null> {
    const current = getMockTasks()
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    saveMockTasks([newTask, ...current])

    if (!isSupabaseConfigured()) return newTask

    const { data, error } = await supabase
      .from('tasks')
      .insert([taskData])
      .select()
      .single()

    if (error) {
      console.error('Error creating task:', error)
      return newTask
    }
    return data as Task
  },

  async updateTaskStatus(id: string, status: TaskStatus): Promise<boolean> {
    const current = getMockTasks()
    const idx = current.findIndex((t) => t.id === id)
    if (idx !== -1) {
      current[idx] = {
        ...current[idx],
        status,
        completed_at: status === 'completed' ? new Date().toISOString() : undefined,
        updated_at: new Date().toISOString(),
      }
      saveMockTasks(current)
    }

    if (!isSupabaseConfigured()) return true

    const { error } = await supabase
      .from('tasks')
      .update({
        status,
        completed_at: status === 'completed' ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (error) {
      console.error('Error updating task status:', error)
      return false
    }
    return true
  },

  async deleteTask(id: string): Promise<boolean> {
    const current = getMockTasks()
    const updated = current.filter((t) => t.id !== id)
    saveMockTasks(updated)

    if (!isSupabaseConfigured()) return true

    const { error } = await supabase.from('tasks').delete().eq('id', id)
    if (error) {
      console.error('Error deleting task:', error)
      return false
    }
    return true
  },
}
