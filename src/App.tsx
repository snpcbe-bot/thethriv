import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Homepage from './pages/Homepage';
import Customers from './pages/Customers';
import Experts from './pages/Experts';
import Pricing from './pages/Pricing';
import AboutUs from './pages/AboutUs';
import Blog from './pages/Blog';
import ResourcesLibrary from './pages/ResourcesLibrary';
import PartnerProgram from './pages/PartnerProgram';
import JoinBusiness from './pages/JoinBusiness';
import JoinExpert from './pages/JoinExpert';
import CookieConsent from './components/CookieConsent';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import ExpertSearch from './components/ExpertSearch';
import ProtectedRoute from './components/ProtectedRoute';
import ExpertSearchPage from './components/expert-search/ExpertSearchPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navigation />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/business" element={<Customers />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/experts" element={<Experts />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/resources" element={<ResourcesLibrary />} />
            <Route path="/partners" element={<PartnerProgram />} />
            <Route path="/join-business" element={<JoinBusiness />} />
            <Route path="/join-expert" element={<JoinExpert />} />
            <Route path="/search" element={<ExpertSearchPage />} />
            <Route path="/experts/search" element={<ExpertSearchPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Footer />
          <CookieConsent />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;