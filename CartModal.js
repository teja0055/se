import React, { useState } from 'react';
import { Modal, Button, ListGroup, Form, Row, Col } from 'react-bootstrap';
import { FaShoppingCart, FaTrash, FaTimes, FaCheck, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const CartModal = ({ show, onHide }) => {
  const { items, removeService, updateQuantity, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [checkoutData, setCheckoutData] = useState({
    date: null,
    time: '',
    address: '',
    name: '',
    phone: '',
    email: ''
  });
  const [showCheckout, setShowCheckout] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (items.length === 0) return;

    setSubmitting(true);
    
    // Simulate booking submission
    setTimeout(() => {
      console.log('Multi-service booking submitted:', {
        services: items,
        customerInfo: checkoutData,
        totalAmount: getTotalPrice(),
        timestamp: new Date().toISOString()
      });
      
      setSubmitting(false);
      setSuccess(true);
      
      // Clear cart and close modal after success
      setTimeout(() => {
        clearCart();
        setSuccess(false);
        setShowCheckout(false);
        onHide();
        navigate('/user/bookings');
      }, 2000);
    }, 1500);
  };

  const handleClose = () => {
    setShowCheckout(false);
    setSuccess(false);
    onHide();
  };

  const formatPrice = (price) => {
    const numPrice = parseFloat(price.replace('₹', '').replace(',', ''));
    return `₹${numPrice.toLocaleString()}`;
  };

  if (success) {
    return (
      <Modal show={show} onHide={handleClose} size="md" centered>
        <Modal.Body className="text-center p-5">
          <div className="text-success mb-3">
            <FaCheck size={48} />
          </div>
          <h4 className="fw-bold mb-3">Booking Successful!</h4>
          <p className="text-muted">
            Your multi-service booking has been confirmed. You'll receive notifications about provider assignments.
          </p>
          <Button variant="primary" onClick={handleClose}>
            View My Bookings
          </Button>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header className="border-0 pb-0">
        <div className="d-flex align-items-center w-100">
          <div className="flex-grow-1">
            <Modal.Title className="mb-1">
              <FaShoppingCart className="me-2" />
              Service Cart ({items.length} items)
            </Modal.Title>
            <p className="text-muted small mb-0">
              {showCheckout ? 'Complete your booking' : 'Review your selected services'}
            </p>
          </div>
          <Button
            variant="link"
            className="text-muted p-0"
            onClick={handleClose}
          >
            <FaTimes />
          </Button>
        </div>
      </Modal.Header>

      <Modal.Body className="pt-3">
        {!showCheckout ? (
          <>
            {items.length === 0 ? (
              <div className="text-center py-5">
                <FaShoppingCart size={48} className="text-muted mb-3" />
                <h5 className="text-muted">Your cart is empty</h5>
                <p className="text-muted">Add some services to get started</p>
                <Button variant="primary" onClick={handleClose}>
                  Browse Services
                </Button>
              </div>
            ) : (
              <>
                <ListGroup className="mb-4">
                  {items.map((item) => (
                    <ListGroup.Item key={item.id} className="d-flex align-items-center p-3">
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h6 className="fw-bold mb-1">{item.name}</h6>
                            <p className="text-muted small mb-0">{item.description}</p>
                          </div>
                          <Button
                            variant="link"
                            className="text-danger p-0"
                            onClick={() => removeService(item.id)}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <Button
                              size="sm"
                              variant="outline-secondary"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </Button>
                            <span className="mx-3 fw-bold">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline-secondary"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                          <div className="text-end">
                            <div className="fw-bold text-success">
                              {formatPrice(item.price)} × {item.quantity}
                            </div>
                            <div className="fw-bold">
                              {formatPrice((parseFloat(item.price.replace('₹', '').replace(',', '')) * item.quantity).toString())}
                            </div>
                          </div>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                <div className="border-top pt-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0">Total Amount</h5>
                    <h4 className="fw-bold text-success mb-0">
                      ₹{getTotalPrice().toLocaleString()}
                    </h4>
                  </div>
                  
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-secondary"
                      className="flex-grow-1"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                    <Button
                      variant="primary"
                      className="flex-grow-1"
                      onClick={() => setShowCheckout(true)}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <Form onSubmit={handleCheckout}>
            <h5 className="fw-bold mb-3">Booking Information</h5>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    <FaCalendarAlt className="me-2" />
                    Preferred Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={checkoutData.date}
                    onChange={(e) => setCheckoutData({...checkoutData, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    <FaCalendarAlt className="me-2" />
                    Preferred Time
                  </Form.Label>
                  <Form.Select
                    value={checkoutData.time}
                    onChange={(e) => setCheckoutData({...checkoutData, time: e.target.value})}
                    required
                  >
                    <option value="">Select time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                <FaMapMarkerAlt className="me-2" />
                Service Address
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={checkoutData.address}
                onChange={(e) => setCheckoutData({...checkoutData, address: e.target.value})}
                placeholder="Enter your complete address"
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={checkoutData.name}
                    onChange={(e) => setCheckoutData({...checkoutData, name: e.target.value})}
                    placeholder="Enter your full name"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    value={checkoutData.phone}
                    onChange={(e) => setCheckoutData({...checkoutData, phone: e.target.value})}
                    placeholder="Enter your phone number"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Email Address</Form.Label>
              <Form.Control
                type="email"
                value={checkoutData.email}
                onChange={(e) => setCheckoutData({...checkoutData, email: e.target.value})}
                placeholder="Enter your email address"
                required
              />
            </Form.Group>

            <div className="border-top pt-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0">Total Amount</h6>
                <h5 className="fw-bold text-success mb-0">
                  ₹{getTotalPrice().toLocaleString()}
                </h5>
              </div>
              
              <div className="d-flex gap-2">
                <Button
                  variant="outline-secondary"
                  className="flex-grow-1"
                  onClick={() => setShowCheckout(false)}
                >
                  Back to Cart
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-grow-1"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaCheck className="me-2" />
                      Confirm Booking
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default CartModal; 