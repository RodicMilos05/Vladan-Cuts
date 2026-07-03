import { useEffect, useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  Card,
  Container,
  Spinner,
  Table,
} from 'react-bootstrap';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

function MyAppointmentsScreen() {
  const { userInfo } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoadingId, setCancelLoadingId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const statusLabels = {
    pending: 'Na čekanju',
    confirmed: 'Potvrđen',
    cancelled: 'Otkazan',
    completed: 'Završen',
  };

  const statusVariants = {
    pending: 'warning',
    confirmed: 'success',
    cancelled: 'secondary',
    completed: 'dark',
  };

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const { data } = await api.get('/api/appointments/my', {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      setAppointments(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Došlo je do greške prilikom učitavanja termina.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const cancelAppointmentHandler = async (appointmentId) => {
    const confirmed = window.confirm(
      'Da li ste sigurni da želite da otkažete ovaj termin?'
    );

    if (!confirmed) {
      return;
    }

    try {
      setError('');
      setSuccess('');
      setCancelLoadingId(appointmentId);

      await api.delete(`/api/appointments/${appointmentId}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      setSuccess('Termin je uspešno otkazan.');

      await fetchAppointments();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Došlo je do greške prilikom otkazivanja termina.'
      );
    } finally {
      setCancelLoadingId('');
    }
  };

  return (
    <Container className="py-5">
      <h1 className="mb-3">Moji termini</h1>

      <p className="text-muted mb-4">
        Ovde možete videti sve svoje zakazane termine i njihov trenutni status.
      </p>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : appointments.length === 0 ? (
        <Alert variant="info">Trenutno nemate zakazanih termina.</Alert>
      ) : (
        <Card className="shadow-sm">
          <Card.Body>
            <Table responsive hover className="align-middle">
              <thead>
                <tr>
                  <th>Usluga</th>
                  <th>Datum</th>
                  <th>Vreme</th>
                  <th>Cena</th>
                  <th>Status</th>
                  <th>Napomena</th>
                  <th>Akcija</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{appointment.service?.name || 'Usluga'}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>
                      {appointment.service?.price
                        ? `${appointment.service.price} RSD`
                        : '-'}
                    </td>
                    <td>
                      <Badge bg={statusVariants[appointment.status] || 'light'}>
                        {statusLabels[appointment.status] ||
                          appointment.status}
                      </Badge>
                    </td>
                    <td>{appointment.note || '-'}</td>
                    <td>
                      {appointment.status !== 'cancelled' &&
                      appointment.status !== 'completed' ? (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          disabled={cancelLoadingId === appointment._id}
                          onClick={() =>
                            cancelAppointmentHandler(appointment._id)
                          }
                        >
                          {cancelLoadingId === appointment._id
                            ? 'Otkazivanje...'
                            : 'Otkaži'}
                        </Button>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default MyAppointmentsScreen;