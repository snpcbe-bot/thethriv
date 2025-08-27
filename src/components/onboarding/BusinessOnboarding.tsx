import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Building, Globe, Users, Target, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import type { Plan } from '../../data/pricingPlans';

interface BusinessOnboardingState {
  selectedPlan?: Plan;
}

const BusinessOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signUp } = useAuth();
  
  const state = location.state as BusinessOnboardingState;
  const selectedPlan = state?.selectedPlan;

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    // Account Info
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    
    // Business Info
    companyName: '',
    industry: '',
    companySize: '',
    website: '',
    location: '',
    
    // Goals
    primaryGoal: '',
    monthlyBudget: '',
    timeline: ''
  });

  const steps = [
    { number: 1, title: 'Account Setup', icon: Users },
    { number: 2, title: 'Business Details', icon: Building },
    { number: 3, title: 'Goals & Budget', icon: Target },
    { number: 4, title: 'Confirmation', icon: CheckCircle }
  ];

  const industries = [
    'Technology', 'E-commerce', 'Healthcare', 'Finance', 'Education', 
    'Real Estate', 'Food & Beverage', 'Fashion', 'Travel', 'Other'
  ];

  const companySizes = [
    '1-10 employees', '11-50 employees', '51-200 employees', '201-500 employees', '500+ employees'
  ];

  const goals = [
    'Increase website traffic', 'Improve search rankings', 'Grow social media presence',
    'Generate more leads', 'Expand to new markets', 'Improve online reputation'
  ];

  const budgets = [
    'Under $1,000/month', '$1,000-$5,000/month', '$5,000-$10,000/month', 
    '$10,000-$25,000/month', '$25,000+/month'
  ];

  const timelines = [
    'ASAP (within 1 month)', '1-3 months', '3-6 months', '6-12 months', 'No rush'
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const signUpData = {
        email: formData.email,
        password: formData.password,
        full_name: formData.fullName,
        role: 'business' as const,
        plan: selectedPlan?.name.toLowerCase().replace(' plan', '') || 'free',
        company_name: formData.companyName,
        industry: formData.industry,
        company_size: formData.companySize,
        website: formData.website,
        location: formData.location
      };

      const { error } = await signUp(signUpData);
      if (error) throw error;

      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.email && formData.password && formData.confirmPassword && formData.fullName;
      case 2:
        return formData.companyName && formData.industry && formData.location;
      case 3:
        return formData.primaryGoal && formData.monthlyBudget && formData.timeline;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Welcome to Thriv for Business
          </h1>
          <p className="text-xl text-slate-600">
            Let's set up your account to connect with verified experts
          </p>
          {selectedPlan && (
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full mt-4">
              Selected: {selectedPlan.name} - ${selectedPlan.offerPrice || selectedPlan.price}/{selectedPlan.period}
            </div>
          )}
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step.number
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 ${
                    currentStep > step.number ? 'bg-green-600' : 'bg-slate-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-lg p-12 border border-slate-200"
        >
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Account Setup</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Create a strong password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Confirm Password</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Business Details</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Company Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Industry</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Company Size</label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select company size</option>
                    {companySizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Website (Optional)</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="City, Country"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Goals & Budget</h2>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Primary Goal</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {goals.map(goal => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => setFormData({ ...formData, primaryGoal: goal })}
                      className={`p-4 text-left rounded-xl border-2 transition-all ${
                        formData.primaryGoal === goal
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Monthly Budget</label>
                  <select
                    value={formData.monthlyBudget}
                    onChange={(e) => setFormData({ ...formData, monthlyBudget: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select budget range</option>
                    {budgets.map(budget => (
                      <option key={budget} value={budget}>{budget}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Timeline</label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select timeline</option>
                    {timelines.map(timeline => (
                      <option key={timeline} value={timeline}>{timeline}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center space-y-8">
              <h2 className="text-2xl font-bold text-slate-900">Ready to Get Started!</h2>
              
              <div className="bg-slate-50 rounded-2xl p-8 text-left">
                <h3 className="font-bold text-slate-900 mb-6">Account Summary:</h3>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <p><strong>Name:</strong> {formData.fullName}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Company:</strong> {formData.companyName}</p>
                    <p><strong>Industry:</strong> {formData.industry}</p>
                  </div>
                  <div>
                    <p><strong>Location:</strong> {formData.location}</p>
                    <p><strong>Goal:</strong> {formData.primaryGoal}</p>
                    <p><strong>Budget:</strong> {formData.monthlyBudget}</p>
                    <p><strong>Timeline:</strong> {formData.timeline}</p>
                  </div>
                </div>
              </div>

              {selectedPlan && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                  <h4 className="font-bold text-green-900 mb-2">Selected Plan: {selectedPlan.name}</h4>
                  <p className="text-green-700">
                    ${selectedPlan.offerPrice || selectedPlan.price}/{selectedPlan.period}
                  </p>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              {error}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-12">
            <button
              onClick={currentStep === 1 ? () => navigate('/pricing') : handleBack}
              className="inline-flex items-center px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentStep === 1 ? 'Back to Pricing' : 'Previous'}
            </button>

            <button
              onClick={currentStep === 4 ? handleSubmit : handleNext}
              disabled={!isStepValid() || loading}
              className="inline-flex items-center px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {loading ? 'Creating Account...' : currentStep === 4 ? 'Create Account' : 'Continue'}
              {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
    </div>
  );
};

export default BusinessOnboarding;