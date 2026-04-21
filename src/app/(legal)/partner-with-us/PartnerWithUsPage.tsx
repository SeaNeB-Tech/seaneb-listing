'use client'

import { useState } from 'react'
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

/* ================= DATA ================= */

const pageData = dataJson as PartnerWithUsData

const { hero, intro, pricing, whyPartner, howItWorks, faq, cta } = pageData

/* ================= ICON MAP ================= */

const ICON_MAP = {
  Globe,
  Settings,
  BadgeCheck,
  BarChart3,
  MessageSquare,
  DollarSign,
  Rocket
}

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
        <div className="absolute top-0 left-0 right-0 text-center py-1.5 text-xs font-bold text-white uppercase tracking-widest" style={{
          backgroundImage:
            'linear-gradient(135deg, var(--heading-grad-from) 0%, var(--heading-grad-to) 100%)',
        }}>
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
              ? 'btn-gradient text-white shadow-md hover:shadow-lg'
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
      <div className="relative z-10 w-20 h-20 rounded-full btn-gradient flex items-center justify-center text-white text-2xl font-extrabold shadow-lg mb-6">
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
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-800">{item.question}</span>
        {open ? (
          <ChevronUp size={20} className="text-primary flex-shrink-0" />
        ) : (
          <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
        )}
      </button>

      {open && (
        <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed bg-white border-t border-gray-100">
          {item.answer}
        </div>
      )}
    </div>
  )
}

/* ================= PAGE ================= */

export default function PartnerWithUsPage() {
  return (
    <main className="bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br bg-heading-grad-from-tint pt-32 pb-20">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-heading-grad-from blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <span className="inline-block btn-gradient text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            {hero.badge}
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            <span className="heading-gradient">{hero.heading}</span>
            <br />
            <span className="text-gray-800">{hero.headingSuffix}</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{hero.subheading}</p>

        </div>
      </section>

      {/* Intro */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-6">
      <span className="heading-gradient">{intro.heading}</span>
    </h2>

    {intro.paragraphs.map((p, i) => (
      <p
        key={i}
        className={`text-lg text-gray-600 leading-relaxed ${
          i < intro.paragraphs.length - 1 ? 'mb-4' : 'font-semibold text-gray-800'
        }`}
      >
        {p}
      </p>
    ))}
  </div>
</section>

{/* Pricing */}
<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-4 lg:px-8">
    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
        {pricing.heading}
      </h2>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        {pricing.subheading}
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {pricing.plans.map(plan => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  </div>
</section>

{/* Why Partner */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-4 lg:px-8">
    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        <span className="heading-gradient">{whyPartner.heading}</span>
      </h2>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        {whyPartner.subheading}
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {whyPartner.reasons.map(reason => (
        <ReasonCard key={reason.title} reason={reason} />
      ))}
    </div>
  </div>
</section>

{/* Steps */}
<section className="py-20 bg-brand-tint">
  <div className="container mx-auto px-4 lg:px-8">
    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
        {howItWorks.heading}
      </h2>
      <p className="text-gray-600 text-lg max-w-xl mx-auto">
        {howItWorks.subheading}
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
      {howItWorks.steps.map(step => (
        <StepCard key={step.step} step={step} />
      ))}
    </div>
  </div>
</section>

{/* FAQ */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        <span className="heading-gradient">{faq.heading}</span>
      </h2>
      <p className="text-gray-600">{faq.subheading}</p>
    </div>

    <div className="space-y-4">
      {faq.items.map(item => (
        <FaqItem key={item.question} item={item} />
      ))}
    </div>

    <p className="text-center text-gray-500 mt-8 text-sm">
      {faq.contactNote}{' '}
      <Link href={faq.contactHref} className="text-primary font-semibold hover:underline">
        {faq.contactLinkLabel}
      </Link>
      . {faq.contactSuffix}
    </p>
  </div>
</section>

{/* CTA */}
<section className="py-20 bg-brand-gradient">
  <div className="container mx-auto px-4 lg:px-8 text-center text-black">
    <h2 className="text-4xl md:text-5xl font-extrabold mb-6">{cta.heading}</h2>
    <p className="text-lg text-black/80 max-w-xl mx-auto mb-10">{cta.subheading}</p>

    <Link
      href={cta.buttonHref}
      className="inline-block bg-white text-primary font-bold py-4 px-12 rounded-full text-lg uppercase tracking-wide shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
    >
      {cta.buttonLabel}
    </Link>
  </div>
</section>

    </main>
  )
}