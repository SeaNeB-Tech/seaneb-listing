/* ======================================================
   META
====================================================== */

export interface PressKitMeta {
  title: string
  description: string
}

/* ======================================================
   ABOUT
====================================================== */

export interface PressKitAbout {
  heading: string
  paragraphs: string[]
}

/* ======================================================
   FACTS
====================================================== */

export interface PressKitFactItem {
  label: string
  value: string
}

export interface PressKitFacts {
  heading: string
  items: PressKitFactItem[]
}

/* ======================================================
   ASSETS
====================================================== */

export interface PressKitAssetItem {
  label: string
  href: string
}

export interface PressKitAssets {
  heading: string
  items: PressKitAssetItem[]
}

/* ======================================================
   MEDIA CONTACT
====================================================== */

export interface PressKitMediaContact {
  heading: string
  name: string
  email: string
  website: string
}

/* ======================================================
   ROOT
====================================================== */

export interface PressKitData {
  meta: PressKitMeta
  heading: string
  subheading: string
  about: PressKitAbout
  facts: PressKitFacts
  assets: PressKitAssets
  mediaContact: PressKitMediaContact
}