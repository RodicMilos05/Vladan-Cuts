import { useEffect, useState } from 'react';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import ReviewCard from '../components/ReviewCard';
import api from '../utils/api';

function ReviewsScreen() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
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

    fetchReviews();
  }, []);

  return (
    <Container className="py-5">
      <h1 className="mb-3">Komentari korisnika</h1>

      <p className="text-muted mb-4">
        Pogledajte iskustva korisnika koji su već koristili usluge salona.
      </p>

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