import React, { forwardRef, useId } from 'react'
import { ChevronDown, AlertCircle } from 'lucide-react'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: SelectOption[]
  error?: string
  helperText?: string
  containerClassName?: string
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    {
      label,
      options,
      error,
      helperText,
      required,
      className = '',
      containerClassName = '',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const selectId = id || generatedId
    const errorId = `${selectId}-error`
    const helperId = `${selectId}-helper`

    return (
      <div className={`space-y-1.5 ${containerClassName}`}>
        <label
          htmlFor={selectId}
          className="block text-xs font-bold text-navy uppercase tracking-wider"
        >
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            required={required}
            aria-invalid={!!error}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={`w-full appearance-none rounded-2xl bg-white border text-sm text-navy transition-all duration-200 py-3.5 pl-4 pr-10 outline-none cursor-pointer ${
              error
                ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200/50'
                : 'border-slate-200 hover:border-slate-300 focus:border-ocean focus:ring-2 focus:ring-ocean/15'
            } ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-muted">
            {error ? (
              <AlertCircle className="w-4 h-4 text-rose-500" />
            ) : (
              <ChevronDown className="w-4 h-4 stroke-[2.2]" />
            )}
          </div>
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

SelectField.displayName = 'SelectField'

