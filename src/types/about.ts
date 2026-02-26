/* ======================================================
   ABOUT PAGE TYPES
   ====================================================== */

export interface AboutMeta {
  title: string
  description: string
}

/* ======================================================
   HERO
   ====================================================== */

export interface AboutHero {
  heading: string
  subheading: string
}

/* ======================================================
   INTRO
   ====================================================== */

export interface AboutCompanyLink {
  href: string
  label: string
}

export interface AboutIntroParagraph {
  text?: string
  companyLink?: AboutCompanyLink
}

export interface AboutIntro {
  logo: string
  logoAlt: string
  heading: string
  paragraphs: AboutIntroParagraph[]
}

/* ======================================================
   WHOM WE SERVE
   ====================================================== */

export interface AboutAudience {
  id: string
  heading: string
  subheading: string
  image: string
  imageAlt: string
  paragraphs: string[]
  reverse: boolean
}

export interface AboutWhomWeServe {
  heading: string
  audiences: AboutAudience[]
}

/* ======================================================
   OUR STORY
   ====================================================== */

export interface AboutCTA {
  label: string
  href: string
}

export interface AboutOurStory {
  image: string
  imageAlt: string
  heading: string
  subheading: string
  paragraphs: string[]
  quote: string
  closingParagraph: string
  cta: AboutCTA
  modiLink: string
}

/* ======================================================
   VISION / MISSION
   ====================================================== */

export interface AboutCoreValueItem {
  title: string
  text: string
}

export interface AboutCoreValues {
  heading: string
  items: AboutCoreValueItem[]
}

export interface AboutMissionVisionBlock {
  heading: string
  text: string
}

export interface AboutVisionMission {
  brandName: string
  mission: AboutMissionVisionBlock
  vision: AboutMissionVisionBlock
  coreValues: AboutCoreValues
}

/* ======================================================
   ROOT TYPE
   ====================================================== */

export interface AboutData {
  meta: AboutMeta
  hero: AboutHero
  intro: AboutIntro
  whomWeServe: AboutWhomWeServe
  ourStory: AboutOurStory
  visionMission: AboutVisionMission
}