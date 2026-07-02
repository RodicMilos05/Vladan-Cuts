import { useEffect, useState } from 'react';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import ServiceCard from '../components/ServiceCard';
import api from '../utils/api';

function ServicesScreen() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await api.get('/api/services');

        const activeServices = data.filter((service) => service.isActive);

        setServices(activeServices);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            'Došlo je do greške prilikom učitavanja usluga.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <Container className="py-5">
      <h1 className="mb-3">Usluge</h1>

      <p className="text-muted mb-4">
        Pogledajte dostupne frizerske usluge i izaberite termin koji vam
        odgovara.
      </p>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && services.length === 0 && (
        <Alert variant="info">Trenutno nema dostupnih usluga.</Alert>
      )}

      {!loading && !error && services.length > 0 && (
        <Row className="g-4">
          {services.map((service) => (
            <Col key={service._id} md={6} lg={4}>
              <ServiceCard service={service} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default ServicesScreen;