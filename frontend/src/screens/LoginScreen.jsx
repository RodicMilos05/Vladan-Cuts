import { Button, Card, Container, Form } from 'react-bootstrap';

const LoginScreen = () => {
  return (
    <Container className="py-5 auth-container">
      <Card className="shadow-sm border-0">
        <Card.Body className="p-4">
          <h1 className="h3 fw-bold mb-4">Prijava</h1>

          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email adresa</Form.Label>
              <Form.Control type="email" placeholder="Unesite email" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="password">
              <Form.Label>Lozinka</Form.Label>
              <Form.Control type="password" placeholder="Unesite lozinku" />
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100">
              Prijavi se
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginScreen;