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
        <Navbar className='nav-bg fixed-top' expand="lg">
          <Container fluid>
            <Navbar.Brand style={{ color : 'rgba(194,159,55,1)'}} href="/">Magic: The Gathering Price Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Link className='nav-link-color' to='/'>Home</Link>
                <Link className='nav-link-color' to="/profile">Profile</Link>
                <Link className='nav-link-color' to="/"><Signout /></Link>
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