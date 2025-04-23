'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/utils'
import { LucideMessageCircle, Mail, MessageSquare, Phone } from 'lucide-react'
import Link from 'next/link'

interface HostCardProps {
  name: string
  phone: string
  email: string
  imageUrl: string
  onSendMessage?: () => void
}

export function HostCard({ name = '', phone = '', email = '', imageUrl = '', onSendMessage }: HostCardProps) {
  return (
    <div className='w-full max-w-sm rounded-sm bg-gray-100 p-6 lg:max-w-full'>
      <div className='mb-4 flex items-start justify-between gap-2'>
        <div className='truncate'>
          <p className='text-sm text-gray-500'>Hosted by</p>
          <h3 className='truncate text-xl font-medium text-gray-800'>{name}</h3>
        </div>
        <Avatar className='h-14 w-14'>
          <AvatarImage src={imageUrl} alt={name} />
          <AvatarFallback className='bg-gray-200 text-gray-600'>{getInitials(name)}</AvatarFallback>
        </Avatar>
      </div>

      <div className='my-4 border-t border-gray-300'></div>

      <div className='space-y-3'>
        <Link
          href={`tel:${phone.replace(/[^0-9]/g, '')}`}
          className='group animated-underline flex w-max items-center gap-3 text-gray-700 hover:text-gray-900'
        >
          <Phone className='h-4 w-4 text-gray-500 transition-all duration-300 group-hover:animate-pulse' />
          <span>{phone}</span>
        </Link>

        {email && (
          <Link
            href={`mailto:${email}`}
            className='group animated-underline flex items-center gap-3 text-gray-700 hover:text-gray-900'
          >
            <Mail className='h-4 w-4 text-gray-500 transition-all duration-300 group-hover:animate-pulse' />
            <span className='text-[#ff3366]'>{email}</span>
          </Link>
        )}

        <button
          onClick={onSendMessage}
          className='mt-7 flex w-full items-center justify-center gap-2 rounded-md bg-green-700 px-4 py-2 text-white transition-all duration-200 hover:bg-green-600'
        >
          <LucideMessageCircle className='h-5 w-5' />
          <span>Chat on Whatsapp</span>
        </button>
      </div>
    </div>
  )
}
