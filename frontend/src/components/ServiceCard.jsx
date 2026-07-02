import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function ServiceCard({ service }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{service.name}</Card.Title>

        <Card.Text className="text-muted">{service.description}</Card.Text>

        <div className="mt-auto">
          <p className="mb-1">
            <strong>Cena:</strong> {service.price} RSD
          </p>

          <p className="mb-3">
            <strong>Trajanje:</strong> {service.duration} min
          </p>

          <LinkContainer to="/zakazivanje">
            <Button variant="dark" className="w-100">
              Zakaži termin
            </Button>
          </LinkContainer>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ServiceCard;