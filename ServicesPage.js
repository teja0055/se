import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaArrowRight } from 'react-icons/fa';

const ServicesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services = [
    {
      id: 1,
      name: 'Plumbing',
      icon: '🔧',
      description: 'Expert plumbing services for all your home needs',
      category: 'repair',
      rating: 4.8,
             price: 'From ₹2,500'
     },
     {
       id: 2,
       name: 'Electrician',
       icon: '💡',
       description: 'Professional electrical work and installations',
       category: 'repair',
       rating: 4.9,
       price: 'From ₹3,000'
     },
     {
       id: 3,
       name: 'AC Repair',
       icon: '❄️',
       description: 'Fast and reliable air conditioning services',
       category: 'repair',
       rating: 4.7,
       price: 'From ₹4,000'
     },
     {
       id: 4,
       name: 'Cleaning',
       icon: '🧹',
       description: 'Thorough home cleaning and maintenance',
       category: 'cleaning',
       rating: 4.6,
       price: 'From ₹2,000'
     },
     {
       id: 5,
       name: 'Carpentry',
       icon: '🪚',
       description: 'Quality carpentry and woodwork solutions',
       category: 'repair',
       rating: 4.8,
       price: 'From ₹3,500'
     },
     {
       id: 6,
       name: 'Salon at Home',
       icon: '💇‍♀️',
       description: 'Professional beauty services at your doorstep',
       category: 'beauty',
       rating: 4.9,
       price: 'From ₹1,500'
     },
     {
       id: 7,
       name: 'Appliance Repair',
       icon: '⚙️',
       description: 'Expert repair for all home appliances',
       category: 'repair',
       rating: 4.7,
       price: 'From ₹2,750'
     },
     {
       id: 8,
       name: 'Pest Control',
       icon: '🐜',
       description: 'Effective pest control and prevention',
       category: 'cleaning',
       rating: 4.8,
       price: 'From ₹4,500'
     },
     {
       id: 9,
       name: 'Painting',
       icon: '🎨',
       description: 'Professional interior and exterior painting',
       category: 'repair',
       rating: 4.6,
       price: 'From ₹10,000'
     },
     {
       id: 10,
       name: 'Landscaping',
       icon: '🌿',
       description: 'Beautiful garden and landscape design',
       category: 'outdoor',
       rating: 4.7,
       price: 'From ₹7,500'
     },
     {
       id: 11,
       name: 'Moving Services',
       icon: '📦',
       description: 'Reliable moving and packing assistance',
       category: 'moving',
       rating: 4.8,
       price: 'From ₹5,000'
     },
     {
       id: 12,
       name: 'Security Installation',
       icon: '🔒',
       description: 'Professional security system setup',
       category: 'repair',
       rating: 4.9,
       price: 'From ₹6,000'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Services' },
    { value: 'repair', label: 'Repair & Maintenance' },
    { value: 'cleaning', label: 'Cleaning' },
    { value: 'beauty', label: 'Beauty & Wellness' },
    { value: 'outdoor', label: 'Outdoor Services' },
    { value: 'moving', label: 'Moving & Relocation' }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleServiceClick = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };



  return (
    <div className="fade-in">
      {/* Header Section */}
      <section className="bg-primary-navy text-white py-5" style={{ backgroundColor: 'var(--primary-navy)' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-5 fw-bold mb-3">Our Services</h1>
              <p className="lead opacity-75">
                Discover professional home services tailored to your needs
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Search and Filter Section */}
      <section className="py-4" style={{ backgroundColor: 'var(--light-gray)' }}>
        <Container>
          <Row className="g-3">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0">
                  <FaSearch className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search for services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-start-0"
                  style={{ backgroundColor: 'var(--white)', color: 'var(--text-primary)' }}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0">
                  <FaFilter className="text-muted" />
                </InputGroup.Text>
                <Form.Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border-start-0"
                  style={{ backgroundColor: 'var(--white)', color: 'var(--text-primary)' }}
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </Form.Select>
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            {filteredServices.map((service) => (
              <Col key={service.id} xs={12} sm={6} lg={4} xl={3}>
                <Card 
                  className="service-card h-100 cursor-pointer"
                  onClick={() => handleServiceClick(service.id)}
                >
                  <Card.Body className="d-flex flex-column p-4">
                    {/* Service Icon */}
                    <div className="text-center mb-3">
                      <span className="service-icon-large">{service.icon}</span>
                    </div>

                    {/* Service Info */}
                    <div className="flex-grow-1">
                      <Card.Title className="fw-bold mb-2 text-center">
                        {service.name}
                      </Card.Title>
                      <Card.Text className="text-muted text-center small mb-3">
                        {service.description}
                      </Card.Text>

                      {/* Rating and Price */}
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex align-items-center">
                          <span className="text-warning me-1">★</span>
                          <span className="small text-muted">{service.rating}</span>
                        </div>
                        <span className="fw-semibold text-accent-blue small">
                          {service.price}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="d-flex">
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-100 btn-primary-custom"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleServiceClick(service.id);
                        }}
                      >
                        View Details
                        <FaArrowRight className="ms-1" size={12} />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* No Results Message */}
          {filteredServices.length === 0 && (
            <Row className="justify-content-center">
              <Col md={6} className="text-center">
                <div className="py-5">
                  <h4 className="text-muted mb-3">No services found</h4>
                  <p className="text-muted">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="btn-outline-custom"
                  >
                    Clear Filters
                  </Button>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </div>
  );
};

export default ServicesPage; 