// ** React Imports
import React from 'react'

import Footer from './footer'
import Header from './header'
import ScrollToTopButton from './scroll-to-top'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className=''>
        <Header />
        {children}
        <Footer />
      </main>
      <ScrollToTopButton />
    </>
  )
}

export default Layout
