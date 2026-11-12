import React, { forwardRef, useId } from 'react'
import { AlertCircle } from 'lucide-react'

export interface TextAreaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  helperText?: string
  containerClassName?: string
}

export const TextAreaField = forwardRef<
  HTMLTextAreaElement,
  TextAreaFieldProps
>(
  (
    {
      label,
      error,
      helperText,
      required,
      rows = 4,
      className = '',
      containerClassName = '',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const textareaId = id || generatedId
    const errorId = `${textareaId}-error`
    const helperId = `${textareaId}-helper`

    return (
      <div className={`space-y-1.5 ${containerClassName}`}>
        <label
          htmlFor={textareaId}
          className="block text-xs font-bold text-navy uppercase tracking-wider"
        >
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>

        <div className="relative">
          <textarea
            ref={ref}
            id={textareaId}
            rows={rows}
            required={required}
            aria-invalid={!!error}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={`w-full rounded-2xl bg-white border text-sm text-navy placeholder:text-slate-400 transition-all duration-200 py-3.5 px-4 outline-none resize-y ${
              error
                ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200/50'
                : 'border-slate-200 hover:border-slate-300 focus:border-ocean focus:ring-2 focus:ring-ocean/15'
            } ${className}`}
            {...props}
          />

          {error && (
            <div className="absolute top-3.5 right-3.5 pointer-events-none text-rose-500">
              <AlertCircle className="w-4 h-4" />
            </div>
          )}
        </div>

        {error ? (
          <p id={errorId} role="alert" className="text-xs font-medium text-rose-600">
            {error}
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

TextAreaField.displayName = 'TextAreaField'

