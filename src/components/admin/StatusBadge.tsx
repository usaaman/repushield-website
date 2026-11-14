import React from 'react'

interface StatusBadgeProps {
  status: string
  className?: string
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStyles = () => {
    switch (status.toLowerCase()) {
      // Positive / Done
      case 'active':
      case 'removed':
      case 'paid':
      case 'completed':
      case 'qualified':
      case 'converted':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'

      // In Progress / Active
      case 'in_progress':
      case 'submitted':
      case 'contacted':
      case 'under_review':
      case 'partially_paid':
      case 'appealing':
        return 'bg-teal/15 text-teal border-teal/30'

      // Attention / Pending
      case 'new':
      case 'pending':
      case 'awaiting_response':
      case 'info_required':
      case 'draft':
      case 'medium':
        return 'bg-sky-500/15 text-sky-400 border-sky-500/30'

      // Warning / Urgent
      case 'urgent':
      case 'high':
      case 'overdue':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30'

      // Negative / Closed
      case 'rejected':
      case 'not_removed':
      case 'cancelled':
      case 'spam':
      case 'closed':
      case 'not_interested':
      case 'inactive':
      case 'archived':
      case 'low':
        return 'bg-slate-500/15 text-slate-400 border-slate-500/30'

      default:
        return 'bg-slate-700/30 text-slate-300 border-slate-600/30'
    }
  }

  const formatLabel = (txt: string) => {
    return txt
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border tracking-wide capitalize transition-all duration-300 ease-out backdrop-blur-xs shadow-xs ${getStyles()} ${className}`}
    >
      {formatLabel(status)}
    </span>
  )
}

