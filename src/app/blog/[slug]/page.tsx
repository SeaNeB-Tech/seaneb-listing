import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, Search } from 'lucide-react'
import { notFound } from 'next/navigation'

import blogJson from '@/data/blog.json'
import type { BlogData } from '@/types/blog'

const blogData = blogJson as BlogData

export const metadata: Metadata = {
  title: blogData.meta.title,
  description: blogData.meta.description
}

const { hero, sidebar, posts } = blogData

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const selectedPost = posts.find(p => p.slug === slug)

  /* ======================================================
     BLOG DETAIL VIEW
  ====================================================== */

  if (!selectedPost) {
    return notFound()
  }
  return (
    <main className='min-h-screen bg-white py-16'>
      <div className='container mx-auto max-w-3xl px-4'>
        {/* Title */}
        <h1 className='mb-6 text-4xl font-bold'>{selectedPost.title}</h1>

        {/* Meta */}
        <div className='mb-6 flex items-center gap-6 text-sm text-gray-500'>
          <span className='flex items-center gap-2'>
            <Calendar size={16} /> {selectedPost.date}
          </span>
          <span className='flex items-center gap-2'>
            <User size={16} /> {selectedPost.author}
          </span>
        </div>

        {/* Image */}
        <div className='relative mb-10 h-96 w-full'>
          <Image src={selectedPost.image} alt={selectedPost.title} fill className='rounded-xl object-cover' />
        </div>

        {/* Content */}
        <article className='prose prose-lg max-w-none'>
          {selectedPost.content?.map((block, index) => {
            if (block.type === 'heading') {
              return (
                <h2 key={index} className='mt-8 mb-4 font-bold'>
                  {block.text}
                </h2>
              )
            }

            if (block.type === 'paragraph') {
              return (
                <p key={index} className='mb-4'>
                  {block.text}
                </p>
              )
            }

            if (block.type === 'list' && block.items) {
              return (
                <ul key={index} className='mb-4 list-disc space-y-2 pl-6'>
                  {block.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )
            }

            return null
          })}
        </article>

        {/* Back */}
        <div className='mt-10'>
          <Link href='/blog' className='text-marketing-primary font-medium'>
            ← Back to Blogs
          </Link>
        </div>
      </div>
    </main>
  )
}
