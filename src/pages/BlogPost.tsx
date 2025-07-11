import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [imageLoaded, setImageLoaded] = useState(false);

  // Blog post data - in a real app, this would come from an API or CMS
  const blogPosts = {
    'overcome-price-objections': {
      title: '10 Proven Techniques to Overcome Price Objections in Aesthetic Consultations',
      image: '/blog/price-objections.jpg',
      content: `
        <p>Price objections are one of the most common challenges aesthetic professionals face during consultations. However, with the right approach and techniques, you can address these concerns while maintaining trust and demonstrating value to your patients.</p>

        <h2>Understanding the Psychology Behind Price Objections</h2>
        <p>Before diving into specific techniques, it's crucial to understand that price objections often aren't really about money. They're typically about:</p>
        <ul>
          <li>Fear of making the wrong decision</li>
          <li>Lack of understanding about the value proposition</li>
          <li>Previous negative experiences</li>
          <li>Need for more time to process information</li>
        </ul>

        <h2>The 10 Proven Techniques</h2>

        <h3>1. The Value Reframe</h3>
        <p>Instead of focusing on cost, redirect the conversation to value and outcomes. Help patients understand what they're investing in - not just the procedure, but the confidence, satisfaction, and long-term benefits.</p>

        <h3>2. Break Down the Investment</h3>
        <p>Large numbers can feel overwhelming. Break down the cost into smaller, more digestible amounts. For example, "This investment works out to less than your daily coffee over the next two years."</p>

        <h3>3. The Comparison Method</h3>
        <p>Compare your services to alternatives they might consider - both in terms of quality and long-term value. This helps justify your pricing while highlighting your unique advantages.</p>

        <h3>4. Address Concerns Directly</h3>
        <p>Don't avoid the price conversation. Address it head-on with confidence and transparency. This builds trust and shows you're comfortable with your value proposition.</p>

        <h3>5. Use Social Proof</h3>
        <p>Share success stories and testimonials from similar patients who initially had price concerns but were thrilled with their results and investment.</p>

        <h3>6. Offer Flexible Payment Options</h3>
        <p>Present various payment plans and financing options that make the investment more accessible without compromising your pricing structure.</p>

        <h3>7. The Consequence of Inaction</h3>
        <p>Gently explore what happens if they don't move forward - how will they feel in 6 months or a year if their concerns remain unaddressed?</p>

        <h3>8. Bundle Value</h3>
        <p>Instead of discounting, add value through complementary services, extended warranties, or additional consultations.</p>

        <h3>9. The Expertise Investment</h3>
        <p>Emphasize the years of training, experience, and expertise they're investing in, not just the procedure itself.</p>

        <h3>10. Create Urgency Ethically</h3>
        <p>If appropriate, mention limited availability, seasonal considerations, or upcoming price changes - but only if genuine.</p>

        <h2>Implementation Tips</h2>
        <p>Remember, the key to successfully overcoming price objections is preparation, practice, and genuine care for your patients' well-being. These techniques should feel natural and authentic, not scripted or pushy.</p>

        <p>Practice these approaches regularly, and you'll find that price objections become opportunities to demonstrate your value and build stronger patient relationships.</p>
      `,
      author: 'Aesthetic Sales Hero',
      date: 'March 15, 2024',
      readTime: '8 min read',
      category: 'Sales Techniques',
    },
    'psychology-patient-decisions': {
      title: 'The Psychology Behind Patient Decision-Making in Aesthetic Medicine',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=800&fit=crop&crop=entropy&auto=format&q=80',
      content: `
        <p>Understanding the psychological factors that influence patient decision-making is crucial for aesthetic professionals who want to provide better consultations and achieve higher conversion rates.</p>

        <h2>The Emotional vs. Logical Brain</h2>
        <p>Research shows that people make decisions emotionally and then justify them logically. In aesthetic medicine, patients are often driven by:</p>
        <ul>
          <li>Desire for increased confidence</li>
          <li>Social pressures and comparisons</li>
          <li>Life transitions and milestones</li>
          <li>Professional advancement goals</li>
        </ul>

        <h2>Key Psychological Principles</h2>

        <h3>Loss Aversion</h3>
        <p>People fear losing something more than they value gaining something equivalent. Frame your consultations around what patients might lose by not taking action.</p>

        <h3>Social Proof</h3>
        <p>Patients look to others for validation of their decisions. Share relevant success stories and testimonials that resonate with their specific situation.</p>

        <h3>Authority Bias</h3>
        <p>Patients trust experts. Establish your credibility early and throughout the consultation process.</p>

        <h3>Anchoring Effect</h3>
        <p>The first piece of information presented influences all subsequent judgments. Start with your premium options to anchor expectations.</p>

        <h2>Practical Applications</h2>
        <p>Use these insights to structure your consultations more effectively, address underlying concerns, and help patients make decisions that truly serve their goals.</p>
      `,
      author: 'Marco Emilio Valle',
      date: 'March 10, 2024',
      readTime: '12 min read',
      category: 'Psychology',
    },
    'building-trust-consultations': {
      title: 'Building Trust: The Foundation of Successful Aesthetic Consultations',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&crop=entropy&auto=format&q=80',
      content: `
        <p>Trust is the cornerstone of every successful aesthetic consultation. Without it, even the most skilled practitioners struggle to achieve optimal patient outcomes and satisfaction.</p>

        <h2>The Trust Equation</h2>
        <p>Trust = (Credibility + Reliability + Intimacy) / Self-Orientation</p>

        <h3>Credibility</h3>
        <p>Your expertise, qualifications, and track record. This includes:</p>
        <ul>
          <li>Professional certifications and training</li>
          <li>Years of experience</li>
          <li>Before and after portfolios</li>
          <li>Patient testimonials</li>
        </ul>

        <h3>Reliability</h3>
        <p>Consistency in your actions and follow-through. Patients need to know they can depend on you.</p>

        <h3>Intimacy</h3>
        <p>The safety patients feel in sharing sensitive information and concerns with you.</p>

        <h3>Self-Orientation</h3>
        <p>The degree to which you focus on yourself versus the patient. Lower self-orientation increases trust.</p>

        <h2>Building Trust from the First Moment</h2>
        <p>Trust-building begins before the patient even enters your consultation room. Every touchpoint matters.</p>

        <h2>Maintaining Trust Throughout the Relationship</h2>
        <p>Trust isn't built once - it's maintained through consistent, patient-focused actions and communications.</p>
      `,
      author: 'Aesthetic Sales Hero',
      date: 'March 5, 2024',
      readTime: '6 min read',
      category: 'Patient Relations',
    },
    'digital-tools-sales-training': {
      title: 'Digital Tools That Are Revolutionizing Aesthetic Sales Training',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop&crop=entropy&auto=format&q=80',
      content: `
        <p>The aesthetic industry is experiencing a digital transformation, and sales training is no exception. Modern technology is creating unprecedented opportunities for skill development and performance improvement.</p>

        <h2>The Rise of AI-Powered Training</h2>
        <p>Artificial intelligence is revolutionizing how aesthetic professionals practice and refine their consultation skills.</p>

        <h3>Virtual Patient Simulations</h3>
        <p>AI-powered simulations allow practitioners to practice with virtual patients who present realistic scenarios, objections, and personalities.</p>

        <h3>Real-Time Feedback Systems</h3>
        <p>Advanced analytics provide instant feedback on consultation performance, helping identify areas for improvement.</p>

        <h2>Mobile Learning Platforms</h2>
        <p>The shift to mobile-first learning is making training more accessible and convenient than ever before.</p>

        <h2>Virtual Reality Training</h2>
        <p>VR technology is creating immersive training experiences that closely replicate real-world consultation environments.</p>

        <h2>Data-Driven Performance Tracking</h2>
        <p>Modern platforms provide detailed analytics on every aspect of consultation performance, enabling targeted improvement efforts.</p>

        <h2>The Future of Aesthetic Sales Training</h2>
        <p>As technology continues to evolve, we can expect even more sophisticated tools that will further enhance the learning experience and outcomes for aesthetic professionals.</p>
      `,
      author: 'Aesthetic Sales Hero',
      date: 'February 28, 2024',
      readTime: '10 min read',
      category: 'Technology',
    },
    'advanced-consultation-frameworks': {
      title: 'Advanced Consultation Frameworks for Complex Cases',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop&crop=entropy&auto=format&q=80',
      content: `
        <p>When dealing with complex aesthetic cases, standard consultation approaches may fall short. Advanced frameworks provide structured methodologies for navigating challenging patient scenarios while maintaining ethical standards and achieving optimal outcomes.</p>

        <h2>Understanding Complex Cases</h2>
        <p>Complex cases in aesthetic medicine often involve:</p>
        <ul>
          <li>Multiple treatment areas requiring coordination</li>
          <li>Patients with unrealistic expectations</li>
          <li>Previous negative experiences with other providers</li>
          <li>Medical contraindications or complications</li>
          <li>Budget constraints requiring phased treatment plans</li>
        </ul>

        <h2>The CARE Framework</h2>
        <p>Our advanced CARE framework provides a systematic approach to complex consultations:</p>

        <h3>C - Comprehensive Assessment</h3>
        <p>Begin with a thorough evaluation that goes beyond surface-level concerns. Understand the patient's complete medical history, aesthetic goals, lifestyle factors, and psychological motivations.</p>

        <h3>A - Adaptive Communication</h3>
        <p>Adjust your communication style based on the patient's personality, education level, and emotional state. Some patients need detailed technical explanations, while others prefer simple, outcome-focused discussions.</p>

        <h3>R - Risk Mitigation</h3>
        <p>Identify potential risks early and develop strategies to address them. This includes medical risks, expectation management, and financial considerations.</p>

        <h3>E - Ethical Decision Making</h3>
        <p>Always prioritize patient well-being over revenue. Sometimes the best recommendation is to decline treatment or refer to another specialist.</p>

        <h2>Managing Difficult Conversations</h2>
        <p>Complex cases often require difficult conversations. Key strategies include:</p>
        <ul>
          <li>Setting realistic expectations from the first consultation</li>
          <li>Using visual aids and before/after photos appropriately</li>
          <li>Discussing alternative treatment options</li>
          <li>Being transparent about limitations and risks</li>
        </ul>

        <h2>Documentation and Follow-up</h2>
        <p>Complex cases require meticulous documentation and structured follow-up protocols to ensure patient safety and satisfaction.</p>

        <h2>Building Expertise</h2>
        <p>Developing proficiency with complex cases takes time and practice. Regular case reviews, continuing education, and peer consultation are essential for growth.</p>
      `,
      author: 'Marco Emilio Valle',
      date: 'February 20, 2024',
      readTime: '15 min read',
      category: 'Advanced Techniques',
    },
    'authentic-patient-relationships': {
      title: 'Creating Authentic Patient Relationships in the Digital Age',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=800&fit=crop&crop=entropy&auto=format&q=80',
      content: `
        <p>In an increasingly digital world, the challenge of building authentic relationships with patients has become more complex yet more important than ever. Modern aesthetic practices must balance technological efficiency with genuine human connection.</p>

        <h2>The Digital Paradox</h2>
        <p>While digital tools have made aesthetic practices more efficient, they can also create barriers to authentic connection. Patients often feel like numbers in a system rather than individuals with unique needs and concerns.</p>

        <h2>Foundations of Authentic Relationships</h2>
        <p>Authentic patient relationships are built on several key principles:</p>

        <h3>Genuine Interest</h3>
        <p>Show real curiosity about your patients as people, not just as cases. Ask about their lives, interests, and motivations beyond their aesthetic concerns.</p>

        <h3>Active Listening</h3>
        <p>Listen not just to what patients say, but to what they don't say. Pay attention to body language, tone, and emotional cues that reveal deeper concerns or motivations.</p>

        <h3>Vulnerability and Transparency</h3>
        <p>Share appropriate personal experiences and be honest about limitations. Patients connect with practitioners who are human, not perfect.</p>

        <h3>Consistency</h3>
        <p>Maintain the same level of care and attention whether it's a patient's first visit or their tenth. Consistency builds trust over time.</p>

        <h2>Digital Tools for Human Connection</h2>
        <p>Technology can actually enhance relationships when used thoughtfully:</p>
        <ul>
          <li>Personalized follow-up messages that reference specific conversation points</li>
          <li>Digital portfolios that help patients visualize their journey</li>
          <li>Scheduling systems that remember patient preferences</li>
          <li>Educational content tailored to individual patient needs</li>
        </ul>

        <h2>The Long-term Perspective</h2>
        <p>Authentic relationships are investments that pay dividends over time through increased patient loyalty, referrals, and practice satisfaction.</p>

        <h2>Measuring Relationship Quality</h2>
        <p>Track relationship quality through patient feedback, retention rates, and referral patterns rather than just transaction metrics.</p>

        <h2>Training Your Team</h2>
        <p>Ensure every team member understands the importance of authentic relationships and has the skills to build them effectively.</p>
      `,
      author: 'Aesthetic Sales Hero',
      date: 'February 15, 2024',
      readTime: '12 min read',
      category: 'Patient Relations',
    },
  };

  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-white/70 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] rounded-xl font-bold hover:scale-105 transition-transform"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-gradient-to-br from-black via-gray-900 to-black min-h-screen">
      {/* Hero Section */}
      <section className="py-12 relative overflow-hidden">
        <motion.div
          ref={ref}
          className="relative z-10 max-w-4xl mx-auto px-6"
          style={{ willChange: 'opacity, transform' }}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          {/* Back Button */}
          <motion.div
            className="mb-8"
            style={{ willChange: 'opacity, transform' }}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[#00d9ff] hover:text-[#ff41fd] transition-colors font-semibold"
            >
              <ArrowLeft size={20} />
              Back to Blog
            </Link>
          </motion.div>

          {/* Category Badge */}
          <motion.div
            className="mb-6"
            style={{ willChange: 'opacity, transform' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#00d9ff]/20 to-[#ff41fd]/20 rounded-full text-sm font-semibold text-[#00d9ff]">
              {post.category}
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1 
            className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight leading-tight"
            style={{ willChange: 'opacity, transform' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            {post.title}
          </motion.h1>

          {/* Meta Information */}
          <motion.div
            className="flex items-center gap-6 text-white/70 mb-2"
            style={{ willChange: 'opacity, transform' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{post.readTime}</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Image Section */}
      <section className="pb-12 relative">
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div style={{ minHeight: '340px', position: 'relative' }}>
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 animate-pulse rounded-2xl z-10">
                <div className="w-24 h-24 bg-gradient-to-r from-[#00d9ff]/30 to-[#ff41fd]/30 rounded-full" />
              </div>
            )}
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              style={{ willChange: 'opacity, transform' }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={imageLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto max-w-full object-cover rounded-2xl"
                style={{ maxHeight: '600px', willChange: 'opacity, transform' }}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-6 relative">
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.article
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div 
              className="prose prose-lg prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                '--tw-prose-body': 'rgb(255 255 255 / 0.8)',
                '--tw-prose-headings': 'rgb(255 255 255)',
                '--tw-prose-links': 'rgb(0 217 255)',
                '--tw-prose-bold': 'rgb(255 255 255)',
                '--tw-prose-bullets': 'rgb(0 217 255)',
                '--tw-prose-quotes': 'rgb(255 255 255 / 0.7)',
              } as React.CSSProperties}
            />
          </motion.article>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Practice?</h2>
            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              Join thousands of aesthetic professionals who are already using our training system to increase their consultation success rates.
            </p>
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] rounded-xl font-bold text-lg shadow-lg hover:shadow-[#00d9ff]/25 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 217, 255, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Training Today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;