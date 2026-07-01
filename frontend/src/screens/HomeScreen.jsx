import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaCalendarAlt, FaCut, FaImages, FaStar } from 'react-icons/fa';
import { services, reviews } from '../data/mockData';
import ServiceCard from '../components/ServiceCard';
import ReviewCard from '../components/ReviewCard';

const HomeScreen = () => {
  const featuredServices = services.slice(0, 3);
  const featuredReviews = reviews.slice(0, 2);

  return (
    <>
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={7}>
              <p className="text-uppercase text-muted fw-semibold mb-2">
                Online zakazivanje termina
              </p>

              <h1 className="display-4 fw-bold mb-3">
                Vladan Cuts
              </h1>

              <p className="lead text-muted mb-4">
                Pregledaj usluge, pogledaj prethodne radove i zakaži termin kod frizera na jednostavan način.
              </p>

              <div className="d-flex gap-3 flex-wrap">
                <LinkContainer to="/zakazivanje">
                  <Button variant="dark" size="lg">
                    <FaCalendarAlt className="me-2" />
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
                <p className="mb-4">Nedelja: neradni dan</p>

                <hr />

                <p className="mb-1 fw-semibold">Lokacija</p>
                <p className="mb-0 text-muted">Novi Sad, Srbija</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="py-5">
        <Row className="g-4 text-center">
          <Col md={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <FaCut className="display-5 mb-3" />
                <h5 className="fw-bold">Profesionalne usluge</h5>
                <p className="text-muted mb-0">
                  Pregled dostupnih usluga, cena i trajanja termina.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <FaImages className="display-5 mb-3" />
                <h5 className="fw-bold">Galerija radova</h5>
                <p className="text-muted mb-0">
                  Prikaz prethodnih frizura i stilova.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <FaStar className="display-5 mb-3" />
                <h5 className="fw-bold">Komentari korisnika</h5>
                <p className="text-muted mb-0">
                  Iskustva korisnika koji su već koristili uslugu.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <section className="bg-light py-5">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold mb-1">Popularne usluge</h2>
              <p className="text-muted mb-0">Najtraženije usluge u ponudi.</p>
            </div>

            <LinkContainer to="/usluge">
              <Button variant="outline-dark">Sve usluge</Button>
            </LinkContainer>
          </div>

          <Row className="g-4">
            {featuredServices.map((service) => (
              <Col md={6} lg={4} key={service.id}>
                <ServiceCard service={service} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-1">Komentari korisnika</h2>
            <p className="text-muted mb-0">Šta korisnici kažu o usluzi.</p>
          </div>

          <LinkContainer to="/komentari">
            <Button variant="outline-dark">Svi komentari</Button>
          </LinkContainer>
        </div>

        <Row className="g-4">
          {featuredReviews.map((review) => (
            <Col md={6} key={review.id}>
              <ReviewCard review={review} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomeScreen;