import React from 'react'

import './Footer.css'

import { FaGithub, FaLinkedin, FaFingerprint } from 'react-icons/fa'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const Footer = () => {
  return (
    <>
        <br />
        <div className='footer'>
            
            <a href='https://github.com/trimvu' target='_blank' rel='noreferrer'><FaGithub className='icons' size={25} /></a>

            <a href='https://www.linkedin.com/in/tri-minh-vu/' target='_blank' rel='noreferrer'><FaLinkedin className="icons" size={25} /></a>

            <a href='https://tri-vu-dev.netlify.app' target='_blank' rel='noreferrer'><FaFingerprint className='icons' size={25} /></a>

        </div>
    </>
  )
}

export default Footer