import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container className="text-center">
        <p className="mb-1 fw-semibold">Vladan Cuts</p>
        <p className="mb-0 small text-secondary">
          Veb aplikacija za zakazivanje frizerskih termina
        </p>
      </Container>
    </footer>
  );
};

export default Footer;