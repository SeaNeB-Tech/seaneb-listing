import type { PolicyData } from '@/types/policy'

/* ======================================================
   META
====================================================== */

export interface PrivacyPolicyMeta {
  title: string
  description: string
}

/* ======================================================
   INTRO
====================================================== */

export interface PrivacyPolicyIntro {
  paragraph: string
  points: string[]
  contactNote: string
}

/* ======================================================
   SUMMARY POINTS
====================================================== */

export interface PrivacySummaryPoint {
  label: string
  text: string
}

/* ======================================================
   ROOT
====================================================== */

export interface PrivacyPolicyData extends PolicyData {
  meta: PrivacyPolicyMeta
  intro: PrivacyPolicyIntro
  summaryPoints: PrivacySummaryPoint[]
  tableOfContents: string[]
}