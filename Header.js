import React from 'react';
import { Link } from 'react-router-dom';
import { FaMoon, FaSun, FaUser, FaTools, FaSignOutAlt, FaCalendarAlt } from 'react-icons/fa';
import { Container, Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const Header = ({ theme, toggleTheme }) => {
  const { user, isAuthenticated, logout, isProvider, isCustomer } = useAuth();

  return (
    <>
      <Navbar 
        bg="primary-navy" 
        variant="dark" 
        expand="lg" 
        className="py-3 shadow-sm"
        style={{ backgroundColor: 'var(--primary-navy)' }}
      >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <span className="fw-bold fs-3 text-white me-2">Service Connect</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            {/* Dark Mode Toggle */}
            <Button
              variant="link"
              className="theme-toggle text-white me-3"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </Button>




            
            {isAuthenticated() ? (
              /* User Menu */
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" className="btn-primary-custom">
                  <FaUser className="me-1" />
                  {user?.name || 'User'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {isCustomer() && (
                    <Dropdown.Item as={Link} to="/user/bookings">
                      <FaCalendarAlt className="me-2" />
                      My Bookings
                    </Dropdown.Item>
                  )}
                  {isProvider() && (
                    <Dropdown.Item as={Link} to="/provider/dashboard">
                      <FaTools className="me-2" />
                      Dashboard
                    </Dropdown.Item>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout}>
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              /* Login Buttons */
              <>
                <Button
                  as={Link}
                  to="/customer/login"
                  variant="outline-light"
                  className="btn-outline-custom me-2"
                  size="sm"
                >
                  <FaUser className="me-1" />
                  Login
                </Button>
                
                <Button
                  as={Link}
                  to="/provider/login"
                  variant="light"
                  className="btn-primary-custom"
                  size="sm"
                >
                  <FaTools className="me-1" />
                  Register
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    </>
  );
};

export default Header; 