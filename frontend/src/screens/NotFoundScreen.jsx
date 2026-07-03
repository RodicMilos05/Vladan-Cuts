import { Button, Card, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function NotFoundScreen() {
  return (
    <Container className="py-5">
      <Card className="mx-auto text-center shadow-sm" style={{ maxWidth: '600px' }}>
        <Card.Body className="py-5">
          <h1 className="display-4 fw-bold">404</h1>

          <h3 className="mb-3">Stranica nije pronađena</h3>

          <p className="text-muted mb-4">
            Stranica koju tražite ne postoji ili je promenjena njena adresa.
          </p>

          <LinkContainer to="/">
            <Button variant="dark">Vrati se na početnu</Button>
          </LinkContainer>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default NotFoundScreen;