# SkillConnect - Professional Home Services Platform

A modern, professional web application for connecting customers with trusted home service providers, inspired by Urban Company. Built with React, Bootstrap 5, and modern web technologies.

## 🚀 Features

### Landing Page
- **Professional Header**: Dark navy blue header with SkillConnect branding
- **Dark Mode Toggle**: Smooth theme switching with persistent preferences
- **Dual Login System**: Separate login buttons for customers and service providers
- **Advanced Search**: Modern search bar for services and locations
- **Service Grid**: 6 popular service cards with hover animations
- **Responsive Design**: Mobile-friendly layout across all devices

### Authentication System
- **Customer Portal**: Complete login and registration system
- **Provider Portal**: Professional registration with business details
- **Form Validation**: Real-time validation with error handling
- **Password Security**: Show/hide password functionality
- **Modern UI**: Clean, professional forms with icons

### Design System
- **Color Palette**: Dark navy, whites, and grays (no bright blues)
- **Typography**: Inter font family for modern readability
- **Animations**: Smooth hover effects and transitions
- **Accessibility**: Focus states and keyboard navigation
- **Dark Mode**: Complete theme support with CSS variables

## 🛠️ Technology Stack

- **Frontend**: React 18.2.0
- **Styling**: Bootstrap 5.2.3 + React Bootstrap 2.7.2
- **Icons**: React Icons 4.8.0
- **Routing**: React Router DOM 6.3.0
- **Build Tool**: Create React App
- **Font**: Inter (Google Fonts)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skillconnect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Usage

### For Customers
1. Visit the landing page
2. Click "Customer Login" or "Sign up here"
3. Create an account or sign in
4. Search for services using the search bar
5. Browse service categories

### For Service Providers
1. Visit the landing page
2. Click "Provider Login" or "Register here"
3. Complete the comprehensive registration form
4. Provide business details and service categories
5. Access the provider dashboard

### Dark Mode
- Click the moon/sun icon in the header to toggle dark mode
- Theme preference is saved in localStorage

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎨 Design Features

### Professional Styling
- Clean, minimalist design inspired by Urban Company
- Consistent spacing and typography
- Professional color scheme
- Smooth animations and transitions

### User Experience
- Intuitive navigation
- Clear call-to-action buttons
- Form validation with helpful error messages
- Loading states for better feedback
- Accessible design patterns

## 🔧 Customization

### Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --primary-navy: #1a2332;
  --secondary-navy: #2d3748;
  --accent-blue: #3182ce;
  /* ... more variables */
}
```

### Services
Modify the services array in `src/pages/LandingPage.js`:
```javascript
const services = [
  { id: 1, name: 'Plumbing', icon: '🔧', description: 'Expert plumbing services' },
  // Add more services...
];
```

## 📄 Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation header with theme toggle
│   └── Footer.js          # Simple footer component
├── pages/
│   ├── LandingPage.js     # Main landing page with search and services
│   ├── CustomerLogin.js   # Customer authentication
│   ├── CustomerRegister.js # Customer registration
│   ├── ProviderLogin.js   # Provider authentication
│   └── ProviderRegister.js # Provider registration
├── App.js                 # Main app component with routing
├── index.js              # React entry point
└── index.css             # Global styles and CSS variables
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Push your code to GitHub
2. Connect your repository to Netlify or Vercel
3. Deploy automatically on push

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspired by Urban Company
- Icons from React Icons
- Fonts from Google Fonts
- UI components from Bootstrap

---

**SkillConnect** - Connecting trusted professionals with customers for quality home services. 