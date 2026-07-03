import { useEffect, useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  Card,
  Container,
  Image,
  Spinner,
  Table,
} from 'react-bootstrap';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

function AdminGalleryScreen() {
  const { userInfo } = useAuth();

  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);

      const { data } = await api.get('/api/gallery');

      setGalleryItems(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Došlo je do greške prilikom učitavanja galerije.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const toggleActiveHandler = async (item) => {
    try {
      setError('');
      setSuccess('');
      setActionLoadingId(item._id);

      await api.put(
        `/api/gallery/${item._id}`,
        {
          isActive: !item.isActive,
        },
        config
      );

      setSuccess('Status stavke galerije je uspešno promenjen.');

      await fetchGalleryItems();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Došlo je do greške prilikom izmene galerije.'
      );
    } finally {
      setActionLoadingId('');
    }
  };

  const deleteGalleryItemHandler = async (itemId) => {
    const confirmed = window.confirm(
      'Da li ste sigurni da želite da obrišete ovu stavku galerije?'
    );

    if (!confirmed) {
      return;
    }

    try {
      setError('');
      setSuccess('');
      setActionLoadingId(itemId);

      await api.delete(`/api/gallery/${itemId}`, config);

      setSuccess('Stavka galerije je uspešno obrisana.');

      await fetchGalleryItems();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Došlo je do greške prilikom brisanja stavke galerije.'
      );
    } finally {
      setActionLoadingId('');
    }
  };

  return (
    <Container className="py-5">
      <h1 className="mb-3">Admin — galerija</h1>

      <p className="text-muted mb-4">
        Pregled stavki galerije. U ovom koraku omogućeno je aktiviranje,
        deaktiviranje i brisanje.
      </p>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : galleryItems.length === 0 ? (
        <Alert variant="info">Trenutno nema stavki u galeriji.</Alert>
      ) : (
        <Card className="shadow-sm">
          <Card.Body>
            <Table responsive hover className="align-middle">
              <thead>
                <tr>
                  <th>Slika</th>
                  <th>Naslov</th>
                  <th>Kategorija</th>
                  <th>Opis</th>
                  <th>Status</th>
                  <th>Akcije</th>
                </tr>
              </thead>

              <tbody>
                {galleryItems.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        rounded
                        style={{
                          width: '90px',
                          height: '60px',
                          objectFit: 'cover',
                        }}
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>{item.description}</td>
                    <td>
                      {item.isActive ? (
                        <Badge bg="success">Aktivna</Badge>
                      ) : (
                        <Badge bg="secondary">Neaktivna</Badge>
                      )}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-dark"
                          size="sm"
                          disabled={actionLoadingId === item._id}
                          onClick={() => toggleActiveHandler(item)}
                        >
                          {item.isActive ? 'Deaktiviraj' : 'Aktiviraj'}
                        </Button>

                        <Button
                          variant="outline-danger"
                          size="sm"
                          disabled={actionLoadingId === item._id}
                          onClick={() => deleteGalleryItemHandler(item._id)}
                        >
                          Obriši
                        </Button>
                      </div>
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

export default AdminGalleryScreen;