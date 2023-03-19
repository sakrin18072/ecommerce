import React from 'react'
import {Link} from 'react-router-dom'
const Footer = () => {
  return (
    <div style={{backgroundColor:'#212527',minHeight:'20vh'}} className='text-light justify-content-center d-flex flex-column align-items-center'>
      <p>All rights reserved &copy; sakrin</p>
      <p>
        <Link className='footer-link' to='/about'>About</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
        <Link className='footer-link' to='/contact'>Contact</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
        <Link className='footer-link' to='/policy'>Privacy Policy</Link>
      </p>
    </div>
  )
}

export default Footer