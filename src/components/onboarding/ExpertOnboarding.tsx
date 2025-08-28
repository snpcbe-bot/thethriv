import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, User, Award, DollarSign, CheckCircle, Star, Globe, Briefcase } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import type { Plan } from '../../data/pricingPlans';

interface ExpertOnboardingState {
  selectedPlan?: Plan;
}

const ExpertOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signUp } = useAuth();
  
  const state = location.state as ExpertOnboardingState;
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
    
    // Expert Info
    expertType: '',
    primarySkills: [] as string[],
    yearsExperience: '',
    bio: '',
    location: '',
    
    // Professional Details
    hourlyRate: '',
    portfolioUrl: '',
    linkedinUrl: '',
    languages: [] as string[],
    availability: ''
  });

  const steps = [
    { number: 1, title: 'Account Setup', icon: User },
    { number: 2, title: 'Expertise', icon: Award },
    { number: 3, title: 'Professional Details', icon: Briefcase },
    { number: 4, title: 'Confirmation', icon: CheckCircle }
  ];

  const expertTypes = [
    { id: 'seo', name: 'SEO Expert', description: 'Search engine optimization and digital marketing' },
    { id: 'influencer', name: 'Influencer', description: 'Social media marketing and brand partnerships' },
    { id: 'developer', name: 'Web Developer', description: 'Website development and technical solutions' },
    { id: 'designer', name: 'Designer', description: 'UI/UX design and visual branding' },
    { id: 'consultant', name: 'Business Consultant', description: 'Strategy and business development' }
  ];

  const skillOptions = {
    seo: ['Technical SEO', 'Local SEO', 'Content Strategy', 'Link Building', 'Google Analytics', 'Keyword Research'],
    influencer: ['Instagram Marketing', 'TikTok Content', 'YouTube Creation', 'Brand Partnerships', 'Content Creation', 'Community Management'],
    developer: ['React', 'Node.js', 'WordPress', 'E-commerce', 'Mobile Apps', 'API Development'],
    designer: ['UI Design', 'UX Research', 'Branding', 'Logo Design', 'Web Design', 'Mobile Design'],
    consultant: ['Business Strategy', 'Market Research', 'Financial Planning', 'Operations', 'Growth Hacking', 'Product Management']
  };

  const languageOptions = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 
    'Dutch', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi'
  ];

  const availabilityOptions = [
    'Full-time (40+ hours/week)', 'Part-time (20-40 hours/week)', 
    'Project-based', 'Weekends only', 'Flexible schedule'
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

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      primarySkills: prev.primarySkills.includes(skill)
        ? prev.primarySkills.filter(s => s !== skill)
        : [...prev.primarySkills, skill]
    }));
  };

  const handleLanguageToggle = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
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
        role: 'expert' as const,
        plan: selectedPlan?.name.toLowerCase().replace(' plan', '') || 'free',
        expertise: formData.primarySkills.join(', '),
        bio: formData.bio,
        hourly_rate: formData.hourlyRate ? parseFloat(formData.hourlyRate) : undefined,
        portfolio_url: formData.portfolioUrl,
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
        return formData.expertType && formData.primarySkills.length > 0 && formData.yearsExperience && formData.bio;
      case 3:
        return formData.location && formData.languages.length > 0 && formData.availability;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const currentSkills = formData.expertType ? skillOptions[formData.expertType as keyof typeof skillOptions] || [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 pt-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Welcome to Thriv for Experts
          </h1>
          <p className="text-xl text-slate-600">
            Let's set up your expert profile to connect with businesses worldwide
          </p>
          {selectedPlan && (
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full mt-4">
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
                    ? 'bg-purple-600 text-white'
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
                    currentStep > step.number ? 'bg-purple-600' : 'bg-slate-200'
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
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Create a strong password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Confirm Password</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Your Expertise</h2>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-4">Expert Type</label>
                <div className="grid md:grid-cols-2 gap-4">
                  {expertTypes.map(type => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, expertType: type.id, primarySkills: [] })}
                      className={`p-6 text-left rounded-xl border-2 transition-all ${
                        formData.expertType === type.id
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <h3 className="font-semibold mb-2">{type.name}</h3>
                      <p className="text-sm opacity-75">{type.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {formData.expertType && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-4">
                    Primary Skills (Select up to 5)
                  </label>
                  <div className="grid md:grid-cols-3 gap-3">
                    {currentSkills.map(skill => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleSkillToggle(skill)}
                        disabled={!formData.primarySkills.includes(skill) && formData.primarySkills.length >= 5}
                        className={`p-3 text-sm rounded-lg border-2 transition-all ${
                          formData.primarySkills.includes(skill)
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-slate-200 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Years of Experience</label>
                  <select
                    value={formData.yearsExperience}
                    onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select experience</option>
                    <option value="1-2">1-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Professional Bio</label>
                <textarea
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Describe your expertise, experience, and what makes you unique..."
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Professional Details</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Hourly Rate (USD)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                    <input
                      type="number"
                      value={formData.hourlyRate}
                      onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                      className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="50"
                      min="1"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Availability</label>
                  <select
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select availability</option>
                    {availabilityOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Portfolio URL (Optional)</label>
                  <input
                    type="url"
                    value={formData.portfolioUrl}
                    onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">LinkedIn URL (Optional)</label>
                  <input
                    type="url"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-4">
                  Languages (Select all that apply)
                </label>
                <div className="grid md:grid-cols-4 gap-3">
                  {languageOptions.map(language => (
                    <button
                      key={language}
                      type="button"
                      onClick={() => handleLanguageToggle(language)}
                      className={`p-3 text-sm rounded-lg border-2 transition-all ${
                        formData.languages.includes(language)
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center space-y-8">
              <h2 className="text-2xl font-bold text-slate-900">Ready to Join Thriv!</h2>
              
              <div className="bg-slate-50 rounded-2xl p-8 text-left">
                <h3 className="font-bold text-slate-900 mb-6">Expert Profile Summary:</h3>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <p><strong>Name:</strong> {formData.fullName}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Type:</strong> {expertTypes.find(t => t.id === formData.expertType)?.name}</p>
                    <p><strong>Experience:</strong> {formData.yearsExperience} years</p>
                  </div>
                  <div>
                    <p><strong>Location:</strong> {formData.location}</p>
                    <p><strong>Rate:</strong> ${formData.hourlyRate}/hour</p>
                    <p><strong>Languages:</strong> {formData.languages.join(', ')}</p>
                    <p><strong>Availability:</strong> {formData.availability}</p>
                  </div>
                </div>
                
                {formData.primarySkills.length > 0 && (
                  <div className="mt-4">
                    <p><strong>Skills:</strong></p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.primarySkills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {selectedPlan && (
                <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
                  <h4 className="font-bold text-purple-900 mb-2">Selected Plan: {selectedPlan.name}</h4>
                  <p className="text-purple-700">
                    ${selectedPlan.offerPrice || selectedPlan.price}/{selectedPlan.period}
                  </p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h4 className="font-bold text-blue-900 mb-2">Next Steps:</h4>
                <ul className="text-blue-700 text-sm space-y-2 text-left">
                  <li>• Your profile will be reviewed for verification</li>
                  <li>• You'll receive an email confirmation within 24 hours</li>
                  <li>• Start receiving client inquiries once approved</li>
                  <li>• Access your dashboard to manage your profile</li>
                </ul>
              </div>
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
              className="inline-flex items-center px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {loading ? 'Creating Account...' : currentStep === 4 ? 'Create Expert Account' : 'Continue'}
              {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExpertOnboarding;