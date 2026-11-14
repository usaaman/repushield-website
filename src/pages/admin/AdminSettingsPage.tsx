import React, { useEffect, useState } from 'react'
import {
  Settings,
  Building2,
  Mail,
  Phone,
  DollarSign,
  Bell,
  Shield,
  KeyRound,
  Save,
  CheckCircle2,
  RefreshCw,
  Database,
} from 'lucide-react'
import { settingsService } from '@/services/settingsService'
import { useAdminAuth } from '@/context/AdminAuthContext'
import type { BusinessSettings } from '@/types/database.types'

export const AdminSettingsPage: React.FC = () => {
  const { user, isConfigured, resetPassword } = useAdminAuth()
  const [settings, setSettings] = useState<BusinessSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const [resetError, setResetError] = useState<string | null>(null)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setLoading(true)
    const data = await settingsService.getSettings()
    setSettings(data)
    setLoading(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!settings) return
    setSaving(true)
    setSaveSuccess(false)

    try {
      const updated = await settingsService.updateSettings(settings)
      setSettings(updated)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordReset = async () => {
    setResetError(null)
    setResetSent(false)
    const emailToReset = user?.email || settings?.contact_email || 'usamahameedahmadani@gmail.com'

    const { error } = await resetPassword(emailToReset)
    if (error) {
      setResetError(error.message || 'Failed to dispatch password reset email.')
    } else {
      setResetSent(true)
      setTimeout(() => setResetSent(false), 5000)
    }
  }

  if (loading || !settings) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
        <RefreshCw className="w-8 h-8 text-teal animate-spin" />
        <p className="text-sm text-slate-400">Loading business settings...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-teal" />
          <span>System & Business Settings</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage agency contact information, invoice currency defaults, notification rules, and admin authentication.
        </p>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-teal/10 border border-teal/30 text-teal-light text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-teal shrink-0" />
          <span>Settings saved successfully to RiseRepute business records.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Business Agency Profile */}
        <div className="bg-[#0D2434] border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-teal" />
                <span>Agency Business Profile</span>
              </h2>
              <p className="text-xs text-slate-400">Information presented on client invoices and public touchpoints</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Business / Brand Name
              </label>
              <input
                type="text"
                value={settings.business_name}
                onChange={(e) => setSettings({ ...settings, business_name: e.target.value })}
                className="w-full bg-[#07131B] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal/50"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Primary Contact Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={settings.contact_email}
                  onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                  className="w-full bg-[#07131B] border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal/50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Official WhatsApp Hotline
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={settings.whatsapp_number}
                  onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                  className="w-full bg-[#07131B] border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal/50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Default Invoicing Currency
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <select
                  value={settings.default_currency}
                  onChange={(e) => setSettings({ ...settings, default_currency: e.target.value })}
                  className="w-full bg-[#07131B] border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal/50 appearance-none"
                >
                  <option value="USD">USD ($) — United States Dollar</option>
                  <option value="CAD">CAD ($) — Canadian Dollar</option>
                  <option value="GBP">GBP (£) — British Pound</option>
                  <option value="EUR">EUR (€) — Euro</option>
                  <option value="PKR">PKR (Rs) — Pakistani Rupee</option>
                  <option value="AED">AED (AED) — UAE Dirham</option>
                </select>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Operating Regions & Address Summary
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full bg-[#07131B] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal/50"
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-[#0D2434] border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-teal" />
                <span>Internal Notification Triggers</span>
              </h2>
              <p className="text-xs text-slate-400">Configure real-time notifications for operational events</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#07131B] border border-white/5 cursor-pointer hover:border-white/10 transition-colors">
              <div>
                <p className="text-sm font-semibold text-white">New Lead Inquiries</p>
                <p className="text-xs text-slate-400">Receive alert when a prospective client submits a contact form</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notification_preferences.email_on_new_lead}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notification_preferences: {
                      ...settings.notification_preferences,
                      email_on_new_lead: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 text-teal rounded bg-white/10 border-white/20 focus:ring-0 focus:ring-offset-0"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#07131B] border border-white/5 cursor-pointer hover:border-white/10 transition-colors">
              <div>
                <p className="text-sm font-semibold text-white">Review Case Milestones</p>
                <p className="text-xs text-slate-400">Alert on Google appeal responses, evidence requirements, or removals</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notification_preferences.email_on_case_update}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notification_preferences: {
                      ...settings.notification_preferences,
                      email_on_case_update: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 text-teal rounded bg-white/10 border-white/20 focus:ring-0 focus:ring-offset-0"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#07131B] border border-white/5 cursor-pointer hover:border-white/10 transition-colors">
              <div>
                <p className="text-sm font-semibold text-white">Payment Collections</p>
                <p className="text-xs text-slate-400">Notify immediately when invoice payments are cleared</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notification_preferences.email_on_payment_received}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notification_preferences: {
                      ...settings.notification_preferences,
                      email_on_payment_received: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 text-teal rounded bg-white/10 border-white/20 focus:ring-0 focus:ring-offset-0"
              />
            </label>
          </div>
        </div>

        {/* Save Button Bar */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal text-navy font-bold text-sm hover:bg-teal-light transition-all shadow-md shadow-teal/20"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>

      {/* Admin Security & Password Management */}
      <div className="bg-[#0D2434] border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="border-b border-white/10 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-teal" />
              <span>Admin Authentication & Access</span>
            </h2>
            <p className="text-xs text-slate-400">Strict single-admin security enforcement</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal/10 text-teal border border-teal/20">
            Single Admin System
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Authorized Admin Accounts</p>
            <div className="space-y-1 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal shrink-0" />
                <span className="text-white font-semibold">{user?.email || 'musmannazir97@gmail.com'}</span>
                <span className="text-[10px] text-teal uppercase font-sans">(Active Admin)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-slate-500 shrink-0" />
                <span>usamahameedahmadani@gmail.com</span>
                <span className="text-[10px] text-slate-400 uppercase font-sans">(Authorized)</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              Only authorized administrator emails verified by PostgreSQL Row Level Security (RLS) can query, create, or modify BMS data and access evidence storage.
            </p>
          </div>

          <div className="bg-[#07131B] border border-white/10 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-white text-sm font-semibold">
              <KeyRound className="w-4 h-4 text-teal" />
              <span>Password Reset Request</span>
            </div>
            <p className="text-xs text-slate-400">
              Send a secure password recovery link to your administrative email address.
            </p>
            {resetSent && (
              <p className="text-xs text-teal font-medium">
                Password recovery email sent. Check your inbox.
              </p>
            )}
            {resetError && <p className="text-xs text-rose-400">{resetError}</p>}
            <button
              type="button"
              onClick={handlePasswordReset}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-medium border border-white/10 transition-colors"
            >
              Dispatch Password Reset Email
            </button>
          </div>
        </div>
      </div>

      {/* Database Connection Architecture Status */}
      <div className="bg-[#0D2434] border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-teal" />
            <span>PostgreSQL Database Architecture</span>
          </h2>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              isConfigured
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
            }`}
          >
            {isConfigured ? 'Connected to Supabase' : 'Awaiting Supabase .env'}
          </span>
        </div>

        <div className="text-xs text-slate-400 space-y-2">
          <p>
            The RiseRepute BMS is architected for PostgreSQL on Supabase with 15 normalized tables, foreign keys,
            and Row Level Security (RLS) policies.
          </p>
          <p>
            Schema migration file located at:{' '}
            <code className="text-teal font-mono bg-white/5 px-2 py-0.5 rounded">
              supabase/migrations/20261114_initial_schema.sql
            </code>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminSettingsPage
