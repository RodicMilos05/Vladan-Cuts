import { Card } from 'react-bootstrap';

function GalleryCard({ item }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={item.imageUrl}
        alt={item.title}
        style={{ height: '260px', objectFit: 'cover' }}
      />

      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {item.category}
        </Card.Subtitle>
        <Card.Text>{item.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default GalleryCard;