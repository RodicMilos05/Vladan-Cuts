import { Button, Col, Container, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const HomeScreen = () => {
  return (
    <Container className="py-5">
      <Row className="align-items-center">
        <Col lg={7}>
          <p className="text-uppercase text-muted fw-semibold mb-2">
            Online zakazivanje termina
          </p>
          <h1 className="display-4 fw-bold mb-3">
            Vladan Cuts
          </h1>
          <p className="lead text-muted mb-4">
            Moderna veb aplikacija za pregled usluga, galerije radova i zakazivanje frizerskih termina.
          </p>

          <div className="d-flex gap-3 flex-wrap">
            <LinkContainer to="/zakazivanje">
              <Button variant="dark" size="lg">
                Zakaži termin
              </Button>
            </LinkContainer>

            <LinkContainer to="/usluge">
              <Button variant="outline-dark" size="lg">
                Pogledaj usluge
              </Button>
            </LinkContainer>
          </div>
        </Col>

        <Col lg={5} className="mt-5 mt-lg-0">
          <div className="hero-card p-4 rounded-4 shadow">
            <h3 className="fw-bold mb-3">Radno vreme</h3>
            <p className="mb-2">Ponedeljak - Petak: 09:00 - 20:00</p>
            <p className="mb-2">Subota: 09:00 - 16:00</p>
            <p className="mb-0">Nedelja: neradni dan</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;