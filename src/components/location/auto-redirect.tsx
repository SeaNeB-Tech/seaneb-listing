'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getLocationData } from '@/utils/location'
import { toUrlName } from '@/utils'

// Flag to prevent continuous redirect loops
const REDIRECT_FLAG = 'has_redirected_to_location'

export const AutoRedirect = () => {
  const router = useRouter()
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    // Only run this once per session/visit if not already redirected
    if (sessionStorage.getItem(REDIRECT_FLAG)) {
      return
    }

    const checkLocationAndRedirect = async () => {
      try {
        setChecking(true)
        const locationData = await getLocationData()
        
        if (locationData && locationData.city) {
          // Mark as redirected to prevent infinite loops if they navigate back to home
          sessionStorage.setItem(REDIRECT_FLAG, 'true')
          
          // Construct the redirect URL (assuming country code is 'in' for India for now,
          // or we can use locationData.countryCode if available)
          const countryCode = locationData.countryCode?.toLowerCase() || 'in'
          const citySlug = toUrlName(locationData.city)
          
          router.replace(`/${countryCode}/${citySlug}`)
        }
      } catch (error) {
        console.error('Auto-redirect failed:', error)
      } finally {
        setChecking(false)
      }
    }

    checkLocationAndRedirect()
  }, [router])

  return null // This is a logic-only component, it doesn't render anything
}
