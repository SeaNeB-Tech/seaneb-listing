'use client'

import { useEffect, useState } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react'

import appJson from '@/data/seaneb-app.json'
import type { SeaNebAppData, FaqItemType } from '@/types/seaneb-app'

const appData: SeaNebAppData = appJson

const { hero, whatIsApp, localDiscoveryCta, whyChoose, keyBenefits, featuresTable, faq } = appData

/* ==============================
   BENEFITS CAROUSEL
============================== */

function BenefitsCarousel() {
  const items = keyBenefits.items
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goTo = (idx: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrent(idx)
      setIsTransitioning(false)
    }, 300)
  }

  const prev = () => goTo((current - 1 + items.length) % items.length)
  const next = () => goTo((current + 1) % items.length)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % items.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [items.length])

  const item = items[current]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-10">
      <div className={`grid lg:grid-cols-2 gap-8 items-center transition-opacity ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex justify-center">
          <Image src={item.img} alt={item.title} width={240} height={240} />
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
          <p className="text-gray-600 mb-4">{item.body}</p>

          <p className="font-semibold mb-2">🧠 {item.whyLabel}</p>

          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            {item.points.map((pt, i) => (
              <li key={i}>{pt}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-between mt-8">
        <button onClick={prev} className="p-2 rounded-full bg-gray-100">
          <ChevronLeft size={20} />
        </button>

        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition-all ${i === current ? 'bg-marketing-primary w-5' : 'bg-gray-300 w-2.5'}`}
            />
          ))}
        </div>

        <button onClick={next} className="p-2 rounded-full bg-gray-100">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}

/* ==============================
   FAQ ITEM
============================== */

function FaqItem({ item }: { item: FaqItemType }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between p-4 text-left bg-white"
      >
        <span className="font-medium">{item.question}</span>
        {open ? <Minus size={18} /> : <Plus size={18} />}
      </button>

      {open && (
        <div className="px-4 pb-4 text-gray-600 text-sm border-t">
          <p>{item.answer}</p>

          {item.listAnswer && (
            <ol className="list-decimal pl-5 mt-2 space-y-1">
              {item.listAnswer.map((li, i) => (
                <li key={i}>{li}</li>
              ))}
            </ol>
          )}

          {item.listSuffix && <p className="mt-2">{item.listSuffix}</p>}
        </div>
      )}
    </div>
  )
}

/* ==============================
   PAGE
============================== */

export default function SeaNebAppPage() {
  return (
    <main className="bg-white">

      {/* Hero */}
      <section
  className="py-14 text-center text-white"
  style={{
    backgroundImage:
      'linear-gradient(135deg, var(--brand-grad-from), var(--brand-grad-to))',
  }}
>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{hero.heading}</h1>
        <p className="text-xl opacity-90">{hero.subheading}</p>
      </section>

      {/* What is app */}
      <section className="py-20 container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-12 items-center">
        <div className="lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-gradient">{whatIsApp.heading}</h2>
          <p className="text-xl text-gray-700 mb-6">{whatIsApp.subheading}</p>

          {whatIsApp.paragraphs.map((p, i) => (
            <p key={i} className="text-gray-600 mb-4">{p}</p>
          ))}
        </div>

        <div className="lg:w-1/2 flex justify-center">
          <Image src={whatIsApp.image} alt={whatIsApp.imageAlt} width={260} height={260} />
        </div>
      </section>

      {/* Why choose */}
      <section className="py-20 container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 heading-gradient">{whyChoose.heading}</h2>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 heading-gradient">{whyChoose.whatYouGet.heading}</h3>

            {whyChoose.whatYouGet.features.map((f) => (
              <div key={f.title} className="p-4 bg-gray-50 rounded mb-3">
                <strong>{f.title}</strong>
                <p className="text-sm text-gray-600">{f.text}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 heading-gradient">{whyChoose.whoIsItFor.heading}</h3>

            {whyChoose.whoIsItFor.audiences.map((a) => (
              <div key={a.title} className="p-4 bg-gray-50 rounded mb-3">
                <strong>{a.title}</strong>
                <p className="text-sm text-gray-600">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key benefits */}
      <section className="py-20 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 heading-gradient">{keyBenefits.heading}</h2>
        <div className="container mx-auto px-4 lg:px-8">
          <BenefitsCarousel />
        </div>
      </section>

      {/* Features table */}
      <section className="py-20 container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 heading-gradient">{featuresTable.heading}</h2>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <table className="w-full lg:w-1/2 border rounded-xl overflow-hidden">
            <thead className="bg-marketing-primary text-white">
              <tr>
                <th className="p-4 text-left">Feature</th>
                <th className="p-4 text-left">Description</th>
              </tr>
            </thead>

            <tbody>
              {featuresTable.rows.map((row, i) => (
                <tr key={row.feature} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-4 font-medium">{row.feature}</td>
                  <td className="p-4 text-gray-600">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="lg:w-1/2 flex justify-center">
            <Image src={featuresTable.mockupImage} alt={featuresTable.mockupAlt} width={260} height={260} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 heading-gradient">{faq.heading}</h2>
          <p className="text-center text-gray-600 mb-10">{faq.subheading}</p>

          <div className="space-y-4">
            {faq.items.map((item) => (
              <FaqItem key={item.question} item={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}