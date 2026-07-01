import { Button, Card, Container, Form } from 'react-bootstrap';

const BookingScreen = () => {
  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-4">Zakazivanje termina</h1>

      <Card className="shadow-sm border-0">
        <Card.Body className="p-4">
          <Form>
            <Form.Group className="mb-3" controlId="service">
              <Form.Label>Usluga</Form.Label>
              <Form.Select>
                <option>Izaberite uslugu</option>
                <option>Muško šišanje</option>
                <option>Šišanje + brada</option>
                <option>Fade šišanje</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Datum</Form.Label>
              <Form.Control type="date" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="time">
              <Form.Label>Vreme</Form.Label>
              <Form.Control type="time" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="note">
              <Form.Label>Napomena</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Unesite napomenu ako je potrebno" />
            </Form.Group>

            <Button variant="dark" type="submit">
              Zakaži termin
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookingScreen;