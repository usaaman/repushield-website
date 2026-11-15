import React, { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import {
  Inbox,
  Search,
  Filter,
  Eye,
  UserCheck,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react'
import { leadService } from '@/services/leadService'
import { customerService } from '@/services/customerService'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { EmptyState } from '@/components/admin/EmptyState'
import { Modal } from '@/components/admin/Modal'
import { Button } from '@/components/common/Button'
import { DeleteConfirmDropdown } from '@/components/admin/DeleteConfirmDropdown'
import type { Lead, LeadStatus } from '@/types/database.types'

export const AdminLeadsPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [notesInput, setNotesInput] = useState('')
  const [actionSuccess, setActionSuccessState] = useState<string | null>(null)

  // Tracking convert confirmation, loading & toast feedback
  const [showConvertConfirm, setShowConvertConfirm] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const cancelButtonRef = useRef<HTMLButtonElement>(null)
  const conversionAttemptRef = useRef(0)
  const lastProcessedAttemptRef = useRef(0)
  const lastActionSuccessRef = useRef<string | null>(null)

  const setActionSuccess = (msg: string | null) => {
    lastActionSuccessRef.current = msg
    setActionSuccessState(msg)
  }

  const loadLeads = async () => {
    const data = await leadService.getLeads()
    setLeads(data)
  }

  useEffect(() => {
    loadLeads()
  }, [])

  // Auto-dismiss screen-fixed toast after ~4.5 seconds
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => {
      setToast(null)
    }, 4500)
    return () => clearTimeout(timer)
  }, [toast])

  // Escape key and focus management for Confirmation Dialog
  useEffect(() => {
    if (!showConvertConfirm) return
    cancelButtonRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        setShowConvertConfirm(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown, true)
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true)
    }
  }, [showConvertConfirm])

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.business_name?.toLowerCase().includes(search.toLowerCase()) ||
      lead.contact_name?.toLowerCase().includes(search.toLowerCase()) ||
      lead.email?.toLowerCase().includes(search.toLowerCase()) ||
      lead.country?.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleOpenDetail = (lead: Lead) => {
    setSelectedLead(lead)
    setNotesInput(lead.internal_notes || '')
    setActionSuccess(null)
  }

  const handleUpdateStatus = async (newStatus: LeadStatus) => {
    if (!selectedLead) return
    await leadService.updateLead(selectedLead.id, {
      status: newStatus,
      internal_notes: notesInput,
    })
    setSelectedLead({ ...selectedLead, status: newStatus, internal_notes: notesInput })
    setActionSuccess(`Status updated to ${newStatus}`)
    loadLeads()
  }

  const handleConvertToCustomer = async () => {
    if (!selectedLead) return
    const newCustomer = await customerService.createCustomer({
      full_name: selectedLead.contact_name,
      company_name: selectedLead.business_name,
      email: selectedLead.email,
      phone: selectedLead.phone,
      country: selectedLead.country,
      status: 'active',
      notes: `Converted from lead (${selectedLead.source}). Initial details: ${selectedLead.details || 'None'}`,
    })

    if (newCustomer) {
      await leadService.updateLead(selectedLead.id, {
        status: 'converted',
        converted_customer_id: newCustomer.id,
        converted_at: new Date().toISOString(),
      })
      setActionSuccess('Lead successfully converted to Customer!')
      loadLeads()
    }
  }

  const handleConfirmConvert = async () => {
    if (isConverting || !selectedLead) return
    setIsConverting(true)
    setShowConvertConfirm(false)
    const attemptId = ++conversionAttemptRef.current
    lastActionSuccessRef.current = null

    try {
      await handleConvertToCustomer()

      if (lastActionSuccessRef.current === 'Lead successfully converted to Customer!') {
        if (lastProcessedAttemptRef.current !== attemptId) {
          lastProcessedAttemptRef.current = attemptId
          setToast({
            type: 'success',
            message: 'Lead converted to customer successfully.',
          })
        }
      } else {
        if (lastProcessedAttemptRef.current !== attemptId) {
          lastProcessedAttemptRef.current = attemptId
          setToast({
            type: 'error',
            message: 'Conversion failed. Please try again.',
          })
        }
      }
    } catch (err: any) {
      if (lastProcessedAttemptRef.current !== attemptId) {
        lastProcessedAttemptRef.current = attemptId
        setToast({
          type: 'error',
          message: err?.message || 'Conversion failed. Please try again.',
        })
      }
    } finally {
      setIsConverting(false)
    }
  }

  const handleDelete = async (id: string) => {
    await leadService.deleteLead(id)
    if (selectedLead?.id === id) setSelectedLead(null)
    loadLeads()
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Inbox className="w-6 h-6 text-teal" />
            <span>Leads & Inquiries</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage prospective client inquiries captured from the website and direct channels.
          </p>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="p-4 rounded-2xl bg-[#0A1A24] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, business, country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal/40"
          />
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-auto px-3.5 py-2 rounded-xl bg-[#0A1A24] border border-white/15 text-xs text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-teal/40 cursor-pointer shadow-inner"
          >
            <option value="all" className="bg-[#0A1A24] text-slate-100">All Statuses</option>
            <option value="new" className="bg-[#0A1A24] text-slate-100">New</option>
            <option value="contacted" className="bg-[#0A1A24] text-slate-100">Contacted</option>
            <option value="qualified" className="bg-[#0A1A24] text-slate-100">Qualified</option>
            <option value="awaiting_response" className="bg-[#0A1A24] text-slate-100">Awaiting Response</option>
            <option value="converted" className="bg-[#0A1A24] text-slate-100">Converted</option>
            <option value="not_interested" className="bg-[#0A1A24] text-slate-100">Not Interested</option>
            <option value="closed" className="bg-[#0A1A24] text-slate-100">Closed</option>
            <option value="spam" className="bg-[#0A1A24] text-slate-100">Spam</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      {filteredLeads.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title={search || statusFilter !== 'all' ? 'No matching leads found' : 'No Leads Recorded Yet'}
          description={
            search || statusFilter !== 'all'
              ? 'Try adjusting your search criteria or resetting the status filter.'
              : 'Public website submissions from Contact Page and Google Ads landing page will automatically populate here.'
          }
        />
      ) : (
        <div className="rounded-2xl bg-[#0A1A24] border border-white/10 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider font-semibold bg-white/5">
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Business</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Country</th>
                  <th className="py-3.5 px-4">Service</th>
                  <th className="py-3.5 px-4">Reviews</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-400">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 font-bold text-white">{lead.business_name}</td>
                    <td className="py-3 px-4">
                      <div>{lead.contact_name}</div>
                      <div className="text-[10px] text-slate-400">{lead.email}</div>
                    </td>
                    <td className="py-3 px-4">{lead.country || 'N/A'}</td>
                    <td className="py-3 px-4 text-slate-300">{lead.service_required || 'Review Audit'}</td>
                    <td className="py-3 px-4 font-semibold text-teal">{lead.review_count || '1'}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenDetail(lead)}
                        className="px-2.5 py-1.5 rounded-lg bg-teal/15 text-teal hover:bg-teal/25 font-semibold transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 inline mr-1" />
                        <span>View</span>
                      </button>
                      <DeleteConfirmDropdown
                        onConfirm={() => handleDelete(lead.id)}
                        title="Delete Lead Inquiry?"
                        description={`Permanently remove inquiry for "${lead.business_name}". This cannot be undone.`}
                        buttonTitle="Delete Lead"
                        align="right"
                        direction="down"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Lead Detail & Conversion Modal */}
      {selectedLead && (
        <Modal
          isOpen={Boolean(selectedLead)}
          onClose={() => setSelectedLead(null)}
          title={`Inquiry: ${selectedLead.business_name}`}
          subtitle={`Received on ${new Date(selectedLead.created_at).toLocaleString()} • Source: ${selectedLead.source}`}
          maxWidth="xl"
        >
          <div className="space-y-6">
            {actionSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs">
                {actionSuccess}
              </div>
            )}

            {/* Contact Details Grid */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
              <div>
                <span className="text-slate-400 uppercase tracking-wider text-[10px]">Contact Person</span>
                <p className="font-bold text-white mt-0.5">{selectedLead.contact_name}</p>
              </div>
              <div>
                <span className="text-slate-400 uppercase tracking-wider text-[10px]">Email Address</span>
                <p className="font-bold text-teal mt-0.5">{selectedLead.email}</p>
              </div>
              <div>
                <span className="text-slate-400 uppercase tracking-wider text-[10px]">Country</span>
                <p className="font-bold text-white mt-0.5">{selectedLead.country || 'Not specified'}</p>
              </div>
              <div>
                <span className="text-slate-400 uppercase tracking-wider text-[10px]">Service Requested</span>
                <p className="font-bold text-white mt-0.5">{selectedLead.service_required || 'Review Audit'}</p>
              </div>
            </div>

            {/* Profile URL & Disputed Links */}
            <div className="space-y-2 text-xs">
              {selectedLead.profile_url && (
                <div>
                  <span className="text-slate-400 font-semibold">Business Profile / Maps URL:</span>
                  <a
                    href={selectedLead.profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal hover:underline flex items-center gap-1 mt-0.5 break-all"
                  >
                    <span>{selectedLead.profile_url}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>
              )}

              {selectedLead.disputed_urls && (
                <div>
                  <span className="text-slate-400 font-semibold">Disputed Review URLs:</span>
                  <p className="p-3 rounded-xl bg-black/20 text-slate-300 font-mono text-[11px] mt-1 break-all">
                    {selectedLead.disputed_urls}
                  </p>
                </div>
              )}

              {selectedLead.details && (
                <div>
                  <span className="text-slate-400 font-semibold">Client Concern Description:</span>
                  <p className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 mt-1 leading-relaxed">
                    {selectedLead.details}
                  </p>
                </div>
              )}
            </div>

            {/* Status Change & Internal Notes */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <label className="text-xs font-bold text-white uppercase tracking-wider">
                Internal Case Notes
              </label>
              <textarea
                rows={3}
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="Add private staff notes, communication summaries, or next steps..."
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-teal/40"
              />

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-slate-400 mr-2">Update Status:</span>
                {(['contacted', 'qualified', 'awaiting_response', 'not_interested', 'spam'] as LeadStatus[]).map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(st)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-[11px] font-semibold text-slate-300 capitalize transition-colors"
                    >
                      {st.replace(/_/g, ' ')}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Convert to Customer Action */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 flex-wrap">
              <Button
                variant="teal"
                size="sm"
                onClick={() => setShowConvertConfirm(true)}
                disabled={isConverting}
                className="text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <UserCheck className="w-4 h-4" />
                <span>{isConverting ? 'Converting...' : 'Convert to Active Customer'}</span>
              </Button>

              <div className="flex items-center gap-2">
                <DeleteConfirmDropdown
                  onConfirm={async () => {
                    await handleDelete(selectedLead.id)
                    setSelectedLead(null)
                  }}
                  title="Delete Lead Inquiry?"
                  description="Permanently delete this inquiry from the database."
                  buttonTitle="Delete Lead"
                  align="right"
                  direction="up"
                  triggerClassName="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-colors flex items-center gap-1.5 cursor-pointer"
                />

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedLead(null)}
                  className="text-xs cursor-pointer"
                >
                  <span>Close</span>
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Convert to Active Customer Confirmation Dialog */}
      {showConvertConfirm && selectedLead && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#07131B]/85 backdrop-blur-md transition-opacity duration-200"
            onClick={() => setShowConvertConfirm(false)}
            aria-hidden="true"
          />

          {/* Dialog Container */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="convert-dialog-title"
            className="relative w-full max-w-md rounded-3xl bg-[#0B1E28]/95 bg-white/[0.05] backdrop-blur-2xl border border-white/15 text-slate-100 shadow-2xl shadow-black/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] p-5 sm:p-6 z-10 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2.5 rounded-2xl bg-teal/15 text-teal border border-teal/25 shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 flex-1 min-w-0">
                <h3 id="convert-dialog-title" className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Convert to active customer?
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Convert <strong className="text-white font-semibold break-words">{selectedLead.business_name}</strong> to an active customer? It will be added to Customers and this inquiry will be linked.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                ref={cancelButtonRef}
                type="button"
                onClick={() => setShowConvertConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isConverting}
                onClick={handleConfirmConvert}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#06121A] bg-teal hover:bg-teal-light transition-all shadow-md active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-teal cursor-pointer"
              >
                {isConverting ? 'Converting...' : 'Yes, convert'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Screen-Fixed Toast Notification */}
      {toast && typeof document !== 'undefined' && createPortal(
        <aside
          role={toast.type === 'error' ? 'alert' : 'status'}
          aria-live="polite"
          className="fixed top-4 right-4 left-4 sm:left-auto sm:right-6 sm:top-6 sm:max-w-sm z-[120] animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto"
        >
          <div
            className={`p-4 rounded-2xl backdrop-blur-2xl shadow-2xl shadow-black/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] border flex items-start gap-3 ${
              toast.type === 'error'
                ? 'bg-[#180C11]/95 border-rose-500/40 text-rose-200'
                : 'bg-[#081B1F]/95 border-teal/40 text-teal-light'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-rose-400" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-teal" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white leading-snug">
                {toast.message}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setToast(null)}
              aria-label="Close notification"
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>,
        document.body
      )}
    </div>
  )
}

export default AdminLeadsPage

