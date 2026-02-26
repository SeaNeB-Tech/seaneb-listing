import type { PolicyData } from '@/types/policy'

/* ======================================================
   META
====================================================== */

export interface ChildSafetyStandardsPolicyMeta {
  title: string
  description: string
}

/* ======================================================
   ROOT
====================================================== */

export interface ChildSafetyStandardsPolicyData extends PolicyData {
  meta: ChildSafetyStandardsPolicyMeta
}