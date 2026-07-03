import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  Row,
  Spinner,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ServiceCard from '../components/ServiceCard';
import GalleryCard from '../components/GalleryCard';
import ReviewCard from '../components/ReviewCard';
import api from '../utils/api';

function HomeScreen() {
  const [services, setServices] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [servicesResponse, galleryResponse, reviewsResponse] =
          await Promise.all([
            api.get('/api/services'),
            api.get('/api/gallery'),
            api.get('/api/reviews'),
          ]);

        setServices(
          servicesResponse.data
            .filter((service) => service.isActive)
            .slice(0, 3)
        );

        setGalleryItems(
          galleryResponse.data
            .filter((item) => item.isActive)
            .slice(0, 3)
        );

        setReviews(reviewsResponse.data.slice(0, 3));
      } catch (err) {
        setError(
          err.response?.data?.message ||
            'Došlo je do greške prilikom učitavanja podataka.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <>
      <section className="hero-section text-light py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={7}>
              <h1 className="display-4 fw-bold">Vladan Cuts</h1>

              <p className="lead mt-3">
                Moderan barbershop sistem za pregled usluga, galerije i online
                zakazivanje termina.
              </p>

              <div className="d-flex gap-3 mt-4">
                <LinkContainer to="/zakazivanje">
                  <Button variant="light" size="lg">
                    Zakaži termin
                  </Button>
                </LinkContainer>

                <LinkContainer to="/usluge">
                  <Button variant="outline-light" size="lg">
                    Pogledaj usluge
                  </Button>
                </LinkContainer>
              </div>
            </Col>

            <Col lg={5} className="mt-4 mt-lg-0">
              <div className="bg-light text-dark rounded p-4 shadow">
                <h4>Zašto Vladan Cuts?</h4>
                <p className="mb-2">Brzo zakazivanje termina.</p>
                <p className="mb-2">Pregled dostupnih usluga.</p>
                <p className="mb-0">Moderan i jednostavan korisnički sistem.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="py-5">
        {loading && (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && (
          <>
            <section className="mb-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Popularne usluge</h2>

                <LinkContainer to="/usluge">
                  <Button variant="outline-dark">Sve usluge</Button>
                </LinkContainer>
              </div>

              <Row className="g-4">
                {services.map((service) => (
                  <Col key={service._id} md={6} lg={4}>
                    <ServiceCard service={service} />
                  </Col>
                ))}
              </Row>
            </section>

            <section className="mb-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Galerija radova</h2>

                <LinkContainer to="/galerija">
                  <Button variant="outline-dark">Cela galerija</Button>
                </LinkContainer>
              </div>

              <Row className="g-4">
                {galleryItems.map((item) => (
                  <Col key={item._id} md={6} lg={4}>
                    <GalleryCard item={item} />
                  </Col>
                ))}
              </Row>
            </section>

            <section>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Komentari korisnika</h2>

                <LinkContainer to="/komentari">
                  <Button variant="outline-dark">Svi komentari</Button>
                </LinkContainer>
              </div>

              <Row className="g-4">
                {reviews.map((review) => (
                  <Col key={review._id} md={6} lg={4}>
                    <ReviewCard review={review} />
                  </Col>
                ))}
              </Row>
            </section>
          </>
        )}
      </Container>
    </>
  );
}

export default HomeScreen;