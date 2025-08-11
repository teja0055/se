import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ProviderListingPage from './pages/ProviderListingPage';
import BookingPage from './pages/BookingPage';
import ContactPage from './pages/ContactPage';
import CustomerLogin from './pages/CustomerLogin';
import CustomerRegister from './pages/CustomerRegister';
import ProviderLogin from './pages/ProviderLogin';
import ProviderRegister from './pages/ProviderRegister';
import ProviderDashboard from './pages/ProviderDashboard';
import UserBookingsPage from './pages/UserBookingsPage';
import MessagesPage from './pages/MessagesPage';
import { AuthProvider } from './contexts/AuthContext';
import { CustomerRoute, ProviderRoute } from './components/ProtectedRoute';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

    return (
    <AuthProvider>
      <div className="App">
          <Header theme={theme} toggleTheme={toggleTheme} />
          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
              <Route path="/services/:serviceId/providers" element={<ProviderListingPage />} />
              <Route path="/services/:serviceId/book" element={<BookingPage />} />
              <Route path="/services/:serviceId/contact" element={<ContactPage />} />
              <Route path="/customer/login" element={<CustomerLogin />} />
              <Route path="/customer/register" element={<CustomerRegister />} />
              <Route path="/provider/login" element={<ProviderLogin />} />
              <Route path="/provider/register" element={<ProviderRegister />} />
              
              {/* Protected Routes */}
              <Route path="/provider/dashboard" element={
                <ProviderRoute>
                  <ProviderDashboard />
                </ProviderRoute>
              } />
              <Route path="/user/bookings" element={
                <CustomerRoute>
                  <UserBookingsPage />
                </CustomerRoute>
              } />
              <Route path="/messages" element={
                <CustomerRoute>
                  <MessagesPage />
                </CustomerRoute>
              } />
            </Routes>
          </main>
          <Footer />
          
          {/* Toast Notifications */}
          <ToastContainer />
        </div>
    </AuthProvider>
  );
}

export default App; 