import { Container } from 'react-bootstrap';

const MyAppointmentsScreen = () => {
  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-3">Moji termini</h1>
      <p className="text-muted">
        Ovde će korisnik moći da vidi svoje zakazane termine.
      </p>
    </Container>
  );
};

export default MyAppointmentsScreen;