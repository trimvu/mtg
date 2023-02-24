import React from 'react'
import { Link } from 'react-router-dom'

import Search from '../Search'
import Random from '../Random'

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Signout from '../auth/Signout';

import './Header.css'

const Header = () => {
  return (
    <>
        {/* <ul> */}
            
            {/* <li> <Link to="/">Home</Link> </li> */}
            {/* <li> <Link to="/signup">Sign Up</Link></li> */}
            {/* <li> <Link to="/signin">Sign In</Link></li> */}
            {/* <li> <Link to="/profile">Profile</Link></li> */}
            {/* <li> <Link to="/signout">Sign Out</Link> </li> */}
            
        {/* </ul> */}

        <Navbar className='nav-bg fixed-top' expand="lg">
          <Container fluid>
            <Navbar.Brand href="/">Magic: The Gathering Price Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link><Link className='nav-link-color' to='/'>Home</Link></Nav.Link>
                <Nav.Link><Link className='nav-link-color' to="/profile">Profile</Link></Nav.Link>
                <Nav.Link>
                  <Link className='nav-link-color' to="/"><Signout /></Link>
                </Nav.Link>
              </Nav>
                <Search />
              <Form className="d-flex">
                <Random />
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <br /><br />
    </>
  )
}

export default Header