import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light py-4 mt-5" style={{ backgroundColor: 'var(--light-gray)' }}>
      <Container>
        <div className="text-center">
          <p className="text-muted mb-0">
            © 2024 Service Connect. All rights reserved.
          </p>
          <p className="text-muted small mt-1">
            Connecting trusted professionals with customers for quality home services.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 