import { Card } from 'react-bootstrap';

function ReviewCard({ review }) {
  const userName = review.user?.name || 'Korisnik';

  const rating = Math.min(
    Math.max(Math.round(Number(review.rating) || 0), 0),
    5
  );

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Title>{userName}</Card.Title>

        <Card.Subtitle className="mb-2 text-warning">
          {'★'.repeat(rating)}
          {'☆'.repeat(5 - rating)}
        </Card.Subtitle>

        <Card.Text>{review.comment}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ReviewCard;