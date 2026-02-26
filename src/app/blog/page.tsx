import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, Search } from 'lucide-react'

import blogJson from '@/data/blog.json'
import type { BlogData } from '@/types/blog'

const blogData: BlogData = blogJson

export const metadata: Metadata = {
  title: blogData.meta.title,
  description: blogData.meta.description,
}

const { hero, sidebar, posts } = blogData

export default function BlogListingPage() {
  return (
    <main className="bg-gray-50 min-h-screen pb-20">
      {/* Hero */}
      <section
  className="py-14 text-center text-white mb-12"
  style={{
    backgroundImage:
      'linear-gradient(135deg, var(--heading-grad-from), var(--heading-grad-to))',
  }}
>
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {hero.heading}
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {hero.subheading}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-8">
        {/* Grid */}
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow border flex flex-col">
                <Link href={`/blog/${post.slug}`} className="relative h-48 block">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                </Link>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-xs text-gray-400 mb-3 gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={14} /> {post.author}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold mb-3">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>

                  <div className="mt-auto pt-4 border-t">
                    <Link href={`/blog/${post.slug}`} className="text-marketing-primary text-sm">
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 space-y-8">
          {/* Search */}
          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="font-bold mb-4">Search Blogs</h3>
            <div className="relative">
              <input className="w-full pl-10 pr-4 py-2 border rounded" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={18} />
            </div>
          </div>

          {/* About */}
          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="font-bold mb-4">About Us</h3>
            <p className="font-medium">{sidebar.aboutUs.tagline}</p>
            <p>{sidebar.aboutUs.description1}</p>
            <p>{sidebar.aboutUs.description2}</p>
          </div>

          {/* Archives */}
          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="font-bold mb-4">Archives</h3>
            <ul className="space-y-2">
              {sidebar.archives.map((arc) => (
                <li key={arc.label}>
                  <Link href="#" className="flex justify-between">
                    <span>{arc.label}</span>
                    <span>({arc.count})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="font-bold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {sidebar.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full border text-xs">
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