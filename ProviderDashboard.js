import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Nav, Tab } from 'react-bootstrap';
import { FaCalendarAlt, FaRupeeSign, FaCheck, FaTimes, FaClock, FaUser, FaStar, FaCalendarPlus } from 'react-icons/fa';
import AvailabilityManager from '../components/AvailabilityManager';

const ProviderDashboard = () => {
  const [provider, setProvider] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock provider data
    const mockProvider = {
      id: 1,
      name: 'Rajesh Kumar',
      avatar: '👨‍🔧',
      rating: 4.9,
      totalBookings: 127,
      totalEarnings: 285000
    };

    // Mock bookings data
    const mockBookings = [
      {
        id: 1,
        clientName: 'Priya Sharma',
        service: 'Plumbing Repair',
        date: '2024-01-15',
        time: '10:00 AM',
        status: 'pending',
        amount: 2500,
        address: 'Mumbai Central, Mumbai'
      },
      {
        id: 2,
        clientName: 'Amit Patel',
        service: 'Drain Cleaning',
        date: '2024-01-16',
        time: '2:00 PM',
        status: 'confirmed',
        amount: 1800,
        address: 'Andheri West, Mumbai'
      },
      {
        id: 3,
        clientName: 'Meera Iyer',
        service: 'Water Heater Installation',
        date: '2024-01-17',
        time: '11:30 AM',
        status: 'completed',
        amount: 3500,
        address: 'Bandra East, Mumbai'
      },
      {
        id: 4,
        clientName: 'Suresh Reddy',
        service: 'Pipe Repair',
        date: '2024-01-18',
        time: '9:00 AM',
        status: 'pending',
        amount: 2200,
        address: 'Thane West, Mumbai'
      },
      {
        id: 5,
        clientName: 'Anjali Desai',
        service: 'Fixture Installation',
        date: '2024-01-19',
        time: '3:00 PM',
        status: 'confirmed',
        amount: 2800,
        address: 'Powai, Mumbai'
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setProvider(mockProvider);
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, []);

  const handleBookingAction = (bookingId, action) => {
    setBookings(prevBookings => 
      prevBookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: action === 'accept' ? 'confirmed' : 'rejected' }
          : booking
      )
    );
    
    console.log(`Booking ${bookingId} ${action}ed`);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { variant: 'warning', text: 'Pending' },
      confirmed: { variant: 'success', text: 'Confirmed' },
      completed: { variant: 'info', text: 'Completed' },
      rejected: { variant: 'danger', text: 'Rejected' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return <Badge bg={config.variant}>{config.text}</Badge>;
  };

  const getEarningsThisMonth = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return bookings
      .filter(booking => {
        const bookingDate = new Date(booking.date);
        return bookingDate.getMonth() === currentMonth && 
               bookingDate.getFullYear() === currentYear &&
               booking.status === 'completed';
      })
      .reduce((total, booking) => total + booking.amount, 0);
  };

  const getPendingBookings = () => {
    return bookings.filter(booking => booking.status === 'pending').length;
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading dashboard...</p>
        </div>
      </Container>
    );
  }

  return (
    <div className="fade-in">
      {/* Header Section */}
      <section className="bg-primary-navy text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col>
              <div className="d-flex align-items-center">
                <div className="provider-avatar me-4">
                  <span className="display-6">{provider.avatar}</span>
                </div>
                <div>
                  <h1 className="display-6 fw-bold mb-2">Welcome back, {provider.name}!</h1>
                  <p className="lead opacity-75 mb-0">
                    Manage your bookings and track your earnings
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Dashboard Content */}
      <section className="py-5">
        <Container>
          {/* Stats Cards */}
          <Row className="g-4 mb-5">
            <Col md={3}>
              <Card className="card-custom h-100">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center">
                    <div className="bg-success rounded-circle d-flex align-items-center justify-content-center me-3" 
                         style={{ width: '60px', height: '60px' }}>
                      <FaRupeeSign className="text-white fs-4" />
                    </div>
                    <div>
                      <h3 className="fw-bold mb-1">₹{getEarningsThisMonth().toLocaleString()}</h3>
                      <p className="text-muted mb-0">Earnings this month</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={3}>
              <Card className="card-custom h-100">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center">
                    <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center me-3" 
                         style={{ width: '60px', height: '60px' }}>
                      <FaClock className="text-white fs-4" />
                    </div>
                    <div>
                      <h3 className="fw-bold mb-1">{getPendingBookings()}</h3>
                      <p className="text-muted mb-0">Pending bookings</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={3}>
              <Card className="card-custom h-100">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center">
                    <div className="bg-info rounded-circle d-flex align-items-center justify-content-center me-3" 
                         style={{ width: '60px', height: '60px' }}>
                      <FaStar className="text-white fs-4" />
                    </div>
                    <div>
                      <h3 className="fw-bold mb-1">{provider.rating}</h3>
                      <p className="text-muted mb-0">Average rating</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="card-custom h-100">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" 
                         style={{ width: '60px', height: '60px' }}>
                      <FaCalendarPlus className="text-white fs-4" />
                    </div>
                    <div>
                      <h3 className="fw-bold mb-1">Manage</h3>
                      <p className="text-muted mb-0">Availability</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Tabs for Dashboard and Availability */}
          <Row>
            <Col>
              <Card className="card-custom">
                <Card.Header className="bg-light">
                  <Nav variant="tabs" defaultActiveKey="bookings">
                    <Nav.Item>
                      <Nav.Link eventKey="bookings" className="fw-semibold">
                        <FaCalendarAlt className="me-2" />
                        Upcoming Bookings
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="availability" className="fw-semibold">
                        <FaCalendarPlus className="me-2" />
                        Manage Availability
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
                <Card.Body className="p-0">
                  <Tab.Content>
                    <Tab.Pane eventKey="bookings" className="p-4">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="fw-bold mb-0">
                          <FaCalendarAlt className="me-2" />
                          Upcoming Bookings
                        </h4>
                        <Badge bg="primary" className="fs-6">
                          {bookings.length} total
                        </Badge>
                      </div>

                      <div className="table-responsive">
                        <Table className="table-hover">
                          <thead>
                            <tr>
                              <th>Client</th>
                              <th>Service</th>
                              <th>Date & Time</th>
                              <th>Amount</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bookings.map((booking) => (
                              <tr key={booking.id}>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-2" 
                                         style={{ width: '32px', height: '32px' }}>
                                      <FaUser className="text-muted" />
                                    </div>
                                    <div>
                                      <div className="fw-semibold">{booking.clientName}</div>
                                      <small className="text-muted">{booking.address}</small>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <span className="fw-semibold">{booking.service}</span>
                                </td>
                                <td>
                                  <div>
                                    <div className="fw-semibold">{new Date(booking.date).toLocaleDateString()}</div>
                                    <small className="text-muted">{booking.time}</small>
                                  </div>
                                </td>
                                <td>
                                  <span className="fw-bold text-success">₹{booking.amount}</span>
                                </td>
                                <td>
                                  {getStatusBadge(booking.status)}
                                </td>
                                <td>
                                  {booking.status === 'pending' && (
                                    <div className="d-flex gap-2">
                                      <Button
                                        size="sm"
                                        variant="success"
                                        onClick={() => handleBookingAction(booking.id, 'accept')}
                                      >
                                        <FaCheck className="me-1" />
                                        Accept
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="danger"
                                        onClick={() => handleBookingAction(booking.id, 'reject')}
                                      >
                                        <FaTimes className="me-1" />
                                        Reject
                                      </Button>
                                    </div>
                                  )}
                                  {booking.status === 'confirmed' && (
                                    <Button size="sm" variant="info">
                                      <FaCheck className="me-1" />
                                      Mark Complete
                                    </Button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="availability">
                      <AvailabilityManager />
                    </Tab.Pane>
                  </Tab.Content>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ProviderDashboard; 