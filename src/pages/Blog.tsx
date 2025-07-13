import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const blogPosts = [
    {
      title: '10 Proven Techniques to Overcome Price Objections in Aesthetic Consultations',
      author: 'Aesthetic Sales Hero',
      date: 'March 15, 2024',
      category: 'Sales Techniques',
      slug: 'overcome-price-objections',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
    },
    {
      title: 'The Psychology Behind Patient Decision-Making in Aesthetic Medicine',
      author: 'Marco Emilio Valle',
      date: 'March 10, 2024',
      category: 'Psychology',
      slug: 'psychology-patient-decisions',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
    },
    {
      title: 'Building Trust: The Foundation of Successful Aesthetic Consultations',
      author: 'Aesthetic Sales Hero',
      date: 'March 5, 2024',
      category: 'Patient Relations',
      slug: 'building-trust-consultations',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
    },
    {
      title: 'Digital Tools That Are Revolutionizing Aesthetic Sales Training',
      author: 'Aesthetic Sales Hero',
      date: 'February 28, 2024',
      category: 'Technology',
      slug: 'digital-tools-sales-training',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
    },
    {
      title: 'Advanced Consultation Frameworks for Complex Cases',
      author: 'Marco Emilio Valle',
      date: 'February 20, 2024',
      category: 'Advanced Techniques',
      slug: 'advanced-consultation-frameworks',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
    },
    {
      title: 'Creating Authentic Patient Relationships in the Digital Age',
      author: 'Aesthetic Sales Hero',
      date: 'February 15, 2024',
      category: 'Patient Relations',
      slug: 'authentic-patient-relationships',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Sales Techniques': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      'Psychology': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      'Patient Relations': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      'Technology': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      'Advanced Techniques': 'bg-violet-500/10 text-violet-400 border-violet-500/30',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <div className="pt-20 bg-gradient-to-br from-black via-gray-900 to-black min-h-screen">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <motion.div
          ref={ref}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white">Insights &</span>
            <span className="block bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">
              Expert Knowledge
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-white/70 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Expert insights, proven strategies, and industry trends to help you master 
            the art of aesthetic sales and grow your practice.
          </motion.p>
        </motion.div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-24 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * (index % 3) }}
                viewport={{ once: true }}
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 group-hover:border-[#00d9ff]/50 h-full">
                    {/* Square Featured Image with padding inside card */}
                    <div className="relative w-full mx-auto aspect-rectangle mb-6 overflow-hidden rounded-xl">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </div>

                    {/* Category Badge - Below image, above title */}
                    <div className="mb-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h2 className="text-l font-semibold mb-4 group-hover:text-[#00d9ff] transition-colors duration-300 leading-tight">
                        {post.title}
                      </h2>

                      {/* Meta Information */}
                      <div className="flex items-center justify-between text-sm text-white/60 mb-4">
                        <div className="flex items-center gap-2">
                          <User size={14} />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          <span>{post.date}</span>
                        </div>
                      </div>

                      {/* Read More Arrow */}
                      <div className="flex items-center gap-2 text-white group-hover:text-[#ff41fd] transition-colors duration-300">
                        <span className="text-sm font-medium">Read More</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00d9ff]/0 to-[#ff41fd]/0 group-hover:from-[#00d9ff]/5 group-hover:to-[#ff41fd]/5 transition-all duration-300 pointer-events-none" />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Load More Section */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl font-semibold hover:bg-white/10 hover:border-[#00d9ff]/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Articles
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 relative">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              Get the latest insights and strategies delivered directly to your inbox. 
              Join thousands of aesthetic professionals already subscribed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-[#00d9ff] focus:outline-none transition-colors"
              />
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] rounded-xl font-bold hover:scale-105 transition-transform"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
            
            <p className="text-sm text-white/60 mt-4">
              No spam, unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;