import { useEffect, useState } from 'react';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import GalleryCard from '../components/GalleryCard';
import api from '../utils/api';

function GalleryScreen() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const { data } = await api.get('/api/gallery');

        const activeItems = data.filter((item) => item.isActive);

        setGalleryItems(activeItems);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            'Došlo je do greške prilikom učitavanja galerije.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  return (
    <Container className="py-5">
      <h1 className="mb-3">Galerija</h1>

      <p className="text-muted mb-4">
        Pogledajte neke od radova i stilova šišanja dostupnih u Vladan Cuts
        salonu.
      </p>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && galleryItems.length === 0 && (
        <Alert variant="info">Trenutno nema stavki u galeriji.</Alert>
      )}

      {!loading && !error && galleryItems.length > 0 && (
        <Row className="g-4">
          {galleryItems.map((item) => (
            <Col key={item._id} md={6} lg={4}>
              <GalleryCard item={item} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default GalleryScreen;