type SocialLinks = {
  facebook: string
  instagram: string
  linkedin: string
  youtube: string
  twitter_x: string
}

type WebsiteConfigType = {
  name: string
  website: string
  officeAddress: string
  email: string

  social: SocialLinks   // ⭐ NEW

  appstore: string
  playstore: string
  github: string
  iframe: string
}

export const websiteConfig: WebsiteConfigType = {
  name: 'SeaNeB',
  website: 'https://www.seaneb.com/',
  officeAddress: 'Madhav Arcade, F-8, Jol, Anand, Gujarat 388315',
  email: 'hello@seaneb.com',

  social: {
    facebook: 'https://www.facebook.com/SeaNeBApp/',
    instagram: 'https://www.instagram.com/seaneb.app/',
    linkedin: 'https://www.linkedin.com/showcase/seaneb-app',
    youtube: 'https://www.youtube.com/@seaneb',
    twitter_x: 'https://x.com/SeaNeB'
  },

  github: '#',
  appstore: 'https://apps.apple.com/in/app/seaneb/id6755147919',
  playstore: 'https://play.google.com/store/apps/details?id=com.seaneb.offers',

  iframe: '<iframe ...>'
}
