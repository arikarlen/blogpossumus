import React from 'react'
import { Image } from 'react-bootstrap'
import WLTlogo from '../../assets/WLT.svg'

const floatingLogo = ({logo}) => {
  return (
    <div id='floatingLogo'>
        <Image src={logo.data ? logo.data.attributes.url : WLTlogo.src} alt='we love tech logo'/>
    </div>
  )
}

export default floatingLogo