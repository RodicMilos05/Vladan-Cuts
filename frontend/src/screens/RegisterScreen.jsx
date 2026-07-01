import { Button, Card, Container, Form } from 'react-bootstrap';

const RegisterScreen = () => {
  return (
    <Container className="py-5 auth-container">
      <Card className="shadow-sm border-0">
        <Card.Body className="p-4">
          <h1 className="h3 fw-bold mb-4">Registracija</h1>

          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Ime i prezime</Form.Label>
              <Form.Control type="text" placeholder="Unesite ime i prezime" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email adresa</Form.Label>
              <Form.Control type="email" placeholder="Unesite email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Telefon</Form.Label>
              <Form.Control type="text" placeholder="Unesite broj telefona" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="password">
              <Form.Label>Lozinka</Form.Label>
              <Form.Control type="password" placeholder="Unesite lozinku" />
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100">
              Registruj se
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterScreen;