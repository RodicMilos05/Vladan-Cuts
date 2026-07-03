import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Container,
  Spinner,
  Table,
} from 'react-bootstrap';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

function AdminReviewsScreen() {
  const { userInfo } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoadingId, setDeleteLoadingId] = useState('');
  const [error, setError] = useState('');
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

  const deleteReviewHandler = async (reviewId) => {
    const confirmed = window.confirm(
      'Da li ste sigurni da želite da obrišete ovaj komentar?'
    );

    if (!confirmed) {
      return;
    }

    try {
      setError('');
      setSuccess('');
      setDeleteLoadingId(reviewId);

      await api.delete(`/api/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      setSuccess('Komentar je uspešno obrisan.');

      await fetchReviews();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Došlo je do greške prilikom brisanja komentara.'
      );
    } finally {
      setDeleteLoadingId('');
    }
  };

  return (
    <Container className="py-5">
      <h1 className="mb-3">Admin — komentari</h1>

      <p className="text-muted mb-4">
        Pregled komentara korisnika i brisanje nepoželjnih komentara.
      </p>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : reviews.length === 0 ? (
        <Alert variant="info">Trenutno nema komentara.</Alert>
      ) : (
        <Card className="shadow-sm">
          <Card.Body>
            <Table responsive hover className="align-middle">
              <thead>
                <tr>
                  <th>Korisnik</th>
                  <th>Ocena</th>
                  <th>Komentar</th>
                  <th>Akcija</th>
                </tr>
              </thead>

              <tbody>
                {reviews.map((review) => (
                  <tr key={review._id}>
                    <td>{review.user?.name || 'Korisnik nije pronađen'}</td>
                    <td>
                      {'★'.repeat(review.rating)}
                      {'☆'.repeat(5 - review.rating)}
                    </td>
                    <td>{review.comment}</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        disabled={deleteLoadingId === review._id}
                        onClick={() => deleteReviewHandler(review._id)}
                      >
                        {deleteLoadingId === review._id
                          ? 'Brisanje...'
                          : 'Obriši'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default AdminReviewsScreen;