/* ======================================================
   META
   ====================================================== */

export interface BlogMeta {
  title: string
  description: string
}

/* ======================================================
   HERO
   ====================================================== */

export interface BlogHero {
  heading: string
  subheading: string
}

/* ======================================================
   SIDEBAR
   ====================================================== */

export interface BlogAboutUs {
  tagline: string
  description1: string
  description2: string
}

export interface BlogArchive {
  label: string
  count: number
}

export interface BlogSidebar {
  aboutUs: BlogAboutUs
  tags: string[]
  archives: BlogArchive[]
}

/* ======================================================
   POSTS
   ====================================================== */

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  date: string
  author: string
  image: string
  category: string
}

/* ======================================================
   ROOT
   ====================================================== */

export interface BlogData {
  meta: BlogMeta
  hero: BlogHero
  sidebar: BlogSidebar
  posts: BlogPost[]
}