import React from 'react'
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react'

export interface FormStatusAlertProps {
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  onClose?: () => void
  className?: string
}

export const FormStatusAlert: React.FC<FormStatusAlertProps> = ({
  type,
  title,
  message,
  onClose,
  className = '',
}) => {
  const config = {
    success: {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600',
    },
    error: {
      bg: 'bg-rose-50 border-rose-200 text-rose-900',
      icon: AlertCircle,
      iconColor: 'text-rose-600',
    },
    warning: {
      bg: 'bg-amber-50 border-amber-200 text-amber-900',
      icon: AlertTriangle,
      iconColor: 'text-amber-600',
    },
    info: {
      bg: 'bg-sky-50 border-sky-200 text-sky-900',
      icon: Info,
      iconColor: 'text-ocean',
    },
  }[type]

  const IconComponent = config.icon

  return (
    <div
      role="alert"
      className={`rounded-2xl border p-4.5 flex items-start gap-3.5 ${config.bg} ${className}`}
    >
      <IconComponent className={`w-5 h-5 shrink-0 mt-0.5 ${config.iconColor}`} />
      <div className="flex-1 space-y-1">
        {title && <h4 className="text-sm font-bold leading-tight">{title}</h4>}
        <p className="text-xs sm:text-sm leading-relaxed opacity-90">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          type="button"
          aria-label="Close notification"
          className="p-1 rounded-lg opacity-60 hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

