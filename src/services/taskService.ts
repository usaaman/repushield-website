import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import type { Task, TaskStatus } from '@/types/database.types'

export const taskService = {
  async getTasks(): Promise<Task[]> {
    if (!isSupabaseConfigured()) return []

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('due_date', { ascending: true, nullsFirst: false })

    if (error) {
      console.error('Error fetching tasks:', error)
      return []
    }
    return (data as Task[]) || []
  },

  async createTask(taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task | null> {
    if (!isSupabaseConfigured()) return null

    const { data, error } = await supabase
      .from('tasks')
      .insert([taskData])
      .select()
      .single()

    if (error) {
      console.error('Error creating task:', error)
      throw error
    }
    return data as Task
  },

  async updateTaskStatus(id: string, status: TaskStatus): Promise<boolean> {
    if (!isSupabaseConfigured()) return false

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
    if (!isSupabaseConfigured()) return false

    const { error } = await supabase.from('tasks').delete().eq('id', id)
    if (error) {
      console.error('Error deleting task:', error)
      return false
    }
    return true
  },
}

