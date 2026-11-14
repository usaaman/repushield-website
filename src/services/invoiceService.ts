import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import type { Invoice, InvoiceItem, Payment, InvoiceStatus, PaymentMethod } from '@/types/database.types'

export const invoiceService = {
  async getInvoices(): Promise<Invoice[]> {
    if (!isSupabaseConfigured()) return []

    const { data, error } = await supabase
      .from('invoices')
      .select('*, items:invoice_items(*), payments(*)')
      .order('issue_date', { ascending: false })

    if (error) {
      console.error('Error fetching invoices:', error)
      return []
    }
    return (data as Invoice[]) || []
  },

  async getInvoiceById(id: string): Promise<Invoice | null> {
    if (!isSupabaseConfigured()) return null

    const { data, error } = await supabase
      .from('invoices')
      .select('*, items:invoice_items(*), payments(*)')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching invoice by id:', error)
      return null
    }
    return data as Invoice
  },

  async createInvoice(
    invoiceData: Omit<
      Invoice,
      'id' | 'created_at' | 'updated_at' | 'items' | 'payments' | 'paid_amount' | 'subtotal' | 'tax_amount' | 'total_amount'
    >,
    items: Omit<InvoiceItem, 'id' | 'invoice_id' | 'created_at'>[]
  ): Promise<Invoice | null> {
    if (!isSupabaseConfigured()) return null

    // 1. Calculate subtotal & total
    const subtotal = items.reduce((acc, item) => acc + item.total, 0)
    const taxAmount = (subtotal * invoiceData.tax_rate) / 100
    const totalAmount = subtotal + taxAmount

    // 2. Insert invoice
    const { data: inv, error: invError } = await supabase
      .from('invoices')
      .insert([
        {
          ...invoiceData,
          subtotal,
          tax_amount: taxAmount,
          total_amount: totalAmount,
          paid_amount: 0,
        },
      ])
      .select()
      .single()

    if (invError || !inv) {
      console.error('Error creating invoice header:', invError)
      throw invError
    }

    // 3. Insert items
    if (items.length > 0) {
      const itemsToInsert = items.map((item) => ({
        ...item,
        invoice_id: inv.id,
      }))
      const { error: itemsError } = await supabase.from('invoice_items').insert(itemsToInsert)
      if (itemsError) {
        console.error('Error creating invoice line items:', itemsError)
      }
    }

    return inv as Invoice
  },

  async recordPayment(paymentData: {
    invoice_id: string
    customer_id: string
    amount: number
    payment_date: string
    payment_method: PaymentMethod
    transaction_reference?: string
    notes?: string
  }): Promise<Payment | null> {
    if (!isSupabaseConfigured()) return null

    // 1. Insert payment record
    const { data: payment, error: payError } = await supabase
      .from('payments')
      .insert([paymentData])
      .select()
      .single()

    if (payError || !payment) {
      console.error('Error recording payment:', payError)
      throw payError
    }

    // 2. Update invoice paid_amount and status
    const invoice = await this.getInvoiceById(paymentData.invoice_id)
    if (invoice) {
      const newPaidAmount = Number(invoice.paid_amount || 0) + Number(paymentData.amount)
      let newStatus: InvoiceStatus = invoice.status
      if (newPaidAmount >= Number(invoice.total_amount)) {
        newStatus = 'paid'
      } else if (newPaidAmount > 0) {
        newStatus = 'partially_paid'
      }

      await supabase
        .from('invoices')
        .update({
          paid_amount: newPaidAmount,
          status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq('id', invoice.id)
    }

    return payment as Payment
  },

  async getPayments(): Promise<Payment[]> {
    if (!isSupabaseConfigured()) return []

    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .order('payment_date', { ascending: false })

    if (error) {
      console.error('Error fetching payments:', error)
      return []
    }
    return (data as Payment[]) || []
  },
}

