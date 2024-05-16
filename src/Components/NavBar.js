import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {LogOut} from "../Auth/LogOut";
import { LinkContainer } from 'react-router-bootstrap';

function NavBar() {

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#000080" }}>
      <Container>
        <LinkContainer to="/dashboard/home">
          <Navbar.Brand>
            <img src="/markdown.png" style={{ width: 50, height: 50 }} />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <LinkContainer to="/dashboard/home" style={{ color: "white" }}>
            <Nav.Link>
              <h4 style={{ fontFamily: "cursive" }}>Markdown Viewer</h4>
            </Nav.Link>
          </LinkContainer>
          <Nav className="ms-auto">
            <LinkContainer to="/dashboard/home" style={{ color: "white" }}>
              <Nav.Link>Help</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/dashboard/get" style={{ color: "white" }}>
              <Nav.Link>Projects</Nav.Link>
            </LinkContainer>

            <Button variant="danger" onClick={LogOut}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
