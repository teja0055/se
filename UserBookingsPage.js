import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Modal } from 'react-bootstrap';
import { FaCalendarAlt, FaStar, FaTimes, FaCheck, FaUser, FaClock, FaMapMarkerAlt, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import RatingModal from '../components/RatingModal';
import { showSuccess } from '../services/notificationService';

const UserBookingsPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  useEffect(() => {
    // Mock bookings data
    const mockBookings = [
      {
        id: 1,
        serviceName: 'Plumbing Repair',
        providerName: 'Rajesh Kumar',
        providerAvatar: '👨‍🔧',
        date: '2024-01-15',
        time: '10:00 AM',
        status: 'completed',
        amount: 2500,
        address: 'Mumbai Central, Mumbai',
        rating: null,
        canRate: true,
        canCancel: false
      },
      {
        id: 2,
        serviceName: 'House Cleaning',
        providerName: 'Priya Sharma',
        providerAvatar: '👩‍💼',
        date: '2024-01-18',
        time: '2:00 PM',
        status: 'confirmed',
        amount: 1800,
        address: 'Andheri West, Mumbai',
        rating: null,
        canRate: false,
        canCancel: true
      },
      {
        id: 3,
        serviceName: 'Electrical Work',
        providerName: 'Amit Patel',
        providerAvatar: '👨‍🔌',
        date: '2024-01-20',
        time: '11:30 AM',
        status: 'pending',
        amount: 3200,
        address: 'Bandra East, Mumbai',
        rating: null,
        canRate: false,
        canCancel: true
      },
      {
        id: 4,
        serviceName: 'Carpentry Service',
        providerName: 'Suresh Reddy',
        providerAvatar: '👨‍🔨',
        date: '2024-01-12',
        time: '9:00 AM',
        status: 'completed',
        amount: 2800,
        address: 'Thane West, Mumbai',
        rating: 5,
        canRate: false,
        canCancel: false
      },
      {
        id: 5,
        serviceName: 'AC Repair',
        providerName: 'Meera Iyer',
        providerAvatar: '👩‍🔧',
        date: '2024-01-25',
        time: '3:00 PM',
        status: 'cancelled',
        amount: 3500,
        address: 'Powai, Mumbai',
        rating: null,
        canRate: false,
        canCancel: false
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { variant: 'warning', text: 'Pending', icon: <FaClock /> },
      confirmed: { variant: 'success', text: 'Confirmed', icon: <FaCheck /> },
      completed: { variant: 'info', text: 'Completed', icon: <FaCheck /> },
      cancelled: { variant: 'danger', text: 'Cancelled', icon: <FaTimes /> }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <Badge bg={config.variant} className="d-flex align-items-center gap-1">
        {config.icon}
        {config.text}
      </Badge>
    );
  };

  const handleRateBooking = (booking) => {
    setSelectedBooking(booking);
    setShowRatingModal(true);
  };

  const handleCancelBooking = (booking) => {
    setBookingToCancel(booking);
    setShowCancelModal(true);
  };

  const confirmCancelBooking = () => {
    if (!bookingToCancel) return;

    // Simulate API call
    setTimeout(() => {
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking.id === bookingToCancel.id 
            ? { ...booking, status: 'cancelled', canCancel: false }
            : booking
        )
      );
      
      showSuccess(`Booking #${bookingToCancel.id} cancelled successfully!`);
      setShowCancelModal(false);
      setBookingToCancel(null);
    }, 1000);
  };

  const handleRatingSubmit = (rating, review) => {
    if (!selectedBooking) return;

    // Simulate API call
    setTimeout(() => {
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking.id === selectedBooking.id 
            ? { ...booking, rating: rating, canRate: false }
            : booking
        )
      );
      
      showSuccess('Thank you for your review! Your feedback helps other customers.');
      setShowRatingModal(false);
      setSelectedBooking(null);
    }, 1000);
  };

  const getFilteredBookings = () => {
    return bookings;
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading your bookings...</p>
        </div>
      </Container>
    );
  }

  const filteredBookings = getFilteredBookings();

  return (
    <div className="fade-in">
      {/* Header Section */}
      <section className="bg-primary-navy text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col>
              <div className="d-flex align-items-center">
                <div className="me-4">
                  <FaCalendarAlt size={48} />
                </div>
                <div>
                  <h1 className="display-6 fw-bold mb-2">My Bookings</h1>
                  <p className="lead opacity-75 mb-0">
                    Track your service bookings and manage appointments
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Bookings Content */}
      <section className="py-5">
        <Container>
          {filteredBookings.length === 0 ? (
            <Card className="card-custom">
              <Card.Body className="text-center py-5">
                <FaCalendarAlt size={64} className="text-muted mb-3" />
                <h4 className="text-muted mb-3">No bookings found</h4>
                <p className="text-muted mb-4">
                  You haven't made any bookings yet. Start by exploring our services.
                </p>
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => navigate('/services')}
                >
                  Browse Services
                </Button>
              </Card.Body>
            </Card>
          ) : (
            <Card className="card-custom">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="fw-bold mb-0">
                    <FaCalendarAlt className="me-2" />
                    Booking History
                  </h4>
                  <Badge bg="primary" className="fs-6">
                    {filteredBookings.length} bookings
                  </Badge>
                </div>

                <div className="table-responsive">
                  <Table className="table-hover">
                    <thead>
                      <tr>
                        <th>Service & Provider</th>
                        <th>Date & Time</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Rating</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map((booking) => (
                        <tr key={booking.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="provider-avatar-small me-3">
                                <span className="fs-5">{booking.providerAvatar}</span>
                              </div>
                              <div>
                                <div className="fw-semibold">{booking.serviceName}</div>
                                <div className="text-muted small">
                                  <FaUser className="me-1" />
                                  {booking.providerName}
                                </div>
                                <div className="text-muted small">
                                  <FaMapMarkerAlt className="me-1" />
                                  {booking.address}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div>
                              <div className="fw-semibold">
                                {new Date(booking.date).toLocaleDateString()}
                              </div>
                              <small className="text-muted">{booking.time}</small>
                            </div>
                          </td>
                          <td>
                            <span className="fw-bold text-success">
                              ₹{booking.amount.toLocaleString()}
                            </span>
                          </td>
                          <td>
                            {getStatusBadge(booking.status)}
                          </td>
                          <td>
                            {booking.rating ? (
                              <div className="d-flex align-items-center">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar 
                                    key={i} 
                                    className={i < booking.rating ? "text-warning" : "text-muted"} 
                                    style={{ fontSize: '0.8rem' }}
                                  />
                                ))}
                                <span className="ms-1 small text-muted">
                                  ({booking.rating}/5)
                                </span>
                              </div>
                            ) : (
                              <span className="text-muted small">Not rated</span>
                            )}
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              {booking.canRate && (
                                <Button
                                  size="sm"
                                  variant="outline-primary"
                                  onClick={() => handleRateBooking(booking)}
                                >
                                  <FaStar className="me-1" />
                                  Rate
                                </Button>
                              )}
                              {booking.canCancel && (
                                <Button
                                  size="sm"
                                  variant="outline-danger"
                                  onClick={() => handleCancelBooking(booking)}
                                >
                                  <FaTrash className="me-1" />
                                  Cancel
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          )}
        </Container>
      </section>

      {/* Rating Modal */}
      <RatingModal
        show={showRatingModal}
        onHide={() => setShowRatingModal(false)}
        booking={selectedBooking}
        provider={selectedBooking ? {
          id: selectedBooking.id,
          name: selectedBooking.providerName,
          avatar: selectedBooking.providerAvatar
        } : null}
        onSubmit={handleRatingSubmit}
      />

      {/* Cancel Confirmation Modal */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to cancel booking #{bookingToCancel?.id} for{' '}
            <strong>{bookingToCancel?.serviceName}</strong>?
          </p>
          <p className="text-muted small">
            This action cannot be undone. You may be charged a cancellation fee.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Keep Booking
          </Button>
          <Button variant="danger" onClick={confirmCancelBooking}>
            Cancel Booking
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserBookingsPage; 