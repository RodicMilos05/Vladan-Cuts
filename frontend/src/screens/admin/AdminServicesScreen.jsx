import { Badge, Button, Container, Table } from 'react-bootstrap';
import { services } from '../../data/mockData';

const AdminServicesScreen = () => {
  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap mb-4">
        <div>
          <h1 className="fw-bold mb-1">Upravljanje uslugama</h1>
          <p className="text-muted mb-0">
            Pregled frizerskih usluga koje će administrator kasnije moći da dodaje, menja i briše.
          </p>
        </div>

        <Button variant="dark" disabled>
          Dodaj uslugu
        </Button>
      </div>

      <Table striped bordered hover responsive className="shadow-sm bg-white">
        <thead>
          <tr>
            <th>ID</th>
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
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.name}</td>
              <td>{service.description}</td>
              <td>{service.price} RSD</td>
              <td>{service.duration} min</td>
              <td>
                <Badge bg="success">Aktivna</Badge>
              </td>
              <td>
                <div className="d-flex gap-2">
                  <Button variant="outline-dark" size="sm" disabled>
                    Izmeni
                  </Button>

                  <Button variant="outline-danger" size="sm" disabled>
                    Obriši
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <p className="text-muted small">
        CRUD funkcionalnosti za usluge biće povezane sa backend API rutama.
      </p>
    </Container>
  );
};

export default AdminServicesScreen;