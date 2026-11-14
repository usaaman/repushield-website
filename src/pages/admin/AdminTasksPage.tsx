import React, { useEffect, useState } from 'react'
import { CheckSquare, Plus, Trash2, Calendar } from 'lucide-react'
import { taskService } from '@/services/taskService'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { EmptyState } from '@/components/admin/EmptyState'
import { Modal } from '@/components/admin/Modal'
import { Button } from '@/components/common/Button'
import type { Task, PriorityLevel, TaskStatus } from '@/types/database.types'

export const AdminTasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as PriorityLevel,
    due_date: new Date().toISOString().split('T')[0],
  })

  const loadTasks = async () => {
    const data = await taskService.getTasks()
    setTasks(data)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const handleToggle = async (task: Task) => {
    const nextStatus: TaskStatus = task.status === 'completed' ? 'pending' : 'completed'
    await taskService.updateTaskStatus(task.id, nextStatus)
    loadTasks()
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this task?')) return
    await taskService.deleteTask(id)
    loadTasks()
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    await taskService.createTask({
      ...newTask,
      status: 'pending',
    })
    setIsModalOpen(false)
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      due_date: new Date().toISOString().split('T')[0],
    })
    loadTasks()
  }

  const filtered = tasks.filter((t) => {
    if (filter === 'pending') return t.status === 'pending' || t.status === 'in_progress'
    if (filter === 'completed') return t.status === 'completed'
    return true
  })

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-teal" />
            <span>Tasks & Follow-ups</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Operational action items, client follow-up reminders, and Google escalation deadlines.
          </p>
        </div>

        <Button
          variant="teal"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="text-xs font-bold flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4">
        {(['all', 'pending', 'completed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
              filter === tab
                ? 'bg-teal text-navy font-bold shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Task List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={CheckSquare}
          title="No Tasks Found"
          description="Create follow-up tasks to ensure client appeal deadlines and Google moderation windows are never missed."
          actionLabel="Create Task"
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-2xl bg-[#0A1A24] border transition-all flex items-start justify-between gap-4 ${
                task.status === 'completed'
                  ? 'border-white/5 opacity-60'
                  : 'border-white/10 hover:border-teal/30'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={task.status === 'completed'}
                  onChange={() => handleToggle(task)}
                  className="mt-1 w-4 h-4 rounded text-teal focus:ring-teal/40 bg-white/5 border-white/20 cursor-pointer"
                />

                <div className="space-y-1">
                  <p
                    className={`text-sm font-bold text-white ${
                      task.status === 'completed' ? 'line-through text-slate-400' : ''
                    }`}
                  >
                    {task.title}
                  </p>
                  {task.description && (
                    <p className="text-xs text-slate-400 leading-relaxed">{task.description}</p>
                  )}

                  <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400">
                    {task.due_date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-teal" />
                        <span>Due: {task.due_date}</span>
                      </span>
                    )}
                    <StatusBadge status={task.priority} />
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDelete(task.id)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-white/5 transition-colors"
                title="Delete task"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Create Task Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create Operational Task"
          subtitle="Set a deadline or follow-up reminder"
          maxWidth="md"
        >
          <form onSubmit={handleCreate} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-white">Task Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Check Google appeal decision for Case #SMP-101"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-teal/40"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-white">Description</label>
              <textarea
                rows={2}
                placeholder="Action items, specific links or evidence notes..."
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-teal/40"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-white">Due Date</label>
                <input
                  type="date"
                  value={newTask.due_date}
                  onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-teal/40"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-white">Priority Level</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as PriorityLevel })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-teal/40"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>
                <span>Cancel</span>
              </Button>
              <Button variant="teal" size="sm" type="submit">
                <span>Save Task</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default AdminTasksPage

