'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { FaqsData, FaqItemType } from '@/types/faqs'

type Props = {
  data: FaqsData
}

function FaqItem({ question, answer }: FaqItemType) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-800">{question}</span>

        {open ? (
          <ChevronUp size={20} className="text-primary flex-shrink-0" />
        ) : (
          <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
        )}
      </button>

      {open && (
        <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed bg-white border-t border-gray-100">
          {answer}
        </div>
      )}
    </div>
  )
}

export default function FaqsClient({ data }: Props) {
  return (
    <main className="bg-gray-50 min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="bg-white border-b border-gray-100 py-12 mb-12">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="heading-gradient">{data.heading}</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {data.subheading}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        {data.categories.map((cat) => (
          <div key={cat.category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 pb-2 border-b border-gray-200">
              {cat.category}
            </h2>

            <div className="space-y-4">
              {cat.items.map((item) => (
                <FaqItem
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}