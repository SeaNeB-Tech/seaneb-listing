import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User } from 'lucide-react'
import { notFound } from 'next/navigation'

import blogJson from '@/data/blog.json'
import type { BlogData } from '@/types/blog'

const blogData = blogJson as BlogData

export const metadata: Metadata = {
  title: blogData.meta.title,
  description: blogData.meta.description
}

const { posts } = blogData

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const selectedPost = posts.find(p => p.slug === slug)

  /* ======================================================
     BLOG DETAIL VIEW
  ====================================================== */

  if (!selectedPost) {

    return notFound()
  }

  const tableOfContents = selectedPost.content
    .filter(block => block.type === 'heading' && block.text)
    .map(block => ({
      text: block.text!,
      id: block
        .text!.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
    }))

  return (
    <main className='min-h-screen bg-white py-16'>
      <div className='container mx-auto max-w-6xl px-4 lg:px-8'>
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

        {/* FULL WIDTH IMAGE */}
        <div className='relative mb-14 h-[420px] w-full'>
          <Image src={selectedPost.image} alt={selectedPost.title} fill className='rounded-xl object-cover' />
        </div>

        {/* FLEX STARTS HERE */}
        <div className='flex gap-12'>
          {/* ================= TOC ================= */}
          {tableOfContents.length > 0 && (
            <aside className='hidden w-64 flex-shrink-0 lg:block'>
              <div className='sticky top-28 max-h-[80vh] overflow-y-auto rounded-xl border bg-white p-6 shadow-sm'>
                <h3 className='mb-4 text-xs font-semibold tracking-wider text-gray-500 uppercase'>Table of Contents</h3>

                <ul className='space-y-3 text-sm'>
                  {tableOfContents.map(item => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className='hover:border-marketing-primary hover:text-marketing-primary block border-l-2 border-transparent pl-3 text-gray-600 transition'
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}

          {/* ================= BLOG CONTENT ================= */}
          <div className='max-w-3xl flex-1'>
            <article className='prose prose-lg max-w-none'>
              {selectedPost.content?.map((block, index) => {
                if (block.type === 'heading') {
                  const headingId = block
                    .text!.replace(/<[^>]*>/g, '') // remove HTML for ID
                    .toLowerCase()
                    .replace(/[^a-z0-9\s]/g, '')
                    .replace(/\s+/g, '-')

                  return (
                    <h2
                      id={headingId}
                      key={index}
                      className='mt-10 mb-4 scroll-mt-28 text-2xl font-bold'
                      dangerouslySetInnerHTML={{ __html: block.text || '' }}
                    />
                  )
                }

                if (block.type === 'paragraph') {

                  return <p key={index} className='mb-4' dangerouslySetInnerHTML={{ __html: block.text || '' }} />
                }

                if (block.type === 'list' && block.items) {
                  
                  return (
                    <ul key={index} className='mb-4 list-disc space-y-2 pl-6'>
                      {block.items.map((item, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
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
        </div>
      </div>
    </main>
  )
}
