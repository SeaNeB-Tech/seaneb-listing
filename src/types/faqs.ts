/* ======================================================
   META
====================================================== */

export interface FaqsMeta {
  title: string
  description: string
}

/* ======================================================
   ITEMS
====================================================== */

export interface FaqItemType {
  question: string
  answer: string
}

export interface FaqCategory {
  category: string
  items: FaqItemType[]
}

/* ======================================================
   ROOT
====================================================== */

export interface FaqsData {
  meta: FaqsMeta
  heading: string
  subheading: string
  categories: FaqCategory[]
}