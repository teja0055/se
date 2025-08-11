import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaWrench, FaBolt, FaHammer } from 'react-icons/fa';

const LandingPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const services = [
    { id: 1, name: 'Plumbing', icon: '🔧', description: 'Expert plumbing services' },
    { id: 2, name: 'Electrician', icon: '⚡', description: 'Professional electrical work' },
    { id: 3, name: 'Carpentry', icon: '🔨', description: 'Quality carpentry solutions' },
    { id: 4, name: 'Cleaning', icon: '🧹', description: 'Thorough cleaning services' },
    { id: 5, name: 'Painting', icon: '🎨', description: 'Professional painting work' },
    { id: 6, name: 'Explore More...', icon: '⋯', description: 'Discover more services' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', searchQuery, 'in:', location);
  };

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="bg-primary-navy text-white py-5" style={{ backgroundColor: 'var(--primary-navy)' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-3">
                Find trusted professionals for all your home service needs
              </h1>
              <p className="lead mb-5 opacity-75">
                Connect with verified experts for quality home services. Fast, reliable, and professional.
              </p>
              
              {/* Search Bar */}
              <Form onSubmit={handleSearch} className="mb-4">
                <div className="search-bar d-flex align-items-center">
                  <FaSearch className="text-muted me-3" size={20} />
                  <Form.Control
                    type="text"
                    placeholder="What service do you need?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 bg-transparent flex-grow-1 me-3"
                    style={{ color: 'var(--text-primary)' }}
                  />
                  <div className="border-start border-2 border-secondary me-3" style={{ height: '30px' }}></div>
                  <Form.Control
                    type="text"
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border-0 bg-transparent flex-grow-1 me-3"
                    style={{ color: 'var(--text-primary)' }}
                  />
                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="btn-primary-custom px-4"
                  >
                    Search
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h2 className="fw-bold mb-3">Popular Services</h2>
              <p className="text-muted">Choose from our most requested professional services</p>
            </Col>
          </Row>
          
                     <Row className="g-4">
             {services.map((service) => (
               <Col key={service.id} xs={12} sm={6} lg={4}>
                 <Card 
                   className="service-card h-100 cursor-pointer"
                   onClick={() => {
                     if (service.name === 'Explore More...') {
                       navigate('/services');
                     } else {
                       navigate(`/services/${service.id}`);
                     }
                   }}
                 >
                   <Card.Body className="d-flex flex-column justify-content-center">
                     <span className="service-icon">{service.icon}</span>
                     <Card.Title className="fw-semibold mb-2">{service.name}</Card.Title>
                     <Card.Text className="text-muted small">
                       {service.description}
                     </Card.Text>
                     {service.name === 'Explore More...' && (
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="btn-outline-custom mt-auto"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/services');
                          }}
                        >
                          View All Services
                        </Button>
                      )}
                   </Card.Body>
                 </Card>
               </Col>
             ))}
           </Row>
           
                       {/* View All Services Button */}
            <Row className="justify-content-center mt-5">
              <Col md={4} className="text-center">
                <Button
                  variant="primary"
                  size="lg"
                  className="btn-primary-custom px-5"
                  onClick={() => navigate('/services')}
                >
                  View All Services
                </Button>
              </Col>
            </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light" style={{ backgroundColor: 'var(--light-gray)' }}>
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
                             <h2 className="fw-bold mb-3">Why Choose Service Connect?</h2>
              <p className="text-muted">Experience the difference with our trusted platform</p>
            </Col>
          </Row>
          
          <Row className="g-4">
            <Col md={4} className="text-center">
              <div className="mb-3">
                <FaWrench size={40} className="text-accent-blue" />
              </div>
              <h5 className="fw-semibold mb-2">Verified Professionals</h5>
              <p className="text-muted">All service providers are thoroughly vetted and background-checked</p>
            </Col>
            <Col md={4} className="text-center">
              <div className="mb-3">
                <FaBolt size={40} className="text-accent-blue" />
              </div>
              <h5 className="fw-semibold mb-2">Quick Response</h5>
              <p className="text-muted">Get connected with professionals within minutes, not hours</p>
            </Col>
            <Col md={4} className="text-center">
              <div className="mb-3">
                <FaHammer size={40} className="text-accent-blue" />
              </div>
              <h5 className="fw-semibold mb-2">Quality Guaranteed</h5>
              <p className="text-muted">Satisfaction guaranteed with our quality assurance program</p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default LandingPage; 