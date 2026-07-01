import { useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { services } from '../data/mockData';
import { isAppointmentTaken, saveStoredAppointment } from '../utils/appointmentStorage';

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
  '18:00',
  '19:00',
];

const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

const BookingScreen = () => {
  const [serviceId, setServiceId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const selectedService = services.find((service) => {
    return service.id === Number(serviceId);
  });

  const submitHandler = (e) => {
    e.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    if (!serviceId) {
      setErrorMessage('Morate izabrati uslugu.');
      return;
    }

    if (!date) {
      setErrorMessage('Morate izabrati datum.');
      return;
    }

    if (!time) {
      setErrorMessage('Morate izabrati vreme.');
      return;
    }

    if (date < getTodayDate()) {
      setErrorMessage('Ne možete zakazati termin u prošlosti.');
      return;
    }

    if (isAppointmentTaken(date, time)) {
      setErrorMessage('Izabrani termin je već zauzet. Izaberite drugo vreme.');
      return;
    }

    const newAppointment = {
      id: Date.now(),
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      servicePrice: selectedService.price,
      serviceDuration: selectedService.duration,
      date,
      time,
      note,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    saveStoredAppointment(newAppointment);

    setSuccessMessage('Termin je uspešno zakazan. Preusmeravanje na stranicu Moji termini...');

    setServiceId('');
    setDate('');
    setTime('');
    setNote('');

    setTimeout(() => {
      navigate('/moji-termini');
    }, 900);
  };

  return (
    <Container className="py-5">
      <div className="mb-4">
        <p className="text-uppercase text-muted fw-semibold mb-2">
          Online rezervacija
        </p>
        <h1 className="fw-bold mb-2">Zakazivanje termina</h1>
        <p className="text-muted mb-0">
          Izaberite uslugu, datum i vreme termina. Nakon slanja, termin će biti dodat u listu vaših termina.
        </p>
      </div>

      <Card className="shadow-sm border-0">
        <Card.Body className="p-4">
          {errorMessage && (
            <Alert variant="danger">
              {errorMessage}
            </Alert>
          )}

          {successMessage && (
            <Alert variant="success">
              {successMessage}
            </Alert>
          )}

          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="service">
              <Form.Label>Usluga</Form.Label>
              <Form.Select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
              >
                <option value="">Izaberite uslugu</option>

                {services.map((service) => (
                  <option value={service.id} key={service.id}>
                    {service.name} - {service.price} RSD / {service.duration} min
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {selectedService && (
              <Alert variant="secondary" className="booking-summary">
                <strong>Izabrana usluga:</strong> {selectedService.name}
                <br />
                <strong>Cena:</strong> {selectedService.price} RSD
                <br />
                <strong>Trajanje:</strong> {selectedService.duration} min
              </Alert>
            )}

            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Datum</Form.Label>
              <Form.Control
                type="date"
                min={getTodayDate()}
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
                  <option value={availableTime} key={availableTime}>
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
                placeholder="Unesite napomenu ako je potrebno"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </Form.Group>

            <Button variant="dark" type="submit">
              Zakaži termin
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookingScreen;