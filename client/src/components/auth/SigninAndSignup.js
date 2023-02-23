import React, { useState } from 'react'
import Signin from './Signin'
import Signup from './Signup'

const SigninAndSignup = () => {

    const [togglePanel, setTogglePanel] = useState(false)

    const signUpButton = () => {
        setTogglePanel(true);
    }

    const signInButton = () => {
        setTogglePanel(false)
    }

    return (
        <>
            <div className='Container'>
                <Signin />
                <Signup />
                <div className='OverlayContainer'>
                    <div className='Overlay'>

                    </div>
                </div>
            </div>
        </>
    )
}

export default SigninAndSignup