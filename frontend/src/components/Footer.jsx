import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer py-4">
      <Container>
        <Row className="align-items-center gy-3">
          <Col md={6}>
            <h5 className="mb-1">Vladan Cuts</h5>
            <p className="mb-0 text-secondary">
              Web aplikacija za pregled usluga i online zakazivanje termina.
            </p>
          </Col>

          <Col md={6} className="text-md-end">
            <div className="mb-2">
              <Link to="/usluge" className="me-3">
                Usluge
              </Link>
              <Link to="/galerija" className="me-3">
                Galerija
              </Link>
              <Link to="/komentari">Komentari</Link>
            </div>

            <small className="text-secondary">
              © {currentYear} Vladan Cuts. Sva prava zadržana.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;