import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaLock, FaUser, FaExclamationTriangle } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

// Protected Route for any authenticated user
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading...</p>
        </div>
      </Container>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/customer/login" state={{ from: location }} replace />;
  }

  return children;
};

// Protected Route for customers only
export const CustomerRoute = ({ children }) => {
  const { isAuthenticated, isCustomer, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading...</p>
        </div>
      </Container>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/customer/login" state={{ from: location }} replace />;
  }

  if (!isCustomer()) {
    return <UnauthorizedPage userType="customer" />;
  }

  return children;
};

// Protected Route for providers only
export const ProviderRoute = ({ children }) => {
  const { isAuthenticated, isProvider, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading...</p>
        </div>
      </Container>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/provider/login" state={{ from: location }} replace />;
  }

  if (!isProvider()) {
    return <UnauthorizedPage userType="provider" />;
  }

  return children;
};

// Protected Route for admins only
export const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading...</p>
        </div>
      </Container>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/customer/login" state={{ from: location }} replace />;
  }

  if (!isAdmin()) {
    return <UnauthorizedPage userType="admin" />;
  }

  return children;
};

// Unauthorized Page Component
const UnauthorizedPage = ({ userType }) => {
  const { logout } = useAuth();

  const getUnauthorizedMessage = () => {
    switch (userType) {
      case 'customer':
        return {
          title: 'Customer Access Required',
          message: 'This page is only accessible to customers. Please log in with a customer account.',
          loginPath: '/customer/login'
        };
      case 'provider':
        return {
          title: 'Provider Access Required',
          message: 'This page is only accessible to service providers. Please log in with a provider account.',
          loginPath: '/provider/login'
        };
      case 'admin':
        return {
          title: 'Admin Access Required',
          message: 'This page is only accessible to administrators. Please log in with an admin account.',
          loginPath: '/customer/login'
        };
      default:
        return {
          title: 'Access Denied',
          message: 'You do not have permission to access this page.',
          loginPath: '/customer/login'
        };
    }
  };

  const { title, message, loginPath } = getUnauthorizedMessage();

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="card-custom text-center">
            <Card.Body className="p-5">
              <div className="text-warning mb-4">
                <FaExclamationTriangle size={64} />
              </div>
              <h3 className="fw-bold mb-3">{title}</h3>
              <p className="text-muted mb-4">{message}</p>
              
              <div className="d-flex gap-3 justify-content-center">
                <Button
                  variant="primary"
                  onClick={() => window.location.href = loginPath}
                >
                  <FaUser className="me-2" />
                  Login
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={logout}
                >
                  <FaLock className="me-2" />
                  Logout
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

const ProtectedRouteExports = {
  ProtectedRoute,
  CustomerRoute,
  ProviderRoute,
  AdminRoute
};

export default ProtectedRouteExports; 