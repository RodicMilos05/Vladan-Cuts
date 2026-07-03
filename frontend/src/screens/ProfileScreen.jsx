import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Container,
  Form,
  Spinner,
} from 'react-bootstrap';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

function ProfileScreen() {
  const { userInfo, updateProfile } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            'Došlo je do greške prilikom učitavanja profila.'
        );
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [userInfo.token]);

  const submitHandler = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (!name || !email || !phone) {
      setError('Ime, email i telefon su obavezni.');
      return;
    }

    if (password && password.length < 6) {
      setError('Nova lozinka mora imati najmanje 6 karaktera.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Lozinke se ne poklapaju.');
      return;
    }

    try {
      setLoadingSubmit(true);

      const profileData = {
        name,
        email,
        phone,
      };

      if (password) {
        profileData.password = password;
      }

      await updateProfile(profileData);

      setPassword('');
      setConfirmPassword('');
      setSuccess('Profil je uspešno ažuriran.');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Došlo je do greške prilikom izmene profila.'
      );
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <Container className="py-5">
      <Card className="mx-auto shadow-sm" style={{ maxWidth: '650px' }}>
        <Card.Body>
          <h1 className="mb-3">Moj profil</h1>

          <p className="text-muted mb-4">
            Ovde možete pregledati i izmeniti podatke svog naloga.
          </p>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          {loadingProfile ? (
            <div className="text-center py-5">
              <Spinner animation="border" />
            </div>
          ) : (
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
                  placeholder="Unesite email adresu"
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

              <hr className="my-4" />

              <p className="text-muted">
                Ako ne želite da promenite lozinku, ova polja ostavite prazna.
              </p>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Nova lozinka</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Unesite novu lozinku"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="confirmPassword">
                <Form.Label>Potvrdite novu lozinku</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ponovite novu lozinku"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                    Čuvanje...
                  </>
                ) : (
                  'Sačuvaj izmene'
                )}
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProfileScreen;