import { useState } from 'react';
import { Alert, Button, Card, Container, Form, Spinner } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RegisterScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const { register } = useAuth();

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    setError('');

    if (!name || !email || !phone || !password || !confirmPassword) {
      setError('Sva polja su obavezna.');
      return;
    }

    if (password.length < 6) {
      setError('Lozinka mora imati najmanje 6 karaktera.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Lozinke se ne poklapaju.');
      return;
    }

    try {
      setLoading(true);

      await register(name, email, password, phone);

      navigate(redirect);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Došlo je do greške prilikom registracije.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Card className="mx-auto shadow-sm" style={{ maxWidth: '550px' }}>
        <Card.Body>
          <h1 className="mb-4">Registracija</h1>

          {error && <Alert variant="danger">{error}</Alert>}

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

            <Button type="submit" variant="dark" className="w-100" disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Registracija...
                </>
              ) : (
                'Registruj se'
              )}
            </Button>
          </Form>

          <p className="mt-4 mb-0">
            Već imate nalog?{' '}
            <Link to={redirect ? `/prijava?redirect=${redirect}` : '/prijava'}>
              Prijavite se
            </Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RegisterScreen;