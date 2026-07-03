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

function AdminServicesScreen() {
  const { userInfo } = useAuth();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
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
      <h1 className="mb-3">Admin — usluge</h1>

      <p className="text-muted mb-4">
        Pregled usluga. U ovom koraku omogućeno je aktiviranje, deaktiviranje i
        brisanje usluga.
      </p>

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
                      <div className="d-flex gap-2">
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
    </Container>
  );
}

export default AdminServicesScreen;