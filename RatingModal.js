import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { FaStar, FaTimes, FaCheck } from 'react-icons/fa';

const RatingModal = ({ show, onHide, booking, provider }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return;

    setSubmitting(true);
    
    // Simulate submitting review
    setTimeout(() => {
      console.log('Review submitted:', {
        bookingId: booking?.id,
        providerId: provider?.id,
        providerName: provider?.name,
        rating: rating,
        review: review,
        timestamp: new Date().toISOString()
      });
      
      setSubmitting(false);
      setSuccess(true);
      
      // Hide success message and close modal after 2 seconds
      setTimeout(() => {
        setSuccess(false);
        handleClose();
      }, 2000);
    }, 1000);
  };

  const handleClose = () => {
    setRating(0);
    setReview('');
    setHover(0);
    setSuccess(false);
    onHide();
  };

  const renderStars = () => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      return (
        <FaStar
          key={index}
          className={`star-rating ${starValue <= (hover || rating) ? 'text-warning' : 'text-muted'}`}
          style={{ 
            fontSize: '2rem', 
            cursor: 'pointer',
            opacity: starValue <= (hover || rating) ? 1 : 0.3,
            transition: 'all 0.2s ease'
          }}
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHover(starValue)}
          onMouseLeave={() => setHover(0)}
        />
      );
    });
  };

  if (!provider) return null;

  return (
    <Modal show={show} onHide={handleClose} size="md" centered>
      <Modal.Header className="border-0 pb-0">
        <div className="d-flex align-items-center w-100">
          <div className="provider-avatar-small me-3">
            <span className="fs-5">{provider.avatar}</span>
          </div>
          <div className="flex-grow-1">
            <Modal.Title className="mb-1">Rate {provider.name}</Modal.Title>
            <p className="text-muted small mb-0">
              Share your experience with this service provider
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
        {success ? (
          <Alert variant="success" className="text-center">
            <FaCheck className="me-2" />
            Thank you for your review! Your feedback helps other customers.
          </Alert>
        ) : (
          <Form onSubmit={handleSubmit}>
            {/* Star Rating */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold d-block mb-3">Rate your experience</Form.Label>
              <div className="d-flex justify-content-center mb-2">
                {renderStars()}
              </div>
              <div className="text-center">
                <small className="text-muted">
                  {rating === 0 && 'Click on a star to rate'}
                  {rating === 1 && 'Poor'}
                  {rating === 2 && 'Fair'}
                  {rating === 3 && 'Good'}
                  {rating === 4 && 'Very Good'}
                  {rating === 5 && 'Excellent'}
                </small>
              </div>
            </Form.Group>

            {/* Review Text */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Write a review (optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share details about your experience, the quality of service, punctuality, professionalism, etc..."
                className="form-control-custom"
                maxLength={500}
              />
              <Form.Text className="text-muted">
                {review.length}/500 characters
              </Form.Text>
            </Form.Group>

            <div className="d-grid">
              <Button
                type="submit"
                variant="primary"
                className="btn-primary-custom"
                disabled={submitting || rating === 0}
              >
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Submitting Review...
                  </>
                ) : (
                  <>
                    <FaCheck className="me-2" />
                    Submit Review
                  </>
                )}
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default RatingModal; 