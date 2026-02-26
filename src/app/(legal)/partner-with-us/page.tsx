'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Globe,
  Settings,
  BadgeCheck,
  BarChart3,
  MessageSquare,
  DollarSign,
  Rocket,
  ChevronDown,
  ChevronUp,
  CheckCircle2
} from 'lucide-react'

import dataJson from '@/data/partner-with-us.json'
import type {
  PartnerWithUsData,
  PartnerPlan,
  PartnerReason,
  PartnerStep,
  PartnerFaqItem
} from '@/types/partner-with-us'

const pageData = dataJson as PartnerWithUsData

/* Map icon name → component */
const ICON_MAP = {
  Globe,
  Settings,
  BadgeCheck,
  BarChart3,
  MessageSquare,
  DollarSign,
  Rocket
}

const { hero, intro, pricing, whyPartner, howItWorks, faq, cta } = pageData

/* ================= PlanCard ================= */

function PlanCard({ plan }: { plan: PartnerPlan }) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden border transition-transform hover:-translate-y-1 duration-300 ${
        plan.highlight
          ? 'border-primary shadow-xl ring-2 ring-primary/30'
          : 'border-gray-200 shadow-md'
      }`}
    >
      {plan.highlight && (
        <div className="absolute top-0 left-0 right-0 text-center py-1.5 text-xs font-bold text-white bg-gradient-to-r from-primary to-secondary uppercase tracking-widest">
          {plan.popularLabel}
        </div>
      )}

      <div className={`p-8 flex flex-col h-full bg-white ${plan.highlight ? 'pt-10' : ''}`}>
        <h3 className={`text-2xl font-extrabold mb-2 ${plan.highlight ? 'heading-gradient' : 'text-gray-800'}`}>
          {plan.name}
        </h3>

        <p className="text-gray-500 text-sm mb-8 leading-relaxed">{plan.label}</p>

        <ul className="space-y-3 mb-10 flex-grow">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-gray-700 text-sm">
              <CheckCircle2 size={18} className={plan.highlight ? 'text-primary' : 'text-green-500'} />
              {feature}
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className={`text-center py-3 px-6 rounded-full font-semibold transition-all text-sm uppercase tracking-wide ${
            plan.highlight
              ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:shadow-lg'
              : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
          }`}
        >
          Register Now
        </Link>
      </div>
    </div>
  )
}

/* ================= ReasonCard ================= */

function ReasonCard({ reason }: { reason: PartnerReason }) {
  const Icon = ICON_MAP[reason.icon as keyof typeof ICON_MAP] || Globe

  return (
    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all group">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-5">
        <Icon size={26} className="text-primary" />
      </div>

      <h3 className="font-bold text-gray-800 text-lg mb-2">{reason.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{reason.description}</p>
    </div>
  )
}

/* ================= StepCard ================= */

function StepCard({ step }: { step: PartnerStep }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-extrabold shadow-lg mb-6">
        {step.step}
      </div>

      <h3 className="font-bold text-gray-800 text-lg mb-2">{step.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
    </div>
  )
}

/* ================= FAQ ================= */

function FaqItem({ item }: { item: PartnerFaqItem }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50"
        onClick={() => setOpen((p) => !p)}
      >
        <span className="font-semibold text-gray-800">{item.question}</span>
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {open && <div className="px-5 pb-5 text-gray-600 text-sm border-t">{item.answer}</div>}
    </div>
  )
}

/* ================= PAGE ================= */

export default function PartnerWithUsPage() {
  return (
    <main className="bg-white">
      {/* Keep your existing JSX unchanged */}
      {/* (Hero → Intro → Pricing → Why → Steps → FAQ → CTA) */}
    </main>
  )
}