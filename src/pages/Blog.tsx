import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, TrendingUp, Users, Globe } from 'lucide-react';

const Blog = () => {
  const featuredPost = {
    title: "10 SEO Strategies That Actually Work for Small Businesses in 2025",
    excerpt: "Discover the most effective SEO tactics that small businesses are using to compete with larger companies and drive organic growth.",
    author: "Sarah Johnson",
    date: "January 15, 2025",
    readTime: "8 min read",
    image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "SEO"
  };

  const blogPosts = [
    {
      title: "How to Choose the Right Digital Marketing Expert for Your Business",
      excerpt: "A comprehensive guide to finding and vetting digital marketing professionals who can help grow your business.",
      author: "Mike Chen",
      date: "January 12, 2025",
      readTime: "6 min read",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Marketing"
    },
    {
      title: "The Rise of AI in Small Business: Opportunities and Challenges",
      excerpt: "Exploring how artificial intelligence is transforming small business operations and what entrepreneurs need to know.",
      author: "Dr. Emily Rodriguez",
      date: "January 10, 2025",
      readTime: "10 min read",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "AI & Technology"
    },
    {
      title: "Global Expansion Made Simple: A Step-by-Step Guide",
      excerpt: "Learn how small businesses can successfully expand into international markets with the right expertise and strategy.",
      author: "James Wilson",
      date: "January 8, 2025",
      readTime: "12 min read",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Growth"
    },
    {
      title: "Building Trust in the Digital Age: Why Verification Matters",
      excerpt: "Understanding the importance of verified expertise and how it impacts business success in today's digital landscape.",
      author: "Lisa Park",
      date: "January 5, 2025",
      readTime: "7 min read",
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Trust & Security"
    },
    {
      title: "Influencer Marketing for B2B: What Small Businesses Need to Know",
      excerpt: "Discover how B2B influencer marketing can help small businesses reach new audiences and build credibility.",
      author: "Alex Thompson",
      date: "January 3, 2025",
      readTime: "9 min read",
      image: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Influencer Marketing"
    },
    {
      title: "E-commerce Optimization: Converting Visitors into Customers",
      excerpt: "Essential strategies for improving your online store's conversion rate and maximizing revenue from existing traffic.",
      author: "Rachel Kim",
      date: "December 30, 2024",
      readTime: "11 min read",
      image: "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "E-commerce"
    }
  ];

  const categories = [
    { name: 'All Posts', count: 24, icon: Globe },
    { name: 'SEO', count: 8, icon: TrendingUp },
    { name: 'Marketing', count: 6, icon: Users },
    { name: 'Growth', count: 5, icon: ArrowRight },
    { name: 'AI & Technology', count: 3, icon: TrendingUp },
    { name: 'E-commerce', count: 2, icon: Globe }
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
              Thriv Blog
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              SEO tips, growth strategies, and expert insights to help your small business thrive in the digital age.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-12 text-white">
                <div className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-6">
                  Featured Post
                </div>
                <h2 className="text-4xl font-bold mb-6 leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-blue-100 text-lg leading-relaxed mb-8">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center space-x-6 mb-8">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{featuredPost.date}</span>
                  </div>
                  <span className="text-sm">{featuredPost.readTime}</span>
                </div>
                <button className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
                  Read Article
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
              <div className="relative">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 right-6">
                  <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur text-slate-900 text-sm font-medium rounded-full">
                    {featuredPost.category}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories and Posts */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Categories</h3>
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <motion.button
                    key={category.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <category.icon className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <span className="text-sm text-slate-400 group-hover:text-blue-600">
                      {category.count}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 gap-8">
                {blogPosts.map((post, index) => (
                  <motion.article
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                  >
                    <div className="relative">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur text-slate-900 text-sm font-medium rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <div className="flex items-center space-x-4">
                          <span>{post.author}</span>
                          <span>{post.date}</span>
                        </div>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get the latest insights and tips delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/50 outline-none"
              />
              <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;