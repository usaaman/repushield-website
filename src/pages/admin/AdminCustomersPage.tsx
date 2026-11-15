import React, { useEffect, useState } from 'react'
import {
  Users,
  Search,
  Plus,
  ExternalLink,
  Building,
  FileText,
  MapPin,
  Calendar,
} from 'lucide-react'
import { customerService } from '@/services/customerService'
import { leadService } from '@/services/leadService'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { EmptyState } from '@/components/admin/EmptyState'
import { Modal } from '@/components/admin/Modal'
import { Button } from '@/components/common/Button'
import { DeleteConfirmDropdown } from '@/components/admin/DeleteConfirmDropdown'
import type { Customer, Business, Lead } from '@/types/database.types'

export const AdminCustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [allBusinesses, setAllBusinesses] = useState<Business[]>([])
  const [allLeads, setAllLeads] = useState<Lead[]>([])
  const [search, setSearch] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [customerBusinesses, setCustomerBusinesses] = useState<Business[]>([])
  const [customerLeads, setCustomerLeads] = useState<Lead[]>([])
  const [activeTab, setActiveTab] = useState<'businesses' | 'inquiries'>('businesses')
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

  const loadData = async () => {
    const [custs, bizs, leads] = await Promise.all([
      customerService.getCustomers(),
      customerService.getAllBusinesses(),
      leadService.getLeads(),
    ])
    setCustomers(custs)
    setAllBusinesses(bizs)
    setAllLeads(leads)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleSelectCustomer = async (cust: Customer) => {
    setSelectedCustomer(cust)
    setActiveTab('businesses')
    const [businesses, leads] = await Promise.all([
      customerService.getBusinessesByCustomerId(cust.id),
      leadService.getLeads(),
    ])
    setCustomerBusinesses(businesses)
    const linkedLeads = leads.filter(
      (l) =>
        l.converted_customer_id === cust.id ||
        (l.email && cust.email && l.email.trim().toLowerCase() === cust.email.trim().toLowerCase())
    )
    setCustomerLeads(linkedLeads)
  }

  const handleDeleteCustomer = async (id: string) => {
    await customerService.deleteCustomer(id)
    if (selectedCustomer?.id === id) setSelectedCustomer(null)
    loadData()
  }

  const handleDeleteBusiness = async (bizId: string) => {
    await customerService.deleteBusiness(bizId)
    if (selectedCustomer) {
      const updated = await customerService.getBusinessesByCustomerId(selectedCustomer.id)
      setCustomerBusinesses(updated)
    }
    loadData()
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
      loadData()
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
      loadData()
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
            <span>Customer Accounts</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Consolidated client accounts, registered business listings, and lifetime inquiry history.
          </p>
        </div>

        <Button
          variant="teal"
          size="sm"
          onClick={() => setIsAddModalOpen(true)}
          className="text-xs font-bold flex items-center gap-1.5 cursor-pointer"
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

        <div className="text-xs text-slate-400 hidden sm:block">
          Total Unique Clients: <span className="font-bold text-white">{customers.length}</span>
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
                  <th className="py-3.5 px-4">Client & Company</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Country</th>
                  <th className="py-3.5 px-4">Linked Assets & Inquiries</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((cust) => {
                  const bizCount = allBusinesses.filter((b) => b.customer_id === cust.id).length
                  const leadCount = allLeads.filter(
                    (l) =>
                      l.converted_customer_id === cust.id ||
                      (l.email && cust.email && l.email.trim().toLowerCase() === cust.email.trim().toLowerCase())
                  ).length

                  return (
                    <tr key={cust.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-white">{cust.full_name}</div>
                        <div className="text-[11px] text-teal font-medium">{cust.company_name}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-slate-300 font-mono text-[11px]">{cust.email}</div>
                        {cust.phone && <div className="text-[10px] text-slate-400">{cust.phone}</div>}
                      </td>
                      <td className="py-3 px-4">{cust.country || 'N/A'}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-teal/15 text-teal text-[10px] font-semibold border border-teal/20"
                            title={`${bizCount} physical or online business listings registered under this client.`}
                          >
                            <Building className="w-3 h-3" />
                            <span>
                              {bizCount} {bizCount === 1 ? 'Location' : 'Locations'}
                            </span>
                          </span>

                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-ocean/15 text-ocean-light text-[10px] font-semibold border border-ocean/20"
                            title={`${leadCount} distinct inquiries submitted by this client.`}
                          >
                            <FileText className="w-3 h-3" />
                            <span>
                              {leadCount} {leadCount === 1 ? 'Inquiry' : 'Inquiries'}
                            </span>
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={cust.status} />
                      </td>
                      <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => handleSelectCustomer(cust)}
                          className="px-3 py-1.5 rounded-lg bg-teal/15 text-teal hover:bg-teal/25 font-semibold text-xs transition-colors cursor-pointer"
                        >
                          View Dossier
                        </button>
                        <DeleteConfirmDropdown
                          onConfirm={() => handleDeleteCustomer(cust.id)}
                          title="Delete Customer Profile?"
                          description={`Permanently remove account for "${cust.full_name}". This cannot be undone.`}
                          buttonTitle="Delete Customer"
                          align="right"
                          direction="down"
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Customer 360° Dossier & Assets Modal */}
      {selectedCustomer && (
        <Modal
          isOpen={Boolean(selectedCustomer)}
          onClose={() => setSelectedCustomer(null)}
          title={`Client Dossier: ${selectedCustomer.full_name}`}
          subtitle={`Company: ${selectedCustomer.company_name} • Region: ${selectedCustomer.country || 'N/A'}`}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            {/* Customer Details Box */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-400">Email Address</span>
                <p className="font-semibold text-white mt-0.5">{selectedCustomer.email}</p>
              </div>
              <div>
                <span className="text-slate-400">Phone / WhatsApp</span>
                <p className="font-semibold text-white mt-0.5">{selectedCustomer.phone || 'None'}</p>
              </div>
              <div>
                <span className="text-slate-400">Account Status</span>
                <div className="mt-0.5">
                  <StatusBadge status={selectedCustomer.status} />
                </div>
              </div>
              {selectedCustomer.address && (
                <div className="col-span-2 sm:col-span-3 pt-2 border-t border-white/5">
                  <span className="text-slate-400">Official Operating Address</span>
                  <p className="text-slate-200 mt-0.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal shrink-0" />
                    <span>{selectedCustomer.address}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Navigation Tabs between Businesses and Inquiries */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-2">
              <button
                type="button"
                onClick={() => setActiveTab('businesses')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'businesses'
                    ? 'bg-teal text-navy font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Business Listings ({customerBusinesses.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('inquiries')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'inquiries'
                    ? 'bg-teal text-navy font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Inquiry History ({customerLeads.length})</span>
              </button>
            </div>

            {/* TAB 1: Associated Businesses */}
            {activeTab === 'businesses' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Registered Locations & Profiles
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Multi-location practices or subsidiary branches managed under this single account.
                    </p>
                  </div>
                  <Button
                    variant="teal"
                    size="sm"
                    onClick={() => setIsAddBusinessModalOpen(true)}
                    className="text-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    <span>Add Location</span>
                  </Button>
                </div>

                {customerBusinesses.length === 0 ? (
                  <div className="p-6 rounded-xl border border-white/10 bg-white/5 text-center text-xs text-slate-400">
                    No business locations registered for this client yet. Click "Add Location" above.
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
                          <DeleteConfirmDropdown
                            onConfirm={() => handleDeleteBusiness(biz.id)}
                            title="Delete Business Location?"
                            description={`Remove "${biz.business_name}" from this customer.`}
                            buttonTitle="Delete Location"
                            align="right"
                            direction="down"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Linked Inquiries */}
            {activeTab === 'inquiries' && (
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Client Inquiries & Case History
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    All website submissions and review policy evaluations initiated by this customer.
                  </p>
                </div>

                {customerLeads.length === 0 ? (
                  <div className="p-6 rounded-xl border border-white/10 bg-white/5 text-center text-xs text-slate-400">
                    No inquiries linked to this profile yet.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {customerLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">{lead.service_required || 'Review Assessment'}</span>
                            <span className="text-[10px] text-slate-400">via {lead.source}</span>
                          </div>
                          <StatusBadge status={lead.status} />
                        </div>

                        {lead.details && (
                          <p className="text-slate-300 text-[11px] leading-relaxed bg-black/20 p-2 rounded-lg">
                            "{lead.details}"
                          </p>
                        )}

                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-white/5">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-teal" />
                            <span>Submitted: {new Date(lead.created_at).toLocaleDateString()}</span>
                          </span>
                          <span className="text-teal font-semibold">Disputed: {lead.review_count || '1'} reviews</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Modal Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <DeleteConfirmDropdown
                onConfirm={async () => {
                  await handleDeleteCustomer(selectedCustomer.id)
                  setSelectedCustomer(null)
                }}
                title="Delete Customer Profile?"
                description={`Permanently remove "${selectedCustomer.full_name}". All associated locations will be cleared.`}
                buttonTitle="Delete Customer"
                align="left"
                direction="up"
                triggerClassName="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-colors cursor-pointer"
              />

              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedCustomer(null)}
                className="text-xs cursor-pointer"
              >
                <span>Close Dossier</span>
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Register New Customer Account"
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
              <label className="font-bold text-white">Physical Address (Optional)</label>
              <input
                type="text"
                placeholder="Suite, Street, City, State"
                value={newCustomer.address}
                onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-teal/40"
              />
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
              <Button variant="secondary" size="sm" onClick={() => setIsAddModalOpen(false)} className="cursor-pointer">
                <span>Cancel</span>
              </Button>
              <Button variant="teal" size="sm" type="submit" className="cursor-pointer">
                <span>Save Customer Account</span>
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
          title={`Add Business Location for ${selectedCustomer.company_name}`}
          subtitle="Link a new physical location or Google Business Profile"
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
              <Button variant="secondary" size="sm" onClick={() => setIsAddBusinessModalOpen(false)} className="cursor-pointer">
                <span>Cancel</span>
              </Button>
              <Button variant="teal" size="sm" type="submit" className="cursor-pointer">
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
