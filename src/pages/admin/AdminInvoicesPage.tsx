import React, { useEffect, useState } from 'react'
import {
  CreditCard,
  Plus,
  DollarSign,
  Printer,
  Trash2,
} from 'lucide-react'
import { invoiceService } from '@/services/invoiceService'
import { customerService } from '@/services/customerService'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { EmptyState } from '@/components/admin/EmptyState'
import { Modal } from '@/components/admin/Modal'
import { Button } from '@/components/common/Button'
import type { Invoice, Customer, PaymentMethod } from '@/types/database.types'

export const AdminInvoicesPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [isNewInvoiceModalOpen, setIsNewInvoiceModalOpen] = useState(false)
  const [isRecordPaymentModalOpen, setIsRecordPaymentModalOpen] = useState(false)

  // Invoice creation state
  const [newInvoice, setNewInvoice] = useState({
    invoice_number: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    customer_id: '',
    currency: 'USD',
    tax_rate: 0,
    issue_date: new Date().toISOString().split('T')[0],
    due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: 'Quote-based policy evaluation & reporting assistance services.',
  })

  const [lineItems, setLineItems] = useState([
    { description: 'Google Review Policy Audit & Dossier Preparation', quantity: 1, unit_price: 350, total: 350 },
  ])

  // Payment recording state
  const [newPayment, setNewPayment] = useState({
    amount: 0,
    payment_date: new Date().toISOString().split('T')[0],
    payment_method: 'bank_transfer' as PaymentMethod,
    transaction_reference: '',
    notes: '',
  })

  const loadData = async () => {
    const [invs, custs] = await Promise.all([
      invoiceService.getInvoices(),
      customerService.getCustomers(),
    ])
    setInvoices(invs)
    setCustomers(custs)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleAddItem = () => {
    setLineItems([...lineItems, { description: '', quantity: 1, unit_price: 0, total: 0 }])
  }

  const handleRemoveItem = (index: number) => {
    setLineItems(lineItems.filter((_, i) => i !== index))
  }

  const handleItemChange = (index: number, field: string, val: any) => {
    const updated = [...lineItems]
    const item = { ...updated[index], [field]: val }
    if (field === 'quantity' || field === 'unit_price') {
      item.total = Number(item.quantity) * Number(item.unit_price)
    }
    updated[index] = item
    setLineItems(updated)
  }

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newInvoice.customer_id) {
      alert('Please select an active customer.')
      return
    }

    const created = await invoiceService.createInvoice(
      {
        ...newInvoice,
        status: 'sent',
      },
      lineItems
    )

    if (created) {
      setIsNewInvoiceModalOpen(false)
      loadData()
    }
  }

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedInvoice) return

    await invoiceService.recordPayment({
      invoice_id: selectedInvoice.id,
      customer_id: selectedInvoice.customer_id,
      amount: Number(newPayment.amount),
      payment_date: newPayment.payment_date,
      payment_method: newPayment.payment_method,
      transaction_reference: newPayment.transaction_reference,
      notes: newPayment.notes,
    })

    setIsRecordPaymentModalOpen(false)
    loadData()
    // Refresh selected invoice view
    const refreshed = await invoiceService.getInvoiceById(selectedInvoice.id)
    setSelectedInvoice(refreshed)
  }

  const totalCollected = invoices.reduce((acc, inv) => acc + Number(inv.paid_amount || 0), 0)
  const totalOutstanding = invoices.reduce((acc, inv) => {
    if (inv.status !== 'cancelled' && inv.status !== 'paid') {
      return acc + (Number(inv.total_amount) - Number(inv.paid_amount || 0))
    }
    return acc
  }, 0)

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-teal" />
            <span>Invoices & Payments</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Quote-based invoices, manual transaction recording, and payment balances.
          </p>
        </div>

        <Button
          variant="teal"
          size="sm"
          onClick={() => setIsNewInvoiceModalOpen(true)}
          className="text-xs font-bold flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Generate Quote / Invoice</span>
        </Button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-[#0A1A24] border border-white/10 space-y-1">
          <span className="text-xs text-slate-400">Total Actual Revenue Recorded</span>
          <p className="text-2xl font-bold text-teal">${totalCollected.toLocaleString()}</p>
          <p className="text-[11px] text-slate-500">Based strictly on confirmed manual payments</p>
        </div>
        <div className="p-5 rounded-2xl bg-[#0A1A24] border border-white/10 space-y-1">
          <span className="text-xs text-slate-400">Outstanding Invoiced Balance</span>
          <p className="text-2xl font-bold text-amber-400">${totalOutstanding.toLocaleString()}</p>
          <p className="text-[11px] text-slate-500">Unpaid or partially paid client balances</p>
        </div>
      </div>

      {/* Invoice List Table */}
      {invoices.length === 0 ? (
        <EmptyState
          icon={CreditCard}
          title="No Invoices Issued Yet"
          description="Create custom quotation invoices for client review cases. Invoices remain quotation-based without fixed pricing gimmicks."
          actionLabel="Create Invoice"
          onAction={() => setIsNewInvoiceModalOpen(true)}
        />
      ) : (
        <div className="rounded-2xl bg-[#0A1A24] border border-white/10 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider font-semibold bg-white/5">
                  <th className="py-3.5 px-4">Invoice #</th>
                  <th className="py-3.5 px-4">Issue Date</th>
                  <th className="py-3.5 px-4">Due Date</th>
                  <th className="py-3.5 px-4">Total Amount</th>
                  <th className="py-3.5 px-4">Paid Amount</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-white">{inv.invoice_number}</td>
                    <td className="py-3 px-4 text-slate-400">{inv.issue_date}</td>
                    <td className="py-3 px-4 text-slate-400">{inv.due_date}</td>
                    <td className="py-3 px-4 font-bold text-white">
                      {inv.currency} ${Number(inv.total_amount).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-semibold text-teal">
                      {inv.currency} ${Number(inv.paid_amount || 0).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={inv.status} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="px-3 py-1.5 rounded-lg bg-teal/15 text-teal hover:bg-teal/25 font-semibold text-xs transition-colors"
                      >
                        View & Record Payment
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Invoice Detail & Payment Modal */}
      {selectedInvoice && (
        <Modal
          isOpen={Boolean(selectedInvoice)}
          onClose={() => setSelectedInvoice(null)}
          title={`Invoice ${selectedInvoice.invoice_number}`}
          subtitle={`Issued on ${selectedInvoice.issue_date} • Due on ${selectedInvoice.due_date}`}
          maxWidth="2xl"
        >
          <div className="space-y-6 text-xs">
            {/* Header / Summary Box */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Payment Balance
                </span>
                <p className="text-2xl font-bold text-white mt-0.5">
                  {selectedInvoice.currency} ${(Number(selectedInvoice.total_amount) - Number(selectedInvoice.paid_amount || 0)).toLocaleString()}{' '}
                  <span className="text-xs font-normal text-slate-400">Remaining</span>
                </p>
                <div className="mt-1">
                  <StatusBadge status={selectedInvoice.status} />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="teal"
                  size="sm"
                  onClick={() => {
                    setNewPayment({
                      amount: Number(selectedInvoice.total_amount) - Number(selectedInvoice.paid_amount || 0),
                      payment_date: new Date().toISOString().split('T')[0],
                      payment_method: 'bank_transfer',
                      transaction_reference: '',
                      notes: '',
                    })
                    setIsRecordPaymentModalOpen(true)
                  }}
                  className="text-xs"
                >
                  <DollarSign className="w-3.5 h-3.5 mr-1" />
                  <span>Record Payment</span>
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => window.print()}
                  className="text-xs flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </Button>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">Invoice Items</h4>
              <div className="rounded-xl border border-white/10 bg-black/20 overflow-hidden">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400 bg-white/5">
                      <th className="py-2.5 px-3">Description</th>
                      <th className="py-2.5 px-3 text-center">Qty</th>
                      <th className="py-2.5 px-3 text-right">Price</th>
                      <th className="py-2.5 px-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {selectedInvoice.items?.map((item) => (
                      <tr key={item.id}>
                        <td className="py-2.5 px-3 font-medium text-white">{item.description}</td>
                        <td className="py-2.5 px-3 text-center">{item.quantity}</td>
                        <td className="py-2.5 px-3 text-right">${Number(item.unit_price).toLocaleString()}</td>
                        <td className="py-2.5 px-3 text-right font-bold text-teal">${Number(item.total).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recorded Payments History */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">Recorded Payments</h4>
              {selectedInvoice.payments?.length === 0 ? (
                <p className="text-slate-500 text-[11px]">No payments recorded on this invoice yet.</p>
              ) : (
                <div className="space-y-2">
                  {selectedInvoice.payments?.map((pay) => (
                    <div
                      key={pay.id}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-emerald-400">
                          +${Number(pay.amount).toLocaleString()}
                        </span>
                        <span className="text-slate-400 text-[11px] ml-2">
                          via {pay.payment_method.replace(/_/g, ' ')}
                        </span>
                        {pay.transaction_reference && (
                          <span className="text-slate-500 font-mono text-[10px] ml-2">
                            Ref: {pay.transaction_reference}
                          </span>
                        )}
                      </div>
                      <span className="text-slate-400 font-mono text-[11px]">{pay.payment_date}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Record Payment Modal */}
      {isRecordPaymentModalOpen && selectedInvoice && (
        <Modal
          isOpen={isRecordPaymentModalOpen}
          onClose={() => setIsRecordPaymentModalOpen(false)}
          title="Record Received Payment"
          subtitle={`Applying funds to Invoice ${selectedInvoice.invoice_number}`}
          maxWidth="md"
        >
          <form onSubmit={handleRecordPayment} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-white">Payment Amount ({selectedInvoice.currency}) *</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                required
                value={newPayment.amount}
                onChange={(e) => setNewPayment({ ...newPayment, amount: parseFloat(e.target.value) || 0 })}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold focus:outline-none focus:ring-2 focus:ring-teal/40"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-white">Payment Date</label>
                <input
                  type="date"
                  required
                  value={newPayment.payment_date}
                  onChange={(e) => setNewPayment({ ...newPayment, payment_date: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-teal/40"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-white">Payment Method</label>
                <select
                  value={newPayment.payment_method}
                  onChange={(e) => setNewPayment({ ...newPayment, payment_method: e.target.value as PaymentMethod })}
                  className="w-full p-2.5 rounded-xl bg-[#0A1A24] border border-white/15 text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-teal/40 cursor-pointer shadow-inner"
                >
                  <option value="bank_transfer" className="bg-[#0A1A24] text-slate-100">Bank Wire / Transfer</option>
                  <option value="credit_card" className="bg-[#0A1A24] text-slate-100">Credit Card</option>
                  <option value="online" className="bg-[#0A1A24] text-slate-100">Online Payment</option>
                  <option value="cash" className="bg-[#0A1A24] text-slate-100">Cash / Direct</option>
                  <option value="other" className="bg-[#0A1A24] text-slate-100">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-white">Transaction Reference / Receipt #</label>
              <input
                type="text"
                placeholder="e.g. WIRE-884210"
                value={newPayment.transaction_reference}
                onChange={(e) => setNewPayment({ ...newPayment, transaction_reference: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-teal/40"
              />
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setIsRecordPaymentModalOpen(false)}>
                <span>Cancel</span>
              </Button>
              <Button variant="teal" size="sm" type="submit">
                <span>Save Payment Record</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Create Quote/Invoice Modal */}
      {isNewInvoiceModalOpen && (
        <Modal
          isOpen={isNewInvoiceModalOpen}
          onClose={() => setIsNewInvoiceModalOpen(false)}
          title="Generate Quote / Invoice"
          subtitle="Quote-based pricing tailored to client review case"
          maxWidth="xl"
        >
          <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-white">Invoice Number</label>
                <input
                  type="text"
                  readOnly
                  value={newInvoice.invoice_number}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-teal font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-white">Select Customer *</label>
                <select
                  required
                  value={newInvoice.customer_id}
                  onChange={(e) => setNewInvoice({ ...newInvoice, customer_id: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#0A1A24] border border-white/15 text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-teal/40 cursor-pointer shadow-inner"
                >
                  <option value="" className="bg-[#0A1A24] text-slate-100">Select a client</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id} className="bg-[#0A1A24] text-slate-100">
                      {c.company_name} ({c.full_name})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Line Items Section */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <label className="font-bold text-white uppercase tracking-wider text-[11px]">
                  Services & Deliverables
                </label>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="text-teal font-semibold text-xs hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Line Item</span>
                </button>
              </div>

              {lineItems.map((item, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-6">
                    <input
                      type="text"
                      required
                      placeholder="Service description"
                      value={item.description}
                      onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                      className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      min="1"
                      required
                      value={item.quantity}
                      onChange={(e) => handleItemChange(idx, 'quantity', parseFloat(e.target.value) || 1)}
                      className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-white text-center"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      value={item.unit_price}
                      onChange={(e) => handleItemChange(idx, 'unit_price', parseFloat(e.target.value) || 0)}
                      className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                  <div className="col-span-1 text-center">
                    {lineItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="text-slate-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setIsNewInvoiceModalOpen(false)}>
                <span>Cancel</span>
              </Button>
              <Button variant="teal" size="sm" type="submit">
                <span>Issue Invoice</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default AdminInvoicesPage

