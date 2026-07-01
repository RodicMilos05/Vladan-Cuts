import { Container } from 'react-bootstrap';

const GalleryScreen = () => {
  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-3">Galerija radova</h1>
      <p className="text-muted">
        Ovde će biti prikazana galerija prethodnih radova.
      </p>
    </Container>
  );
};

export default GalleryScreen;