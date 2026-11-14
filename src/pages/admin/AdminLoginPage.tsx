import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
  KeyRound,
  Info,
} from 'lucide-react'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { usePageSEO } from '@/hooks/usePageSEO'

export const AdminLoginPage: React.FC = () => {
  usePageSEO()

  const { signIn, isConfigured } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as any)?.from?.pathname || '/admin'

  const [email, setEmail] = useState('musmannazir97@gmail.com')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { error: authError } = await signIn(email, password)
      if (authError) {
        setError(authError.message || 'Invalid administrative credentials. Please verify your email and password.')
      } else {
        navigate(from, { replace: true })
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication failed. Please check network connectivity.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#07131B] text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative selection:bg-teal selection:text-white">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Brand Logo */}
        <div className="flex justify-center">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl bg-teal text-navy flex items-center justify-center font-bold shadow-lg shadow-teal/20">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl font-extrabold tracking-tight text-white">
                Repu<span className="text-teal">Shield</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-teal-light -mt-0.5">
                Business Management System
              </span>
            </div>
          </Link>
        </div>

        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-white">
          Administrator Portal
        </h2>
        <p className="mt-1 text-center text-xs text-slate-400">
          Authorized personnel access only • Single Admin System
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-[#0D2434] border border-white/10 py-8 px-6 shadow-2xl rounded-2xl sm:px-10 space-y-6">
          {/* Checkpoint Banner when Supabase not configured */}
          {!isConfigured && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <KeyRound className="w-4 h-4 shrink-0" />
                <span>Database Checkpoint (Pending .env)</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-200/90">
                Supabase credentials have not yet been placed in <code className="font-mono bg-black/20 px-1 py-0.5 rounded">.env</code>. Once configured, your secure admin login will be authenticated directly by Supabase Auth.
              </p>
              <div className="pt-1">
                <Link
                  to="/admin"
                  className="text-teal hover:underline font-semibold text-[11px] inline-flex items-center gap-1"
                >
                  <span>Preview Admin Workspace Interface →</span>
                </Link>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">{error}</div>
            </div>
          )}

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
                  placeholder="admin@riserepute.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Master Password
                </label>
                <Link
                  to="/admin/forgot-password"
                  className="text-xs font-medium text-teal hover:text-teal-light transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-10 pr-10 py-2.5 bg-[#07131B] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal/50 transition-colors"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-lg shadow-teal/20 text-sm font-bold text-navy bg-teal hover:bg-teal-light focus:outline-none transition-all disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : 'Sign In to RiseRepute BMS'}
              </button>
            </div>
          </form>

          <div className="pt-2 border-t border-white/10 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-teal" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>

        {/* Security Info */}
        <div className="mt-6 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>Secured with PostgreSQL Row-Level Security (RLS) & JWT authentication</span>
        </div>
      </div>
    </div>
  )
}

export default AdminLoginPage
