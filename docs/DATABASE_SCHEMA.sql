-- =============================================================================
-- RepuShield Business Management System (BMS)
-- Database Migration: 20261114_initial_schema.sql
-- Standalone, Idempotent PostgreSQL 15+ / Supabase Migration
-- =============================================================================
-- Authorized Administrator Emails:
-- 1. musmannazir97@gmail.com (Active admin account)
-- 2. usamahameedahmadani@gmail.com (Authorized admin account)
-- =============================================================================

-- =============================================================================
-- 0. AUTOMATED TIMESTAMP TRIGGER FUNCTION
-- =============================================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$;

-- =============================================================================
-- 1. ADMIN PROFILES
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'owner' CHECK (role IN ('owner', 'administrator')),
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

DROP TRIGGER IF EXISTS trigger_admin_profiles_updated_at ON public.admin_profiles;
CREATE TRIGGER trigger_admin_profiles_updated_at
  BEFORE UPDATE ON public.admin_profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- 2. LEADS & INQUIRIES
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL DEFAULT 'Website Contact',
  business_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  service_required TEXT,
  profile_url TEXT,
  review_count TEXT DEFAULT '1',
  disputed_urls TEXT,
  details TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN (
    'new', 'contacted', 'qualified', 'awaiting_response', 'converted', 'not_interested', 'closed', 'spam'
  )),
  internal_notes TEXT,
  converted_customer_id UUID,
  converted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);

DROP TRIGGER IF EXISTS trigger_leads_updated_at ON public.leads;
CREATE TRIGGER trigger_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- 3. CUSTOMERS
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  address TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_customers_status ON public.customers(status);
CREATE INDEX IF NOT EXISTS idx_customers_email ON public.customers(email);

DROP TRIGGER IF EXISTS trigger_customers_updated_at ON public.customers;
CREATE TRIGGER trigger_customers_updated_at
  BEFORE UPDATE ON public.customers
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- 4. BUSINESSES (1 Customer -> Many Businesses)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  category TEXT,
  country TEXT,
  location_address TEXT,
  website_url TEXT,
  gbp_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_businesses_customer ON public.businesses(customer_id);

DROP TRIGGER IF EXISTS trigger_businesses_updated_at ON public.businesses;
CREATE TRIGGER trigger_businesses_updated_at
  BEFORE UPDATE ON public.businesses
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- 5. REVIEW CASES
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.review_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_number TEXT NOT NULL UNIQUE,
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE RESTRICT,
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE RESTRICT,
  violation_category TEXT NOT NULL,
  internal_assessment TEXT,
  target_reviews_count INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN (
    'new', 'under_review', 'eligible', 'in_progress', 'submitted',
    'info_required', 'removed', 'not_removed', 'rejected', 'closed'
  )),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  google_escalation_status TEXT,
  assigned_follow_up_date DATE,
  submitted_to_google_date DATE,
  outcome TEXT CHECK (outcome IN ('removed', 'not_removed', 'appealing', 'pending')),
  outcome_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_cases_customer ON public.review_cases(customer_id);
CREATE INDEX IF NOT EXISTS idx_cases_business ON public.review_cases(business_id);
CREATE INDEX IF NOT EXISTS idx_cases_status ON public.review_cases(status);
CREATE INDEX IF NOT EXISTS idx_cases_case_number ON public.review_cases(case_number);

DROP TRIGGER IF EXISTS trigger_review_cases_updated_at ON public.review_cases;
CREATE TRIGGER trigger_review_cases_updated_at
  BEFORE UPDATE ON public.review_cases
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- 6. CASE REVIEWS (1 Case -> Many Reviews)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.case_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.review_cases(id) ON DELETE CASCADE,
  reviewer_name TEXT,
  review_rating INTEGER CHECK (review_rating BETWEEN 1 AND 5),
  review_date DATE,
  review_url TEXT,
  review_text TEXT,
  policy_violation_reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'removed', 'retained')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_reviews_case ON public.case_reviews(case_id);

DROP TRIGGER IF EXISTS trigger_case_reviews_updated_at ON public.case_reviews;
CREATE TRIGGER trigger_case_reviews_updated_at
  BEFORE UPDATE ON public.case_reviews
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- 7. EVIDENCE & ATTACHMENTS
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.case_evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.review_cases(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  file_size BIGINT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_evidence_case ON public.case_evidence(case_id);

-- =============================================================================
-- 8. CASE STATUS HISTORY
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.case_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.review_cases(id) ON DELETE CASCADE,
  previous_status TEXT NOT NULL,
  new_status TEXT NOT NULL,
  changed_by TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_history_case ON public.case_status_history(case_id);

-- =============================================================================
-- 9. TASKS & FOLLOW-UPS
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  due_date DATE,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  case_id UUID REFERENCES public.review_cases(id) ON DELETE SET NULL,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON public.tasks(due_date);

DROP TRIGGER IF EXISTS trigger_tasks_updated_at ON public.tasks;
CREATE TRIGGER trigger_tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- 10. COMMUNICATIONS LOG
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.communications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('email', 'whatsapp', 'phone', 'meeting', 'other')),
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  case_id UUID REFERENCES public.review_cases(id) ON DELETE SET NULL,
  next_follow_up_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_comm_customer ON public.communications(customer_id);
CREATE INDEX IF NOT EXISTS idx_comm_lead ON public.communications(lead_id);
CREATE INDEX IF NOT EXISTS idx_comm_case ON public.communications(case_id);

-- =============================================================================
-- 11. INVOICES
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number TEXT NOT NULL UNIQUE,
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE RESTRICT,
  issue_date DATE NOT NULL,
  due_date DATE NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  subtotal NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  tax_rate NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  tax_amount NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  total_amount NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  paid_amount NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN (
    'draft', 'sent', 'partially_paid', 'paid', 'overdue', 'cancelled'
  )),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_invoices_customer ON public.invoices(customer_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON public.invoices(status);

DROP TRIGGER IF EXISTS trigger_invoices_updated_at ON public.invoices;
CREATE TRIGGER trigger_invoices_updated_at
  BEFORE UPDATE ON public.invoices
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- 12. INVOICE ITEMS
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity NUMERIC(8,2) NOT NULL DEFAULT 1.00,
  unit_price NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  total NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice ON public.invoice_items(invoice_id);

-- =============================================================================
-- 13. PAYMENTS (Actual Recorded Revenue)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE RESTRICT,
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE RESTRICT,
  amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  payment_date DATE NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN (
    'bank_transfer', 'credit_card', 'wire_transfer', 'cash', 'online', 'other'
  )),
  transaction_reference TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_payments_invoice ON public.payments(invoice_id);
CREATE INDEX IF NOT EXISTS idx_payments_customer ON public.payments(customer_id);
CREATE INDEX IF NOT EXISTS idx_payments_date ON public.payments(payment_date DESC);

-- =============================================================================
-- 14. BUSINESS SETTINGS (Single-Row Configuration)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.business_settings (
  id TEXT PRIMARY KEY DEFAULT 'default_settings',
  business_name TEXT NOT NULL DEFAULT 'RepuShield',
  contact_email TEXT NOT NULL DEFAULT 'usamahameedahmadani@gmail.com',
  whatsapp_number TEXT NOT NULL DEFAULT '+92 340 6523353',
  address TEXT NOT NULL DEFAULT 'USA, Canada & Pakistan Operations',
  default_currency TEXT NOT NULL DEFAULT 'USD',
  notification_preferences JSONB NOT NULL DEFAULT '{"email_on_new_lead": true, "email_on_case_update": true, "email_on_payment_received": true}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

DROP TRIGGER IF EXISTS trigger_business_settings_updated_at ON public.business_settings;
CREATE TRIGGER trigger_business_settings_updated_at
  BEFORE UPDATE ON public.business_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- 15. ACTIVITY LOGS
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_activity_created_at ON public.activity_logs(created_at DESC);

-- =============================================================================
-- 16. ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

-- Enable RLS on all 15 tables
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- LEADS POLICIES:
-- 1. Public Anonymous/Authenticated can INSERT incoming leads
-- 2. ONLY authorized admins can SELECT, UPDATE, DELETE leads
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow public website lead inserts" ON public.leads;
CREATE POLICY "Allow public website lead inserts" ON public.leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin full access to leads" ON public.leads;
CREATE POLICY "Allow admin full access to leads" ON public.leads
  FOR ALL TO authenticated
  USING (
    (select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com')
  )
  WITH CHECK (
    (select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com')
  );

-- -----------------------------------------------------------------------------
-- ADMIN PROFILES POLICIES:
-- Only authorized admin emails can view or modify admin profiles
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow admin self management" ON public.admin_profiles;
DROP POLICY IF EXISTS "Admins can manage admin profiles" ON public.admin_profiles;
CREATE POLICY "Admins can manage admin profiles" ON public.admin_profiles
  FOR ALL TO authenticated
  USING (
    (select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com')
  )
  WITH CHECK (
    (select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com')
  );

-- -----------------------------------------------------------------------------
-- PRIVATE BUSINESS TABLES POLICIES:
-- Strictly restricted to authorized administrator emails
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Admin full access to customers" ON public.customers;
CREATE POLICY "Admin full access to customers" ON public.customers
  FOR ALL TO authenticated
  USING ((select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com'))
  WITH CHECK ((select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com'));

DROP POLICY IF EXISTS "Admin full access to businesses" ON public.businesses;
CREATE POLICY "Admin full access to businesses" ON public.businesses
  FOR ALL TO authenticated
  USING ((select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com'))
  WITH CHECK ((select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com'));

DROP POLICY IF EXISTS "Admin full access to review_cases" ON public.review_cases;
CREATE POLICY "Admin full access to review_cases" ON public.review_cases
  FOR ALL TO authenticated
  USING ((select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com'))
  WITH CHECK ((select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com'));

DROP POLICY IF EXISTS "Admin full access to case_reviews" ON public.case_reviews;
CREATE POLICY "Admin full access to case_reviews" ON public.case_reviews
  FOR ALL TO authenticated
  USING ((select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com'))
  WITH CHECK ((select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com'));

DROP POLICY IF EXISTS "Admin full access to case_evidence" ON public.case_evidence;
CREATE POLICY "Admin full access to case_evidence" ON public.case_evidence
  FOR ALL TO authenticated
  USING ((select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com'))
  WITH CHECK ((select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com'));

DROP POLICY IF EXISTS "Admin full access to case_status_history" ON public.case_status_history;
CREATE POLICY "Admin full access to case_status_history" ON public.case_status_history
  FOR ALL TO authenticated
  USING ((select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com'))
  WITH CHECK ((select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com'));

DROP POLICY IF EXISTS "Admin full access to tasks" ON public.tasks;
CREATE POLICY "Admin full access to tasks" ON public.tasks
  FOR ALL TO authenticated
  USING ((select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com'))
  WITH CHECK ((select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com'));

DROP POLICY IF EXISTS "Admin full access to communications" ON public.communications;
CREATE POLICY "Admin full access to communications" ON public.communications
  FOR ALL TO authenticated
  USING ((select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com'))
  WITH CHECK ((select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com'));

DROP POLICY IF EXISTS "Admin full access to invoices" ON public.invoices;
CREATE POLICY "Admin full access to invoices" ON public.invoices
  FOR ALL TO authenticated
  USING ((select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com'))
  WITH CHECK ((select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com'));

DROP POLICY IF EXISTS "Admin full access to invoice_items" ON public.invoice_items;
CREATE POLICY "Admin full access to invoice_items" ON public.invoice_items
  FOR ALL TO authenticated
  USING ((select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com'))
  WITH CHECK ((select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com'));

DROP POLICY IF EXISTS "Admin full access to payments" ON public.payments;
CREATE POLICY "Admin full access to payments" ON public.payments
  FOR ALL TO authenticated
  USING ((select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com'))
  WITH CHECK ((select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com'));

DROP POLICY IF EXISTS "Admin full access to business_settings" ON public.business_settings;
CREATE POLICY "Admin full access to business_settings" ON public.business_settings
  FOR ALL TO authenticated
  USING ((select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com'))
  WITH CHECK ((select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com'));

DROP POLICY IF EXISTS "Admin full access to activity_logs" ON public.activity_logs;
CREATE POLICY "Admin full access to activity_logs" ON public.activity_logs
  FOR ALL TO authenticated
  USING ((select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com'))
  WITH CHECK ((select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com'));

-- =============================================================================
-- 17. STORAGE BUCKET FOR EVIDENCE FILES
-- =============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('case-evidence', 'case-evidence', false)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Admin full access to case-evidence storage" ON storage.objects;
CREATE POLICY "Admin full access to case-evidence storage"
ON storage.objects FOR ALL TO authenticated
USING (
  bucket_id = 'case-evidence'
  AND (select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com')
)
WITH CHECK (
  bucket_id = 'case-evidence'
  AND (select auth.jwt() ->> 'email') IN ('musmannazir97@gmail.com', 'usamahameedahmadani@gmail.com')
);
