import type { PolicyData } from '@/types/policy'

export interface AcceptableUsePolicyMeta {
  title: string
  description: string
}

export interface AcceptableUsePolicyIntro {
  paragraph: string
  termsHref: string
  appliesTo: string
  scope: string[]
}

export interface AcceptableUsePolicyData extends PolicyData {
  meta: AcceptableUsePolicyMeta
  intro: AcceptableUsePolicyIntro
}