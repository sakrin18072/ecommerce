import React from 'react'
import Footer from './Footer'
import Header from './Header'
import {Toaster} from 'react-hot-toast'

const Layout = ({children}) => {
  return (
    <>
        <Header/>
        <Toaster/>
        <main className='display-6' style={{minHeight:'80vh'}}>
            {children}
        </main>
        <Footer/>
    </>
  )
}

export default Layout