import React from 'react'
import { Image } from 'react-bootstrap'
import WLTlogo from '../../assets/WLT.svg'

const WeLoveTechFloatingLogo = () => {
  return (
    <div id='floatingLogo'>
        <Image src={WLTlogo.src} alt='we love tech logo'/>
    </div>
  )
}

export default WeLoveTechFloatingLogo