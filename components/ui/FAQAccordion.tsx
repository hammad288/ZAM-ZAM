'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FAQ } from '@/types'

interface FAQAccordionProps {
  faqs: FAQ[]
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!faqs.length) return null

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={faq.id}
          className="border border-emerald-100 rounded-xl overflow-hidden shadow-sm transition-shadow hover:shadow-md"
        >
          <button
            className={cn(
              'w-full text-left px-6 py-4 flex items-center justify-between gap-4 transition-colors',
              openIndex === index
                ? 'bg-emerald-800 text-white'
                : 'bg-white text-gray-900 hover:bg-emerald-50'
            )}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
          >
            <span className="font-semibold text-base leading-snug pr-2">{faq.question}</span>
            <ChevronDown
              className={cn(
                'w-5 h-5 flex-shrink-0 transition-transform duration-300',
                openIndex === index ? 'rotate-180 text-gold-400' : 'text-emerald-600'
              )}
              style={{ color: openIndex === index ? '#fbbf24' : undefined }}
            />
          </button>
          {openIndex === index && (
            <div className="bg-white px-6 py-5 border-t border-emerald-100">
              <p className="text-gray-700 leading-relaxed text-[0.9375rem]">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
