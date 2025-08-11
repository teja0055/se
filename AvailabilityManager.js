import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge } from 'react-bootstrap';
import { FaCalendarAlt, FaClock, FaPlus, FaTrash } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AvailabilityManager = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [availability, setAvailability] = useState([]);

  // Generate time slots from 8 AM to 8 PM
  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
  ];

  const addTimeSlot = () => {
    if (selectedTime) {
      const newSlot = {
        id: Date.now(),
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        status: 'available'
      };
      setAvailability([...availability, newSlot]);
      setSelectedTime('');
    }
  };

  const removeTimeSlot = (slotId) => {
    setAvailability(availability.filter(slot => slot.id !== slotId));
  };

  const getSlotsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return availability.filter(slot => slot.date === dateStr);
  };



  return (
    <Container className="py-4">
      <Row>
        <Col lg={8}>
          <Card className="card-custom">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">
                <FaCalendarAlt className="me-2" />
                Manage Availability
              </h5>
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Select Date</Form.Label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      minDate={new Date()}
                      className="form-control"
                      dateFormat="MMMM dd, yyyy"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Select Time</Form.Label>
                    <div className="d-flex gap-2">
                      <Form.Select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="flex-grow-1"
                      >
                        <option value="">Choose time...</option>
                        {timeSlots.map(time => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </Form.Select>
                      <Button
                        variant="success"
                        onClick={addTimeSlot}
                        disabled={!selectedTime}
                      >
                        <FaPlus />
                      </Button>
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              {/* Available Slots for Selected Date */}
              <div className="mt-4">
                <h6 className="fw-semibold mb-3">
                  Available Slots for {selectedDate.toLocaleDateString()}
                </h6>
                <div className="d-flex flex-wrap gap-2">
                  {getSlotsForDate(selectedDate).map(slot => (
                    <Badge
                      key={slot.id}
                      bg={slot.status === 'booked' ? 'danger' : 'success'}
                      className="p-2 d-flex align-items-center gap-2"
                    >
                      <FaClock />
                      {slot.time}
                      {slot.status === 'available' && (
                        <FaTrash
                          className="cursor-pointer"
                          onClick={() => removeTimeSlot(slot.id)}
                          style={{ cursor: 'pointer' }}
                        />
                      )}
                    </Badge>
                  ))}
                  {getSlotsForDate(selectedDate).length === 0 && (
                    <p className="text-muted">No slots added for this date</p>
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="card-custom">
            <Card.Header className="bg-info text-white">
              <h6 className="mb-0">Quick Stats</h6>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Total Available Slots:</span>
                <Badge bg="success">{availability.filter(s => s.status === 'available').length}</Badge>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Booked Slots:</span>
                <Badge bg="danger">{availability.filter(s => s.status === 'booked').length}</Badge>
              </div>
              <div className="d-flex justify-content-between">
                <span>Dates with Slots:</span>
                <Badge bg="primary">
                  {new Set(availability.map(s => s.date)).size}
                </Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AvailabilityManager; 