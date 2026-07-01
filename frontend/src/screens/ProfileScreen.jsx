import { Button, Card, Container, Form } from 'react-bootstrap';

const ProfileScreen = () => {
  return (
    <Container className="py-5 auth-container">
      <Card className="shadow-sm border-0">
        <Card.Body className="p-4">
          <h1 className="h3 fw-bold mb-4">Moj profil</h1>

          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Ime i prezime</Form.Label>
              <Form.Control type="text" placeholder="Ime korisnika" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email adresa</Form.Label>
              <Form.Control type="email" placeholder="Email korisnika" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="phone">
              <Form.Label>Telefon</Form.Label>
              <Form.Control type="text" placeholder="Telefon korisnika" />
            </Form.Group>

            <Button variant="dark" type="submit">
              Sačuvaj izmene
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfileScreen;