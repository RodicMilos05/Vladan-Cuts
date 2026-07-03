import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Container,
  Form,
  Spinner,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

function BookingScreen() {
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');

  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const availableTimes = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ];

  const getTodayInputValue = () => {
    const today = new Date();
    const timezoneOffset = today.getTimezoneOffset() * 60000;
    return new Date(today.getTime() - timezoneOffset)
      .toISOString()
      .split('T')[0];
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await api.get('/api/services');

        const activeServices = data.filter((service) => service.isActive);

        setServices(activeServices);

        if (activeServices.length > 0) {
          setServiceId(activeServices[0]._id);
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            'Došlo je do greške prilikom učitavanja usluga.'
        );
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (!serviceId || !date || !time) {
      setError('Usluga, datum i vreme su obavezni.');
      return;
    }

    try {
      setLoadingSubmit(true);

      await api.post(
        '/api/appointments',
        {
          serviceId,
          date,
          time,
          note,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setSuccess('Termin je uspešno zakazan.');

      setTimeout(() => {
        navigate('/moji-termini');
      }, 800);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Došlo je do greške prilikom zakazivanja termina.'
      );
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <Container className="py-5">
      <Card className="mx-auto shadow-sm" style={{ maxWidth: '650px' }}>
        <Card.Body>
          <h1 className="mb-3">Zakazivanje termina</h1>

          <p className="text-muted mb-4">
            Izaberite uslugu, datum i vreme koje vam odgovara.
          </p>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          {loadingServices ? (
            <div className="text-center py-5">
              <Spinner animation="border" />
            </div>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="service">
                <Form.Label>Usluga</Form.Label>
                <Form.Select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                >
                  {services.map((service) => (
                    <option key={service._id} value={service._id}>
                      {service.name} — {service.price} RSD / {service.duration}{' '}
                      min
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="date">
                <Form.Label>Datum</Form.Label>
                <Form.Control
                  type="date"
                  min={getTodayInputValue()}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="time">
                <Form.Label>Vreme</Form.Label>
                <Form.Select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  <option value="">Izaberite vreme</option>

                  {availableTimes.map((availableTime) => (
                    <option key={availableTime} value={availableTime}>
                      {availableTime}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4" controlId="note">
                <Form.Label>Napomena</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Unesite dodatnu napomenu ako je imate"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </Form.Group>

              <Button
                type="submit"
                variant="dark"
                className="w-100"
                disabled={loadingSubmit}
              >
                {loadingSubmit ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Zakazivanje...
                  </>
                ) : (
                  'Zakaži termin'
                )}
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default BookingScreen;