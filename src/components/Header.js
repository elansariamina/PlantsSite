import React from 'react'
import Logo from '../assets/logo.png';
import '../style/headerStyle.css';

function Header() {
  return (
    <>
        <div className='header-dev'>
            <img src={Logo} alt='' className='header-image'/>
            <span className='header-text'>La maison jungle</span>
        </div>
    </>
  )
}

export default Header