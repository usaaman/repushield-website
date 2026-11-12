import React, { forwardRef, useId } from 'react'
import { AlertCircle } from 'lucide-react'

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  containerClassName?: string
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      required,
      className = '',
      containerClassName = '',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id || generatedId
    const errorId = `${inputId}-error`
    const helperId = `${inputId}-helper`

    return (
      <div className={`space-y-1.5 ${containerClassName}`}>
        <label
          htmlFor={inputId}
          className="block text-xs font-bold text-navy uppercase tracking-wider"
        >
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>

        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            required={required}
            aria-invalid={!!error}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={`w-full rounded-2xl bg-white border text-sm text-navy placeholder:text-slate-400 transition-all duration-200 py-3.5 px-4 outline-none ${
              leftIcon ? 'pl-10' : ''
            } ${rightIcon ? 'pr-10' : ''} ${
              error
                ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200/50'
                : 'border-slate-200 hover:border-slate-300 focus:border-ocean focus:ring-2 focus:ring-ocean/15'
            } ${className}`}
            {...props}
          />

          {rightIcon && !error && (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-muted">
              {rightIcon}
            </div>
          )}

          {error && (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-rose-500">
              <AlertCircle className="w-4 h-4" />
            </div>
          )}
        </div>

        {error ? (
          <p id={errorId} role="alert" className="text-xs font-medium text-rose-600 flex items-center gap-1">
            <span>{error}</span>
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-xs text-muted">
            {helperText}
          </p>
        ) : null}
      </div>
    )
  }
)

InputField.displayName = 'InputField'

