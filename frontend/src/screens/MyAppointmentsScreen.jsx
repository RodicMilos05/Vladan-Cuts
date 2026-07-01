import { useEffect, useState } from 'react';
import { Alert, Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { cancelStoredAppointment, getStoredAppointments } from '../utils/appointmentStorage';

const getStatusText = (status) => {
  if (status === 'pending') {
    return 'Na čekanju';
  }

  if (status === 'confirmed') {
    return 'Potvrđen';
  }

  if (status === 'cancelled') {
    return 'Otkazan';
  }

  if (status === 'completed') {
    return 'Završen';
  }

  return status;
};

const getStatusVariant = (status) => {
  if (status === 'pending') {
    return 'warning';
  }

  if (status === 'confirmed') {
    return 'success';
  }

  if (status === 'cancelled') {
    return 'danger';
  }

  if (status === 'completed') {
    return 'secondary';
  }

  return 'dark';
};

const MyAppointmentsScreen = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedAppointments = getStoredAppointments();
    setAppointments(storedAppointments);
  }, []);

  const cancelHandler = (appointmentId) => {
    const confirmed = window.confirm('Da li ste sigurni da želite da otkažete termin?');

    if (!confirmed) {
      return;
    }

    const updatedAppointments = cancelStoredAppointment(appointmentId);
    setAppointments(updatedAppointments);
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-4">
        <div>
          <p className="text-uppercase text-muted fw-semibold mb-2">
            Korisnički deo
          </p>
          <h1 className="fw-bold mb-2">Moji termini</h1>
          <p className="text-muted mb-0">
            Pregled svih termina koje ste zakazali preko aplikacije.
          </p>
        </div>

        <LinkContainer to="/zakazivanje">
          <Button variant="dark">
            Zakaži novi termin
          </Button>
        </LinkContainer>
      </div>

      {appointments.length === 0 ? (
        <Alert variant="info">
          Trenutno nemate zakazanih termina. Kliknite na dugme "Zakaži novi termin" da napravite prvi termin.
        </Alert>
      ) : (
        <Row className="g-4">
          {appointments.map((appointment) => (
            <Col md={6} lg={4} key={appointment.id}>
              <Card className="h-100 border-0 shadow-sm appointment-card">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="fw-bold mb-0">
                      {appointment.serviceName}
                    </h5>

                    <Badge bg={getStatusVariant(appointment.status)}>
                      {getStatusText(appointment.status)}
                    </Badge>
                  </div>

                  <p className="mb-2">
                    <strong>Datum:</strong> {appointment.date}
                  </p>

                  <p className="mb-2">
                    <strong>Vreme:</strong> {appointment.time}
                  </p>

                  <p className="mb-2">
                    <strong>Trajanje:</strong> {appointment.serviceDuration} min
                  </p>

                  <p className="mb-2">
                    <strong>Cena:</strong> {appointment.servicePrice} RSD
                  </p>

                  {appointment.note && (
                    <p className="text-muted">
                      <strong>Napomena:</strong> {appointment.note}
                    </p>
                  )}

                  <div className="mt-auto">
                    {appointment.status !== 'cancelled' ? (
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => cancelHandler(appointment.id)}
                      >
                        Otkaži termin
                      </Button>
                    ) : (
                      <p className="text-muted small mb-0">
                        Ovaj termin je otkazan.
                      </p>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyAppointmentsScreen;