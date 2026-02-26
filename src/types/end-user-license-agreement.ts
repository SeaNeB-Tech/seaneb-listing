import type { PolicyData } from '@/types/policy'

/* ======================================================
   META
====================================================== */

export interface EulaMeta {
  title: string
  description: string
}

/* ======================================================
   ROOT
====================================================== */

export interface EulaData extends PolicyData {
  meta: EulaMeta
}