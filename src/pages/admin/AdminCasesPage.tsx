import React, { useEffect, useState } from 'react'
import {
  ShieldAlert,
  Search,
  Filter,
  Plus,
  Eye,
  Star,
  ExternalLink,
  History,
} from 'lucide-react'
import { caseService } from '@/services/caseService'
import { customerService } from '@/services/customerService'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { EmptyState } from '@/components/admin/EmptyState'
import { Modal } from '@/components/admin/Modal'
import { Button } from '@/components/common/Button'
import type { ReviewCase, CaseReview, CaseStatus, CaseStatusHistory, Customer, Business } from '@/types/database.types'

export const AdminCasesPage: React.FC = () => {
  const [cases, setCases] = useState<ReviewCase[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedCase, setSelectedCase] = useState<ReviewCase | null>(null)
  const [caseReviews, setCaseReviews] = useState<CaseReview[]>([])
  const [caseHistory, setCaseHistory] = useState<CaseStatusHistory[]>([])

  // Modal controls
  const [isNewCaseModalOpen, setIsNewCaseModalOpen] = useState(false)
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false)
  const [statusUpdateNotes, setStatusUpdateNotes] = useState('')

  // Form states
  const [newCase, setNewCase] = useState({
    case_number: `RPS-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
    customer_id: '',
    business_id: '',
    violation_category: 'Conflict of Interest',
    target_reviews_count: 1,
    priority: 'medium' as const,
    internal_assessment: '',
    notes: '',
  })

  const [newReview, setNewReview] = useState({
    reviewer_name: '',
    review_rating: 1,
    review_date: new Date().toISOString().split('T')[0],
    review_url: '',
    review_text: '',
    policy_violation_reason: '',
  })

  const loadCases = async () => {
    const [fetchedCases, fetchedCusts] = await Promise.all([
      caseService.getCases(),
      customerService.getCustomers(),
    ])
    setCases(fetchedCases)
    setCustomers(fetchedCusts)
  }

  useEffect(() => {
    loadCases()
  }, [])

  const handleOpenCaseDetail = async (c: ReviewCase) => {
    setSelectedCase(c)
    const [reviews, history] = await Promise.all([
      caseService.getCaseReviews(c.id),
      caseService.getCaseHistory(c.id),
    ])
    setCaseReviews(reviews)
    setCaseHistory(history)
  }

  const handleCustomerSelect = async (custId: string) => {
    setNewCase({ ...newCase, customer_id: custId, business_id: '' })
    if (custId) {
      const bizs = await customerService.getBusinessesByCustomerId(custId)
      setBusinesses(bizs)
      if (bizs.length > 0) {
        setNewCase((prev) => ({ ...prev, customer_id: custId, business_id: bizs[0].id }))
      }
    } else {
      setBusinesses([])
    }
  }

  const handleCreateCase = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCase.customer_id || !newCase.business_id) {
      alert('Please select both a Customer and a Business Listing.')
      return
    }

    const created = await caseService.createCase({
      ...newCase,
      status: 'new',
    })

    if (created) {
      setIsNewCaseModalOpen(false)
      loadCases()
    }
  }

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCase) return

    await caseService.addCaseReview({
      ...newReview,
      case_id: selectedCase.id,
      status: 'pending',
    })

    setIsAddReviewModalOpen(false)
    setNewReview({
      reviewer_name: '',
      review_rating: 1,
      review_date: new Date().toISOString().split('T')[0],
      review_url: '',
      review_text: '',
      policy_violation_reason: '',
    })

    const reviews = await caseService.getCaseReviews(selectedCase.id)
    setCaseReviews(reviews)
  }

  const handleStatusChange = async (newStatus: CaseStatus) => {
    if (!selectedCase) return
    const success = await caseService.updateCaseStatus(
      selectedCase.id,
      newStatus,
      selectedCase.status,
      statusUpdateNotes || `Status updated to ${newStatus}`
    )

    if (success) {
      const updatedCase = { ...selectedCase, status: newStatus }
      setSelectedCase(updatedCase)
      setStatusUpdateNotes('')
      const history = await caseService.getCaseHistory(selectedCase.id)
      setCaseHistory(history)
      loadCases()
    }
  }

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.case_number?.toLowerCase().includes(search.toLowerCase()) ||
      c.violation_category?.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = statusFilter === 'all' || c.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-teal" />
            <span>Google Review Cases</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track policy violation dossiers, evidence packages, and official Google appeal workflows.
          </p>
        </div>

        <Button
          variant="teal"
          size="sm"
          onClick={() => setIsNewCaseModalOpen(true)}
          className="text-xs font-bold flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Open Review Case</span>
        </Button>
      </div>

      {/* Search & Status Filter */}
      <div className="p-4 rounded-2xl bg-[#0A1A24] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by case number, policy..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal/40"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-[#0A1A24] border border-white/15 text-xs text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-teal/40 cursor-pointer shadow-inner"
          >
            <option value="all" className="bg-[#0A1A24] text-slate-100">All Case Statuses</option>
            <option value="new" className="bg-[#0A1A24] text-slate-100">New</option>
            <option value="under_review" className="bg-[#0A1A24] text-slate-100">Under Review</option>
            <option value="eligible" className="bg-[#0A1A24] text-slate-100">Eligible for Reporting</option>
            <option value="in_progress" className="bg-[#0A1A24] text-slate-100">In Progress</option>
            <option value="submitted" className="bg-[#0A1A24] text-slate-100">Submitted to Google</option>
            <option value="info_required" className="bg-[#0A1A24] text-slate-100">Info Required</option>
            <option value="removed" className="bg-[#0A1A24] text-slate-100">Removed (Confirmed)</option>
            <option value="not_removed" className="bg-[#0A1A24] text-slate-100">Not Removed</option>
            <option value="rejected" className="bg-[#0A1A24] text-slate-100">Rejected</option>
            <option value="closed" className="bg-[#0A1A24] text-slate-100">Closed</option>
          </select>
        </div>
      </div>

      {/* Cases List Table */}
      {filteredCases.length === 0 ? (
        <EmptyState
          icon={ShieldAlert}
          title="No Active Review Cases Found"
          description="Open a new review case for an onboarded client to track disputed links and official appeal dossiers."
          actionLabel="Open New Case"
          onAction={() => setIsNewCaseModalOpen(true)}
        />
      ) : (
        <div className="rounded-2xl bg-[#0A1A24] border border-white/10 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider font-semibold bg-white/5">
                  <th className="py-3.5 px-4">Case ID</th>
                  <th className="py-3.5 px-4">Violation Category</th>
                  <th className="py-3.5 px-4">Target Reviews</th>
                  <th className="py-3.5 px-4">Priority</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredCases.map((c) => (
                  <tr key={c.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-teal">{c.case_number}</td>
                    <td className="py-3 px-4 font-semibold text-white">{c.violation_category}</td>
                    <td className="py-3 px-4">{c.target_reviews_count} Reviews</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={c.priority} />
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleOpenCaseDetail(c)}
                        className="px-3 py-1.5 rounded-lg bg-teal/15 text-teal hover:bg-teal/25 font-semibold text-xs transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 inline mr-1" />
                        <span>Manage Case</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Case Detail & Management Modal */}
      {selectedCase && (
        <Modal
          isOpen={Boolean(selectedCase)}
          onClose={() => setSelectedCase(null)}
          title={`Case Dossier: ${selectedCase.case_number}`}
          subtitle={`Violation: ${selectedCase.violation_category} • Priority: ${selectedCase.priority.toUpperCase()}`}
          maxWidth="2xl"
        >
          <div className="space-y-6 text-xs">
            {/* Status & Progress Bar */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-slate-400 uppercase tracking-wider text-[10px]">Internal Dossier Status</span>
                <div className="flex items-center gap-2">
                  <StatusBadge status={selectedCase.status} />
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-300 font-mono text-[11px]">
                    Created {new Date(selectedCase.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Status Update Controls */}
              <div className="flex flex-wrap items-center gap-1.5">
                {(['under_review', 'in_progress', 'submitted', 'removed', 'not_removed'] as CaseStatus[]).map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(st)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                        selectedCase.status === st
                          ? 'bg-teal text-navy'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                      }`}
                    >
                      {st.replace(/_/g, ' ')}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Individual Reviews Within This Case */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Disputed Reviews in this Case</h4>
                  <p className="text-[11px] text-slate-400">
                    A single dispute case can contain multiple coordinated negative or fake reviews.
                  </p>
                </div>

                <Button
                  variant="teal"
                  size="sm"
                  onClick={() => setIsAddReviewModalOpen(true)}
                  className="text-xs"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  <span>Add Review</span>
                </Button>
              </div>

              {caseReviews.length === 0 ? (
                <div className="p-6 rounded-xl border border-white/10 bg-white/5 text-center text-slate-400">
                  No individual reviews logged in this case yet. Click "Add Review" to record details.
                </div>
              ) : (
                <div className="space-y-3">
                  {caseReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">
                            {rev.reviewer_name || 'Anonymous Reviewer'}
                          </span>
                          <div className="flex text-amber-400">
                            {Array.from({ length: rev.review_rating || 1 }).map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                        </div>

                        <StatusBadge status={rev.status} />
                      </div>

                      {rev.review_text && (
                        <p className="p-3 rounded-lg bg-black/20 text-slate-200 italic leading-relaxed text-[11px]">
                          "{rev.review_text}"
                        </p>
                      )}

                      {rev.policy_violation_reason && (
                        <p className="text-slate-400 text-[11px]">
                          <strong className="text-teal">Policy Analysis:</strong> {rev.policy_violation_reason}
                        </p>
                      )}

                      {rev.review_url && (
                        <a
                          href={rev.review_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal hover:underline inline-flex items-center gap-1 text-[11px]"
                        >
                          <span>Review Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Case Activity History */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <History className="w-4 h-4 text-teal" />
                <span>Case Status & Action History</span>
              </h4>

              {caseHistory.length === 0 ? (
                <p className="text-slate-500 text-[11px]">No status transitions recorded yet.</p>
              ) : (
                <div className="space-y-2">
                  {caseHistory.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-[11px]"
                    >
                      <div>
                        <span className="font-semibold text-slate-300">
                          Status changed to <strong className="text-teal">{item.new_status}</strong>
                        </span>
                        {item.notes && <p className="text-slate-400 mt-0.5">{item.notes}</p>}
                      </div>
                      <span className="text-slate-500 font-mono">
                        {new Date(item.created_at).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* New Case Creation Modal */}
      {isNewCaseModalOpen && (
        <Modal
          isOpen={isNewCaseModalOpen}
          onClose={() => setIsNewCaseModalOpen(false)}
          title="Open New Review Case"
          subtitle="Assemble a factual Google review policy dossier"
          maxWidth="lg"
        >
          <form onSubmit={handleCreateCase} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-white">Case Number</label>
                <input
                  type="text"
                  readOnly
                  value={newCase.case_number}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-teal font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-white">Target Reviews Count</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={newCase.target_reviews_count}
                  onChange={(e) =>
                    setNewCase({ ...newCase, target_reviews_count: parseInt(e.target.value) || 1 })
                  }
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-teal/40"
                />
              </div>
            </div>

            {/* Select Customer */}
            <div className="space-y-1">
              <label className="font-bold text-white">Select Associated Customer *</label>
              <select
                required
                value={newCase.customer_id}
                onChange={(e) => handleCustomerSelect(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#0A1A24] border border-white/15 text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-teal/40 cursor-pointer shadow-inner"
              >
                <option value="" className="bg-[#0A1A24] text-slate-100">Select a customer</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#0A1A24] text-slate-100">
                    {c.company_name} ({c.full_name})
                  </option>
                ))}
              </select>
            </div>

            {/* Select Business Location */}
            {businesses.length > 0 && (
              <div className="space-y-1">
                <label className="font-bold text-white">Select Business Location Listing *</label>
                <select
                  required
                  value={newCase.business_id}
                  onChange={(e) => setNewCase({ ...newCase, business_id: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#0A1A24] border border-white/15 text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-teal/40 cursor-pointer shadow-inner"
                >
                  {businesses.map((b) => (
                    <option key={b.id} value={b.id} className="bg-[#0A1A24] text-slate-100">
                      {b.business_name} ({b.country || 'USA'})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-white">Suspected Violation Category *</label>
                <select
                  value={newCase.violation_category}
                  onChange={(e) => setNewCase({ ...newCase, violation_category: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#0A1A24] border border-white/15 text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-teal/40 cursor-pointer shadow-inner"
                >
                  <option value="Conflict of Interest" className="bg-[#0A1A24] text-slate-100">Conflict of Interest (Staff/Competitor)</option>
                  <option value="Fake / Non-Customer Spam" className="bg-[#0A1A24] text-slate-100">Fake / Non-Customer Spam</option>
                  <option value="Off-Topic Content" className="bg-[#0A1A24] text-slate-100">Off-Topic Content (Third-party courier)</option>
                  <option value="Harassment / Defamation" className="bg-[#0A1A24] text-slate-100">Harassment / Defamation</option>
                  <option value="Personal Information Exposure" className="bg-[#0A1A24] text-slate-100">Personal Information Exposure</option>
                  <option value="Other Policy Violation" className="bg-[#0A1A24] text-slate-100">Other Policy Violation</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-white">Priority Level</label>
                <select
                  value={newCase.priority}
                  onChange={(e) => setNewCase({ ...newCase, priority: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl bg-[#0A1A24] border border-white/15 text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-teal/40 cursor-pointer shadow-inner"
                >
                  <option value="low" className="bg-[#0A1A24] text-slate-100">Low</option>
                  <option value="medium" className="bg-[#0A1A24] text-slate-100">Medium</option>
                  <option value="high" className="bg-[#0A1A24] text-slate-100">High</option>
                  <option value="urgent" className="bg-[#0A1A24] text-slate-100">Urgent</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-white">Internal Policy Assessment</label>
              <textarea
                rows={3}
                placeholder="Initial analysis of Google guidelines, evidence availability..."
                value={newCase.internal_assessment}
                onChange={(e) => setNewCase({ ...newCase, internal_assessment: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-teal/40"
              />
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setIsNewCaseModalOpen(false)}>
                <span>Cancel</span>
              </Button>
              <Button variant="teal" size="sm" type="submit">
                <span>Create Case Dossier</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add Review to Case Modal */}
      {isAddReviewModalOpen && selectedCase && (
        <Modal
          isOpen={isAddReviewModalOpen}
          onClose={() => setIsAddReviewModalOpen(false)}
          title={`Add Review to ${selectedCase.case_number}`}
          subtitle="Log a disputed Google review link"
          maxWidth="lg"
        >
          <form onSubmit={handleAddReview} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-white">Reviewer Profile Name</label>
                <input
                  type="text"
                  placeholder="e.g. John S."
                  value={newReview.reviewer_name}
                  onChange={(e) => setNewReview({ ...newReview, reviewer_name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-teal/40"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-white">Star Rating</label>
                <select
                  value={newReview.review_rating}
                  onChange={(e) =>
                    setNewReview({ ...newReview, review_rating: parseInt(e.target.value) || 1 })
                  }
                  className="w-full p-2.5 rounded-xl bg-[#0A1A24] border border-white/15 text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-teal/40 cursor-pointer shadow-inner"
                >
                  <option value="1" className="bg-[#0A1A24] text-slate-100">1 Star</option>
                  <option value="2" className="bg-[#0A1A24] text-slate-100">2 Stars</option>
                  <option value="3" className="bg-[#0A1A24] text-slate-100">3 Stars</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-white">Disputed Review URL</label>
              <input
                type="url"
                placeholder="https://maps.google.com/..."
                value={newReview.review_url}
                onChange={(e) => setNewReview({ ...newReview, review_url: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-teal/40"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-white">Review Text Content</label>
              <textarea
                rows={3}
                placeholder="Paste the full text of the review here..."
                value={newReview.review_text}
                onChange={(e) => setNewReview({ ...newReview, review_text: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-teal/40"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-white">Specific Policy Clause Breached</label>
              <input
                type="text"
                placeholder="e.g. Conflict of interest, former employee retaliatory review"
                value={newReview.policy_violation_reason}
                onChange={(e) => setNewReview({ ...newReview, policy_violation_reason: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-teal/40"
              />
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setIsAddReviewModalOpen(false)}>
                <span>Cancel</span>
              </Button>
              <Button variant="teal" size="sm" type="submit">
                <span>Save Review</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default AdminCasesPage

