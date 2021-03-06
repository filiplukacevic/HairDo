﻿import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
  displayName = NavMenu.name

  render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect id="navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>HairDo</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>          
            <LinkContainer to={'/services'}>
              <NavItem>
                <Glyphicon glyph='education' /> Usluge
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/appointment'}>
              <NavItem>
                <Glyphicon glyph='th-list' /> Appointment
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
