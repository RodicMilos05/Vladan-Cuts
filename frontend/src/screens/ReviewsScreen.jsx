import { Container } from 'react-bootstrap';

const ReviewsScreen = () => {
  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-3">Komentari korisnika</h1>
      <p className="text-muted">
        Ovde će biti prikazani komentari i ocene korisnika.
      </p>
    </Container>
  );
};

export default ReviewsScreen;