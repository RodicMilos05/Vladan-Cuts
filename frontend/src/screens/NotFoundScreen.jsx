import { Button, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NotFoundScreen = () => {
  return (
    <Container className="py-5 text-center">
      <h1 className="fw-bold">404</h1>
      <p className="text-muted">Stranica nije pronađena.</p>

      <LinkContainer to="/">
        <Button variant="dark">Nazad na početnu</Button>
      </LinkContainer>
    </Container>
  );
};

export default NotFoundScreen;