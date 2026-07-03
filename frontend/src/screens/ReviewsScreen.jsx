import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

function ReviewsScreen() {
  const { userInfo } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [error, setError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const { data } = await api.get('/api/reviews');

      setReviews(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Došlo je do greške prilikom učitavanja komentara.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    setSubmitError('');
    setSuccess('');

    if (!rating || !comment) {
      setSubmitError('Ocena i komentar su obavezni.');
      return;
    }

    if (Number(rating) < 1 || Number(rating) > 5) {
      setSubmitError('Ocena mora biti između 1 i 5.');
      return;
    }

    try {
      setSubmitLoading(true);

      await api.post(
        '/api/reviews',
        {
          rating: Number(rating),
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setRating(5);
      setComment('');
      setSuccess('Komentar je uspešno dodat.');

      await fetchReviews();
    } catch (err) {
      setSubmitError(
        err.response?.data?.message ||
          'Došlo je do greške prilikom dodavanja komentara.'
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <h1 className="mb-3">Komentari korisnika</h1>

      <p className="text-muted mb-4">
        Pogledajte iskustva korisnika koji su već koristili usluge salona.
      </p>

      <Card className="shadow-sm mb-5">
        <Card.Body>
          <h4 className="mb-3">Ostavite komentar</h4>

          {userInfo ? (
            <>
              {submitError && <Alert variant="danger">{submitError}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="rating">
                  <Form.Label>Ocena</Form.Label>
                  <Form.Select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="5">5 — Odlično</option>
                    <option value="4">4 — Vrlo dobro</option>
                    <option value="3">3 — Dobro</option>
                    <option value="2">2 — Slabo</option>
                    <option value="1">1 — Loše</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4" controlId="comment">
                  <Form.Label>Komentar</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Napišite svoje iskustvo..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="dark"
                  disabled={submitLoading}
                >
                  {submitLoading ? 'Slanje...' : 'Pošalji komentar'}
                </Button>
              </Form>
            </>
          ) : (
            <Alert variant="info" className="mb-0">
              Morate biti prijavljeni da biste ostavili komentar.{' '}
              <Link to="/prijava?redirect=/komentari" className="alert-link">
                Prijavite se
              </Link>
          </Alert>
          )}
        </Card.Body>
      </Card>

      <h2 className="mb-4">Svi komentari</h2>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && reviews.length === 0 && (
        <Alert variant="info">Trenutno nema komentara.</Alert>
      )}

      {!loading && !error && reviews.length > 0 && (
        <Row className="g-4">
          {reviews.map((review) => (
            <Col key={review._id} md={6} lg={4}>
              <ReviewCard review={review} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default ReviewsScreen;