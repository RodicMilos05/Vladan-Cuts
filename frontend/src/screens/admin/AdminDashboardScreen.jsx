import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaCut, FaImages, FaStar, FaUsers } from 'react-icons/fa';

const adminCards = [
  {
    title: 'Korisnici',
    description: 'Pregled registrovanih korisnika',
    icon: <FaUsers />,
    path: '/admin/korisnici',
  },
  {
    title: 'Usluge',
    description: 'Dodavanje, izmena i brisanje usluga',
    icon: <FaCut />,
    path: '/admin/usluge',
  },
  {
    title: 'Termini',
    description: 'Pregled i upravljanje zakazanim terminima',
    icon: <FaCalendarAlt />,
    path: '/admin/termini',
  },
  {
    title: 'Galerija',
    description: 'Upravljanje radovima u galeriji',
    icon: <FaImages />,
    path: '/admin/galerija',
  },
  {
    title: 'Komentari',
    description: 'Pregled i brisanje komentara korisnika',
    icon: <FaStar />,
    path: '/admin/komentari',
  },
];

const AdminDashboardScreen = () => {
  return (
    <Container className="py-5">
      <p className="text-uppercase text-muted fw-semibold mb-2">
        Administracija
      </p>

      <h1 className="fw-bold mb-2">Admin panel</h1>

      <p className="text-muted mb-4">
        Centralno mesto za upravljanje korisnicima, uslugama, terminima, galerijom i komentarima.
      </p>

      <Row className="g-4">
        {adminCards.map((card) => (
          <Col md={6} lg={4} key={card.title}>
            <Link to={card.path} className="text-decoration-none text-dark">
              <Card className="h-100 border-0 shadow-sm admin-card">
                <Card.Body>
                  <div className="admin-card-icon mb-3">
                    {card.icon}
                  </div>

                  <h5 className="fw-bold">{card.title}</h5>

                  <p className="text-muted mb-0">
                    {card.description}
                  </p>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminDashboardScreen;