import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import type { DashboardMetrics } from '@/types/database.types'

export const dashboardService = {
  async getMetrics(): Promise<DashboardMetrics> {
    const defaultMetrics: DashboardMetrics = {
      totalLeads: 0,
      newLeads: 0,
      activeCustomers: 0,
      totalCases: 0,
      casesInProgress: 0,
      removedReviews: 0,
      pendingFollowUps: 0,
      outstandingPayments: 0,
      totalRevenue: 0,
    }

    if (!isSupabaseConfigured()) return defaultMetrics

    try {
      // 1. Leads counts
      const { data: leads } = await supabase.from('leads').select('status')
      const totalLeads = leads?.length || 0
      const newLeads = leads?.filter((l) => l.status === 'new').length || 0

      // 2. Customers
      const { data: customers } = await supabase.from('customers').select('status')
      const activeCustomers = customers?.filter((c) => c.status === 'active').length || 0

      // 3. Review cases
      const { data: cases } = await supabase.from('review_cases').select('status, outcome')
      const totalCases = cases?.length || 0
      const casesInProgress = cases?.filter((c) => ['in_progress', 'submitted', 'under_review'].includes(c.status)).length || 0
      const removedReviews = cases?.filter((c) => c.status === 'removed' || c.outcome === 'removed').length || 0

      // 4. Pending tasks & follow-ups
      const { data: tasks } = await supabase.from('tasks').select('status')
      const pendingFollowUps = tasks?.filter((t) => t.status === 'pending').length || 0

      // 5. Invoices & Payments (Real Revenue)
      const { data: invoices } = await supabase.from('invoices').select('total_amount, paid_amount, status')
      let outstandingPayments = 0
      invoices?.forEach((inv) => {
        if (inv.status !== 'cancelled' && inv.status !== 'paid') {
          outstandingPayments += Number(inv.total_amount) - Number(inv.paid_amount || 0)
        }
      })

      const { data: payments } = await supabase.from('payments').select('amount')
      const totalRevenue = payments?.reduce((acc, p) => acc + Number(p.amount), 0) || 0

      return {
        totalLeads,
        newLeads,
        activeCustomers,
        totalCases,
        casesInProgress,
        removedReviews,
        pendingFollowUps,
        outstandingPayments,
        totalRevenue,
      }
    } catch (err) {
      console.error('Error computing dashboard metrics:', err)
      return defaultMetrics
    }
  },

  async getRecentActivity() {
    if (!isSupabaseConfigured()) return []

    const { data } = await supabase
      .from('activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)

    return data || []
  },
}

