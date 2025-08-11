import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';

const ContactModal = ({ show, onHide, provider }) => {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSending(true);
    
    // Simulate sending message
    setTimeout(() => {
      console.log('Message sent to provider:', {
        providerId: provider.id,
        providerName: provider.name,
        message: message,
        timestamp: new Date().toISOString()
      });
      
      setSending(false);
      setSuccess(true);
      setMessage('');
      
      // Hide success message after 2 seconds
      setTimeout(() => {
        setSuccess(false);
        onHide();
      }, 2000);
    }, 1000);
  };

  const handleClose = () => {
    setMessage('');
    setSuccess(false);
    onHide();
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
            <Modal.Title className="mb-1">Contact {provider.name}</Modal.Title>
            <p className="text-muted small mb-0">
              Send a message to discuss your service requirements
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
            <FaPaperPlane className="me-2" />
            Message sent successfully! {provider.name} will get back to you soon.
          </Alert>
        ) : (
          <Form onSubmit={handleSend}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your service requirements, preferred date/time, or ask any questions..."
                className="form-control-custom"
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">
                {message.length}/500 characters
              </small>
              <Button
                type="submit"
                variant="primary"
                className="btn-primary-custom"
                disabled={sending || !message.trim()}
              >
                {sending ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Sending...
                  </>
                ) : (
                                           <>
           <FaPaperPlane className="me-2" />
           Send
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

export default ContactModal; 