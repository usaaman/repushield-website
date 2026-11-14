import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import type { Customer, Business } from '@/types/database.types'

export const customerService = {
  async getCustomers(): Promise<Customer[]> {
    if (!isSupabaseConfigured()) return []

    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching customers:', error)
      return []
    }
    return (data as Customer[]) || []
  },

  async getCustomerById(id: string): Promise<Customer | null> {
    if (!isSupabaseConfigured()) return null

    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching customer by id:', error)
      return null
    }
    return data as Customer
  },

  async createCustomer(customerData: Omit<Customer, 'id' | 'created_at' | 'updated_at'>): Promise<Customer | null> {
    if (!isSupabaseConfigured()) return null

    const { data, error } = await supabase
      .from('customers')
      .insert([customerData])
      .select()
      .single()

    if (error) {
      console.error('Error creating customer:', error)
      throw error
    }
    return data as Customer
  },

  async updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer | null> {
    if (!isSupabaseConfigured()) return null

    const { data, error } = await supabase
      .from('customers')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating customer:', error)
      throw error
    }
    return data as Customer
  },

  async getBusinessesByCustomerId(customerId: string): Promise<Business[]> {
    if (!isSupabaseConfigured()) return []

    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching businesses for customer:', error)
      return []
    }
    return (data as Business[]) || []
  },

  async createBusiness(businessData: Omit<Business, 'id' | 'created_at' | 'updated_at'>): Promise<Business | null> {
    if (!isSupabaseConfigured()) return null

    const { data, error } = await supabase
      .from('businesses')
      .insert([businessData])
      .select()
      .single()

    if (error) {
      console.error('Error creating business:', error)
      throw error
    }
    return data as Business
  },
}

