import { useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    if (!email.trim()) {
      setErrorMessage('Email adresa je obavezna.');
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

    setSuccessMessage('Forma je ispravno popunjena. Login će biti povezan sa backendom kasnije.');

    console.log('Login podaci:', {
      email,
      password,
    });
  };

  return (
    <Container className="py-5 auth-container">
      <Card className="shadow-sm border-0">
        <Card.Body className="p-4">
          <h1 className="h3 fw-bold mb-2">Prijava</h1>
          <p className="text-muted mb-4">
            Prijavite se kako biste mogli da zakažete termin i pratite svoja zakazivanja.
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
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email adresa</Form.Label>
              <Form.Control
                type="email"
                placeholder="Unesite email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="password">
              <Form.Label>Lozinka</Form.Label>
              <Form.Control
                type="password"
                placeholder="Unesite lozinku"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100">
              Prijavi se
            </Button>
          </Form>

          <p className="text-muted text-center mt-4 mb-0">
            Nemaš nalog?{' '}
            <Link to="/registracija" className="fw-semibold text-dark">
              Registruj se
            </Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginScreen;