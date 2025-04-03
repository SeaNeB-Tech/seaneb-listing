'use client'

import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

// ** Motion Imports
import * as m from 'motion/react-m'

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false)

      const scrollToTopBtn = document.getElementById('scrollToTop')
      const targetSection = document.getElementById('targetSection')
      if (scrollToTopBtn && targetSection) {
        const buttonRect = scrollToTopBtn.getBoundingClientRect()
        const sectionRect = targetSection.getBoundingClientRect()

        if (buttonRect.top < sectionRect.bottom && buttonRect.bottom > sectionRect.top) {
          scrollToTopBtn.classList.add('on-section')
        } else {
          scrollToTopBtn.classList.remove('on-section')
        }
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
  }

  return (
    <m.button
      id='scrollToTop'
      initial={{ opacity: 0, bottom: -20 }}
      animate={isVisible ? { opacity: 1, bottom: 40 } : {}}
      transition={{ duration: 0.3, ease: 'linear' }}
      className={`bg-textMain bg-primary fixed right-10 bottom-10 z-[9999999] rounded-full p-2 transition-opacity duration-200 outline-none ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-label='Scroll to top button'
      onClick={scrollToTop}
    >
      <ChevronUp className='text-inherit' />
    </m.button>
  )
}

export default ScrollToTopButton
