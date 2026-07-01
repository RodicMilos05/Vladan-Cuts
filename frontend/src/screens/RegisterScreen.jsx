import { useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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

    if (!password.trim()) {
      setErrorMessage('Lozinka je obavezna.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Lozinka mora imati najmanje 6 karaktera.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Lozinke se ne poklapaju.');
      return;
    }

    setSuccessMessage('Forma je ispravno popunjena. Registracija će biti povezana sa backendom kasnije.');

    console.log('Registracioni podaci:', {
      name,
      email,
      phone,
      password,
    });
  };

  return (
    <Container className="py-5 auth-container">
      <Card className="shadow-sm border-0">
        <Card.Body className="p-4">
          <h1 className="h3 fw-bold mb-2">Registracija</h1>
          <p className="text-muted mb-4">
            Napravite nalog kako biste mogli da zakažete termin.
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

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Telefon</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite broj telefona"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Lozinka</Form.Label>
              <Form.Control
                type="password"
                placeholder="Unesite lozinku"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="confirmPassword">
              <Form.Label>Potvrda lozinke</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ponovite lozinku"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100">
              Registruj se
            </Button>
          </Form>

          <p className="text-muted text-center mt-4 mb-0">
            Već imaš nalog?{' '}
            <Link to="/login" className="fw-semibold text-dark">
              Prijavi se
            </Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterScreen;