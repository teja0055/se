import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Badge, Spinner, Alert } from 'react-bootstrap';
import { FaStar, FaUser, FaSort, FaFilter } from 'react-icons/fa';
import apiService from '../services/api';

const ProviderListingPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('rating');
  const [filterRating, setFilterRating] = useState('all');

  // Mock provider data - in a real app, this would come from the API
  const mockProviders = React.useMemo(() => [
    {
      id: 1,
      name: 'Rajesh Kumar',
      avatar: '👨‍🔧',
      rating: 4.9,
      reviews: 127,
      price: '₹2,500',
      experience: '8 years',
      location: 'Mumbai Central',
      verified: true,
      available: true,
      specialties: ['Pipe Repair', 'Drain Cleaning', 'Water Heater'],
      responseTime: '15 mins',
      languages: ['Hindi', 'English', 'Marathi']
    },
    {
      id: 2,
      name: 'Amit Patel',
      avatar: '👨‍🔧',
      rating: 4.7,
      reviews: 89,
      price: '₹2,200',
      experience: '5 years',
      location: 'Andheri West',
      verified: true,
      available: true,
      specialties: ['AC Installation', 'Electrical Work', 'Plumbing'],
      responseTime: '20 mins',
      languages: ['Hindi', 'English']
    },
    {
      id: 3,
      name: 'Priya Sharma',
      avatar: '👩‍🔧',
      rating: 4.8,
      reviews: 156,
      price: '₹2,800',
      experience: '12 years',
      location: 'Bandra East',
      verified: true,
      available: true,
      specialties: ['Kitchen Plumbing', 'Bathroom Fitting', 'Leak Repair'],
      responseTime: '10 mins',
      languages: ['Hindi', 'English', 'Gujarati']
    },
    {
      id: 4,
      name: 'Suresh Reddy',
      avatar: '👨‍🔧',
      rating: 4.5,
      reviews: 67,
      price: '₹1,900',
      experience: '3 years',
      location: 'Thane West',
      verified: true,
      available: false,
      specialties: ['Basic Plumbing', 'Fixture Installation'],
      responseTime: '30 mins',
      languages: ['Hindi', 'Telugu']
    },
    {
      id: 5,
      name: 'Meera Iyer',
      avatar: '👩‍🔧',
      rating: 4.9,
      reviews: 203,
      price: '₹3,200',
      experience: '15 years',
      location: 'Juhu',
      verified: true,
      available: true,
      specialties: ['Premium Services', 'Emergency Repairs', 'Commercial'],
      responseTime: '5 mins',
      languages: ['Hindi', 'English', 'Tamil']
    },
    {
      id: 6,
      name: 'Vikram Singh',
      avatar: '👨‍🔧',
      rating: 4.3,
      reviews: 45,
      price: '₹1,800',
      experience: '4 years',
      location: 'Borivali East',
      verified: false,
      available: true,
      specialties: ['Residential Plumbing', 'Drainage'],
      responseTime: '25 mins',
             languages: ['Hindi', 'Punjabi']
     }
   ], []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch service details
        const serviceResponse = await apiService.getServiceById(serviceId);
        setService(serviceResponse.data);
        
        // In a real app, you would fetch providers from API
        // For now, we'll use mock data
        setProviders(mockProviders);
      } catch (err) {
        setError('Failed to load service providers');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serviceId, mockProviders]);

  // Sort and filter providers
  const getSortedAndFilteredProviders = () => {
    let filtered = [...providers];

    // Filter by rating
    if (filterRating !== 'all') {
      const minRating = parseFloat(filterRating);
      filtered = filtered.filter(provider => provider.rating >= minRating);
    }

    // Sort providers
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        filtered.sort((a, b) => parseInt(a.price.replace('₹', '').replace(',', '')) - parseInt(b.price.replace('₹', '').replace(',', '')));
        break;
      case 'price-high':
        filtered.sort((a, b) => parseInt(b.price.replace('₹', '').replace(',', '')) - parseInt(a.price.replace('₹', '').replace(',', '')));
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    return filtered;
  };

  const handleBookNow = (provider) => {
    // Navigate to booking page with provider info
    navigate(`/services/${serviceId}/book`, { 
      state: { 
        selectedProvider: provider,
        service: service 
      } 
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-warning" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-warning" style={{ opacity: 0.5 }} />);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-muted" style={{ opacity: 0.3 }} />);
    }

    return stars;
  };

  const sortedProviders = getSortedAndFilteredProviders();

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" role="status" className="mb-3">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p>Loading service providers...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {/* Header Section */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex align-items-center mb-3">
            <span className="display-6 me-3">{service?.icon}</span>
            <div>
              <h1 className="h2 mb-1">{service?.name} Providers</h1>
              <p className="text-muted mb-0">
                {sortedProviders.length} verified professionals available in your area
              </p>
            </div>
          </div>
        </Col>
      </Row>

      {/* Filters and Sort Section */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label className="fw-semibold">
              <FaFilter className="me-2" />
              Filter by Rating
            </Form.Label>
            <Form.Select 
              value={filterRating} 
              onChange={(e) => setFilterRating(e.target.value)}
              className="border-0 shadow-sm"
            >
              <option value="all">All Ratings</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.0">4.0+ Stars</option>
              <option value="3.5">3.5+ Stars</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label className="fw-semibold">
              <FaSort className="me-2" />
              Sort By
            </Form.Label>
            <Form.Select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="border-0 shadow-sm"
            >
              <option value="rating">Highest Rating</option>
              <option value="reviews">Most Reviews</option>
              <option value="price-low">Lowest Price</option>
              <option value="price-high">Highest Price</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Providers Grid */}
      {sortedProviders.length > 0 ? (
        <Row>
          {sortedProviders.map((provider) => (
            <Col key={provider.id} lg={4} md={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm provider-card">
                <Card.Body className="p-4">
                  {/* Provider Header */}
                  <div className="d-flex align-items-start mb-3">
                    <div className="provider-avatar me-3">
                      <span className="display-6">{provider.avatar}</span>
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center mb-1">
                        <h5 className="mb-0 me-2">{provider.name}</h5>
                        {provider.verified && (
                          <Badge bg="success" className="fs-6">✓ Verified</Badge>
                        )}
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <div className="me-2">
                          {renderStars(provider.rating)}
                        </div>
                        <span className="text-muted small">
                          {provider.rating} ({provider.reviews} reviews)
                        </span>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="text-muted small me-3">
                          <FaUser className="me-1" />
                          {provider.experience} exp
                        </span>
                        <span className="text-muted small">
                          📍 {provider.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Provider Details */}
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-semibold text-primary fs-5">{provider.price}</span>
                      <span className="text-muted small">per visit</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-muted small">Response time: {provider.responseTime}</span>
                    </div>
                    {provider.specialties && (
                      <div className="mb-3">
                        <div className="d-flex flex-wrap gap-1">
                          {provider.specialties.slice(0, 3).map((specialty, index) => (
                            <Badge key={index} bg="light" text="dark" className="small">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="d-grid">
                    <Button
                      variant={provider.available ? "primary" : "secondary"}
                      size="lg"
                      onClick={() => handleBookNow(provider)}
                      disabled={!provider.available}
                      className="fw-semibold"
                    >
                      {provider.available ? 'Book Now' : 'Currently Unavailable'}
                    </Button>
                  </div>

                  {/* Availability Status */}
                  {!provider.available && (
                    <div className="text-center mt-2">
                      <small className="text-muted">
                        Available from tomorrow
                      </small>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        /* Empty State */
        <Row>
          <Col className="text-center py-5">
            <div className="mb-4">
              <span className="display-1 text-muted">🔍</span>
            </div>
            <h3 className="mb-3">No providers found</h3>
            <p className="text-muted mb-4">
              We couldn't find any providers matching your criteria. 
              Try adjusting your filters or check back later.
            </p>
            <Button 
              variant="outline-primary" 
              onClick={() => {
                setFilterRating('all');
                setSortBy('rating');
              }}
            >
              Clear Filters
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProviderListingPage; 