import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { BrowseBreadcrumb } from '@/services/apis'
import ScreenWrapper from '@/components/wrapper/screen-wrapper'
import React from 'react'

interface ExploreBreadcrumbProps {
  breadcrumb: BrowseBreadcrumb[]
  title?: string
}

const ExploreBreadcrumb = ({ breadcrumb, title }: ExploreBreadcrumbProps) => {
  return (
    <div className='w-full bg-orange-50/50 py-4 border-b border-orange-100'>
      <ScreenWrapper>
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
          {title && (
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-900'>
              {title}
            </h1>
          )}
          
          <div className='flex flex-wrap items-center gap-2 text-sm text-gray-500'>
            <Link href="/" className="font-medium hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/" className="font-medium hover:text-blue-600 transition-colors">
              Explore
            </Link>
            {breadcrumb.map((bc, idx) => {
              const href = bc.slug.startsWith('/explore') ? bc.slug.replace('/explore', '') : (bc.slug.startsWith('/') ? bc.slug : `/${bc.slug}`);
              return (
                <React.Fragment key={bc.slug}>
                  <ChevronRight className="h-4 w-4" />
                  {idx === breadcrumb.length - 1 ? (
                    <span className="font-medium text-gray-900">{bc.label}</span>
                  ) : (
                    <Link href={href} className="font-medium hover:text-blue-600 transition-colors">
                      {bc.label}
                    </Link>
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </ScreenWrapper>
    </div>
  )
}

export default ExploreBreadcrumb
