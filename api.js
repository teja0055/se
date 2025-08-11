// Local data service - no backend required
const servicesData = [
  {
    id: 1,
    name: 'Plumbing',
    icon: '🔧',
    description: 'Expert plumbing services for all your home needs',
    category: 'repair',
    rating: 4.8,
    price: '₹2,500',
    duration: '1-3 hours',
    location: 'Available in your area',
    features: [
      '24/7 Emergency Service',
      'Licensed & Insured',
      'Free Estimates',
      'Warranty Included',
      'Same Day Service Available'
    ],
    services: [
      'Pipe Repair & Replacement',
      'Drain Cleaning',
      'Water Heater Installation',
      'Fixture Installation',
      'Leak Detection & Repair',
      'Sewer Line Services'
    ]
  },
  {
    id: 2,
    name: 'Electrician',
    icon: '💡',
    description: 'Professional electrical work and installations',
    category: 'repair',
    rating: 4.9,
    price: '₹3,000',
    duration: '1-4 hours',
    location: 'Available in your area',
    features: [
      'Licensed Electricians',
      'Safety Certified',
      'Emergency Service',
      'Code Compliance',
      'Warranty Coverage'
    ],
    services: [
      'Electrical Repairs',
      'Wiring Installation',
      'Circuit Breaker Service',
      'Lighting Installation',
      'Electrical Panel Upgrades',
      'Safety Inspections'
    ]
  },
  {
    id: 3,
    name: 'AC Repair',
    icon: '❄️',
    description: 'Professional AC installation and repair services',
    category: 'repair',
    rating: 4.7,
    price: '₹4,000',
    duration: '2-4 hours',
    location: 'Available in your area',
    features: [
      'Certified Technicians',
      'Same Day Service',
      'Warranty Coverage',
      'Free Diagnostics',
      'Emergency Repairs'
    ],
    services: [
      'AC Installation',
      'AC Repair & Maintenance',
      'Refrigerant Recharge',
      'Duct Cleaning',
      'Thermostat Installation',
      'Emergency AC Service'
    ]
  },
  {
    id: 4,
    name: 'Cleaning',
    icon: '🧹',
    description: 'Professional home and office cleaning services',
    category: 'cleaning',
    rating: 4.6,
    price: '₹2,000',
    duration: '2-6 hours',
    location: 'Available in your area',
    features: [
      'Eco-friendly Products',
      'Trained Staff',
      'Flexible Scheduling',
      'Satisfaction Guaranteed',
      'Regular Maintenance'
    ],
    services: [
      'Deep House Cleaning',
      'Kitchen Deep Clean',
      'Bathroom Sanitization',
      'Carpet Cleaning',
      'Window Cleaning',
      'Move-in/Move-out Cleaning'
    ]
  },
  {
    id: 5,
    name: 'Carpentry',
    icon: '🪚',
    description: 'Expert carpentry and woodwork services',
    category: 'repair',
    rating: 4.8,
    price: '₹3,500',
    duration: '2-8 hours',
    location: 'Available in your area',
    features: [
      'Skilled Craftsmen',
      'Custom Work Available',
      'Quality Materials',
      'Warranty Included',
      'Free Consultations'
    ],
    services: [
      'Furniture Assembly',
      'Cabinet Installation',
      'Door & Window Repair',
      'Custom Woodwork',
      'Deck & Fence Building',
      'Wood Repairs'
    ]
  },
  {
    id: 6,
    name: 'Salon at Home',
    icon: '💇‍♀️',
    description: 'Professional beauty and wellness services at home',
    category: 'beauty',
    rating: 4.9,
    price: '₹1,500',
    duration: '1-3 hours',
    location: 'Available in your area',
    features: [
      'Licensed Beauticians',
      'Hygienic Equipment',
      'Premium Products',
      'Flexible Timing',
      'Satisfaction Guaranteed'
    ],
    services: [
      'Hair Cut & Styling',
      'Facial Treatments',
      'Manicure & Pedicure',
      'Waxing Services',
      'Bridal Makeup',
      'Spa Treatments'
    ]
  },
  {
    id: 7,
    name: 'Appliance Repair',
    icon: '⚙️',
    description: 'Professional appliance repair and maintenance',
    category: 'repair',
    rating: 4.7,
    price: '₹2,750',
    duration: '1-3 hours',
    location: 'Available in your area',
    features: [
      'Certified Technicians',
      'Genuine Parts',
      'Warranty Coverage',
      'Same Day Service',
      'Emergency Repairs'
    ],
    services: [
      'Refrigerator Repair',
      'Washing Machine Service',
      'Microwave Repair',
      'Dishwasher Service',
      'Oven & Stove Repair',
      'Small Appliance Repair'
    ]
  },
  {
    id: 8,
    name: 'Pest Control',
    icon: '🐜',
    description: 'Effective pest control and prevention services',
    category: 'outdoor',
    rating: 4.8,
    price: '₹4,500',
    duration: '2-4 hours',
    location: 'Available in your area',
    features: [
      'Safe & Effective',
      'Licensed Technicians',
      'Follow-up Service',
      'Eco-friendly Options',
      'Guaranteed Results'
    ],
    services: [
      'General Pest Control',
      'Termite Treatment',
      'Rodent Control',
      'Cockroach Treatment',
      'Bed Bug Treatment',
      'Preventive Services'
    ]
  },
  {
    id: 9,
    name: 'Painting',
    icon: '🎨',
    description: 'Professional interior and exterior painting services',
    category: 'outdoor',
    rating: 4.6,
    price: '₹10,000',
    duration: '1-7 days',
    location: 'Available in your area',
    features: [
      'Experienced Painters',
      'Quality Materials',
      'Clean Work Area',
      'Warranty Coverage',
      'Free Estimates'
    ],
    services: [
      'Interior Painting',
      'Exterior Painting',
      'Wall Texturing',
      'Cabinet Painting',
      'Deck Staining',
      'Color Consultation'
    ]
  },
  {
    id: 10,
    name: 'Landscaping',
    icon: '🌿',
    description: 'Professional landscaping and garden maintenance',
    category: 'outdoor',
    rating: 4.7,
    price: '₹7,500',
    duration: '1-5 days',
    location: 'Available in your area',
    features: [
      'Expert Designers',
      'Quality Plants',
      'Maintenance Plans',
      'Seasonal Care',
      'Warranty Coverage'
    ],
    services: [
      'Garden Design',
      'Lawn Maintenance',
      'Tree Planting',
      'Irrigation Systems',
      'Garden Cleanup',
      'Seasonal Planting'
    ]
  },
  {
    id: 11,
    name: 'Moving Services',
    icon: '📦',
    description: 'Professional moving and relocation services',
    category: 'moving',
    rating: 4.8,
    price: '₹5,000',
    duration: '4-8 hours',
    location: 'Available in your area',
    features: [
      'Licensed & Insured',
      'Professional Packers',
      'Safe Transportation',
      'Assembly Service',
      'Storage Solutions'
    ],
    services: [
      'Residential Moving',
      'Commercial Moving',
      'Packing Services',
      'Furniture Assembly',
      'Storage Solutions',
      'International Moving'
    ]
  },
  {
    id: 12,
    name: 'Security Installation',
    icon: '🔒',
    description: 'Professional security system installation',
    category: 'repair',
    rating: 4.9,
    price: '₹6,000',
    duration: '2-6 hours',
    location: 'Available in your area',
    features: [
      'Certified Installers',
      'Latest Technology',
      '24/7 Monitoring',
      'Warranty Coverage',
      'Free Consultation'
    ],
    services: [
      'CCTV Installation',
      'Alarm Systems',
      'Access Control',
      'Smart Home Security',
      'Video Doorbells',
      'Security Maintenance'
    ]
  }
];

const apiService = {
  // Get all services with optional filtering
  getServices: async (searchQuery = '', category = 'all') => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredServices = [...servicesData];
    
    // Filter by search query
    if (searchQuery) {
      filteredServices = filteredServices.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (category && category !== 'all') {
      filteredServices = filteredServices.filter(service =>
        service.category === category
      );
    }
    
    return {
      data: filteredServices,
      success: true
    };
  },

  // Get service by ID
  getServiceById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const service = servicesData.find(s => s.id === parseInt(id));
    
    if (!service) {
      throw new Error('Service not found');
    }
    
    return {
      data: service,
      success: true
    };
  },

  // Submit booking
  submitBooking: async (bookingData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store booking in localStorage for demo purposes
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const newBooking = {
      id: Date.now(),
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    return {
      data: newBooking,
      success: true,
      message: 'Booking submitted successfully'
    };
  },

  // Submit contact form
  submitContact: async (contactData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Store contact in localStorage for demo purposes
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    const newContact = {
      id: Date.now(),
      ...contactData,
      createdAt: new Date().toISOString()
    };
    contacts.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    
    return {
      data: newContact,
      success: true,
      message: 'Message sent successfully'
    };
  },

  // User authentication (simulated)
  login: async (credentials) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate authentication
    if (credentials.email && credentials.password) {
      return {
        data: {
          user: {
            id: 1,
            name: credentials.email.split('@')[0],
            email: credentials.email,
            type: credentials.type || 'customer'
          },
          token: 'demo-token-' + Date.now()
        },
        success: true,
        message: 'Login successful'
      };
    } else {
      throw new Error('Invalid credentials');
    }
  },

  // User registration (simulated)
  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store user in localStorage for demo purposes
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    return {
      data: newUser,
      success: true,
      message: 'Registration successful'
    };
  }
};

export default apiService; 