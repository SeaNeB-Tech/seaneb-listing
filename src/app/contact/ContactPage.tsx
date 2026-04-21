'use client'

import Image from 'next/image'
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'

import contactJson from '@/data/contact.json'
import siteJson from '@/data/site.json'

import type { ContactData } from '@/types/contact'
import type { SiteData } from '@/types/site'

const contactData = contactJson as ContactData
const siteData = siteJson as SiteData

const { hero, cards, form, address, social } = contactData

const SOCIAL_ICONS = {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube
}

export default function ContactPage() {
  return (
    <main className='bg-zinc-50'>
      {/* Hero */}
      <section
        className='py-14 text-center'
        style={{ backgroundImage: 'linear-gradient(135deg, var(--heading-grad-from) 0%, var(--heading-grad-to) 100%)' }}
      >
        <div className='container mx-auto px-4'>
          <h1 className='mb-4 text-4xl font-bold text-white md:text-5xl'>{hero.heading}</h1>
          <p className='text-xl text-white opacity-90'>{hero.subheading}</p>
        </div>
      </section>

      {/* Cards */}
      <section className='bg-white py-20 md:py-32'>
        <div className='container mx-auto px-4'>
          <div className='mx-auto flex max-w-5xl flex-col justify-center gap-8 md:flex-row'>
            {cards.map(card => (
              <div key={card.id} className='w-full md:w-5/12'>
                <div className='flex h-full flex-col overflow-hidden rounded-lg bg-white shadow'>
                  <div className='relative flex aspect-square items-center justify-center bg-gray-50 p-8'>
                    <Image src={card.image} alt={card.imageAlt} fill className='object-contain' />
                  </div>

                  <div className='flex flex-grow flex-col justify-center p-8 text-center'>
                    <h2 className='mb-4 text-2xl font-bold'>{card.heading}</h2>
                    <p className='mb-2 text-gray-600'>{card.description}</p>
                    <p className='text-xl font-medium text-gray-800'>{card.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Address */}
      <section className='bg-gray-100 py-20'>
        <div className='container mx-auto flex flex-col gap-12 px-4 lg:flex-row'>
          {/* Form */}
          <div className='w-full lg:w-7/12'>
            <p className='mb-8 text-lg leading-relaxed text-gray-600'>{form.intro}</p>

            <form className='space-y-6'>
              {form.fields.map(field => (
                <div key={field.id}>
                  <label className='mb-2 block font-bold text-gray-700'>
                    {field.label}
                    {field.required ? ' *' : ''}
                  </label>

                  {field.type === 'textarea' ? (
                    <textarea rows={field.rows} required={field.required} className='w-full rounded bg-white border border-gray-600 px-4 py-2' />
                  ) : (
                    <input type={field.type} required={field.required} className='w-full rounded bg-white border border-gray-600 px-4 py-2' />
                  )}
                </div>
              ))}

              <div className='text-right'>
                <button type='submit' className='bg-primary rounded px-8 py-3 font-bold text-white'>
                  {form.submitLabel}
                </button>
              </div>
            </form>
          </div>

          {/* Address */}
          <div className='w-full lg:w-4/12'>
            <div className='rounded-lg border bg-white p-8 shadow'>
              <h3 className='mb-4 text-xl heading-gradient font-bold'>{address.companyName}</h3>

              <ul className='space-y-4 text-gray-600'>
                <li className='flex items-start'>
                  <MapPin className='mr-3 h-5 w-5' />
                  <span>
                    {address.street}
                    <br />
                    {address.city}
                    <br />
                    {address.state}
                  </span>
                </li>

                <li className='flex items-center'>
                  <Phone className='mr-3 h-5 w-5' />
                  {address.phone}
                </li>

                <li className='flex items-center'>
                  <Mail className='mr-3 h-5 w-5' />
                  {address.email}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Social */}
      <section
        className='relative bg-cover bg-center py-14'
        style={{ backgroundImage: `url('${social.backgroundImage}')` }}
      >
        <div className='absolute inset-0 bg-black/40' />

        <div className='relative z-10 container mx-auto px-4 text-center text-white'>
          <h2 className='mb-8 text-3xl font-bold'>{social.heading}</h2>

          <div className='flex justify-center gap-6'>
            {Object.entries(siteData.footer.social).map(([key, href]) => {
              const Icon = SOCIAL_ICONS[(key.charAt(0).toUpperCase() + key.slice(1)) as keyof typeof SOCIAL_ICONS]

              if (!Icon) return null

              return (
                <a
                  key={key}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='rounded-full bg-white/20 p-3'
                >
                  <Icon size={24} />
                </a>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
