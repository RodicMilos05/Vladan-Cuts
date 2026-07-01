import { Card, Col, Container, Row } from 'react-bootstrap';

const AdminDashboardScreen = () => {
  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-4">Admin panel</h1>

      <Row className="g-4">
        <Col md={6} lg={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5>Korisnici</h5>
              <p className="text-muted mb-0">Upravljanje korisnicima</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5>Usluge</h5>
              <p className="text-muted mb-0">Upravljanje uslugama</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5>Termini</h5>
              <p className="text-muted mb-0">Pregled zakazanih termina</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5>Galerija</h5>
              <p className="text-muted mb-0">Upravljanje galerijom</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboardScreen;