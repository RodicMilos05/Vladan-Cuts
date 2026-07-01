import { Card, Badge } from 'react-bootstrap';

const GalleryCard = ({ item }) => {
  return (
    <Card className="h-100 border-0 shadow-sm gallery-card">
      <div className="gallery-image-wrapper">
        <Card.Img
          variant="top"
          src={item.imageUrl}
          alt={item.title}
          className="gallery-image"
        />
      </div>

      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="fw-bold mb-0">{item.title}</Card.Title>
          <Badge bg="dark">{item.category}</Badge>
        </div>

        <Card.Text className="text-muted">
          {item.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default GalleryCard;