import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  Mail,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { usePageSEO } from '@/hooks/usePageSEO'

export const AdminForgotPasswordPage: React.FC = () => {
  usePageSEO()

  const { resetPassword } = useAdminAuth()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { error: resetErr } = await resetPassword(email)
      if (resetErr) {
        setError(resetErr.message || 'Failed to dispatch password recovery email.')
      } else {
        setSubmitted(true)
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to dispatch recovery request.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#07131B] text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative selection:bg-teal selection:text-white">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl bg-teal text-navy flex items-center justify-center font-bold shadow-lg shadow-teal/20">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl font-extrabold tracking-tight text-white">
                Rise<span className="text-teal">Repute</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-teal-light -mt-0.5">
                Password Recovery
              </span>
            </div>
          </Link>
        </div>

        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-white">
          Reset Master Password
        </h2>
        <p className="mt-1 text-center text-xs text-slate-400">
          We will send a secure recovery link to your registered administrative email.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-[#0D2434] border border-white/10 py-8 px-6 shadow-2xl rounded-2xl sm:px-10 space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">{error}</div>
            </div>
          )}

          {submitted ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-teal/10 text-teal flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Recovery Link Dispatched</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                If an account exists for <span className="text-teal font-mono">{email}</span>, you will receive an email shortly with instructions to reset your master password.
              </p>
              <div className="pt-2">
                <Link
                  to="/admin/login"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-teal hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Admin Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-2.5 bg-[#07131B] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-lg shadow-teal/20 text-sm font-bold text-navy bg-teal hover:bg-teal-light focus:outline-none transition-all disabled:opacity-50"
                >
                  {loading ? 'Dispatching Link...' : 'Send Recovery Link'}
                </button>
              </div>

              <div className="pt-2 border-t border-white/10 text-center">
                <Link
                  to="/admin/login"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-teal" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminForgotPasswordPage
