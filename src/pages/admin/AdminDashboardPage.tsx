import React from 'react'
import {
  Users,
  Inbox,
  Clock,
  TrendingUp,
  FileSpreadsheet,
  AlertCircle,
  ExternalLink,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

// Clearly labelled sample mock data
const sampleTrendData = [
  { month: 'Jun', inquiries: 14, assessments: 8 },
  { month: 'Jul', inquiries: 22, assessments: 15 },
  { month: 'Aug', inquiries: 31, assessments: 24 },
  { month: 'Sep', inquiries: 28, assessments: 20 },
  { month: 'Oct', inquiries: 45, assessments: 36 },
  { month: 'Nov', inquiries: 58, assessments: 42 },
]

export const AdminDashboardPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto admin-fade-in-up">
      {/* Top Banner Notice */}
      <div className="glass-admin rounded-2xl p-4 border border-teal/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal/20 text-teal flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              <span>Admin Operations Center</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Sample Data Only
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Interactive operations center showing how lead flow and policy dossiers are monitored.
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-teal" />
          <span>Demo Snapshot: Nov 2026</span>
        </div>
      </div>

      {/* KPI Statistic Cards (Clearly labelled sample data) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Inquiries',
            value: '198',
            change: '+18% vs last mo',
            icon: Inbox,
            color: 'text-teal',
            badge: 'Sample Metric',
          },
          {
            label: 'New Assessments',
            value: '42',
            change: '+12 pending review',
            icon: Users,
            color: 'text-sky-400',
            badge: 'Sample Metric',
          },
          {
            label: 'Policy Files Prepared',
            value: '116',
            change: 'USA / CA / PK',
            icon: FileSpreadsheet,
            color: 'text-emerald-400',
            badge: 'Sample Metric',
          },
          {
            label: 'Avg Response Time',
            value: '3.4 hrs',
            change: 'Direct WhatsApp',
            icon: Clock,
            color: 'text-teal-light',
            badge: 'Sample Metric',
          },
        ].map((stat, idx) => (
          <div
            key={stat.label}
            className={`glass-admin-card rounded-2xl p-5 border border-white/10 hover:border-teal/30 transition-all space-y-3 admin-fade-in-up admin-stagger-${idx + 1}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">{stat.label}</span>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-white tracking-tight">{stat.value}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
                {stat.badge}
              </span>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-1">
              <span>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sample Chart Section */}
      <div className="glass-admin-card rounded-2xl p-6 border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Inquiry & Assessment Volume</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                Sample Trend
              </span>
            </h3>
            <p className="text-xs text-slate-400">6-Month demonstration volume across target jurisdictions</p>
          </div>
          <span className="text-xs text-teal font-medium">Recharts Dynamic Component</span>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sampleTrendData}>
              <defs>
                <linearGradient id="colorInquiries" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stop-color="#14B8A6" stop-opacity={0.4} />
                  <stop offset="95%" stop-color="#14B8A6" stop-opacity={0} />
                </linearGradient>
                <linearGradient id="colorAssessments" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stop-color="#0A789B" stop-opacity={0.4} />
                  <stop offset="95%" stop-color="#0A789B" stop-opacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F2C3D',
                  borderColor: 'rgba(255,255,255,0.15)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="inquiries"
                stroke="#14B8A6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorInquiries)"
                name="Inquiries (Sample)"
              />
              <Area
                type="monotone"
                dataKey="assessments"
                stroke="#0A789B"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorAssessments)"
                name="Assessments (Sample)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sample Inquiries Table Preview */}
      <div className="glass-admin-card rounded-2xl p-6 border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>Recent Simulated Inquiries</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
              Sample Data Table
            </span>
          </h3>
          <span className="text-xs text-slate-400">Phase 5 will deliver full glassmorphism tables & filters</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-3">Case ID</th>
                <th className="py-3 px-3">Business (Sample)</th>
                <th className="py-3 px-3">Country</th>
                <th className="py-3 px-3">Violation Category</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { id: 'SMP-101', name: 'Apex Dental Care', country: 'USA', cat: 'Conflict of Interest', status: 'Dossier Prepared' },
                { id: 'SMP-102', name: 'Metro Auto Collision', country: 'Canada', cat: 'Harassment / Defamation', status: 'Under Assessment' },
                { id: 'SMP-103', name: 'Northgate Legal Group', country: 'USA', cat: 'Fake Content / Spam', status: 'In Review' },
                { id: 'SMP-104', name: 'Indus Logistics', country: 'Pakistan', cat: 'Off-Topic Review', status: 'Initial Contact' },
              ].map((row) => (
                <tr key={row.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 font-mono text-teal">{row.id}</td>
                  <td className="py-3 px-3 font-medium text-white">{row.name}</td>
                  <td className="py-3 px-3">{row.country}</td>
                  <td className="py-3 px-3 text-slate-300">{row.cat}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-teal/15 text-teal text-[11px] font-semibold border border-teal/30">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-white/10">
          <div className="flex items-center gap-1.5 text-amber-300">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Active live operations environment. Secure access restricted to authorized administrators.</span>
          </div>
          <a href="/" className="text-teal hover:underline flex items-center gap-1">
            <span>Public Website</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage

