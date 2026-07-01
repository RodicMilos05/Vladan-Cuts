import { Col, Container, Row } from 'react-bootstrap';
import { galleryItems } from '../data/mockData';
import GalleryCard from '../components/GalleryCard';

const GalleryScreen = () => {
  return (
    <Container className="py-5">
      <div className="mb-5 text-center">
        <p className="text-uppercase text-muted fw-semibold mb-2">
          Prethodni radovi
        </p>
        <h1 className="fw-bold mb-3">Galerija radova</h1>
        <p className="text-muted mx-auto page-description">
          Prikaz različitih stilova šišanja i sređivanja brade.
        </p>
      </div>

      <Row className="g-4">
        {galleryItems.map((item) => (
          <Col md={6} lg={3} key={item.id}>
            <GalleryCard item={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GalleryScreen;