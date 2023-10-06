import React from 'react'
import '../style/footerStyle.css'

function Footer() {
  return (
    <div className='footer'>
       <p>Pour les passionné-e-s de plantes </p>
       <p>Laisser nous votre mail</p>
       <input type='email' placeholder='Ecrivez votre mail'/>
    </div>
  )
}

export default Footer