import { Button, Container, Table } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { reviews } from '../../data/mockData';

const AdminReviewsScreen = () => {
  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-2">Upravljanje komentarima</h1>

      <p className="text-muted mb-4">
        Administrator može da pregleda komentare korisnika i kasnije obriše neprikladne komentare.
      </p>

      <Table striped bordered hover responsive className="shadow-sm bg-white">
        <thead>
          <tr>
            <th>ID</th>
            <th>Korisnik</th>
            <th>Ocena</th>
            <th>Komentar</th>
            <th>Akcije</th>
          </tr>
        </thead>

        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td>{review.id}</td>
              <td>{review.user}</td>
              <td>
                {[...Array(review.rating)].map((_, index) => (
                  <FaStar key={index} className="text-warning me-1" />
                ))}
              </td>
              <td>{review.comment}</td>
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
        Brisanje komentara biće omogućeno nakon povezivanja sa backendom.
      </p>
    </Container>
  );
};

export default AdminReviewsScreen;