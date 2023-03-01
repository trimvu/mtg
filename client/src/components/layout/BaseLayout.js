import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { useSelector } from 'react-redux'

const BaseLayout = (props) => {

  const auth = useSelector(state => state.auth)
  // console.log("auth", auth)

  return (
    <>
        {
          typeof auth === 'string'
          ?
          <Header />
          :
          ''
        }
        
        <br />
        
        {props.children}

        <br />

        <Footer />
    </>
  )
}

export default BaseLayout