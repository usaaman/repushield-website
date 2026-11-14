import React, { useEffect, useState } from 'react'
import {
  BarChart3,
  Download,
  TrendingUp,
  ShieldCheck,
  Percent,
  DollarSign,
  FileSpreadsheet,
  RefreshCw,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { leadService } from '@/services/leadService'
import { caseService } from '@/services/caseService'
import { customerService } from '@/services/customerService'
import { invoiceService } from '@/services/invoiceService'
import type { Lead, ReviewCase, Customer, Invoice } from '@/types/database.types'

export const AdminReportsPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [cases, setCases] = useState<ReviewCase[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [dateFilter, setDateFilter] = useState<'30d' | '90d' | 'ytd' | 'all'>('all')

  const loadReportData = async () => {
    setLoading(true)
    const [fetchedLeads, fetchedCases, fetchedCustomers, fetchedInvoices] = await Promise.all([
      leadService.getLeads(),
      caseService.getCases(),
      customerService.getCustomers(),
      invoiceService.getInvoices(),
    ])
    setLeads(fetchedLeads)
    setCases(fetchedCases)
    setCustomers(fetchedCustomers)
    setInvoices(fetchedInvoices)
    setLoading(false)
  }

  useEffect(() => {
    loadReportData()
  }, [])

  // Calculations
  const totalLeads = leads.length
  const convertedLeads = leads.filter((l) => l.status === 'converted').length
  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0

  const totalCases = cases.length
  const removedCases = cases.filter((c) => c.status === 'removed' || c.outcome === 'removed').length
  const closedCases = cases.filter(
    (c) => c.status === 'removed' || c.status === 'rejected' || c.status === 'not_removed' || c.status === 'closed'
  ).length
  const removalSuccessRate = closedCases > 0 ? Math.round((removedCases / closedCases) * 100) : 0

  const totalInvoiced = invoices.reduce((sum, inv) => sum + (inv.total_amount || 0), 0)
  const totalCollected = invoices.reduce((sum, inv) => sum + (inv.paid_amount || 0), 0)
  const averageDealSize = customers.length > 0 ? Math.round(totalCollected / customers.length) : 0

  // Status Distribution Data for Recharts
  const casesByStatusData = [
    { name: 'New Case', count: cases.filter((c) => c.status === 'new').length },
    { name: 'Under Review', count: cases.filter((c) => c.status === 'under_review').length },
    { name: 'In Progress', count: cases.filter((c) => c.status === 'in_progress').length },
    { name: 'Submitted', count: cases.filter((c) => c.status === 'submitted').length },
    { name: 'Removed', count: cases.filter((c) => c.status === 'removed').length },
    { name: 'Rejected', count: cases.filter((c) => c.status === 'rejected' || c.status === 'not_removed').length },
  ]

  // Violations Breakdown
  const violationsData = [
    { name: 'Spam & Fake Reviews', value: cases.filter((c) => c.violation_category === 'Fake / Spam' || c.violation_category === 'fake_or_spam').length || 0, color: '#00C896' },
    { name: 'Conflict of Interest', value: cases.filter((c) => c.violation_category === 'Conflict of Interest' || c.violation_category === 'conflict_of_interest').length || 0, color: '#0EA5E9' },
    { name: 'Hate & Harassment', value: cases.filter((c) => c.violation_category === 'Harassment' || c.violation_category === 'hate_or_harassment').length || 0, color: '#F59E0B' },
    { name: 'Defamatory / Slander', value: cases.filter((c) => c.violation_category === 'Defamatory' || c.violation_category === 'defamatory').length || 0, color: '#EC4899' },
    { name: 'Off-Topic Content', value: cases.filter((c) => c.violation_category === 'Off-Topic' || c.violation_category === 'off_topic').length || 0, color: '#8B5CF6' },
    { name: 'Other Violations', value: cases.filter((c) => c.violation_category === 'Other' || c.violation_category === 'other').length || 0, color: '#64748B' },
  ].filter((item) => item.value > 0)

  // CSV Export functions
  const downloadCSV = (filename: string, headers: string[], rows: (string | number)[][]) => {
    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportLeadsCSV = () => {
    const headers = ['ID', 'Contact Name', 'Email', 'Phone', 'Company', 'Country', 'Service', 'Status', 'Date']
    const rows = leads.map((l) => [
      l.id,
      l.contact_name,
      l.email,
      l.phone || '',
      l.business_name || '',
      l.country || '',
      l.service_required || '',
      l.status,
      l.created_at,
    ])
    downloadCSV('riserepute_leads', headers, rows)
  }

  const exportCasesCSV = () => {
    const headers = ['Case Number', 'Customer ID', 'Status', 'Priority', 'Violation Category', 'Created Date']
    const rows = cases.map((c) => [
      c.case_number,
      c.customer_id,
      c.status,
      c.priority,
      c.violation_category || '',
      c.created_at,
    ])
    downloadCSV('riserepute_cases', headers, rows)
  }

  const exportInvoicesCSV = () => {
    const headers = ['Invoice Number', 'Customer ID', 'Status', 'Total ($)', 'Amount Paid ($)', 'Due Date', 'Created Date']
    const rows = invoices.map((inv) => [
      inv.invoice_number,
      inv.customer_id,
      inv.status,
      inv.total_amount,
      inv.paid_amount,
      inv.due_date,
      inv.created_at,
    ])
    downloadCSV('riserepute_invoices', headers, rows)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <BarChart3 className="w-6 h-6 text-teal" />
            <span>Reports & Analytics</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Conversion intelligence, Google review resolution metrics, and financial performance summaries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Time Filter Tabs */}
          <div className="bg-[#0D2434] p-1 rounded-xl border border-white/10 flex items-center text-xs">
            {(['30d', '90d', 'ytd', 'all'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setDateFilter(filter)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  dateFilter === filter ? 'bg-teal text-navy font-bold shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                {filter === '30d' ? '30 Days' : filter === '90d' ? '90 Days' : filter === 'ytd' ? 'YTD' : 'All Time'}
              </button>
            ))}
          </div>

          <button
            onClick={loadReportData}
            disabled={loading}
            className="p-2.5 rounded-xl bg-[#0D2434] border border-white/10 text-slate-300 hover:text-white hover:border-teal/40 transition-colors"
            title="Refresh analytics data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-teal' : ''}`} />
          </button>
        </div>
      </div>

      {/* KPI Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Lead Conversion */}
        <div className="bg-[#0D2434] border border-white/10 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Lead Conversion Rate</span>
            <div className="w-8 h-8 rounded-lg bg-teal/10 text-teal flex items-center justify-center">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{conversionRate}%</span>
            <span className="text-xs text-slate-400">({convertedLeads} of {totalLeads} leads)</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Inquiries successfully converted into paying clients</p>
        </div>

        {/* Case Removal Success */}
        <div className="bg-[#0D2434] border border-white/10 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Removal Success Rate</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{removalSuccessRate}%</span>
            <span className="text-xs text-slate-400">({removedCases} removed of {closedCases} closed)</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Policy violations successfully removed by Google</p>
        </div>

        {/* Total Collected Revenue */}
        <div className="bg-[#0D2434] border border-white/10 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Realized Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-teal/10 text-teal flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">${totalCollected.toLocaleString()}</span>
            <span className="text-xs text-slate-400">of ${totalInvoiced.toLocaleString()}</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Actual collected funds recorded from cleared payments</p>
        </div>

        {/* Average Client Value */}
        <div className="bg-[#0D2434] border border-white/10 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg Customer Value</span>
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">${averageDealSize.toLocaleString()}</span>
            <span className="text-xs text-slate-400">per client</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Average lifetime revenue per retained business</p>
        </div>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cases Distribution by Status */}
        <div className="bg-[#0D2434] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Review Cases by Workflow Stage</h3>
              <p className="text-xs text-slate-400">Real-time status breakdown across all client engagements</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 text-slate-300">
              {totalCases} Active & Resolved
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={casesByStatusData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis
                  dataKey="name"
                  stroke="#64748B"
                  fontSize={11}
                  angle={-20}
                  textAnchor="end"
                  tickLine={false}
                />
                <YAxis stroke="#64748B" fontSize={11} allowDecimals={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#07131B',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" fill="#00C896" radius={[4, 4, 0, 0]} name="Cases" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Violations Category Breakdown */}
        <div className="bg-[#0D2434] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white">Policy Violation Breakdown</h3>
                <p className="text-xs text-slate-400">Distribution of Google policy violation categories</p>
              </div>
            </div>

            {violationsData.length > 0 ? (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={violationsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {violationsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#07131B',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderRadius: '0.75rem',
                        color: '#fff',
                        fontSize: '12px',
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      formatter={(value) => <span className="text-xs text-slate-300">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-white/5 rounded-xl border border-dashed border-white/10 text-slate-400">
                <BarChart3 className="w-8 h-8 text-slate-500 mb-2" />
                <p className="text-sm font-medium text-slate-300">No Policy Violations Categorized Yet</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  As you log review cases and assign policy violation tags, the distribution chart will render automatically.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Operational Data Export Center */}
      <div className="bg-[#0D2434] border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-teal" />
              <span>Data Export & Archival Center</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Export verified database records in standard CSV format for accounting, reporting, or local backup.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Export Leads */}
          <div className="bg-[#07131B] border border-white/10 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-teal uppercase tracking-wider">Leads & Inquiries</span>
              <p className="text-sm font-semibold text-white mt-1">Inquiry Records ({leads.length})</p>
              <p className="text-xs text-slate-400 mt-1">
                Full history of public contact submissions, country, services, and conversion status.
              </p>
            </div>
            <button
              onClick={exportLeadsCSV}
              className="mt-4 flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 text-xs font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-teal" />
              <span>Export Leads CSV</span>
            </button>
          </div>

          {/* Export Cases */}
          <div className="bg-[#07131B] border border-white/10 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-teal uppercase tracking-wider">Review Cases</span>
              <p className="text-sm font-semibold text-white mt-1">Case Portfolio ({cases.length})</p>
              <p className="text-xs text-slate-400 mt-1">
                All client cases, Google review IDs, policy violation categories, and final outcomes.
              </p>
            </div>
            <button
              onClick={exportCasesCSV}
              className="mt-4 flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 text-xs font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-teal" />
              <span>Export Cases CSV</span>
            </button>
          </div>

          {/* Export Invoices */}
          <div className="bg-[#07131B] border border-white/10 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-teal uppercase tracking-wider">Financials</span>
              <p className="text-sm font-semibold text-white mt-1">Invoices & Receipts ({invoices.length})</p>
              <p className="text-xs text-slate-400 mt-1">
                Invoiced totals, payments collected, dates, and client account balances.
              </p>
            </div>
            <button
              onClick={exportInvoicesCSV}
              className="mt-4 flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 text-xs font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-teal" />
              <span>Export Invoices CSV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminReportsPage
