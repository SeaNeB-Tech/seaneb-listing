'use client'

import { Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'

import contactJson from '@/data/contact.json'
import siteJson from '@/data/site.json'

import type { ContactData } from '@/types/contact'
import type { SiteData } from '@/types/site'

import type { SiteData } from '@/types/site'


const contactData = contactJson as ContactData
const siteData = siteJson as SiteData

const { hero, form, social } = contactData

const SOCIAL_ICONS = {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube
}

export default function ContactPage() {


  return (
    <main className="bg-gray-50">

      {/* Hero (slightly reduced) */}
      <section className="relative py-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6f8ddc] to-[#ef476f]" />

        <div className="relative container mx-auto px-4 max-w-2xl">
          <h1 className="mb-3 text-3xl md:text-4xl font-bold text-white">
            {hero.heading}
          </h1>
          <p className="text-sm text-white/90">
            {hero.subheading}
          </p>
        </div>
      </section>

      {/* Form + Panel */}
      <section className="py-14">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid sm:grid-cols-3 gap-6">
            {/* Company */}
            <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col justify-center">
              <h3 className="font-semibold mb-3 text-base text-gray-900">
                Seaneb Technologies Pvt Ltd
              </h3>

              <div className="space-y-3 text-gray-600 text-sm">
                <div className="flex gap-3 items-start">
                  <MapPin size={18} className="mt-0.5 text-gray-400" />
                  <span>
                    FF/8 Madhav Arcade, Jol,<br />
                    Anand - 388120, Gujarat
                  </span>
                </div>

                <div className="flex gap-3 items-center">
                  <Mail size={18} className="text-gray-400" />
                  <span>hello@seaneb.com</span>
                </div>
              </div>
            </div>

            {/* Sales */}
            <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col justify-center">
              <h4 className="font-semibold text-base text-gray-900">Talk to Sales</h4>
              <p className="text-sm text-gray-500 mt-1 mb-2">
                Connect before onboarding
              </p>
              <p className="text-primary font-medium">
                sales@seaneb.com
              </p>
            </div>

            {/* Support */}
            <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col justify-center">
              <h4 className="font-semibold text-base text-gray-900">Support</h4>
              <p className="text-sm text-gray-500 mt-1 mb-2">
                Need help with our solutions?
              </p>
              <p className="text-primary font-medium">
                support@seaneb.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="py-12 text-center bg-white">
        <h2 className="text-lg font-semibold mb-4">
          {social.heading}
        </h2>

        <div className="flex justify-center gap-3">
          {Object.entries(siteData.footer.social).map(([key, href]) => {
            const Icon =
              SOCIAL_ICONS[
                (key.charAt(0).toUpperCase() + key.slice(1)) as keyof typeof SOCIAL_ICONS
              ]

            if (!Icon) return null

            return (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border transition"
              >
                <Icon size={18} />
              </a>
            )
          })}
        </div>
      </section>

    </main>
  )
}