import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Video, BookOpen, Users, TrendingUp, Globe, Target } from 'lucide-react';

const ResourcesLibrary = () => {
  const resourceCategories = [
    {
      icon: FileText,
      title: 'Guides & Templates',
      count: 24,
      description: 'Comprehensive guides and ready-to-use templates'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      count: 18,
      description: 'Step-by-step video walkthroughs'
    },
    {
      icon: BookOpen,
      title: 'eBooks',
      count: 12,
      description: 'In-depth eBooks on business growth'
    },
    {
      icon: Target,
      title: 'Case Studies',
      count: 15,
      description: 'Real success stories and insights'
    }
  ];

  const featuredResources = [
    {
      title: "The Complete SEO Checklist for Small Businesses",
      description: "A comprehensive 50-point checklist to optimize your website for search engines and drive organic traffic.",
      type: "PDF Guide",
      downloads: "2.3k",
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "SEO"
    },
    {
      title: "Social Media Content Calendar Template",
      description: "Plan and organize your social media content for maximum engagement with this ready-to-use template.",
      type: "Excel Template",
      downloads: "1.8k",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Marketing"
    },
    {
      title: "Global Expansion Playbook",
      description: "Everything you need to know about expanding your business internationally, from market research to legal considerations.",
      type: "eBook",
      downloads: "1.2k",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Growth"
    }
  ];

  const allResources = [
    {
      title: "Email Marketing Automation Guide",
      description: "Learn how to set up effective email marketing campaigns that convert.",
      type: "PDF Guide",
      downloads: "956",
      category: "Marketing"
    },
    {
      title: "Customer Persona Template",
      description: "Create detailed customer personas to better understand your target audience.",
      type: "Template",
      downloads: "1.4k",
      category: "Strategy"
    },
    {
      title: "Website Conversion Optimization Checklist",
      description: "Improve your website's conversion rate with this actionable checklist.",
      type: "Checklist",
      downloads: "823",
      category: "Conversion"
    },
    {
      title: "Influencer Outreach Email Templates",
      description: "Professional email templates for reaching out to influencers and building partnerships.",
      type: "Templates",
      downloads: "672",
      category: "Influencer Marketing"
    },
    {
      title: "Financial Planning Spreadsheet for SMBs",
      description: "Track your business finances and plan for growth with this comprehensive spreadsheet.",
      type: "Excel Template",
      downloads: "1.1k",
      category: "Finance"
    },
    {
      title: "Content Marketing Strategy Framework",
      description: "Build a winning content marketing strategy with this step-by-step framework.",
      type: "PDF Guide",
      downloads: "789",
      category: "Content Marketing"
    }
  ];

  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-bold text-slate-900 mb-8">
              Resources Library
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Free guides, templates, and eBooks to help your small business grow. 
              Everything you need to succeed, curated by our experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resourceCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{category.title}</h3>
                <p className="text-slate-600 mb-4">{category.description}</p>
                <div className="text-2xl font-bold text-blue-600">{category.count}</div>
                <div className="text-sm text-slate-500">Resources</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Featured Resources
            </h2>
            <p className="text-xl text-slate-600">
              Our most popular and impactful resources
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="relative">
                  <img 
                    src={resource.image} 
                    alt={resource.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur text-slate-900 text-sm font-medium rounded-full">
                      {resource.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                      {resource.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {resource.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-slate-500">
                      <Download className="w-4 h-4" />
                      <span>{resource.downloads} downloads</span>
                    </div>
                    <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Resources */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              All Resources
            </h2>
            <p className="text-xl text-slate-600">
              Browse our complete collection of business resources
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-slate-50 rounded-2xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-3">
                      {resource.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-slate-500">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                        {resource.category}
                      </span>
                      <span>{resource.downloads} downloads</span>
                    </div>
                  </div>
                  <button className="ml-4 p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-sm font-medium text-slate-500">
                  {resource.type}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Need More Help?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Connect with our verified experts for personalized guidance
            </p>
            <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
              Find an Expert
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesLibrary;