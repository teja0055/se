import { toast } from 'react-toastify';

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
};

// Notification messages
export const NOTIFICATION_MESSAGES = {
  // Booking related
  BOOKING_CREATED: 'Booking created successfully!',
  BOOKING_UPDATED: 'Booking updated successfully!',
  BOOKING_CANCELLED: 'Booking cancelled successfully!',
  BOOKING_ACCEPTED: 'Your booking has been accepted by the provider!',
  BOOKING_REJECTED: 'Your booking has been rejected by the provider.',
  BOOKING_COMPLETED: 'Booking marked as completed!',
  
  // Provider related
  PROVIDER_NOTIFIED: 'Provider has been notified of your booking!',
  PROVIDER_ASSIGNED: 'A provider has been assigned to your booking!',
  
  // Cart related
  SERVICE_ADDED: 'Service added to cart!',
  SERVICE_REMOVED: 'Service removed from cart!',
  CART_CLEARED: 'Cart cleared successfully!',
  CART_CHECKOUT: 'Multi-service booking completed successfully!',
  
  // Authentication
  LOGIN_SUCCESS: 'Login successful!',
  LOGIN_ERROR: 'Login failed. Please check your credentials.',
  REGISTER_SUCCESS: 'Registration successful!',
  REGISTER_ERROR: 'Registration failed. Please try again.',
  LOGOUT_SUCCESS: 'Logged out successfully!',
  
  // General
  MESSAGE_SENT: 'Message sent successfully!',
  REVIEW_SUBMITTED: 'Review submitted successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  ERROR_OCCURRED: 'An error occurred. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  
  // Provider specific
  PROVIDER_BOOKING_RECEIVED: 'New booking received!',
  PROVIDER_BOOKING_ACCEPTED: 'Booking accepted successfully!',
  PROVIDER_BOOKING_REJECTED: 'Booking rejected successfully!',
  PROVIDER_BOOKING_COMPLETED: 'Booking marked as completed!'
};

// Custom notification configurations
const notificationConfigs = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// Success notification
export const showSuccess = (message, options = {}) => {
  toast.success(message, {
    ...notificationConfigs,
    ...options,
    theme: "colored",
  });
};

// Error notification
export const showError = (message, options = {}) => {
  toast.error(message, {
    ...notificationConfigs,
    ...options,
    theme: "colored",
  });
};

// Info notification
export const showInfo = (message, options = {}) => {
  toast.info(message, {
    ...notificationConfigs,
    ...options,
    theme: "colored",
  });
};

// Warning notification
export const showWarning = (message, options = {}) => {
  toast.warning(message, {
    ...notificationConfigs,
    ...options,
    theme: "colored",
  });
};

// Generic notification function
export const showNotification = (type, message, options = {}) => {
  switch (type) {
    case NOTIFICATION_TYPES.SUCCESS:
      showSuccess(message, options);
      break;
    case NOTIFICATION_TYPES.ERROR:
      showError(message, options);
      break;
    case NOTIFICATION_TYPES.INFO:
      showInfo(message, options);
      break;
    case NOTIFICATION_TYPES.WARNING:
      showWarning(message, options);
      break;
    default:
      showInfo(message, options);
  }
};

// Booking notifications
export const notifyBookingCreated = (bookingId) => {
  showSuccess(`Booking #${bookingId} created successfully! You'll receive updates about provider assignment.`);
};

export const notifyBookingAccepted = (bookingId, providerName) => {
  showSuccess(`Booking #${bookingId} has been accepted by ${providerName}!`);
};

export const notifyBookingRejected = (bookingId, providerName) => {
  showWarning(`Booking #${bookingId} has been rejected by ${providerName}. We'll find another provider for you.`);
};

export const notifyBookingCompleted = (bookingId) => {
  showSuccess(`Booking #${bookingId} has been completed! Please rate your experience.`);
};

// Provider notifications
export const notifyProviderNewBooking = (bookingId, serviceName) => {
  showInfo(`New booking #${bookingId} received for ${serviceName}!`);
};

export const notifyProviderBookingAction = (action, bookingId) => {
  const message = action === 'accept' 
    ? `Booking #${bookingId} accepted successfully!`
    : `Booking #${bookingId} rejected successfully!`;
  
  showSuccess(message);
};

// Cart notifications
export const notifyServiceAdded = (serviceName) => {
  showSuccess(`${serviceName} added to cart!`);
};

export const notifyServiceRemoved = (serviceName) => {
  showInfo(`${serviceName} removed from cart!`);
};

export const notifyCartCheckout = () => {
  showSuccess('Multi-service booking completed! You\'ll receive notifications about provider assignments.');
};

// Authentication notifications
export const notifyLoginSuccess = (userType) => {
  const message = userType === 'provider' 
    ? 'Provider login successful! Welcome back.'
    : 'Customer login successful! Welcome back.';
  showSuccess(message);
};

export const notifyLoginError = () => {
  showError('Login failed. Please check your email and password.');
};

export const notifyRegisterSuccess = (userType) => {
  const message = userType === 'provider' 
    ? 'Provider registration successful! You can now start receiving bookings.'
    : 'Customer registration successful! Welcome to Service Connect.';
  showSuccess(message);
};

export const notifyRegisterError = () => {
  showError('Registration failed. Please check your information and try again.');
};

// Message notifications
export const notifyMessageSent = (recipientName) => {
  showSuccess(`Message sent to ${recipientName}! They'll get back to you soon.`);
};

// Review notifications
export const notifyReviewSubmitted = () => {
  showSuccess('Thank you for your review! Your feedback helps other customers.');
};

// Network error notification
export const notifyNetworkError = () => {
  showError('Network error. Please check your internet connection and try again.');
};

// Generic error notification
export const notifyError = (error) => {
  const message = error?.message || 'An error occurred. Please try again.';
  showError(message);
};

const notificationServiceExports = {
  showSuccess,
  showError,
  showInfo,
  showWarning,
  showNotification,
  notifyBookingCreated,
  notifyBookingAccepted,
  notifyBookingRejected,
  notifyBookingCompleted,
  notifyProviderNewBooking,
  notifyProviderBookingAction,
  notifyServiceAdded,
  notifyServiceRemoved,
  notifyCartCheckout,
  notifyLoginSuccess,
  notifyLoginError,
  notifyRegisterSuccess,
  notifyRegisterError,
  notifyMessageSent,
  notifyReviewSubmitted,
  notifyNetworkError,
  notifyError
};

export default notificationServiceExports; 