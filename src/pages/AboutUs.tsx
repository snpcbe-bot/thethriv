import React from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Target, Heart, Award, Zap } from 'lucide-react';

const AboutUs = () => {
  const values = [
    {
      icon: Heart,
      title: 'Mission-Driven',
      description: 'We believe quality expertise should be accessible to every small business, regardless of location or budget.'
    },
    {
      icon: Globe,
      title: 'Global Vision',
      description: 'Breaking down geographical barriers to connect businesses with the best expertise worldwide.'
    },
    {
      icon: Award,
      title: 'Quality First',
      description: 'Every expert is carefully vetted and verified to ensure the highest standards of service.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Leveraging technology to make expert discovery and connection seamless and efficient.'
    }
  ];

  const milestones = [
    { year: '2024', title: 'Founded', description: 'Thethriv was founded with a mission to democratize access to expertise' },
    { year: '2024', title: 'Platform Launch', description: 'Beta platform launched in 10 countries with 1,000+ experts' },
    { year: '2025', title: 'Global Expansion', description: 'Expanding to 20+ countries with 10,000+ verified experts' },
    { year: '2025', title: 'AI Integration', description: 'Introducing AI agents to complement human expertise' }
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
              About Thethriv
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
              We're on a mission to democratize access to quality expertise, helping small businesses 
              grow and compete on a global scale by connecting them with trusted, verified professionals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold text-slate-900 mb-8">
                Our Mission
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                Quality expertise made accessible: linking small businesses with trusted, curated expertise.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                We believe that every small business deserves access to world-class expertise, 
                regardless of their location or budget. By carefully curating and verifying our 
                network of experts, we ensure that businesses can find the right professional 
                help to grow and expand into new markets.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-12 text-white"
            >
              <div className="text-center space-y-8">
                <Target className="w-16 h-16 mx-auto text-blue-200" />
                <h3 className="text-2xl font-bold">Our Vision</h3>
                <p className="text-blue-100 leading-relaxed">
                  To become the world's most trusted platform for connecting small businesses 
                  with quality expertise, enabling growth without geographical boundaries.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-slate-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-slate-600">
              Key milestones in our mission to democratize expertise
            </p>
          </div>
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex items-center space-x-8 ${index % 2 === 1 ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div className="flex-1">
                  <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 ${index % 2 === 1 ? 'text-right' : ''}`}>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{milestone.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex-shrink-0"></div>
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Users className="w-16 h-16 mx-auto text-blue-300 mb-8" />
            <h2 className="text-5xl font-bold mb-8">
              Our Team
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed max-w-4xl mx-auto">
              Thethriv is designed to help small businesses access expertise without borders. 
              We understand the challenges small businesses face because we've been there. Our team is 
              committed to building a platform that truly serves the needs of growing businesses and 
              the experts who support them.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;