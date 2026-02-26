import type { PolicyData } from '@/types/policy'

/* ======================================================
   META
====================================================== */

export interface RefundPolicyMeta {
  title: string
  description: string
}

/* ======================================================
   ROOT
====================================================== */

export interface RefundPolicyData extends PolicyData {
  meta: RefundPolicyMeta
}