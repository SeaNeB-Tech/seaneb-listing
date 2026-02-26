import type { Metadata } from 'next'
import dataJson from '@/data/press-kit.json'
import type { PressKitData } from '@/types/press-kit'

const pressData = dataJson as PressKitData

export const metadata: Metadata = {
  title: pressData.meta.title,
  description: pressData.meta.description
}

const { heading, subheading, about, facts, assets, mediaContact } = pressData

export default function PressKitPage() {
  return (
    <main className="bg-gray-50 min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="bg-white border-b border-gray-100 py-12 mb-12">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="heading-gradient">{heading}</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {subheading}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 max-w-4xl space-y-12">
        {/* About */}
        <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {about.heading}
          </h2>

          {about.paragraphs.map((p, i) => (
            <p key={i} className="text-gray-600 leading-relaxed mb-4">
              {p}
            </p>
          ))}
        </section>

        {/* Company Facts */}
        <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {facts.heading}
          </h2>

          <dl className="space-y-4">
            {facts.items.map((item) => (
              <div
                key={item.label}
                className="flex gap-4 border-b border-gray-50 pb-3"
              >
                <dt className="font-semibold text-gray-700 w-40 flex-shrink-0">
                  {item.label}
                </dt>

                <dd className="text-gray-600">{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Brand Assets */}
        <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {assets.heading}
          </h2>

          <ul className="space-y-3">
            {assets.items.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium flex items-center gap-2"
                >
                  ↓ {item.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Media Contact */}
        <section className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-8 border border-primary/10">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            {mediaContact.heading}
          </h2>

          <p className="text-gray-700 font-semibold mb-1">
            {mediaContact.name}
          </p>

          <a
            href={`mailto:${mediaContact.email}`}
            className="text-primary hover:underline"
          >
            {mediaContact.email}
          </a>

          <br />

          <a
            href={mediaContact.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline text-sm"
          >
            {mediaContact.website}
          </a>
        </section>
      </div>
    </main>
  )
}