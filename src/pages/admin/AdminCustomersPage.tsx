import React, { useEffect, useState } from 'react'
import {
  Users,
  Search,
  Plus,
  ExternalLink,
} from 'lucide-react'
import { customerService } from '@/services/customerService'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { EmptyState } from '@/components/admin/EmptyState'
import { Modal } from '@/components/admin/Modal'
import { Button } from '@/components/common/Button'
import type { Customer, Business } from '@/types/database.types'

export const AdminCustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [search, setSearch] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [customerBusinesses, setCustomerBusinesses] = useState<Business[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isAddBusinessModalOpen, setIsAddBusinessModalOpen] = useState(false)

  // Form states
  const [newCustomer, setNewCustomer] = useState({
    full_name: '',
    company_name: '',
    email: '',
    phone: '',
    country: 'United States',
    address: '',
    notes: '',
  })

  const [newBusiness, setNewBusiness] = useState({
    business_name: '',
    category: '',
    country: 'United States',
    location_address: '',
    website_url: '',
    gbp_url: '',
    notes: '',
  })

  const loadCustomers = async () => {
    const data = await customerService.getCustomers()
    setCustomers(data)
  }

  useEffect(() => {
    loadCustomers()
  }, [])

  const handleSelectCustomer = async (cust: Customer) => {
    setSelectedCustomer(cust)
    const businesses = await customerService.getBusinessesByCustomerId(cust.id)
    setCustomerBusinesses(businesses)
  }

  const handleCreateCustomer = async (e: React.FormEvent) => {
    e.preventDefault()
    const created = await customerService.createCustomer({
      ...newCustomer,
      status: 'active',
    })
    if (created) {
      setIsAddModalOpen(false)
      setNewCustomer({
        full_name: '',
        company_name: '',
        email: '',
        phone: '',
        country: 'United States',
        address: '',
        notes: '',
      })
      loadCustomers()
    }
  }

  const handleCreateBusiness = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCustomer) return
    const created = await customerService.createBusiness({
      ...newBusiness,
      customer_id: selectedCustomer.id,
    })
    if (created) {
      setIsAddBusinessModalOpen(false)
      setNewBusiness({
        business_name: '',
        category: '',
        country: selectedCustomer.country || 'United States',
        location_address: '',
        website_url: '',
        gbp_url: '',
        notes: '',
      })
      const businesses = await customerService.getBusinessesByCustomerId(selectedCustomer.id)
      setCustomerBusinesses(businesses)
    }
  }

  const filtered = customers.filter(
    (c) =>
      c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      c.company_name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.country?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-teal" />
            <span>Customers Directory</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Active clients, associated business profiles, and engagement records.
          </p>
        </div>

        <Button
          variant="teal"
          size="sm"
          onClick={() => setIsAddModalOpen(true)}
          className="text-xs font-bold flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Customer</span>
        </Button>
      </div>

      {/* Search Toolbar */}
      <div className="p-4 rounded-2xl bg-[#0A1A24] border border-white/10 flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search customers by name, company, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal/40"
          />
        </div>
      </div>

      {/* Customer List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No Customers Registered Yet"
          description="Convert leads into customers or register a new client profile directly using the button above."
          actionLabel="Add Customer"
          onAction={() => setIsAddModalOpen(true)}
        />
      ) : (
        <div className="rounded-2xl bg-[#0A1A24] border border-white/10 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider font-semibold bg-white/5">
                  <th className="py-3.5 px-4">Client Name</th>
                  <th className="py-3.5 px-4">Company</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Country</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((cust) => (
                  <tr key={cust.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 font-bold text-white">{cust.full_name}</td>
                    <td className="py-3 px-4 text-teal">{cust.company_name}</td>
                    <td className="py-3 px-4">
                      <div>{cust.email}</div>
                      {cust.phone && <div className="text-[10px] text-slate-400">{cust.phone}</div>}
                    </td>
                    <td className="py-3 px-4">{cust.country || 'N/A'}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={cust.status} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleSelectCustomer(cust)}
                        className="px-3 py-1.5 rounded-lg bg-teal/15 text-teal hover:bg-teal/25 font-semibold text-xs transition-colors"
                      >
                        Manage Businesses
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Customer Detail & Businesses Modal */}
      {selectedCustomer && (
        <Modal
          isOpen={Boolean(selectedCustomer)}
          onClose={() => setSelectedCustomer(null)}
          title={`Client Profile: ${selectedCustomer.full_name}`}
          subtitle={`Company: ${selectedCustomer.company_name} • Location: ${selectedCustomer.country || 'N/A'}`}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            {/* Customer Details Box */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-400">Email</span>
                <p className="font-semibold text-white mt-0.5">{selectedCustomer.email}</p>
              </div>
              <div>
                <span className="text-slate-400">Phone / WhatsApp</span>
                <p className="font-semibold text-white mt-0.5">{selectedCustomer.phone || 'None'}</p>
              </div>
              <div>
                <span className="text-slate-400">Status</span>
                <div className="mt-0.5">
                  <StatusBadge status={selectedCustomer.status} />
                </div>
              </div>
            </div>

            {/* Associated Businesses (1 Customer -> Multiple Businesses) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Associated Business Listings</h4>
                  <p className="text-[11px] text-slate-400">
                    A customer can manage multiple clinic branches, restaurants, or company profiles.
                  </p>
                </div>
                <Button
                  variant="teal"
                  size="sm"
                  onClick={() => setIsAddBusinessModalOpen(true)}
                  className="text-xs"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  <span>Add Business</span>
                </Button>
              </div>

              {customerBusinesses.length === 0 ? (
                <div className="p-6 rounded-xl border border-white/10 bg-white/5 text-center text-xs text-slate-400">
                  No business listings registered for this customer yet. Click "Add Business" above.
                </div>
              ) : (
                <div className="space-y-2">
                  {customerBusinesses.map((biz) => (
                    <div
                      key={biz.id}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <p className="font-bold text-white text-sm">{biz.business_name}</p>
                        <p className="text-slate-400">
                          {biz.category || 'General'} • {biz.country || 'USA'}
                        </p>
                        {biz.location_address && (
                          <p className="text-slate-500 text-[11px]">{biz.location_address}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {biz.gbp_url && (
                          <a
                            href={biz.gbp_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-teal text-[11px] font-semibold flex items-center gap-1"
                          >
                            <span>Google Maps</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {biz.website_url && (
                          <a
                            href={biz.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-[11px] font-semibold flex items-center gap-1"
                          >
                            <span>Website</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Register New Customer"
          subtitle="Add an active customer to RiseRepute BMS"
          maxWidth="lg"
        >
          <form onSubmit={handleCreateCustomer} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-white">Full Contact Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={newCustomer.full_name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, full_name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-teal/40"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-white">Company / Business Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Health Clinic"
                  value={newCustomer.company_name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, company_name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-teal/40"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-white">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="client@email.com"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-teal/40"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-white">Phone / WhatsApp</label>
                <input
                  type="text"
                  placeholder="+1 (555) 000-0000"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-teal/40"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-white">Country</label>
              <select
                value={newCustomer.country}
                onChange={(e) => setNewCustomer({ ...newCustomer, country: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#0A1A24] border border-white/15 text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-teal/40 cursor-pointer shadow-inner"
              >
                <option value="United States" className="bg-[#0A1A24] text-slate-100">United States</option>
                <option value="Canada" className="bg-[#0A1A24] text-slate-100">Canada</option>
                <option value="Pakistan" className="bg-[#0A1A24] text-slate-100">Pakistan</option>
                <option value="United Kingdom" className="bg-[#0A1A24] text-slate-100">United Kingdom</option>
                <option value="Australia" className="bg-[#0A1A24] text-slate-100">Australia</option>
                <option value="United Arab Emirates" className="bg-[#0A1A24] text-slate-100">United Arab Emirates</option>
                <option value="Other" className="bg-[#0A1A24] text-slate-100">Other</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-white">Notes</label>
              <textarea
                rows={2}
                placeholder="Initial onboarding notes, billing terms..."
                value={newCustomer.notes}
                onChange={(e) => setNewCustomer({ ...newCustomer, notes: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-teal/40"
              />
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setIsAddModalOpen(false)}>
                <span>Cancel</span>
              </Button>
              <Button variant="teal" size="sm" type="submit">
                <span>Save Customer</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add Business Modal */}
      {isAddBusinessModalOpen && selectedCustomer && (
        <Modal
          isOpen={isAddBusinessModalOpen}
          onClose={() => setIsAddBusinessModalOpen(false)}
          title={`Add Business for ${selectedCustomer.company_name}`}
          subtitle="Link a new physical location or profile"
          maxWidth="lg"
        >
          <form onSubmit={handleCreateBusiness} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-white">Business Location Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Health - Downtown Branch"
                  value={newBusiness.business_name}
                  onChange={(e) => setNewBusiness({ ...newBusiness, business_name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-teal/40"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-white">Category</label>
                <input
                  type="text"
                  placeholder="e.g. Medical Clinic, Restaurant"
                  value={newBusiness.category}
                  onChange={(e) => setNewBusiness({ ...newBusiness, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-teal/40"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-white">Google Business Profile / Maps URL</label>
              <input
                type="url"
                placeholder="https://maps.google.com/..."
                value={newBusiness.gbp_url}
                onChange={(e) => setNewBusiness({ ...newBusiness, gbp_url: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-teal/40"
              />
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setIsAddBusinessModalOpen(false)}>
                <span>Cancel</span>
              </Button>
              <Button variant="teal" size="sm" type="submit">
                <span>Save Business Listing</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default AdminCustomersPage

