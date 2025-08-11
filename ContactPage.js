import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { FaArrowLeft, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaUser, FaComments, FaStar } from 'react-icons/fa';
import apiService from '../services/api';

const ContactPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredContact: 'phone'
  });

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

  const handleChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const contactPayload = {
        ...contactData,
        serviceId: parseInt(serviceId),
        serviceName: service.name
      };

      await apiService.submitContact(contactPayload);
      setSuccess(true);
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Error submitting contact:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Mock provider data
  const providers = [
    {
      id: 1,
      name: 'Expert Plumbing Solutions',
      phone: '+91 98765 43210',
      email: 'contact@expertplumbing.com',
      rating: 4.8,
      experience: '8+ years',
      location: 'Mumbai, Maharashtra'
    },
    {
      id: 2,
      name: 'Reliable Electrical Services',
      phone: '+91 98765 43211',
      email: 'info@reliableelectrical.com',
      rating: 4.9,
      experience: '12+ years',
      location: 'Mumbai, Maharashtra'
    },
    {
      id: 3,
      name: 'Professional AC Solutions',
      phone: '+91 98765 43212',
      email: 'service@proac.com',
      rating: 4.7,
      experience: '6+ years',
      location: 'Mumbai, Maharashtra'
    }
  ];

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

  if (error && !service) {
    return (
      <div className="fade-in">
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={6} className="text-center">
              <Alert variant="danger" className="mb-4">
                {error}
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

  if (success) {
    return (
      <div className="fade-in">
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={6}>
              <Card className="card-custom text-center">
                <Card.Body className="p-5">
                  <div className="mb-4">
                    <div className="bg-success rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" 
                         style={{ width: '80px', height: '80px' }}>
                      <span className="text-white" style={{ fontSize: '2rem' }}>✓</span>
                    </div>
                    <h3 className="fw-bold text-success mb-3">Message Sent!</h3>
                    <p className="text-muted mb-4">
                      Your message has been successfully sent. We'll get back to you within 24 hours.
                    </p>
                  </div>
                  <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      onClick={() => navigate('/services')}
                      className="btn-primary-custom"
                    >
                      Browse More Services
                    </Button>
                    <Button
                      variant="outline-primary"
                      onClick={() => navigate('/')}
                      className="btn-outline-custom"
                    >
                      Back to Home
                    </Button>
                  </div>
                </Card.Body>
              </Card>
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
                onClick={() => navigate(`/services/${serviceId}`)}
              >
                <FaArrowLeft className="me-2" />
                Back to Service Details
              </Button>
              <div className="d-flex align-items-center">
                <span className="service-icon-large me-4">{service.icon}</span>
                <div>
                  <h1 className="display-6 fw-bold mb-2">Contact {service.name} Providers</h1>
                  <p className="lead opacity-75 mb-0">Get in touch with our trusted service providers</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-5">
        <Container>
          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          )}
          
          <Row className="g-4">
            {/* Contact Form */}
            <Col lg={8}>
              <Card className="card-custom mb-4">
                <Card.Body className="p-4">
                  <h3 className="fw-bold mb-4">Send us a Message</h3>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-semibold">
                            <FaUser className="me-2" />
                            Full Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={contactData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="form-control-custom"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-semibold">
                            <FaPhone className="me-2" />
                            Phone Number
                          </Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={contactData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className="form-control-custom"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        <FaEnvelope className="me-2" />
                        Email Address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={contactData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className="form-control-custom"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        <FaComments className="me-2" />
                        Message
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        value={contactData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your requirements, questions, or concerns..."
                        className="form-control-custom"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">Preferred Contact Method</Form.Label>
                      <div>
                        <Form.Check
                          inline
                          type="radio"
                          name="preferredContact"
                          value="phone"
                          checked={contactData.preferredContact === 'phone'}
                          onChange={handleChange}
                          label="Phone Call"
                        />
                        <Form.Check
                          inline
                          type="radio"
                          name="preferredContact"
                          value="email"
                          checked={contactData.preferredContact === 'email'}
                          onChange={handleChange}
                          label="Email"
                        />
                        <Form.Check
                          inline
                          type="radio"
                          name="preferredContact"
                          value="whatsapp"
                          checked={contactData.preferredContact === 'whatsapp'}
                          onChange={handleChange}
                          label="WhatsApp"
                        />
                      </div>
                    </Form.Group>

                    <div className="d-grid">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="btn-primary-custom"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <FaComments className="me-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* Provider Information */}
            <Col lg={4}>
              <Card className="card-custom mb-4">
                <Card.Body className="p-4">
                  <h4 className="fw-bold mb-3">Available Providers</h4>
                  <p className="text-muted mb-4">
                    Connect with our verified and experienced {service.name.toLowerCase()} professionals.
                  </p>
                  
                  {providers.map((provider) => (
                    <div key={provider.id} className="border-bottom pb-3 mb-3">
                      <h6 className="fw-bold mb-2">{provider.name}</h6>
                      <div className="d-flex align-items-center mb-2">
                        <FaStar className="text-warning me-1" size={12} />
                        <span className="small text-muted">{provider.rating} Rating</span>
                        <span className="mx-2">•</span>
                        <span className="small text-muted">{provider.experience}</span>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <FaMapMarkerAlt className="text-muted me-2" size={12} />
                        <span className="small text-muted">{provider.location}</span>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <FaPhone className="text-muted me-2" size={12} />
                        <span className="small text-muted">{provider.phone}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <FaEnvelope className="text-muted me-2" size={12} />
                        <span className="small text-muted">{provider.email}</span>
                      </div>
                    </div>
                  ))}
                </Card.Body>
              </Card>

              {/* Contact Information */}
              <Card className="card-custom">
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-3">Get in Touch</h5>
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <FaPhone className="text-accent-blue me-2" />
                      <span className="small">+91 1800 123 4567</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <FaEnvelope className="text-accent-blue me-2" />
                      <span className="small">support@serviceconnect.com</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <FaMapMarkerAlt className="text-accent-blue me-2" />
                      <span className="small">Mumbai, Maharashtra, India</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <FaClock className="text-accent-blue me-2" />
                      <span className="small">24/7 Customer Support</span>
                    </div>
                  </div>
                  
                  <Alert variant="info" className="small">
                    <strong>Response Time:</strong> We typically respond within 2-4 hours during business hours.
                  </Alert>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ContactPage; 