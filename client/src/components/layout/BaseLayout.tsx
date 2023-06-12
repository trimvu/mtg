import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { useSelector } from 'react-redux'

type BaseLayoutProp = {
  children: React.ReactNode
}

type AuthProp = {
  auth: string,
}

const BaseLayout = (props: BaseLayoutProp) => {

  const auth = useSelector((state: AuthProp) => state.auth)
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