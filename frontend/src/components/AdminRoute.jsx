import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

function AdminRoute() {
  const { userInfo, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!userInfo) {
    return (
      <Navigate
        to={`/prijava?redirect=${location.pathname}`}
        replace
      />
    );
  }

  if (!userInfo.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;