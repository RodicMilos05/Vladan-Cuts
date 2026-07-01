import { Badge, Button, Container, Table } from 'react-bootstrap';

const mockUsers = [
  {
    id: 1,
    name: 'Admin Korisnik',
    email: 'admin@vladancuts.com',
    phone: '0600000000',
    isAdmin: true,
  },
  {
    id: 2,
    name: 'Test Korisnik',
    email: 'korisnik@test.com',
    phone: '0601234567',
    isAdmin: false,
  },
];

const AdminUsersScreen = () => {
  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-4">Upravljanje korisnicima</h1>

      <Table striped bordered hover responsive className="shadow-sm bg-white">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ime</th>
            <th>Email</th>
            <th>Telefon</th>
            <th>Uloga</th>
            <th>Akcije</th>
          </tr>
        </thead>

        <tbody>
          {mockUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                {user.isAdmin ? (
                  <Badge bg="dark">Administrator</Badge>
                ) : (
                  <Badge bg="secondary">Korisnik</Badge>
                )}
              </td>
              <td>
                <Button variant="outline-danger" size="sm" disabled>
                  Obriši
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <p className="text-muted small">
        Brisanje korisnika biće omogućeno nakon povezivanja sa backendom.
      </p>
    </Container>
  );
};

export default AdminUsersScreen;