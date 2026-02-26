/* ======================================================
   CONTACT META
   ====================================================== */

export interface ContactMeta {
  title: string
  description: string
}

/* ======================================================
   HERO
   ====================================================== */

export interface ContactHero {
  heading: string
  subheading: string
}

/* ======================================================
   CARDS
   ====================================================== */

export interface ContactCard {
  id: string
  heading: string
  description: string
  email: string
  image: string
  imageAlt: string
}

/* ======================================================
   FORM
   ====================================================== */

export type ContactFieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'textarea'

export interface ContactField {
  id: string
  label: string
  type: ContactFieldType
  required: boolean
  rows?: number // only textarea uses this
}

export interface ContactForm {
  intro: string
  fields: ContactField[]
  submitLabel: string
}

/* ======================================================
   ADDRESS
   ====================================================== */

export interface ContactAddress {
  companyName: string
  description: string
  street: string
  city: string
  state: string
  phone: string
  email: string
}

/* ======================================================
   SOCIAL
   ====================================================== */

export interface ContactSocial {
  backgroundImage: string
  heading: string
}

/* ======================================================
   ROOT
   ====================================================== */

export interface ContactData {
  meta: ContactMeta
  hero: ContactHero
  cards: ContactCard[]
  form: ContactForm
  address: ContactAddress
  social: ContactSocial
}