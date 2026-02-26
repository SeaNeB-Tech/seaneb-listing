import type { PolicyData } from '@/types/policy'

/* ======================================================
   META
====================================================== */

export interface ContentPolicyMeta {
  title: string
  description: string
}

/* ======================================================
   ROOT
====================================================== */

export interface ContentPolicyData extends PolicyData {
  meta: ContentPolicyMeta
}