

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

type RequireAuthProp = {
    children: JSX.Element,
}

type AuthProp = {
    auth: string
}

const RequireAuth = (props: RequireAuthProp) => {


    const auth = useSelector((state: AuthProp) => state.auth)
    const navigate = useNavigate();

    useEffect(() => {
      
        if(!auth){ // if string is empty then not logged in properly

            navigate('/')
        }

    }, [auth])


    return props.children
    
}

export default RequireAuth