import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import type { Customer, Business } from '@/types/database.types'

const INITIAL_DEMO_CUSTOMERS: Customer[] = [
  {
    id: 'demo-cust-1',
    full_name: 'Dr. Marcus Vance',
    company_name: 'Apex Dental Care',
    email: 'marcus@apexdental.com',
    phone: '+1 (555) 234-5678',
    country: 'United States',
    address: '450 Lexington Ave, Suite 1200, New York, NY',
    status: 'active',
    notes: 'Converted from lead (Website Contact Form). Managing partner for multi-location practice.',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-cust-2',
    full_name: 'Sarah Jenkins, Esq.',
    company_name: 'Crestview Law Chambers',
    email: 'sjenkins@crestviewlaw.co.uk',
    phone: '+44 20 7946 0912',
    country: 'United Kingdom',
    address: '14 Chancery Lane, London, UK',
    status: 'active',
    notes: 'Converted from lead (Google Ads Landing Page). High-priority partner reputation monitoring.',
    created_at: new Date(Date.now() - 86400000 * 12).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-cust-3',
    full_name: 'Tariq Al-Mansoor',
    company_name: 'Horizon Hospitality Group',
    email: 'tariq@horizonresorts.ae',
    phone: '+971 4 312 8900',
    country: 'United Arab Emirates',
    address: 'Marina Plaza, Floor 24, Dubai Marina, UAE',
    status: 'active',
    notes: 'Converted from lead (WhatsApp Referral). 5 luxury resort location listings.',
    created_at: new Date(Date.now() - 86400000 * 20).toISOString(),
    updated_at: new Date().toISOString(),
  },
]

const INITIAL_DEMO_BUSINESSES: Business[] = [
  {
    id: 'biz-1',
    customer_id: 'demo-cust-1',
    business_name: 'Apex Dental Care — Manhattan Central',
    category: 'Dental Clinic',
    country: 'United States',
    location_address: '450 Lexington Ave, New York, NY',
    website_url: 'https://apexdentalcare.example.com',
    gbp_url: 'https://maps.google.com/?cid=1001',
    notes: 'Primary headquarters location profile.',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'biz-2',
    customer_id: 'demo-cust-1',
    business_name: 'Apex Dental Care — Brooklyn Heights',
    category: 'Dental Clinic',
    country: 'United States',
    location_address: '180 Montague St, Brooklyn, NY',
    website_url: 'https://apexdentalcare.example.com/brooklyn',
    gbp_url: 'https://maps.google.com/?cid=1002',
    notes: 'Secondary clinic branch.',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'biz-3',
    customer_id: 'demo-cust-2',
    business_name: 'Crestview Law Chambers — London Chancery',
    category: 'Legal Services',
    country: 'United Kingdom',
    location_address: '14 Chancery Lane, London, UK',
    website_url: 'https://crestviewlaw.example.co.uk',
    gbp_url: 'https://maps.google.com/?cid=2001',
    notes: 'Commercial litigation & corporate law practice.',
    created_at: new Date(Date.now() - 86400000 * 12).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'biz-4',
    customer_id: 'demo-cust-3',
    business_name: 'Horizon Beach Resort & Residences',
    category: 'Hospitality / Resort',
    country: 'United Arab Emirates',
    location_address: 'Jumeirah Beach Road, Dubai, UAE',
    website_url: 'https://horizonresorts.example.ae',
    gbp_url: 'https://maps.google.com/?cid=3001',
    notes: '5-star beachfront luxury property listing.',
    created_at: new Date(Date.now() - 86400000 * 20).toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const getMockCustomers = (): Customer[] => {
  if (typeof window === 'undefined') return INITIAL_DEMO_CUSTOMERS
  const cached = localStorage.getItem('riserepute_customers_cache')
  if (cached) {
    try {
      const parsed = JSON.parse(cached)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    } catch {}
  }
  localStorage.setItem('riserepute_customers_cache', JSON.stringify(INITIAL_DEMO_CUSTOMERS))
  return INITIAL_DEMO_CUSTOMERS
}

export const saveMockCustomers = (customers: Customer[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('riserepute_customers_cache', JSON.stringify(customers))
  }
}

export const getMockBusinesses = (): Business[] => {
  if (typeof window === 'undefined') return INITIAL_DEMO_BUSINESSES
  const cached = localStorage.getItem('riserepute_businesses_cache')
  if (cached) {
    try {
      const parsed = JSON.parse(cached)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    } catch {}
  }
  localStorage.setItem('riserepute_businesses_cache', JSON.stringify(INITIAL_DEMO_BUSINESSES))
  return INITIAL_DEMO_BUSINESSES
}

export const saveMockBusinesses = (businesses: Business[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('riserepute_businesses_cache', JSON.stringify(businesses))
  }
}

/**
 * Deduplicates customers by normalized email so that each client entity
 * is represented exactly once in the system.
 */
export const deduplicateCustomers = (rawCustomers: Customer[]): Customer[] => {
  const map = new Map<string, Customer>()
  for (const c of rawCustomers) {
    const key = (c.email || c.id).trim().toLowerCase()
    if (!map.has(key)) {
      map.set(key, c)
    } else {
      const existing = map.get(key)!
      map.set(key, {
        ...existing,
        phone: existing.phone || c.phone,
        company_name: existing.company_name || c.company_name,
        country: existing.country || c.country,
        address: existing.address || c.address,
        notes: [existing.notes, c.notes].filter(Boolean).join(' | '),
      })
    }
  }
  return Array.from(map.values())
}

export const customerService = {
  async getCustomers(): Promise<Customer[]> {
    if (!isSupabaseConfigured()) {
      return deduplicateCustomers(getMockCustomers())
    }

    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !data || data.length === 0) {
      return deduplicateCustomers(getMockCustomers())
    }
    return deduplicateCustomers(data as Customer[])
  },

  async getCustomerById(id: string): Promise<Customer | null> {
    const all = await customerService.getCustomers()
    return all.find((c) => c.id === id) || null
  },

  async getCustomerByEmail(email: string): Promise<Customer | null> {
    if (!email) return null
    const clean = email.trim().toLowerCase()
    const all = await customerService.getCustomers()
    return all.find((c) => c.email?.trim().toLowerCase() === clean) || null
  },

  async createCustomer(customerData: Omit<Customer, 'id' | 'created_at' | 'updated_at'>): Promise<Customer | null> {
    const cleanEmail = customerData.email?.trim().toLowerCase()

    // 1. Deduplication / Upsert check: Does customer already exist?
    if (cleanEmail) {
      const existing = await customerService.getCustomerByEmail(cleanEmail)
      if (existing) {
        // Customer already exists! Merge new contact info if missing and return existing profile
        const updates: Partial<Customer> = {}
        if (!existing.phone && customerData.phone) updates.phone = customerData.phone
        if (!existing.address && customerData.address) updates.address = customerData.address
        if (customerData.notes && !existing.notes?.includes(customerData.notes)) {
          updates.notes = existing.notes ? `${existing.notes} | ${customerData.notes}` : customerData.notes
        }
        if (Object.keys(updates).length > 0) {
          await customerService.updateCustomer(existing.id, updates)
          return { ...existing, ...updates }
        }
        return existing
      }
    }

    // 2. Fresh client profile creation
    const current = getMockCustomers()
    const newCust: Customer = {
      ...customerData,
      id: `cust-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    saveMockCustomers([newCust, ...current])

    if (!isSupabaseConfigured()) return newCust

    const { data, error } = await supabase
      .from('customers')
      .insert([customerData])
      .select()
      .single()

    if (error) {
      console.error('Error creating customer in database:', error)
      return newCust
    }
    return data as Customer
  },

  async updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer | null> {
    const current = getMockCustomers()
    const idx = current.findIndex((c) => c.id === id)
    if (idx !== -1) {
      current[idx] = { ...current[idx], ...updates, updated_at: new Date().toISOString() }
      saveMockCustomers(current)
    }

    if (!isSupabaseConfigured()) {
      return idx !== -1 ? current[idx] : null
    }

    const { data, error } = await supabase
      .from('customers')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating customer:', error)
      return idx !== -1 ? current[idx] : null
    }
    return data as Customer
  },

  async deleteCustomer(id: string): Promise<boolean> {
    const current = getMockCustomers()
    const updated = current.filter((c) => c.id !== id)
    saveMockCustomers(updated)

    if (!isSupabaseConfigured()) return true

    const { error } = await supabase.from('customers').delete().eq('id', id)
    if (error) {
      console.error('Error deleting customer:', error)
      return false
    }
    return true
  },

  async getAllBusinesses(): Promise<Business[]> {
    if (!isSupabaseConfigured()) return getMockBusinesses()

    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !data || data.length === 0) {
      return getMockBusinesses()
    }
    return data as Business[]
  },

  async getBusinessesByCustomerId(customerId: string): Promise<Business[]> {
    const all = await customerService.getAllBusinesses()
    return all.filter((b) => b.customer_id === customerId)
  },

  async createBusiness(businessData: Omit<Business, 'id' | 'created_at' | 'updated_at'>): Promise<Business | null> {
    const current = getMockBusinesses()
    const newBiz: Business = {
      ...businessData,
      id: `biz-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    saveMockBusinesses([newBiz, ...current])

    if (!isSupabaseConfigured()) return newBiz

    const { data, error } = await supabase
      .from('businesses')
      .insert([businessData])
      .select()
      .single()

    if (error) {
      console.error('Error creating business in database:', error)
      return newBiz
    }
    return data as Business
  },

  async deleteBusiness(id: string): Promise<boolean> {
    const current = getMockBusinesses()
    const updated = current.filter((b) => b.id !== id)
    saveMockBusinesses(updated)

    if (!isSupabaseConfigured()) return true

    const { error } = await supabase.from('businesses').delete().eq('id', id)
    if (error) {
      console.error('Error deleting business:', error)
      return false
    }
    return true
  },
}
