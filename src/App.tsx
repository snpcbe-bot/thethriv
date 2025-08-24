import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Homepage from './pages/Homepage';
import Customers from './pages/Customers';
import Experts from './pages/Experts';
import Pricing from './pages/Pricing';
import AboutUs from './pages/AboutUs';
import Blog from './pages/Blog';
import ResourcesLibrary from './pages/ResourcesLibrary';
import PartnerProgram from './pages/PartnerProgram';
import CookieConsent from './components/CookieConsent';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/experts" element={<Experts />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/resources" element={<ResourcesLibrary />} />
          <Route path="/partners" element={<PartnerProgram />} />
        </Routes>
        <Footer />
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;