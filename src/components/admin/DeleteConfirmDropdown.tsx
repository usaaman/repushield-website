import React, { useState, useRef, useEffect } from 'react'
import { Trash2, AlertTriangle, Loader2 } from 'lucide-react'

export interface DeleteConfirmDropdownProps {
  onConfirm: () => Promise<void> | void
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  buttonTitle?: string
  align?: 'right' | 'left'
  direction?: 'down' | 'up'
  className?: string
  triggerClassName?: string
}

/**
 * RiseRepute BMS Inline Delete Confirmation Dropdown
 * Replaces browser native window.confirm() ("localhost says...")
 * with an elegant, WCAG-accessible, dark-themed confirmation popover.
 */
export const DeleteConfirmDropdown: React.FC<DeleteConfirmDropdownProps> = ({
  onConfirm,
  title = 'Delete permanently?',
  description = 'This action cannot be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  buttonTitle = 'Delete',
  align = 'right',
  direction = 'down',
  className = '',
  triggerClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close on click outside or escape key
  useEffect(() => {
    if (!isOpen) return

    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleConfirm = async () => {
    setIsDeleting(true)
    try {
      await onConfirm()
      setIsOpen(false)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen((prev) => !prev)
        }}
        title={buttonTitle}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={
          triggerClassName ||
          'p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500/40 cursor-pointer'
        }
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>

      {/* Confirmation Dropdown Popover */}
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute ${
            align === 'right' ? 'right-0' : 'left-0'
          } ${
            direction === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'
          } w-64 p-3.5 rounded-2xl bg-[#0B1E28] border border-white/20 text-white shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150`}
          role="dialog"
          aria-modal="true"
          style={{
            boxShadow: '0 20px 35px -5px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.12)',
          }}
        >
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-bold text-white tracking-tight">{title}</p>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">{description}</p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 mt-3 pt-2.5 border-t border-white/10">
            <button
              type="button"
              disabled={isDeleting}
              onClick={() => setIsOpen(false)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
            >
              {cancelText}
            </button>
            <button
              type="button"
              disabled={isDeleting}
              onClick={handleConfirm}
              className="px-3 py-1 rounded-lg text-[11px] font-bold text-white bg-rose-500 hover:bg-rose-600 active:scale-[0.98] transition-all shadow-md shadow-rose-950/40 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-rose-400/50 cursor-pointer disabled:opacity-50"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-3 h-3" />
                  <span>{confirmText}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeleteConfirmDropdown

