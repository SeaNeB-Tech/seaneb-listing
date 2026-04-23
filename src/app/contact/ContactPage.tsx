'use client'

import { useState } from 'react'
import { Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'

import contactJson from '@/data/contact.json'
import siteJson from '@/data/site.json'

import type { ContactData } from '@/types/contact'
import type { SiteData } from '@/types/site'

import { callApi } from '@/utils/api-utils'
import { endpoint } from '@/services/apis/endpoint'

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

/* Compact Input */
const InputField = ({ field, formData, handleChange }: any) => (
  <div>
    <label className="block text-xs font-medium text-gray-600 mb-1">
      {field.label} {field.required && '*'}
    </label>

    {field.type === 'textarea' ? (
      <textarea
        name={field.id}
        value={formData[field.id] || ''}
        onChange={handleChange}
        rows={4}
        required={field.required}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
      />
    ) : (
      <input
        name={field.id}
        value={formData[field.id] || ''}
        onChange={handleChange}
        type={field.type}
        required={field.required}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
      />
    )}
  </div>
)

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await callApi({
        uriEndPoint: endpoint.contactUs,
        body: {
          ...formData,
          product_key: 'seaneb'
        },
        apiHostUrl: process.env.NEXT_PUBLIC_CONTACT_URL
      })

      alert('Message sent successfully')

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch (err) {
      console.error(err)
      alert('Failed to send message')
    } finally {
      setLoading(false)
    }
  }

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
          <div className="grid lg:grid-cols-3 gap-6 bg-white p-6 rounded-xl shadow-sm border">

            {/* Form */}
            <div className="lg:col-span-2">
              <p className="mb-4 text-sm text-gray-600">
                {form.intro}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">

                <div className="grid md:grid-cols-2 gap-3">
                  {form.fields.slice(0, 2).map(field => (
                    <InputField key={field.id} field={field} formData={formData} handleChange={handleChange} />
                  ))}
                </div>

                {form.fields.slice(2).map(field => (
                  <InputField key={field.id} field={field} formData={formData} handleChange={handleChange} />
                ))}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading ? 'Sending...' : form.submitLabel}
                </button>

              </form>
            </div>

            {/* Right Panel */}
            <div className="space-y-4 text-sm">

              {/* Company */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2 text-sm">
                  SeaNeB Technologies Pvt Ltd
                </h3>

                <div className="space-y-2 text-gray-600">
                  <div className="flex gap-2">
                    <MapPin size={16} />
                    <span>
                      FF/8 Madhav Arcade, Jol,<br />
                      Anand - 388120, Gujarat
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Mail size={16} />
                    <span>hello@seaneb.com</span>
                  </div>
                </div>
              </div>

              {/* Sales */}
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-sm">Talk to Sales</h4>
                <p className="text-xs text-gray-500">
                  Connect before onboarding
                </p>
                <p className="text-primary text-sm mt-1">
                  sales@seaneb.com
                </p>
              </div>

              {/* Support */}
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-sm">Support</h4>
                <p className="text-xs text-gray-500">
                  Need help with our solutions?
                </p>
                <p className="text-primary text-sm mt-1">
                  support@seaneb.com
                </p>
              </div>

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