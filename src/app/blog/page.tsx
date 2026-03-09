import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, Search } from 'lucide-react'

import blogJson from '@/data/blog.json'
import type { BlogData } from '@/types/blog'

/* ======================================================
   DATA
====================================================== */

const blogData = blogJson as BlogData
const { hero, sidebar, posts } = blogData

/* ======================================================
   META
====================================================== */

export const metadata: Metadata = {
  title: blogData.meta.title,
  description: blogData.meta.description
}

/* ======================================================
   BLOG LIST PAGE
====================================================== */

export default function BlogPage() {
  
  return (
    <main className='min-h-screen bg-gray-50 pb-20'>
      {/* ================= HERO ================= */}
      <section
        className='mb-12 py-14 text-center text-white'
        style={{
          backgroundImage: 'linear-gradient(135deg, var(--heading-grad-from), var(--heading-grad-to))'
        }}
      >
        <div className='container mx-auto px-4 lg:px-8'>
          <h1 className='mb-4 text-4xl font-bold md:text-5xl'>{hero.heading}</h1>
          <p className='mx-auto max-w-2xl text-xl opacity-90'>{hero.subheading}</p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className='container mx-auto flex flex-col gap-8 px-4 lg:flex-row lg:px-8'>
        {/* ================= BLOG GRID ================= */}
        <div className='w-full lg:w-3/4'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            {posts.map(post => (
              <article
                key={post.id}
                className='flex flex-col rounded-xl border bg-white shadow transition hover:shadow-lg'
              >
                {/* Image */}
                <Link href={`/blog/${post.slug}`} className='relative block h-48'>
                  <Image src={post.image} alt={post.title} fill className='rounded-t-xl object-cover' />
                </Link>

                {/* Content */}
                <div className='flex flex-grow flex-col p-6'>
                  {/* Meta */}
                  <div className='mb-3 flex items-center gap-4 text-xs text-gray-400'>
                    <span className='flex items-center gap-1'>
                      <Calendar size={14} /> {post.date}
                    </span>
                    <span className='flex items-center gap-1'>
                      <User size={14} /> {post.author}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className='mb-3 text-xl leading-snug font-bold'>
                    <Link href={`/blog/${post.slug}`} className='hover:text-marketing-primary'>
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className='mb-4 text-sm text-gray-600'>{post.excerpt}</p>

                  {/* Read More */}
                  <div className='mt-auto border-t pt-4'>
                    <Link
                      href={`/blog/${post.slug}`}
                      className='text-marketing-primary text-sm font-medium hover:underline'
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ================= SIDEBAR ================= */}
        <aside className='w-full space-y-8 lg:w-1/4'>
          {/* Search */}
          <div className='rounded-xl border bg-white p-6 shadow'>
            <h3 className='mb-4 font-bold'>Search Blogs</h3>
            <div className='relative'>
              <input
                placeholder='Search...'
                className='focus:ring-marketing-primary w-full rounded border py-2 pr-4 pl-10 focus:ring-2 focus:outline-none'
              />
              <Search className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-400' size={18} />
            </div>
          </div>

          {/* About */}
          <div className='rounded-xl border bg-white p-6 shadow'>
            <h3 className='mb-4 font-bold'>About Us</h3>
            <p className='mb-2 font-medium'>{sidebar.aboutUs.tagline}</p>
            <p className='mb-2 text-sm text-gray-600'>{sidebar.aboutUs.description1}</p>
            <p className='text-sm text-gray-600'>{sidebar.aboutUs.description2}</p>
          </div>

          {/* Archives */}
          <div className='rounded-xl border bg-white p-6 shadow'>
            <h3 className='mb-4 font-bold'>Archives</h3>
            <ul className='space-y-2 text-sm'>
              {sidebar.archives.map(arc => (
                <li key={arc.label}>
                  <Link href='#' className='hover:text-marketing-primary flex justify-between'>
                    <span>{arc.label}</span>
                    <span>({arc.count})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className='rounded-xl border bg-white p-6 shadow'>
            <h3 className='mb-4 font-bold'>Tags</h3>
            <div className='flex flex-wrap gap-2'>
              {sidebar.tags.map(tag => (
                <span
                  key={tag}
                  className='hover:bg-marketing-primary cursor-pointer rounded-full border px-3 py-1 text-xs transition hover:text-white'
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
