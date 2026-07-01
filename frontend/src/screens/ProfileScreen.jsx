import { useEffect, useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { getStoredProfile, saveStoredProfile } from '../utils/profileStorage';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const profile = getStoredProfile();

    setName(profile.name);
    setEmail(profile.email);
    setPhone(profile.phone);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    if (!name.trim()) {
      setErrorMessage('Ime i prezime su obavezni.');
      return;
    }

    if (!email.trim()) {
      setErrorMessage('Email adresa je obavezna.');
      return;
    }

    if (!phone.trim()) {
      setErrorMessage('Broj telefona je obavezan.');
      return;
    }

    saveStoredProfile({
      name,
      email,
      phone,
    });

    setSuccessMessage('Podaci profila su uspešno sačuvani.');
  };

  return (
    <Container className="py-5 auth-container">
      <Card className="shadow-sm border-0">
        <Card.Body className="p-4">
          <p className="text-uppercase text-muted fw-semibold mb-2">
            Korisnički nalog
          </p>

          <h1 className="h3 fw-bold mb-2">Moj profil</h1>

          <p className="text-muted mb-4">
            Ovde korisnik može da pregleda i izmeni osnovne podatke svog naloga.
          </p>

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
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Ime i prezime</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite ime i prezime"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email adresa</Form.Label>
              <Form.Control
                type="email"
                placeholder="Unesite email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="phone">
              <Form.Label>Telefon</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite telefon"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

            <Button variant="dark" type="submit">
              Sačuvaj izmene
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfileScreen;