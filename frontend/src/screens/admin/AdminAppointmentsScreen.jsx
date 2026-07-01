import { useEffect, useState } from 'react';
import { Alert, Badge, Button, Container, Table } from 'react-bootstrap';
import { getStoredAppointments } from '../../utils/appointmentStorage';

const getStatusText = (status) => {
  if (status === 'pending') return 'Na čekanju';
  if (status === 'confirmed') return 'Potvrđen';
  if (status === 'cancelled') return 'Otkazan';
  if (status === 'completed') return 'Završen';

  return status;
};

const getStatusVariant = (status) => {
  if (status === 'pending') return 'warning';
  if (status === 'confirmed') return 'success';
  if (status === 'cancelled') return 'danger';
  if (status === 'completed') return 'secondary';

  return 'dark';
};

const AdminAppointmentsScreen = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    setAppointments(getStoredAppointments());
  }, []);

  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-2">Upravljanje terminima</h1>

      <p className="text-muted mb-4">
        Administrator ovde vidi sve zakazane termine. Trenutno se prikazuju termini sačuvani u localStorage-u.
      </p>

      {appointments.length === 0 ? (
        <Alert variant="info">
          Još nema zakazanih termina.
        </Alert>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm bg-white">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usluga</th>
              <th>Datum</th>
              <th>Vreme</th>
              <th>Cena</th>
              <th>Status</th>
              <th>Akcije</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>{appointment.serviceName}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.servicePrice} RSD</td>
                <td>
                  <Badge bg={getStatusVariant(appointment.status)}>
                    {getStatusText(appointment.status)}
                  </Badge>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button variant="outline-success" size="sm" disabled>
                      Potvrdi
                    </Button>

                    <Button variant="outline-secondary" size="sm" disabled>
                      Završi
                    </Button>

                    <Button variant="outline-danger" size="sm" disabled>
                      Otkaži
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <p className="text-muted small">
        Promena statusa termina biće omogućena nakon povezivanja sa backendom.
      </p>
    </Container>
  );
};

export default AdminAppointmentsScreen;