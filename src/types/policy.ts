/* ======================================================
   GENERIC POLICY TYPES
====================================================== */

export interface PolicyAddress {
  company: string
  street: string
  city: string
  state: string
  email?: string
}

export interface PolicySectionType {
  id?: string
  heading?: string
  level?: number
  paragraphs?: string[]
  list?: string[]
  listSuffix?: string
  address?: PolicyAddress
  subsections?: PolicySectionType[]
}

export interface PolicyData {
  title: string
  lastUpdated: string
  sections?: PolicySectionType[]
}