import type { PolicyData } from '@/types/policy'

/* ======================================================
   META
====================================================== */

export interface TermsMeta {
  title: string
  description: string
}

/* ======================================================
   ROOT
====================================================== */

export interface TermsAndConditionsData extends PolicyData {
  meta: TermsMeta
}