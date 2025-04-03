import { routes } from '@/constants/routes'

export interface HeaderMenuData {
  title: string
  description?: string
  href: string
}

export const headerMenuData = (): HeaderMenuData[] => [
  {
    title: 'Home',
    href: routes.home
  },
  {
    title: 'About Us',
    href: routes.aboutUs
  }
]
