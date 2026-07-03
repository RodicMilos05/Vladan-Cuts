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
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

function AdminUsersScreen() {
  const { userInfo } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoadingId, setDeleteLoadingId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const { data } = await api.get('/api/users', {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      setUsers(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Došlo je do greške prilikom učitavanja korisnika.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [userInfo.token]);

  const deleteUserHandler = async (userId) => {
    const confirmed = window.confirm(
      'Da li ste sigurni da želite da obrišete ovog korisnika?'
    );

    if (!confirmed) {
      return;
    }

    try {
      setError('');
      setSuccess('');
      setDeleteLoadingId(userId);

      await api.delete(`/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      setSuccess('Korisnik je uspešno obrisan.');

      await fetchUsers();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Došlo je do greške prilikom brisanja korisnika.'
      );
    } finally {
      setDeleteLoadingId('');
    }
  };

  return (
    <Container className="py-5">
      <h1 className="mb-3">Admin — korisnici</h1>

      <p className="text-muted mb-4">
        Pregled registrovanih korisnika aplikacije.
      </p>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : users.length === 0 ? (
        <Alert variant="info">Trenutno nema korisnika.</Alert>
      ) : (
        <Card className="shadow-sm">
          <Card.Body>
            <Table responsive hover className="align-middle">
              <thead>
                <tr>
                  <th>Ime</th>
                  <th>Email</th>
                  <th>Telefon</th>
                  <th>Uloga</th>
                  <th>Akcija</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      {user.isAdmin ? (
                        <Badge bg="dark">Admin</Badge>
                      ) : (
                        <Badge bg="secondary">Korisnik</Badge>
                      )}
                    </td>
                    <td>
                      {user.isAdmin ? (
                        '-'
                      ) : (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          disabled={deleteLoadingId === user._id}
                          onClick={() => deleteUserHandler(user._id)}
                        >
                          {deleteLoadingId === user._id
                            ? 'Brisanje...'
                            : 'Obriši'}
                        </Button>
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

export default AdminUsersScreen;