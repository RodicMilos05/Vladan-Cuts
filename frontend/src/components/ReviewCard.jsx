import { Card } from 'react-bootstrap';

function ReviewCard({ review }) {
  const userName = review.user?.name || 'Korisnik';

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Title>{userName}</Card.Title>

        <Card.Subtitle className="mb-2 text-warning">
          {'★'.repeat(review.rating)}
          {'☆'.repeat(5 - review.rating)}
        </Card.Subtitle>

        <Card.Text>{review.comment}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ReviewCard;