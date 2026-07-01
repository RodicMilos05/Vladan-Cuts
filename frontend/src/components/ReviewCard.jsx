import { Card } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
  return (
    <Card className="h-100 border-0 shadow-sm">
      <Card.Body>
        <div className="mb-2">
          {[...Array(review.rating)].map((_, index) => (
            <FaStar key={index} className="text-warning me-1" />
          ))}
        </div>

        <Card.Text className="text-muted">
          "{review.comment}"
        </Card.Text>

        <p className="fw-bold mb-0">{review.user}</p>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;