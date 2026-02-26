/* ======================================================
   META
   ====================================================== */

export interface SeaNebAppMeta {
  title: string
  description: string
}

/* ======================================================
   HERO
   ====================================================== */

export interface SeaNebAppHero {
  heading: string
  subheading: string
}

/* ======================================================
   WHAT IS APP
   ====================================================== */

export interface SeaNebWhatIsApp {
  heading: string
  subheading: string
  image: string
  imageAlt: string
  paragraphs: string[]
}

/* ======================================================
   LOCAL DISCOVERY CTA
   ====================================================== */

export interface AppStoreLink {
  href: string
  image: string
  alt: string
}

export interface SeaNebLocalDiscoveryCta {
  heading: string
  line1: string
  line2: string
  appStore: AppStoreLink
  googlePlay: AppStoreLink
  qrCode: {
    image: string
    alt: string
  }
}

/* ======================================================
   WHY CHOOSE
   ====================================================== */

export interface FeatureItem {
  title: string
  text: string
}

export interface AudienceItem {
  title: string
  text: string
}

export interface WhyChooseBlock {
  heading: string
  subheading: string
  whatYouGet: {
    heading: string
    subheading: string
    features: FeatureItem[]
  }
  whoIsItFor: {
    heading: string
    subheading: string
    audiences: AudienceItem[]
  }
}

/* ======================================================
   KEY BENEFITS
   ====================================================== */

export interface KeyBenefitItem {
  title: string
  img: string
  body: string
  whyLabel: string
  points: string[]
}

export interface SeaNebKeyBenefits {
  heading: string
  items: KeyBenefitItem[]
}

/* ======================================================
   FEATURES TABLE
   ====================================================== */

export interface FeatureTableRow {
  feature: string
  description: string
}

export interface SeaNebFeaturesTable {
  heading: string
  mockupImage: string
  mockupAlt: string
  rows: FeatureTableRow[]
}

/* ======================================================
   FAQ
   ====================================================== */

export interface FaqItemType {
  question: string
  answer: string
  listAnswer?: string[] | null
  listSuffix?: string
}

export interface SeaNebFaq {
  heading: string
  subheading: string
  items: FaqItemType[]
}

/* ======================================================
   ROOT
   ====================================================== */

export interface SeaNebAppData {
  meta: SeaNebAppMeta
  hero: SeaNebAppHero
  whatIsApp: SeaNebWhatIsApp
  localDiscoveryCta: SeaNebLocalDiscoveryCta
  whyChoose: WhyChooseBlock
  keyBenefits: SeaNebKeyBenefits
  featuresTable: SeaNebFeaturesTable
  faq: SeaNebFaq
}