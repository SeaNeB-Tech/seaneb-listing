import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface LocationCardProps {
  level: 'country' | 'state' | 'city'
  name: string
  slug: string
  businessCount: number
  code?: string
  flag?: string
}

const LocationCard = ({ level, name, slug, businessCount, code, flag }: LocationCardProps) => {
  const abbr = code || name.substring(0, 2).toUpperCase()
  
  const badgeColors = {
    country: 'bg-blue-50 text-blue-600',
    state: 'bg-purple-50 text-purple-600',
    city: 'bg-green-50 text-green-600'
  }

  return (
    <Link 
      href={`/${slug}`}
      className='flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md'
    >
      <div className='flex items-center justify-between mb-4'>
        <span className={`rounded px-2 py-1 text-[10px] font-bold tracking-wider uppercase ${badgeColors[level]}`}>
          {level}
        </span>
        <span className='rounded bg-gray-50 px-2 py-1 text-[10px] font-bold text-gray-500'>
          {abbr}
        </span>
      </div>
      <div className='flex items-center gap-2 mb-6'>
        {flag && <span className='text-2xl'>{flag}</span>}
        <h3 className='text-lg font-semibold text-gray-800 line-clamp-1' title={name}>{name}</h3>
      </div>
      <div className='flex items-center justify-between'>
        <span className='text-xs text-gray-500 font-medium'>{businessCount || 0} Businesses</span>
        <ChevronRight className='h-4 w-4 text-gray-400' />
      </div>
    </Link>
  )
}

export default LocationCard
