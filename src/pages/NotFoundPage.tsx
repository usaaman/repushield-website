import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/common/Button'

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-24 sm:py-32 flex items-center justify-center min-h-[70vh]">
      <Container size="sm">
        <div className="glass-card-public rounded-3xl p-8 sm:p-14 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-muted">Error 404</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
              Page Not Found
            </h1>
            <p className="text-secondary text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              The page you are looking for does not exist or may have been moved. Return to the homepage to explore RepuShield's policy-focused assistance.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <Button variant="primary" to="/">
              <Home className="w-4 h-4" />
              <span>Back to Homepage</span>
            </Button>
            <Button variant="secondary" to="/contact">
              <ArrowLeft className="w-4 h-4" />
              <span>Contact Support</span>
            </Button>
          </div>

          <div className="pt-6 border-t border-slate-100 text-xs text-muted">
            Looking for the admin demo? Go to{' '}
            <Link to="/admin" className="text-ocean font-medium hover:underline">
              /admin
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

