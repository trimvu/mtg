import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <>
        <ul>
            
            <li> <Link to="/">Home</Link> </li>
            <li> <Link to="/signup">Sign Up</Link></li>
            <li> <Link to="/signin">Sign In</Link></li>
            <li> <Link to="/profile">Profile</Link></li>
            <li> <Link to="/signout">Sign Out</Link> </li>
            
        </ul>
    </>
  )
}

export default Header