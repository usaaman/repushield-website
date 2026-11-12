import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export interface AccordionItemData {
  id?: string
  question: string
  answer: string | React.ReactNode
  category?: string
}

export interface AccordionProps {
  items: AccordionItemData[]
  allowMultiple?: boolean
  defaultOpenIndex?: number
  className?: string
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenIndex,
  className = '',
}) => {
  const [openIndices, setOpenIndices] = useState<number[]>(() => {
    return defaultOpenIndex !== undefined ? [defaultOpenIndex] : []
  })

  const prefersReduced = usePrefersReducedMotion()

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      )
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]))
    }
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index)
        const headerId = `faq-header-${index}`
        const panelId = `faq-panel-${index}`

        return (
          <div
            key={item.id || index}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-white border-ocean/30 shadow-sm'
                : 'bg-white/80 border-slate-200/80 hover:border-slate-300 hover:bg-white'
            }`}
          >
            <h3>
              <button
                id={headerId}
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() => toggleItem(index)}
                className="w-full px-5 sm:px-6 py-4.5 text-left flex items-center justify-between gap-4 font-bold text-navy hover:text-ocean transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean/40"
              >
                <span className="text-sm sm:text-base leading-snug">{item.question}</span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen
                      ? 'rotate-180 bg-ocean text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <ChevronDown className="w-4 h-4 stroke-[2.2]" />
                </div>
              </button>
            </h3>

            {prefersReduced ? (
              isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  className="px-5 sm:px-6 pb-5 pt-1 text-secondary text-sm leading-relaxed border-t border-slate-100"
                >
                  {item.answer}
                </div>
              )
            ) : (
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={headerId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: 'auto',
                      opacity: 1,
                      transition: {
                        height: { duration: 0.34, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.24, delay: 0.06 },
                      },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: { duration: 0.26, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.16 },
                      },
                    }}
                  >
                    <motion.div
                      initial={{ y: -6, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -4, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="px-5 sm:px-6 pb-5 pt-1 text-secondary text-sm leading-relaxed border-t border-slate-100"
                    >
                      {item.answer}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        )
      })}
    </div>
  )
}

