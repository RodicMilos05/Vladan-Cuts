import { useEffect, useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  Card,
  Container,
  Form,
  Image,
  Modal,
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
  const [formLoading, setFormLoading] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isActive, setIsActive] = useState(true);

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

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

  const resetForm = () => {
    setEditingItem(null);
    setTitle('');
    setImageUrl('');
    setDescription('');
    setCategory('');
    setIsActive(true);
  };

  const openCreateModal = () => {
    resetForm();
    setError('');
    setSuccess('');
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setTitle(item.title);
    setImageUrl(item.imageUrl);
    setDescription(item.description);
    setCategory(item.category);
    setIsActive(item.isActive);
    setError('');
    setSuccess('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (!title || !imageUrl || !description || !category) {
      setError('Naslov, URL slike, opis i kategorija su obavezni.');
      return;
    }

    const galleryData = {
      title,
      imageUrl,
      description,
      category,
      isActive,
    };

    try {
      setFormLoading(true);

      if (editingItem) {
        await api.put(`/api/gallery/${editingItem._id}`, galleryData, config);
        setSuccess('Stavka galerije je uspešno izmenjena.');
      } else {
        await api.post('/api/gallery', galleryData, config);
        setSuccess('Stavka galerije je uspešno dodata.');
      }

      closeModal();
      await fetchGalleryItems();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Došlo je do greške prilikom čuvanja stavke galerije.'
      );
    } finally {
      setFormLoading(false);
    }
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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1 className="mb-1">Admin — galerija</h1>

          <p className="text-muted mb-0">
            Dodavanje, izmena, aktiviranje, deaktiviranje i brisanje stavki
            galerije.
          </p>
        </div>

        <Button variant="dark" onClick={openCreateModal}>
          Dodaj stavku
        </Button>
      </div>

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
                      <div className="d-flex flex-wrap gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => openEditModal(item)}
                        >
                          Izmeni
                        </Button>

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

      <Modal show={showModal} onHide={closeModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingItem ? 'Izmena stavke galerije' : 'Dodavanje stavke galerije'}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={submitHandler}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Naslov</Form.Label>
              <Form.Control
                type="text"
                placeholder="Na primer: Classic fade"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="imageUrl">
              <Form.Label>URL slike</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unesite link slike"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <Form.Text className="text-muted">
                Za ovaj projekat koristimo URL slike, bez pravog upload-a fajla.
              </Form.Text>
            </Form.Group>

            {imageUrl && (
              <div className="mb-3">
                <p className="mb-2">Pregled slike:</p>

                <Image
                  src={imageUrl}
                  alt="Pregled slike"
                  rounded
                  fluid
                  style={{
                    maxHeight: '220px',
                    objectFit: 'cover',
                  }}
                />
              </div>
            )}

            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Kategorija</Form.Label>
              <Form.Control
                type="text"
                placeholder="Na primer: Fade, Brada, Modern"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Opis</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Unesite kratak opis rada"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Check
              type="checkbox"
              id="isActive"
              label="Stavka je aktivna i vidljiva korisnicima"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Odustani
            </Button>

            <Button type="submit" variant="dark" disabled={formLoading}>
              {formLoading ? 'Čuvanje...' : 'Sačuvaj'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default AdminGalleryScreen;