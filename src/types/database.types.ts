/**
 * RepuShield Business Management System (BMS)
 * Database Types & Schema Model
 */

export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'awaiting_response'
  | 'converted'
  | 'not_interested'
  | 'closed'
  | 'spam'

export type CaseStatus =
  | 'new'
  | 'under_review'
  | 'eligible'
  | 'in_progress'
  | 'submitted'
  | 'info_required'
  | 'removed'
  | 'not_removed'
  | 'rejected'
  | 'closed'

export type PriorityLevel = 'low' | 'medium' | 'high' | 'urgent'

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled'

export type CommunicationType = 'email' | 'whatsapp' | 'phone' | 'meeting' | 'other'

export type InvoiceStatus =
  | 'draft'
  | 'sent'
  | 'partially_paid'
  | 'paid'
  | 'overdue'
  | 'cancelled'

export type PaymentMethod =
  | 'bank_transfer'
  | 'credit_card'
  | 'wire_transfer'
  | 'cash'
  | 'online'
  | 'other'

export interface AdminProfile {
  id: string
  email: string
  full_name: string
  role: 'owner' | 'administrator'
  avatar_url?: string
  phone?: string
  created_at: string
  updated_at: string
}

export interface Lead {
  id: string
  source: string // 'Contact Page' | 'Google Ads Landing Page' | 'WhatsApp Direct' | 'Referral' | etc.
  business_name: string
  contact_name: string
  email: string
  phone?: string
  country?: string
  service_required?: string
  profile_url?: string
  review_count?: string
  disputed_urls?: string
  details?: string
  status: LeadStatus
  internal_notes?: string
  converted_customer_id?: string
  converted_at?: string
  created_at: string
  updated_at: string
}

export interface Customer {
  id: string
  full_name: string
  company_name: string
  email: string
  phone?: string
  country?: string
  address?: string
  status: 'active' | 'inactive' | 'archived'
  notes?: string
  created_at: string
  updated_at: string
}

export interface Business {
  id: string
  customer_id: string
  business_name: string
  category?: string
  country?: string
  location_address?: string
  website_url?: string
  gbp_url?: string // Google Business Profile URL
  notes?: string
  created_at: string
  updated_at: string
}

export interface ReviewCase {
  id: string
  case_number: string // e.g. "RPS-2026-001"
  customer_id: string
  business_id: string
  violation_category: string // e.g. "Conflict of Interest", "Fake / Spam", "Harassment", etc.
  internal_assessment?: string
  target_reviews_count: number
  status: CaseStatus
  priority: PriorityLevel
  google_escalation_status?: string
  assigned_follow_up_date?: string
  submitted_to_google_date?: string
  outcome?: 'removed' | 'not_removed' | 'appealing' | 'pending'
  outcome_date?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface CaseReview {
  id: string
  case_id: string
  reviewer_name?: string
  review_rating?: number
  review_date?: string
  review_url?: string
  review_text?: string
  policy_violation_reason?: string
  status: 'pending' | 'submitted' | 'removed' | 'retained'
  created_at: string
  updated_at: string
}

export interface CaseEvidence {
  id: string
  case_id: string
  file_name: string
  file_url: string
  file_type?: string
  file_size?: number
  description?: string
  created_at: string
}

export interface CaseStatusHistory {
  id: string
  case_id: string
  previous_status: CaseStatus
  new_status: CaseStatus
  changed_by?: string
  notes?: string
  created_at: string
}

export interface Task {
  id: string
  title: string
  description?: string
  priority: PriorityLevel
  status: TaskStatus
  due_date?: string
  customer_id?: string
  lead_id?: string
  case_id?: string
  completed_at?: string
  created_at: string
  updated_at: string
}

export interface Communication {
  id: string
  type: CommunicationType
  subject: string
  content: string
  lead_id?: string
  customer_id?: string
  case_id?: string
  next_follow_up_date?: string
  created_at: string
}

export interface InvoiceItem {
  id: string
  invoice_id: string
  description: string
  quantity: number
  unit_price: number
  total: number
  created_at: string
}

export interface Invoice {
  id: string
  invoice_number: string // e.g. "INV-2026-001"
  customer_id: string
  issue_date: string
  due_date: string
  currency: string // 'USD' | 'CAD' | 'PKR' | 'GBP' | 'EUR'
  subtotal: number
  tax_rate: number
  tax_amount: number
  total_amount: number
  paid_amount: number
  status: InvoiceStatus
  notes?: string
  items?: InvoiceItem[]
  payments?: Payment[]
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  invoice_id: string
  customer_id: string
  amount: number
  payment_date: string
  payment_method: PaymentMethod
  transaction_reference?: string
  notes?: string
  created_at: string
}

export interface BusinessSettings {
  id: string
  business_name: string
  contact_email: string
  whatsapp_number: string
  address: string
  default_currency: string
  notification_preferences: {
    email_on_new_lead: boolean
    email_on_case_update: boolean
    email_on_payment_received: boolean
  }
  updated_at: string
}

export interface DashboardMetrics {
  totalLeads: number
  newLeads: number
  activeCustomers: number
  totalCases: number
  casesInProgress: number
  removedReviews: number
  pendingFollowUps: number
  outstandingPayments: number
  totalRevenue: number
}

