import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaClock, FaMoneyBillWave } from 'react-icons/fa';

const ServiceCard = ({ service }) => {
  return (
    <Card className="h-100 border-0 shadow-sm service-card">
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold">{service.name}</Card.Title>

        <Card.Text className="text-muted flex-grow-1">
          {service.description}
        </Card.Text>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="small text-muted">
            <FaClock className="me-1" />
            {service.duration} min
          </span>

          <span className="fw-bold">
            <FaMoneyBillWave className="me-1" />
            {service.price} RSD
          </span>
        </div>

        <LinkContainer to="/zakazivanje">
          <Button variant="dark" className="w-100">
            Zakaži
          </Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;