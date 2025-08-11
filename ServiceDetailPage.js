import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { FaArrowLeft, FaStar, FaClock, FaMapMarkerAlt, FaPhone, FaCalendarAlt, FaUser, FaComments } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import ContactModal from '../components/ContactModal';

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  // Mock provider data - in a real app, this would come from the API
  const topRatedProviders = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      experience: '8 years',
      location: 'Mumbai Central',
      rating: 4.9,
      reviews: 127,
      verified: true,
      avatar: '👨‍🔧'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      experience: '12 years',
      location: 'Bandra East',
      rating: 4.8,
      reviews: 156,
      verified: true,
      avatar: '👩‍🔧'
    },
    {
      id: 3,
      name: 'Amit Patel',
      experience: '5 years',
      location: 'Andheri West',
      rating: 4.7,
      reviews: 89,
      verified: true,
      avatar: '👨‍🔧'
    },
    {
      id: 4,
      name: 'Suresh Reddy',
      experience: '3 years',
      location: 'Thane West',
      rating: 4.5,
      reviews: 67,
      verified: true,
      avatar: '👨‍🔧'
    },
    {
      id: 5,
      name: 'Meera Iyer',
      experience: '15 years',
      location: 'Juhu',
      rating: 4.9,
      reviews: 203,
      verified: true,
      avatar: '👩‍🔧'
    },
    {
      id: 6,
      name: 'Vikram Singh',
      experience: '7 years',
      location: 'Borivali East',
      rating: 4.6,
      reviews: 98,
      verified: true,
      avatar: '👨‍🔧'
    },
    {
      id: 7,
      name: 'Anjali Desai',
      experience: '10 years',
      location: 'Powai',
      rating: 4.8,
      reviews: 134,
      verified: true,
      avatar: '👩‍🔧'
    },
    {
      id: 8,
      name: 'Rahul Verma',
      experience: '6 years',
      location: 'Kandivali West',
      rating: 4.7,
      reviews: 112,
      verified: true,
      avatar: '👨‍🔧'
    }
  ];

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await apiService.getServiceById(serviceId);
        setService(response.data);
        setError(null);
      } catch (err) {
        setError('Service not found or failed to load.');
        console.error('Error fetching service:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  if (loading) {
    return (
      <div className="fade-in">
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={6} className="text-center">
              <div className="py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Loading service details...</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="fade-in">
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={6} className="text-center">
              <Alert variant="danger" className="mb-4">
                {error || 'Service not found'}
              </Alert>
              <Button
                variant="primary"
                onClick={() => navigate('/services')}
                className="btn-primary-custom"
              >
                Back to Services
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Header Section */}
      <section className="bg-primary-navy text-white py-5" style={{ backgroundColor: 'var(--primary-navy)' }}>
        <Container>
          <Row>
            <Col>
              <Button
                variant="link"
                className="text-white mb-3 p-0"
                onClick={() => navigate('/services')}
              >
                <FaArrowLeft className="me-2" />
                Back to Services
              </Button>
              <div className="d-flex align-items-center">
                <span className="service-icon-large me-4">{service.icon}</span>
                <div>
                  <h1 className="display-6 fw-bold mb-2">{service.name}</h1>
                  <p className="lead opacity-75 mb-0">{service.description}</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Service Details */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            {/* Main Content */}
            <Col lg={8}>
              <Card className="card-custom mb-4">
                <Card.Body className="p-4">
                  <h3 className="fw-bold mb-3">About This Service</h3>
                  <p className="text-muted mb-4">
                    Professional {service.name.toLowerCase()} services delivered by certified experts. 
                    We ensure quality workmanship, timely completion, and customer satisfaction for all your {service.name.toLowerCase()} needs.
                  </p>
                  
                  <h4 className="fw-bold mb-3">What's Included</h4>
                  <Row className="g-3 mb-4">
                    {service.services.map((item, index) => (
                      <Col key={index} xs={12} sm={6}>
                        <div className="d-flex align-items-center">
                          <div className="bg-accent-blue rounded-circle d-flex align-items-center justify-content-center me-3" 
                               style={{ width: '24px', height: '24px', backgroundColor: 'var(--accent-blue)' }}>
                            <span className="text-white small">✓</span>
                          </div>
                          <span className="text-muted">{item}</span>
                        </div>
                      </Col>
                    ))}
                  </Row>

                  {/* Top Rated Service Providers Section */}
                  <div className="border-top pt-4">
                    <h4 className="fw-bold mb-4">Top Rated Service Providers</h4>
                    <Row className="g-3">
                      {topRatedProviders.slice(0, 4).map((provider) => (
                        <Col key={provider.id} xs={12} sm={6} lg={6}>
                          <div className="provider-item p-3 border rounded h-100">
                            <div className="d-flex align-items-start">
                              <div className="provider-avatar-small me-3">
                                <span className="fs-5">{provider.avatar}</span>
                              </div>
                              <div className="flex-grow-1">
                                <div className="d-flex align-items-center mb-2">
                                  <h6 className="mb-0 me-2">{provider.name}</h6>
                                  {provider.verified && (
                                    <span className="badge bg-success fs-6">✓</span>
                                  )}
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                  <div className="me-2">
                                    {[...Array(5)].map((_, i) => (
                                      <FaStar 
                                        key={i} 
                                        className={i < Math.floor(provider.rating) ? "text-warning" : "text-muted"} 
                                        style={{ opacity: i < Math.floor(provider.rating) ? 1 : 0.3, fontSize: '0.8rem' }}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-muted small">
                                    {provider.rating} ({provider.reviews})
                                  </span>
                                </div>
                                <div className="mb-3">
                                  <div className="text-muted small mb-1">
                                    <FaUser className="me-1" />
                                    {provider.experience} experience
                                  </div>
                                  <div className="text-muted small">
                                    📍 {provider.location}
                                  </div>
                                </div>
                                {isAuthenticated() ? (
                                  <div className="d-flex gap-2">
                                                                           <Button
                                         variant="outline-primary"
                                         size="sm"
                                         className="btn-outline-custom flex-fill"
                                         onClick={() => {
                                           setSelectedProvider(provider);
                                           setShowContactModal(true);
                                         }}
                                       >
                                         <FaComments className="me-1" />
                                         Chat
                                       </Button>
                                       <Button
                                         variant="outline-success"
                                         size="sm"
                                         className="btn-outline-custom"
                                         onClick={() => window.open(`tel:+91${Math.floor(Math.random() * 9000000000) + 1000000000}`, '_blank')}
                                       >
                                         <FaPhone className="me-1" />
                                         Call
                                       </Button>
                                  </div>
                                ) : (
                                                                       <Button
                                       variant="outline-primary"
                                       size="sm"
                                       className="btn-outline-custom w-100"
                                       onClick={() => navigate('/customer/login')}
                                     >
                                       <FaPhone className="me-1" />
                                       Contact
                                     </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                    
                    {/* View All Providers Button */}
                    <div className="text-center mt-4">
                      <Button
                        variant="outline-primary"
                        className="btn-outline-custom px-4"
                        onClick={() => navigate(`/services/${serviceId}/providers`)}
                      >
                        View All Providers →
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Sidebar */}
            <Col lg={4}>
              <Card className="card-custom mb-4">
                <Card.Body className="p-4">
                  <h4 className="fw-bold mb-3">Service Details</h4>
                  
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <FaStar className="text-warning me-2" />
                      <span className="fw-semibold">{service.rating} Rating</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <FaClock className="text-muted me-2" />
                      <span className="text-muted">{service.duration}</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <FaMapMarkerAlt className="text-muted me-2" />
                      <span className="text-muted">{service.location}</span>
                    </div>
                  </div>

                  <div className="border-top pt-3 mb-4">
                    <h5 className="fw-bold text-accent-blue mb-2">{service.price}</h5>
                    <small className="text-muted">Starting price - final cost may vary</small>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="btn-primary-custom w-100 mb-3"
                    onClick={() => navigate(`/services/${serviceId}/book`)}
                  >
                    <FaCalendarAlt className="me-2" />
                    Book Now
                  </Button>

                  <Button
                    variant="outline-secondary"
                    className="btn-outline-custom w-100"
                    onClick={() => navigate(`/services/${serviceId}/contact`)}
                  >
                    <FaPhone className="me-2" />
                    Contact Provider
                  </Button>
                </Card.Body>
              </Card>

              {/* Features Card */}
              <Card className="card-custom">
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-3">Why Choose Us</h5>
                  <div className="space-y-2">
                    {service.features.map((feature, index) => (
                      <div key={index} className="d-flex align-items-center mb-2">
                        <div className="bg-success rounded-circle d-flex align-items-center justify-content-center me-2" 
                             style={{ width: '16px', height: '16px' }}>
                          <span className="text-white" style={{ fontSize: '10px' }}>✓</span>
                        </div>
                        <span className="small text-muted">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Modal */}
      <ContactModal
        show={showContactModal}
        onHide={() => setShowContactModal(false)}
        provider={selectedProvider}
      />
    </div>
  );
};

export default ServiceDetailPage; 