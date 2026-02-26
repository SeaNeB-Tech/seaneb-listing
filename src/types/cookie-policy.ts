import type { PolicyData } from '@/types/policy'

/* ======================================================
   META
====================================================== */

export interface CookiePolicyMeta {
  title: string
  description: string
}

/* ======================================================
   ROOT
====================================================== */

export interface CookiePolicyData extends PolicyData {
  meta: CookiePolicyMeta
}