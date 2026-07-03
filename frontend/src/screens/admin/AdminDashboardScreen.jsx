import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

function AdminDashboardScreen() {
  const { userInfo } = useAuth();

  const [stats, setStats] = useState({
    users: 0,
    services: 0,
    appointments: 0,
    gallery: 0,
    reviews: 0,
    pendingAppointments: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const [
          usersResponse,
          servicesResponse,
          appointmentsResponse,
          galleryResponse,
          reviewsResponse,
        ] = await Promise.all([
          api.get('/api/users', config),
          api.get('/api/services'),
          api.get('/api/appointments', config),
          api.get('/api/gallery'),
          api.get('/api/reviews'),
        ]);

        const pendingAppointments = appointmentsResponse.data.filter(
          (appointment) => appointment.status === 'pending'
        ).length;

        setStats({
          users: usersResponse.data.length,
          services: servicesResponse.data.length,
          appointments: appointmentsResponse.data.length,
          gallery: galleryResponse.data.length,
          reviews: reviewsResponse.data.length,
          pendingAppointments,
        });
      } catch (err) {
        setError(
          err.response?.data?.message ||
            'Došlo je do greške prilikom učitavanja admin panela.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userInfo.token]);

  const cards = [
    {
      title: 'Korisnici',
      value: stats.users,
      text: 'Pregled registrovanih korisnika.',
      link: '/admin/korisnici',
      button: 'Otvori korisnike',
    },
    {
      title: 'Usluge',
      value: stats.services,
      text: 'Pregled i upravljanje uslugama.',
      link: '/admin/usluge',
      button: 'Otvori usluge',
    },
    {
      title: 'Termini',
      value: stats.appointments,
      text: `${stats.pendingAppointments} termina je na čekanju.`,
      link: '/admin/termini',
      button: 'Otvori termine',
    },
    {
      title: 'Galerija',
      value: stats.gallery,
      text: 'Pregled radova u galeriji.',
      link: '/admin/galerija',
      button: 'Otvori galeriju',
    },
    {
      title: 'Komentari',
      value: stats.reviews,
      text: 'Pregled komentara korisnika.',
      link: '/admin/komentari',
      button: 'Otvori komentare',
    },
  ];

  return (
    <Container className="py-5">
      <h1 className="mb-3">Admin panel</h1>

      <p className="text-muted mb-4">
        Dobrodošli u administratorski deo aplikacije Vladan Cuts.
      </p>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Row className="g-4">
          {cards.map((card) => (
            <Col key={card.title} md={6} lg={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>

                  <h2 className="my-3">{card.value}</h2>

                  <Card.Text className="text-muted">{card.text}</Card.Text>

                  <LinkContainer to={card.link}>
                    <Button variant="dark">{card.button}</Button>
                  </LinkContainer>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default AdminDashboardScreen;