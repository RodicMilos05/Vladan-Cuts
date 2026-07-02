import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const navigate = useNavigate();
  const { userInfo, logout } = useAuth();

  const logoutHandler = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" sticky="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Vladan Cuts</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
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
          </Nav>

          <Nav className="ms-auto">
            {userInfo ? (
              <>
                <LinkContainer to="/zakazivanje">
                  <Nav.Link>Zakazivanje</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/moji-termini">
                  <Nav.Link>Moji termini</Nav.Link>
                </LinkContainer>

                {userInfo.isAdmin && (
                  <LinkContainer to="/admin">
                    <Nav.Link>Admin</Nav.Link>
                  </LinkContainer>
                )}

                <NavDropdown title={userInfo.name} id="user-menu">
                  <LinkContainer to="/profil">
                    <NavDropdown.Item>Profil</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Divider />

                  <NavDropdown.Item onClick={logoutHandler}>
                    Odjavi se
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <LinkContainer to="/prijava">
                  <Nav.Link>Prijava</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/registracija">
                  <Nav.Link>Registracija</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;