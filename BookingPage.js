import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { FaArrowLeft, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPhone, FaUser, FaCreditCard, FaStar } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import apiService from '../services/api';

const BookingPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [service, setService] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    date: null,
    time: '',
    serviceType: '',
    description: '',
    preferredProvider: '',
    specialInstructions: ''
  });

  // Available time slots (mock data - in real app this would come from provider's availability)
  const availableTimeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get provider and service data from navigation state
        if (location.state?.selectedProvider) {
          setSelectedProvider(location.state.selectedProvider);
        }
        if (location.state?.service) {
          setService(location.state.service);
        } else {
          // Fetch service data if not passed in state
          const serviceResponse = await apiService.getServiceById(serviceId);
          setService(serviceResponse.data);
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to load service details');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serviceId, location.state]);

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const bookingPayload = {
        ...bookingData,
        serviceId: parseInt(serviceId),
        serviceName: service.name,
        providerId: selectedProvider?.id,
        providerName: selectedProvider?.name,
        totalPrice: selectedProvider?.price || service.price
      };

      await apiService.submitBooking(bookingPayload);
      setSuccess(true);
    } catch (err) {
      setError('Failed to submit booking. Please try again.');
      console.error('Error submitting booking:', err);
    } finally {
      setSubmitting(false);
    }
  };

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
                <p className="mt-3 text-muted">Loading booking details...</p>
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
                    <h3 className="fw-bold text-success mb-3">Booking Confirmed!</h3>
                    <p className="text-muted mb-4">
                      Your booking for {service.name} has been successfully submitted. 
                      We'll contact you within 2 hours to confirm the details.
                    </p>
                  </div>
                  <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      onClick={() => navigate('/services')}
                      className="btn-primary-custom"
                    >
                      Book Another Service
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
                  <h1 className="display-6 fw-bold mb-2">Book {service.name}</h1>
                  <p className="lead opacity-75 mb-0">Schedule your service appointment</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Selected Provider Info */}
      {selectedProvider && (
        <section className="py-3">
          <Container>
            <Card className="card-custom border-success">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center">
                  <div className="provider-avatar me-3">
                    <span className="display-6">{selectedProvider.avatar}</span>
                  </div>
                  <div className="flex-grow-1">
                    <h4 className="fw-bold mb-1">{selectedProvider.name}</h4>
                    <div className="d-flex align-items-center mb-2">
                      <div className="me-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={i < Math.floor(selectedProvider.rating) ? "text-warning" : "text-muted"} 
                            style={{ opacity: i < Math.floor(selectedProvider.rating) ? 1 : 0.3 }}
                          />
                        ))}
                      </div>
                      <span className="text-muted small">
                        {selectedProvider.rating} ({selectedProvider.reviews} reviews)
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="fw-semibold text-primary fs-5 me-3">{selectedProvider.price}</span>
                      <span className="text-muted small">per visit</span>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Container>
        </section>
      )}

      {/* Booking Form */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            <Col lg={8}>
              <Card className="card-custom">
                <Card.Body className="p-4">
                  <h3 className="fw-bold mb-4">Booking Details</h3>
                  {error && (
                    <Alert variant="danger" className="mb-4">
                      {error}
                    </Alert>
                  )}
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
                            value={bookingData.name}
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
                            value={bookingData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className="form-control-custom"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={bookingData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className="form-control-custom"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        <FaMapMarkerAlt className="me-2" />
                        Service Address
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="address"
                        value={bookingData.address}
                        onChange={handleChange}
                        placeholder="Enter your complete address"
                        className="form-control-custom"
                        required
                      />
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-semibold">
                            <FaCalendarAlt className="me-2" />
                            Preferred Date
                          </Form.Label>
                          <DatePicker
                            selected={bookingData.date}
                            onChange={(date) => setBookingData({...bookingData, date})}
                            minDate={new Date()}
                            dateFormat="MMMM d, yyyy"
                            placeholderText="Select a date"
                            className="form-control form-control-custom"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-semibold">
                            <FaClock className="me-2" />
                            Preferred Time
                          </Form.Label>
                          <Form.Select
                            name="time"
                            value={bookingData.time}
                            onChange={handleChange}
                            className="form-control-custom"
                            required
                          >
                            <option value="">Select time</option>
                            {availableTimeSlots.map(time => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Service Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="description"
                        value={bookingData.description}
                        onChange={handleChange}
                        placeholder="Describe the specific service you need..."
                        className="form-control-custom"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Special Instructions</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="specialInstructions"
                        value={bookingData.specialInstructions}
                        onChange={handleChange}
                        placeholder="Any special requirements or instructions..."
                        className="form-control-custom"
                      />
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
                            Processing Booking...
                          </>
                        ) : (
                          <>
                            <FaCreditCard className="me-2" />
                            Confirm Booking
                          </>
                        )}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* Booking Summary */}
            <Col lg={4}>
              <Card className="card-custom">
                <Card.Body className="p-4">
                  <h4 className="fw-bold mb-3">Booking Summary</h4>
                  
                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-3">
                      <span className="service-icon-large me-3">{service.icon}</span>
                      <div>
                        <h5 className="fw-bold mb-1">{service.name}</h5>
                        <p className="text-muted mb-0">Professional Service</p>
                      </div>
                    </div>
                    
                    <div className="border-top pt-3">
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Service Fee:</span>
                        <span className="fw-semibold">{selectedProvider?.price || service.price}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Booking Fee:</span>
                        <span className="fw-semibold">₹200</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Tax:</span>
                        <span className="fw-semibold">₹150</span>
                      </div>
                      <div className="border-top pt-2">
                        <div className="d-flex justify-content-between">
                          <span className="fw-bold">Total:</span>
                          <span className="fw-bold text-accent-blue">₹{parseInt((selectedProvider?.price || service.price).replace(/[^\d]/g, '')) + 350}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Alert variant="info" className="small">
                    <strong>Note:</strong> Final pricing may vary based on the scope of work. 
                    We'll provide a detailed quote after assessing your requirements.
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

export default BookingPage; 