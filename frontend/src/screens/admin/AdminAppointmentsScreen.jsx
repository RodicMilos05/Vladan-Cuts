import { useEffect, useState } from 'react';
import {
  Alert,
  Badge,
  Card,
  Container,
  Form,
  Spinner,
  Table,
} from 'react-bootstrap';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

function AdminAppointmentsScreen() {
  const { userInfo } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusLoadingId, setStatusLoadingId] = useState('');
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

      const { data } = await api.get('/api/appointments', {
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
  }, [userInfo.token]);

  const updateStatusHandler = async (appointmentId, status) => {
    try {
      setError('');
      setSuccess('');
      setStatusLoadingId(appointmentId);

      await api.put(
        `/api/appointments/${appointmentId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setSuccess('Status termina je uspešno promenjen.');

      await fetchAppointments();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Došlo je do greške prilikom izmene statusa termina.'
      );
    } finally {
      setStatusLoadingId('');
    }
  };

  return (
    <Container className="py-5">
      <h1 className="mb-3">Admin — termini</h1>

      <p className="text-muted mb-4">
        Pregled svih termina i promena njihovog statusa.
      </p>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : appointments.length === 0 ? (
        <Alert variant="info">Trenutno nema termina.</Alert>
      ) : (
        <Card className="shadow-sm">
          <Card.Body>
            <Table responsive hover className="align-middle">
              <thead>
                <tr>
                  <th>Korisnik</th>
                  <th>Telefon</th>
                  <th>Usluga</th>
                  <th>Datum</th>
                  <th>Vreme</th>
                  <th>Status</th>
                  <th>Promena statusa</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>
                      {appointment.user?.name || 'Korisnik nije pronađen'}
                      <br />
                      <small className="text-muted">
                        {appointment.user?.email || '-'}
                      </small>
                    </td>
                    <td>{appointment.user?.phone || '-'}</td>
                    <td>{appointment.service?.name || 'Usluga nije pronađena'}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>
                      <Badge bg={statusVariants[appointment.status] || 'light'}>
                        {statusLabels[appointment.status] ||
                          appointment.status}
                      </Badge>
                    </td>
                    <td style={{ minWidth: '160px' }}>
                      <Form.Select
                        size="sm"
                        value={appointment.status}
                        disabled={statusLoadingId === appointment._id}
                        onChange={(e) =>
                          updateStatusHandler(appointment._id, e.target.value)
                        }
                      >
                        <option value="pending">Na čekanju</option>
                        <option value="confirmed">Potvrđen</option>
                        <option value="cancelled">Otkazan</option>
                        <option value="completed">Završen</option>
                      </Form.Select>
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

export default AdminAppointmentsScreen;