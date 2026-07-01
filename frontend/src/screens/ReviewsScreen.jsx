import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { reviews } from '../data/mockData';
import ReviewCard from '../components/ReviewCard';

const ReviewsScreen = () => {
  return (
    <Container className="py-5">
      <div className="mb-5 text-center">
        <p className="text-uppercase text-muted fw-semibold mb-2">
          Iskustva korisnika
        </p>
        <h1 className="fw-bold mb-3">Komentari i ocene</h1>
        <p className="text-muted mx-auto page-description">
          Pregled komentara korisnika koji su koristili usluge.
        </p>
      </div>

      <Row className="g-4 mb-5">
        {reviews.map((review) => (
          <Col md={6} lg={4} key={review.id}>
            <ReviewCard review={review} />
          </Col>
        ))}
      </Row>

      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">
          <h2 className="h4 fw-bold mb-3">Ostavi komentar</h2>
          <p className="text-muted">
            Forma će biti funkcionalna nakon povezivanja sa backendom i prijavom korisnika.
          </p>

          <Form>
            <Form.Group className="mb-3" controlId="rating">
              <Form.Label>Ocena</Form.Label>
              <Form.Select>
                <option>Izaberite ocenu</option>
                <option value="5">5 - Odlično</option>
                <option value="4">4 - Vrlo dobro</option>
                <option value="3">3 - Dobro</option>
                <option value="2">2 - Slabo</option>
                <option value="1">1 - Loše</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="comment">
              <Form.Label>Komentar</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Napišite komentar"
              />
            </Form.Group>

            <Button variant="dark" type="submit">
              Pošalji komentar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ReviewsScreen;