/* ======================================================
   META
====================================================== */

export interface PartnerMeta {
  title: string
  description: string
}

/* ======================================================
   HERO
====================================================== */

export interface PartnerHero {
  badge: string
  heading: string
  headingSuffix: string
  subheading: string
  ctaLabel: string
  ctaHref: string
}

/* ======================================================
   INTRO
====================================================== */

export interface PartnerIntro {
  heading: string
  paragraphs: string[]
}

/* ======================================================
   PRICING
====================================================== */

export interface PartnerPlan {
  id: string
  name: string
  label: string
  highlight: boolean
  popularLabel?: string
  features: string[]
}

export interface PartnerPricing {
  heading: string
  subheading: string
  plans: PartnerPlan[]
}

/* ======================================================
   WHY PARTNER
====================================================== */

/**
 * icon is string because JSON stores icon name
 * Later mapped to Lucide component
 */
export interface PartnerReason {
  icon:
    | 'Globe'
    | 'Settings'
    | 'BadgeCheck'
    | 'BarChart3'
    | 'MessageSquare'
    | 'DollarSign'
    | 'Rocket'
  title: string
  description: string
}

export interface PartnerWhyPartner {
  heading: string
  subheading: string
  reasons: PartnerReason[]
}

/* ======================================================
   HOW IT WORKS
====================================================== */

export interface PartnerStep {
  step: string
  title: string
  description: string
}

export interface PartnerHowItWorks {
  heading: string
  subheading: string
  steps: PartnerStep[]
}

/* ======================================================
   FAQ
====================================================== */

export interface PartnerFaqItem {
  question: string
  answer: string
}

export interface PartnerFaq {
  heading: string
  subheading: string
  contactNote: string
  contactLinkLabel: string
  contactHref: string
  contactSuffix: string
  items: PartnerFaqItem[]
}

/* ======================================================
   CTA
====================================================== */

export interface PartnerCta {
  heading: string
  subheading: string
  buttonLabel: string
  buttonHref: string
}

/* ======================================================
   ROOT
====================================================== */

export interface PartnerWithUsData {
  meta: PartnerMeta
  hero: PartnerHero
  intro: PartnerIntro
  pricing: PartnerPricing
  whyPartner: PartnerWhyPartner
  howItWorks: PartnerHowItWorks
  faq: PartnerFaq
  cta: PartnerCta
}