/* ======================================================
   COMPANY
   ====================================================== */

export interface SiteUrls {
  main: string
  app: string
  india: string
  career: string
}

export interface SiteCompany {
  name: string
  legalName: string
  email: string
  tagline: string
  description: string
  urls: SiteUrls
}

/* ======================================================
   NAVIGATION
   ====================================================== */

export interface NavItem {
  label: string
  href: string | null
  external?: boolean
}

export interface NavigationCTA {
  label: string
  href: string
}

export interface SiteNavigation {
  main: NavItem[]
  cta: NavigationCTA
}

/* ======================================================
   FOOTER
   ====================================================== */

export interface FooterSocial {
  facebook: string
  twitter: string
  linkedin: string
  instagram: string
  youtube: string
}

export interface SiteFooter {
  policies: NavItem[]
  about: NavItem[]
  contact: NavItem[]
  social: FooterSocial
}

/* ======================================================
   ROOT
   ====================================================== */

export interface SiteData {
  company: SiteCompany
  navigation: SiteNavigation
  footer: SiteFooter
}