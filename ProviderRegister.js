import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaTools, FaLock, FaEnvelope, FaPhone, FaArrowLeft, FaEye, FaEyeSlash, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';
import apiService from '../services/api';

const ProviderRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    serviceCategory: '',
    location: '',
    experience: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);

  const serviceCategories = [
    'Plumbing', 'Electrical', 'Carpentry', 'Cleaning', 'Painting', 'HVAC', 'Landscaping', 'Appliance Repair', 'Roofing', 'Other'
  ];

  const experienceLevels = [
    'Less than 1 year', '1-3 years', '3-5 years', '5-10 years', 'More than 10 years'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
    if (error) setError(null);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    if (!formData.serviceCategory) {
      newErrors.serviceCategory = 'Service category is required';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!formData.experience) {
      newErrors.experience = 'Experience level is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        businessName: formData.businessName,
        serviceCategory: formData.serviceCategory,
        location: formData.location,
        experience: formData.experience,
        password: formData.password,
        type: 'provider'
      };

      const response = await apiService.register(userData);
      
      // Store user data in localStorage for demo purposes
      localStorage.setItem('user', JSON.stringify(response.data));
      
      // Redirect to login page
      navigate('/provider/login');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="mb-4">
              <Link to="/" className="text-decoration-none text-muted">
                <FaArrowLeft className="me-2" />
                Back to Home
              </Link>
            </div>
            <Card className="card-custom">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <FaTools size={40} className="text-accent-blue" />
                  </div>
                  <h3 className="fw-bold text-primary-navy">Join as Service Provider</h3>
                  <p className="text-muted">Start offering your professional services on Service Connect</p>
                </div>
                
                {error && (
                  <Alert variant="danger" className="mb-4">
                    {error}
                  </Alert>
                )}
                
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Enter your first name"
                          className={`form-control-custom ${errors.firstName ? 'border-danger' : ''}`}
                          required
                        />
                        {errors.firstName && (
                          <Form.Text className="text-danger">{errors.firstName}</Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Enter your last name"
                          className={`form-control-custom ${errors.lastName ? 'border-danger' : ''}`}
                          required
                        />
                        {errors.lastName && (
                          <Form.Text className="text-danger">{errors.lastName}</Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Business Name</Form.Label>
                    <div className="position-relative">
                      <FaBuilding className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                      <Form.Control
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Enter your business name"
                        className={`form-control-custom ps-5 ${errors.businessName ? 'border-danger' : ''}`}
                        required
                      />
                    </div>
                    {errors.businessName && (
                      <Form.Text className="text-danger">{errors.businessName}</Form.Text>
                    )}
                  </Form.Group>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Email Address</Form.Label>
                        <div className="position-relative">
                          <FaEnvelope className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className={`form-control-custom ps-5 ${errors.email ? 'border-danger' : ''}`}
                            required
                          />
                        </div>
                        {errors.email && (
                          <Form.Text className="text-danger">{errors.email}</Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Phone Number</Form.Label>
                        <div className="position-relative">
                          <FaPhone className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className={`form-control-custom ps-5 ${errors.phone ? 'border-danger' : ''}`}
                            required
                          />
                        </div>
                        {errors.phone && (
                          <Form.Text className="text-danger">{errors.phone}</Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Service Category</Form.Label>
                        <Form.Select
                          name="serviceCategory"
                          value={formData.serviceCategory}
                          onChange={handleChange}
                          className={`form-control-custom ${errors.serviceCategory ? 'border-danger' : ''}`}
                          required
                        >
                          <option value="">Select a category</option>
                          {serviceCategories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </Form.Select>
                        {errors.serviceCategory && (
                          <Form.Text className="text-danger">{errors.serviceCategory}</Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Experience Level</Form.Label>
                        <Form.Select
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          className={`form-control-custom ${errors.experience ? 'border-danger' : ''}`}
                          required
                        >
                          <option value="">Select experience level</option>
                          {experienceLevels.map((level) => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </Form.Select>
                        {errors.experience && (
                          <Form.Text className="text-danger">{errors.experience}</Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Service Location</Form.Label>
                    <div className="position-relative">
                      <FaMapMarkerAlt className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                      <Form.Control
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Enter your service area (city, state)"
                        className={`form-control-custom ps-5 ${errors.location ? 'border-danger' : ''}`}
                        required
                      />
                    </div>
                    {errors.location && (
                      <Form.Text className="text-danger">{errors.location}</Form.Text>
                    )}
                  </Form.Group>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Password</Form.Label>
                        <div className="position-relative">
                          <FaLock className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                          <Form.Control
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            className={`form-control-custom ps-5 pe-5 ${errors.password ? 'border-danger' : ''}`}
                            required
                          />
                          <Button
                            type="button"
                            variant="link"
                            className="position-absolute top-50 end-0 translate-middle-y pe-3 text-muted"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </Button>
                        </div>
                        {errors.password && (
                          <Form.Text className="text-danger">{errors.password}</Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Confirm Password</Form.Label>
                        <div className="position-relative">
                          <FaLock className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                          <Form.Control
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className={`form-control-custom ps-5 pe-5 ${errors.confirmPassword ? 'border-danger' : ''}`}
                            required
                          />
                          <Button
                            type="button"
                            variant="link"
                            className="position-absolute top-50 end-0 translate-middle-y pe-3 text-muted"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          </Button>
                        </div>
                        {errors.confirmPassword && (
                          <Form.Text className="text-danger">{errors.confirmPassword}</Form.Text>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-4">
                    <Form.Check
                      type="checkbox"
                      id="terms"
                      label="I agree to the Terms of Service and Privacy Policy"
                      className="text-muted"
                      required
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="primary"
                    className="btn-primary-custom w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating Account...
                      </>
                    ) : (
                      'Create Provider Account'
                    )}
                  </Button>
                  <div className="text-center">
                    <p className="text-muted mb-0">
                      Already have a provider account?{' '}
                      <Link to="/provider/login" className="text-decoration-none text-accent-blue fw-semibold">
                        Sign in here
                      </Link>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProviderRegister; 