import { Button, Container, Image, Table } from 'react-bootstrap';
import { galleryItems } from '../../data/mockData';

const AdminGalleryScreen = () => {
  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap mb-4">
        <div>
          <h1 className="fw-bold mb-1">Upravljanje galerijom</h1>
          <p className="text-muted mb-0">
            Pregled radova koji se prikazuju na javnoj galeriji.
          </p>
        </div>

        <Button variant="dark" disabled>
          Dodaj rad
        </Button>
      </div>

      <Table striped bordered hover responsive className="shadow-sm bg-white">
        <thead>
          <tr>
            <th>ID</th>
            <th>Slika</th>
            <th>Naziv</th>
            <th>Kategorija</th>
            <th>Opis</th>
            <th>Akcije</th>
          </tr>
        </thead>

        <tbody>
          {galleryItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  className="admin-table-image"
                  rounded
                />
              </td>
              <td>{item.title}</td>
              <td>{item.category}</td>
              <td>{item.description}</td>
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
        Upravljanje galerijom biće povezano sa backendom u narednoj fazi.
      </p>
    </Container>
  );
};

export default AdminGalleryScreen;