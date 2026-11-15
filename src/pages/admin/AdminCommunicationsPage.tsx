import React, { useEffect, useState } from 'react'
import { MessageSquare, Plus, Mail, Phone, MessageCircle, Video, FileText } from 'lucide-react'
import { communicationService } from '@/services/communicationService'
import { EmptyState } from '@/components/admin/EmptyState'
import { Modal } from '@/components/admin/Modal'
import { Button } from '@/components/common/Button'
import type { Communication, CommunicationType } from '@/types/database.types'

export const AdminCommunicationsPage: React.FC = () => {
  const [comms, setComms] = useState<Communication[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newComm, setNewComm] = useState({
    type: 'whatsapp' as CommunicationType,
    subject: '',
    content: '',
    next_follow_up_date: '',
  })

  const loadComms = async () => {
    const data = await communicationService.getCommunications()
    setComms(data)
  }

  useEffect(() => {
    loadComms()
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    await communicationService.logCommunication({
      ...newComm,
      next_follow_up_date: newComm.next_follow_up_date || undefined,
    })
    setIsModalOpen(false)
    setNewComm({
      type: 'whatsapp',
      subject: '',
      content: '',
      next_follow_up_date: '',
    })
    loadComms()
  }

  const getIcon = (type: CommunicationType) => {
    switch (type) {
      case 'whatsapp':
        return <MessageCircle className="w-4 h-4 text-emerald-400" />
      case 'email':
        return <Mail className="w-4 h-4 text-sky-400" />
      case 'phone':
        return <Phone className="w-4 h-4 text-teal" />
      case 'meeting':
        return <Video className="w-4 h-4 text-amber-400" />
      default:
        return <FileText className="w-4 h-4 text-slate-400" />
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-teal" />
            <span>Communications Log</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manual interaction records across WhatsApp consultations, case emails, and discovery calls.
          </p>
        </div>

        <Button
          variant="teal"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="text-xs font-bold flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Log Communication</span>
        </Button>
      </div>

      {/* Communications List */}
      {comms.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No Communications Logged"
          description="Maintain complete paper trails by logging discussions, client WhatsApp notes, and appeal updates."
          actionLabel="Log Interaction"
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
        <div className="space-y-3">
          {comms.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-2xl bg-[#0A1A24] border border-white/10 hover:border-teal/30 transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                    {getIcon(c.type)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{c.subject}</h3>
                    <span className="text-[10px] text-teal uppercase font-semibold">
                      {c.type} Interaction
                    </span>
                  </div>
                </div>

                <span className="text-xs text-slate-400 font-mono">
                  {new Date(c.created_at).toLocaleDateString()}
                </span>
              </div>

              <p className="text-xs text-slate-300 pl-10 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                {c.content}
              </p>

              {c.next_follow_up_date && (
                <div className="pl-10 text-[11px] text-teal font-medium">
                  Next Follow-up Scheduled: {c.next_follow_up_date}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Log Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Log Client Communication"
          subtitle="Record details of a call, message, or email"
          maxWidth="md"
        >
          <form onSubmit={handleCreate} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-white">Channel / Type</label>
                <select
                  value={newComm.type}
                  onChange={(e) => setNewComm({ ...newComm, type: e.target.value as CommunicationType })}
                  className="w-full p-2.5 rounded-xl bg-[#0A1A24] border border-white/15 text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-teal/40 cursor-pointer shadow-inner"
                >
                  <option value="whatsapp" className="bg-[#0A1A24] text-slate-100">WhatsApp Message / Call</option>
                  <option value="email" className="bg-[#0A1A24] text-slate-100">Official Case Email</option>
                  <option value="phone" className="bg-[#0A1A24] text-slate-100">Direct Phone Call</option>
                  <option value="meeting" className="bg-[#0A1A24] text-slate-100">Video Consultation</option>
                  <option value="other" className="bg-[#0A1A24] text-slate-100">Other</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-white">Next Follow-up Date (Optional)</label>
                <input
                  type="date"
                  value={newComm.next_follow_up_date}
                  onChange={(e) => setNewComm({ ...newComm, next_follow_up_date: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-teal/40"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-white">Subject / Summary *</label>
              <input
                type="text"
                required
                placeholder="e.g. Sent evidence checklist for dental clinic case"
                value={newComm.subject}
                onChange={(e) => setNewComm({ ...newComm, subject: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-teal/40"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-white">Conversation Notes & Discussion Details *</label>
              <textarea
                rows={4}
                required
                placeholder="Document client commitments, review links shared, or next steps agreed upon..."
                value={newComm.content}
                onChange={(e) => setNewComm({ ...newComm, content: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-teal/40"
              />
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>
                <span>Cancel</span>
              </Button>
              <Button variant="teal" size="sm" type="submit">
                <span>Save Log Record</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default AdminCommunicationsPage

