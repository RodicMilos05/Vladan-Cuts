import { useState } from 'react';
import { Alert, Button, Card, Container, Form, Spinner } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    setError('');

    if (!email || !password) {
      setError('Email i lozinka su obavezni.');
      return;
    }

    try {
      setLoading(true);

      await login(email, password);

      navigate(redirect);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Došlo je do greške prilikom prijave.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Card className="mx-auto shadow-sm" style={{ maxWidth: '500px' }}>
        <Card.Body>
          <h1 className="mb-4">Prijava</h1>

          {error && <Alert variant="danger">{error}</Alert>}

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

            <Button type="submit" variant="dark" className="w-100" disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Prijava...
                </>
              ) : (
                'Prijavi se'
              )}
            </Button>
          </Form>

          <p className="mt-4 mb-0">
            Nemate nalog?{' '}
            <Link to={redirect ? `/registracija?redirect=${redirect}` : '/registracija'}>
              Registrujte se
            </Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginScreen;