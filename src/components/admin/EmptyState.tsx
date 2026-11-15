import React from 'react'
import { FolderOpen } from 'lucide-react'
import { Button } from '@/components/common/Button'

interface EmptyStateProps {
  icon?: React.ElementType
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = FolderOpen,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/[0.045] backdrop-blur-xl p-10 text-center flex flex-col items-center justify-center space-y-4 shadow-xl shadow-black/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-teal/10 border border-teal/20 text-teal flex items-center justify-center shadow-inner shadow-teal/10">
        <Icon className="w-7 h-7" />
      </div>

      <div className="space-y-1 max-w-md">
        <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
      </div>

      {actionLabel && onAction && (
        <Button
          variant="teal"
          size="sm"
          onClick={onAction}
          className="text-xs font-semibold mt-2 active:scale-[0.97] transition-all duration-300 ease-out shadow-md shadow-teal/20 hover:shadow-teal/30"
        >
          <span>{actionLabel}</span>
        </Button>
      )}
    </div>
  )
}

