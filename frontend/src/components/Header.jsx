import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaCalendarAlt, FaCut, FaUser, FaUserPlus, FaTools } from 'react-icons/fa';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="fw-bold d-flex align-items-center gap-2">
            <FaCut />
            Vladan Cuts
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-lg-center">
            <LinkContainer to="/">
              <Nav.Link>Početna</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/usluge">
              <Nav.Link>Usluge</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/galerija">
              <Nav.Link>Galerija</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/komentari">
              <Nav.Link>Komentari</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/zakazivanje">
              <Nav.Link>
                <FaCalendarAlt className="me-1" />
                Zakazivanje
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/moji-termini">
              <Nav.Link>Moji termini</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/profil">
              <Nav.Link>Profil</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/admin">
              <Nav.Link>
                <FaTools className="me-1" />
                Admin
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/login">
              <Button variant="outline-light" size="sm" className="ms-lg-3 mt-2 mt-lg-0">
                <FaUser className="me-1" />
                Login
              </Button>
            </LinkContainer>

            <LinkContainer to="/registracija">
              <Button variant="light" size="sm" className="ms-lg-2 mt-2 mt-lg-0">
                <FaUserPlus className="me-1" />
                Registracija
              </Button>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;