import { useEffect, useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  Card,
  Container,
  Form,
  Modal,
  Spinner,
  Table,
} from 'react-bootstrap';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

function AdminServicesScreen() {
  const { userInfo } = useAuth();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [isActive, setIsActive] = useState(true);

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const fetchServices = async () => {
    try {
      setLoading(true);

      const { data } = await api.get('/api/services');

      setServices(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Došlo je do greške prilikom učitavanja usluga.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const resetForm = () => {
    setEditingService(null);
    setName('');
    setDescription('');
    setPrice('');
    setDuration('');
    setIsActive(true);
  };

  const openCreateModal = () => {
    resetForm();
    setError('');
    setSuccess('');
    setShowModal(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setName(service.name);
    setDescription(service.description);
    setPrice(service.price);
    setDuration(service.duration);
    setIsActive(service.isActive);
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

    if (!name || !description || !price || !duration) {
      setError('Naziv, opis, cena i trajanje su obavezni.');
      return;
    }

    if (Number(price) < 0) {
      setError('Cena ne može biti negativna.');
      return;
    }

    if (Number(duration) < 1) {
      setError('Trajanje mora biti najmanje 1 minut.');
      return;
    }

    const serviceData = {
      name,
      description,
      price: Number(price),
      duration: Number(duration),
      isActive,
    };

    try {
      setFormLoading(true);

      if (editingService) {
        await api.put(`/api/services/${editingService._id}`, serviceData, config);
        setSuccess('Usluga je uspešno izmenjena.');
      } else {
        await api.post('/api/services', serviceData, config);
        setSuccess('Usluga je uspešno dodata.');
      }

      closeModal();
      await fetchServices();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Došlo je do greške prilikom čuvanja usluge.'
      );
    } finally {
      setFormLoading(false);
    }
  };

  const toggleActiveHandler = async (service) => {
    try {
      setError('');
      setSuccess('');
      setActionLoadingId(service._id);

      await api.put(
        `/api/services/${service._id}`,
        {
          isActive: !service.isActive,
        },
        config
      );

      setSuccess('Status usluge je uspešno promenjen.');

      await fetchServices();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Došlo je do greške prilikom izmene usluge.'
      );
    } finally {
      setActionLoadingId('');
    }
  };

  const deleteServiceHandler = async (serviceId) => {
    const confirmed = window.confirm(
      'Da li ste sigurni da želite da obrišete ovu uslugu?'
    );

    if (!confirmed) {
      return;
    }

    try {
      setError('');
      setSuccess('');
      setActionLoadingId(serviceId);

      await api.delete(`/api/services/${serviceId}`, config);

      setSuccess('Usluga je uspešno obrisana.');

      await fetchServices();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Došlo je do greške prilikom brisanja usluge.'
      );
    } finally {
      setActionLoadingId('');
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1 className="mb-1">Admin — usluge</h1>

          <p className="text-muted mb-0">
            Dodavanje, izmena, aktiviranje, deaktiviranje i brisanje usluga.
          </p>
        </div>

        <Button variant="dark" onClick={openCreateModal}>
          Dodaj uslugu
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : services.length === 0 ? (
        <Alert variant="info">Trenutno nema usluga.</Alert>
      ) : (
        <Card className="shadow-sm">
          <Card.Body>
            <Table responsive hover className="align-middle">
              <thead>
                <tr>
                  <th>Naziv</th>
                  <th>Opis</th>
                  <th>Cena</th>
                  <th>Trajanje</th>
                  <th>Status</th>
                  <th>Akcije</th>
                </tr>
              </thead>

              <tbody>
                {services.map((service) => (
                  <tr key={service._id}>
                    <td>{service.name}</td>
                    <td>{service.description}</td>
                    <td>{service.price} RSD</td>
                    <td>{service.duration} min</td>
                    <td>
                      {service.isActive ? (
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
                          onClick={() => openEditModal(service)}
                        >
                          Izmeni
                        </Button>

                        <Button
                          variant="outline-dark"
                          size="sm"
                          disabled={actionLoadingId === service._id}
                          onClick={() => toggleActiveHandler(service)}
                        >
                          {service.isActive ? 'Deaktiviraj' : 'Aktiviraj'}
                        </Button>

                        <Button
                          variant="outline-danger"
                          size="sm"
                          disabled={actionLoadingId === service._id}
                          onClick={() => deleteServiceHandler(service._id)}
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

      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingService ? 'Izmena usluge' : 'Dodavanje usluge'}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={submitHandler}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Naziv usluge</Form.Label>
              <Form.Control
                type="text"
                placeholder="Na primer: Fade šišanje"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Opis usluge</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Unesite kratak opis usluge"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Cena u RSD</Form.Label>
              <Form.Control
                type="number"
                min="0"
                placeholder="Na primer: 1000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="duration">
              <Form.Label>Trajanje u minutima</Form.Label>
              <Form.Control
                type="number"
                min="1"
                placeholder="Na primer: 40"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </Form.Group>

            <Form.Check
              type="checkbox"
              id="isActive"
              label="Usluga je aktivna i vidljiva korisnicima"
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

export default AdminServicesScreen;