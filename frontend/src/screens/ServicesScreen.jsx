import { Col, Container, Row } from 'react-bootstrap';
import { services } from '../data/mockData';
import ServiceCard from '../components/ServiceCard';

const ServicesScreen = () => {
  return (
    <Container className="py-5">
      <div className="mb-5 text-center">
        <p className="text-uppercase text-muted fw-semibold mb-2">
          Cenovnik
        </p>
        <h1 className="fw-bold mb-3">Usluge</h1>
        <p className="text-muted mx-auto page-description">
          Pregled dostupnih frizerskih usluga, cena i okvirnog trajanja termina.
        </p>
      </div>

      <Row className="g-4">
        {services.map((service) => (
          <Col md={6} lg={3} key={service.id}>
            <ServiceCard service={service} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ServicesScreen;