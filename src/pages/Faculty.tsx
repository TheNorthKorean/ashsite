import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Users, 
  TrendingUp, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Filter,
  CheckCircle,
  ArrowRight,
  Building,
  User,
  DollarSign,
  BarChart3,
  Target,
  Zap,
  Clock,
  Mail,
  Phone,
  Globe,
  Shield,
  Crown,
  Briefcase
} from 'lucide-react';
import FloatingPriceGuide from '../components/FloatingPriceGuide';

const Faculty = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedFilter, setSelectedFilter] = useState('finance');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);
  const [currentStep, setCurrentStep] = useState(0);

  // Auto-advance application steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);



  const specialties = [
    { id: 'all', name: 'All Specialties', count: 38 },
    { id: 'finance', name: 'Finance', count: 8 },
    { id: 'marketing', name: 'M&A', count: 6 },
    { id: 'operations', name: 'Operations', count: 5 },
    { id: 'compliance', name: 'Compliance & Law', count: 8 },
    { id: 'social', name: 'Social Media & Marketing', count: 3 },
    { id: 'clinical', name: 'Clinical', count: 5 },
    { id: 'manufacturers', name: 'Manufacturers', count: 2 },
    { id: 'career', name: 'Career Development', count: 1 }
  ];

  const facultyMembers = [
    // Career Development (1)
    {
      name: 'Brandon Thompson',
      title: 'Founder & CEO',
      specialty: 'career',
      company: 'Careers in Aesthetics',
      profileImage: '/facultyheadshots/BRANDON THOMPSON.png',
      companyLogo: '/companylogos/careers-in-aesthetics.png',
      expertise: 'Career Development & Industry Guidance',
      experience: '15+ years',
      practicesHelped: '500+',
      rating: 4.9,
      servicesOffered: 8
    },
    
    // Clinical (5)
    {
      name: 'Dr. Gregory Buford, MD',
      title: 'Owner & Founder', 
      specialty: 'clinical',
      company: 'Beauty by Buford & CORE Mastery Summit',
      profileImage: '/facultyheadshots/GREG BUFORD.png',
      companyLogo: '/companylogos/beauty-by-buford.png',
      expertise: 'Medical Aesthetics Leadership',
      experience: '20+ years',
      practicesHelped: '1,200+',
      rating: 4.8,
      servicesOffered: 12
    },
    {
      name: 'Sonya Ellis, MSN, CANS, CPSN',
      title: 'Senior Medical Director',
      specialty: 'clinical', 
      company: 'The L.A.B. Med Spa',
      profileImage: '/facultyheadshots/SONYA ELLIS.png',
      companyLogo: '/companylogos/lab-med-spa.png',
      expertise: 'Advanced Clinical Practice',
      experience: '12+ years',
      practicesHelped: '320+',
      rating: 4.9,
      servicesOffered: 6
    },
    {
      name: 'Ryan Bourgeois, FNP-C',
      title: 'Founder',
      specialty: 'clinical',
      company: 'Bougie Aesthetics & Academy of Regenerative Aesthetics', 
      profileImage: '/facultyheadshots/RYAN BOURGEOIS.png',
      companyLogo: '/companylogos/bougie-aesthetics.png',
      expertise: 'Regenerative Medicine & Training',
      experience: '10+ years',
      practicesHelped: '280+',
      rating: 4.7,
      servicesOffered: 10
    },
    {
      name: 'Kiara Dewitt, BSN, RN, CPN',
      title: 'Founder & CEO',
      specialty: 'clinical',
      company: 'Injectco',
      profileImage: '/facultyheadshots/KIARA DEWITT.png', 
      companyLogo: '/companylogos/injectco.png',
      expertise: 'Injection Techniques & Patient Safety',
      experience: '8+ years',
      practicesHelped: '450+',
      rating: 4.8,
      servicesOffered: 7
    },
    {
      name: 'Paulina Riedler',
      title: 'CEO & Co-Founder',
      specialty: 'clinical',
      company: 'Spakinect',
      profileImage: '/facultyheadshots/PAULINA RIEDLER.png',
      companyLogo: '/companylogos/spakinect.png',
      expertise: 'Spa Management & Operations',
      experience: '11+ years',
      practicesHelped: '380+',
      rating: 4.9,
      servicesOffered: 9
    },

    // Compliance & Law (8)
    {
      name: 'Sara Shikhman',
      title: 'Founder & Managing Partner',
      specialty: 'compliance',
      company: 'Lengea Law',
      profileImage: '/facultyheadshots/SARA SHIKHMAN.png',
      companyLogo: '/companylogos/lengea-law.png',
      expertise: 'Healthcare Legal Compliance',
      experience: '18+ years',
      practicesHelped: '600+',
      rating: 4.9,
      servicesOffered: 5
    },
    {
      name: 'Justin Marti',
      title: 'Founder & Attorney',
      specialty: 'compliance',
      company: 'Marti Law Group',
      profileImage: '/facultyheadshots/JUSTIN MARTI.png',
      companyLogo: '/companylogos/marti-law-group.png', 
      expertise: 'Medical Malpractice & Business Law',
      experience: '16+ years',
      practicesHelped: '400+',
      rating: 4.8,
      servicesOffered: 6
    },
    {
      name: 'Michael S. Byrd',
      title: 'CEO & Partner',
      specialty: 'compliance',
      company: 'Byrd Adatto',
      profileImage: '/facultyheadshots/MICHAEL S BYRD.png',
      companyLogo: '/companylogos/byrd-adatto.png',
      expertise: 'Healthcare Business Law',
      experience: '22+ years',
      practicesHelped: '750+',
      rating: 4.9,
      servicesOffered: 8
    },
    {
      name: 'Bradford E. Adatto',
      title: 'President & Partner', 
      specialty: 'compliance',
      company: 'Byrd Adatto',
      profileImage: '/facultyheadshots/BRADFORD E ADATTO.png',
      companyLogo: '/companylogos/byrd-adatto.png',
      expertise: 'Medical Practice Legal Strategy',
      experience: '19+ years',
      practicesHelped: '680+',
      rating: 4.8,
      servicesOffered: 7
    },
    {
      name: 'Jay D. Reyero',
      title: 'CFO & Partner',
      specialty: 'compliance',
      company: 'Byrd Adatto',
      profileImage: '/facultyheadshots/JAY D REYERO.png',
      companyLogo: '/companylogos/byrd-adatto.png',
      expertise: 'Financial Compliance & Strategy',
      experience: '14+ years',
      practicesHelped: '520+',
      rating: 4.7,
      servicesOffered: 5
    },
    {
      name: 'Amber Bechthold',
      title: 'Founder & CEO',
      specialty: 'compliance',
      company: 'Aesthetic Compliance Experts',
      profileImage: '/facultyheadshots/AMBER BECHTHOLD.png',
      companyLogo: '/companylogos/aesthetic-compliance-experts.png',
      expertise: 'Regulatory Compliance & Risk Management',
      experience: '13+ years',
      practicesHelped: '850+',
      rating: 4.9,
      servicesOffered: 9
    },
    {
      name: 'Nicole Strothman',
      title: 'Founder & General Counsel',
      specialty: 'compliance',
      company: 'Venture Legal Advisors',
      profileImage: '/facultyheadshots/NICOLE STROTHMAN.png',
      companyLogo: '/companylogos/venture-legal-advisors.png',
      expertise: 'Corporate Legal Strategy',
      experience: '17+ years',
      practicesHelped: '290+',
      rating: 4.8,
      servicesOffered: 4
    },

    // Finance (8)
    {
      name: 'Christin Trujillo',
      title: 'Partner & Financial Consultant',
      specialty: 'finance',
      company: 'Maven Financial Partners',
      profileImage: '/facultyheadshots/CHRISTIN TRUJILLO.png',
      companyLogo: '/companylogos/maven-financial-partners.png',
      expertise: 'Practice Financial Strategy',
      experience: '12+ years',
      practicesHelped: '350+',
      rating: 4.8,
      servicesOffered: 6
    },
    {
      name: 'Jessica Nunn',
      title: 'Founder & CEO',
      specialty: 'finance',
      company: 'Maven Financial Partners',
      profileImage: '/facultyheadshots/JESSICA NUNN.png',
      companyLogo: '/companylogos/maven-financial-partners.png',
      expertise: 'Financial Planning & Investment',
      experience: '16+ years',
      practicesHelped: '580+',
      rating: 4.9,
      servicesOffered: 8
    },
    {
      name: 'Ben Hernandez',
      title: 'CEO & Managing Director',
      specialty: 'finance',
      company: 'Skytale Group',
      profileImage: '/facultyheadshots/BEN HERNANDEZ.png',
      companyLogo: '/companylogos/skytale-group.png',
      expertise: 'Executive Financial Leadership',
      experience: '18+ years',
      practicesHelped: '720+',
      rating: 4.8,
      servicesOffered: 10
    },
    {
      name: 'Annie Hockey',
      title: 'President & Head of Consulting',
      specialty: 'finance',
      company: 'Skytale Group',
      profileImage: '/facultyheadshots/ANNIE HOCKEY.png',
      companyLogo: '/companylogos/skytale-group.png',
      expertise: 'Business Consulting & Strategy',
      experience: '14+ years',
      practicesHelped: '460+',
      rating: 4.9,
      servicesOffered: 7
    },
    {
      name: 'Judy Kozlicki',
      title: 'Head of Medical Aesthetics & Plastic Surgery',
      specialty: 'finance',
      company: 'Skytale Group',
      profileImage: '/facultyheadshots/JUDY KOZLICKI.png',
      companyLogo: '/companylogos/skytale-group.png',
      expertise: 'Medical Aesthetics Finance',
      experience: '13+ years',
      practicesHelped: '340+',
      rating: 4.7,
      servicesOffered: 5
    },
    {
      name: 'Nick Liguori',
      title: 'Owner & CPA',
      specialty: 'finance',
      company: 'Liguori Accounting',
      profileImage: '/facultyheadshots/NICK LIGUORI.png',
      companyLogo: '/companylogos/liguori-accounting.png',
      expertise: 'Tax Strategy & Accounting',
      experience: '11+ years',
      practicesHelped: '420+',
      rating: 4.8,
      servicesOffered: 6
    },
    {
      name: 'Dan Simard',
      title: 'Director of Business Development',
      specialty: 'finance',
      company: 'Liguori Accounting',
      profileImage: '/facultyheadshots/DAN SIMARD.png',
      companyLogo: '/companylogos/liguori-accounting.png',
      expertise: 'Business Growth & Development',
      experience: '9+ years',
      practicesHelped: '280+',
      rating: 4.7,
      servicesOffered: 4
    },
    {
      name: 'John Bergano',
      title: 'Founder & CEO',
      specialty: 'finance',
      company: 'Aesthetics Card',
      profileImage: '/facultyheadshots/JOHN BERGANO.png',
      companyLogo: '/companylogos/aesthetics-card.png',
      expertise: 'Financial Technology & Innovation',
      experience: '10+ years',
      practicesHelped: '650+',
      rating: 4.8,
      servicesOffered: 3
    },

    // Manufacturers (2)
    {
      name: 'Sheldon Larson',
      title: 'VP of Marketing',
      specialty: 'manufacturers',
      company: 'Sinclair North America',
      profileImage: '/facultyheadshots/SHELDON LARSON.png',
      companyLogo: '/companylogos/sinclair-north-america.png',
      expertise: 'Product Marketing & Brand Strategy',
      experience: '15+ years',
      practicesHelped: '1,500+',
      rating: 4.9,
      servicesOffered: 12
    },
    {
      name: 'Jen Sugermeyer',
      title: 'Founder & CEO',
      specialty: 'manufacturers',
      company: 'ATA Cosmetics',
      profileImage: '/facultyheadshots/JEN SUGERMEYER.png',
      companyLogo: '/companylogos/ata-cosmetics.png',
      expertise: 'Product Development & Manufacturing',
      experience: '12+ years',
      practicesHelped: '800+',
      rating: 4.8,
      servicesOffered: 8
    },

    // M&A (6)
    {
      name: 'Thomas Allen',
      title: 'Founder & CEO',
      specialty: 'marketing',
      company: 'The Practice Companies',
      profileImage: '/facultyheadshots/THOMAS ALLEN.png',
      companyLogo: '/companylogos/practice-companies.png',
      expertise: 'Mergers & Acquisitions Strategy',
      experience: '20+ years',
      practicesHelped: '180+',
      rating: 4.9,
      servicesOffered: 5
    },
    {
      name: 'Tyler Weinberg',
      title: 'CEO',
      specialty: 'marketing',
      company: 'AVIVA Aesthetics',
      profileImage: '/facultyheadshots/TYLER WEINBERG.png',
      companyLogo: '/companylogos/aviva-aesthetics.png',
      expertise: 'Multi-Location Operations',
      experience: '14+ years',
      practicesHelped: '120+',
      rating: 4.8,
      servicesOffered: 6
    },
    {
      name: 'Andrew Fatch',
      title: 'Chief Development Officer',
      specialty: 'marketing',
      company: 'AVIVA Aesthetics',
      profileImage: '/facultyheadshots/ANDREW FATCH.png',
      companyLogo: '/companylogos/aviva-aesthetics.png',
      expertise: 'Business Development & Growth',
      experience: '11+ years',
      practicesHelped: '95+',
      rating: 4.7,
      servicesOffered: 4
    },
    {
      name: 'Josh Swearingen',
      title: 'Director of Mergers & Acquisitions',
      specialty: 'marketing',
      company: 'Tusk Practice Sales',
      profileImage: '/facultyheadshots/JOSH SWEARINGEN.png',
      companyLogo: '/companylogos/tusk-practice-sales.png',
      expertise: 'Transaction Management & Valuation',
      experience: '13+ years',
      practicesHelped: '75+',
      rating: 4.8,
      servicesOffered: 3
    },
    {
      name: 'Gary Bufalo',
      title: 'Chief Operations Officer',
      specialty: 'marketing',
      company: 'Princeton Medspa Partners',
      profileImage: '/facultyheadshots/GARY BUFALO.png',
      companyLogo: '/companylogos/princeton-medspa-partners.png',
      expertise: 'Partnership Development & Culture',
      experience: '16+ years',
      practicesHelped: '150+',
      rating: 4.9,
      servicesOffered: 7
    },
    {
      name: 'Chris Hubble',
      title: 'President & CEO',
      specialty: 'marketing',
      company: 'LuxMed Transition Strategies',
      profileImage: '/facultyheadshots/CHRIS HUBBLE.png',
      companyLogo: '/companylogos/luxmed-transition-strategies.png',
      expertise: 'Practice Transition & Exit Planning',
      experience: '18+ years',
      practicesHelped: '220+',
      rating: 4.8,
      servicesOffered: 8
    },

    // Operations (5)
    {
      name: 'Kara McClanahan',
      title: 'CEO',
      specialty: 'operations',
      company: 'Aesthetic Practice Partners',
      profileImage: '/facultyheadshots/KARA MCCLANAHAN.png',
      companyLogo: '/companylogos/aesthetic-practice-partners.png',
      expertise: 'Practice Operations & Management',
      experience: '17+ years',
      practicesHelped: '940+',
      rating: 4.9,
      servicesOffered: 11
    },
    {
      name: 'Kelly Pennington',
      title: 'Founder',
      specialty: 'operations',
      company: 'Key Consulting',
      profileImage: '/facultyheadshots/KELLY PENNINGTON.png',
      companyLogo: '/companylogos/key-consulting.png',
      expertise: 'Operational Excellence & Training',
      experience: '14+ years',
      practicesHelped: '680+',
      rating: 4.8,
      servicesOffered: 9
    },
    {
      name: 'Candace Clay',
      title: 'Founder',
      specialty: 'operations',
      company: 'Candi Aesthetics & Consulting',
      profileImage: '/facultyheadshots/CANDACE CLAY.png',
      companyLogo: '/companylogos/candi-aesthetics-consulting.png',
      expertise: 'Aesthetic Practice Consulting',
      experience: '12+ years',
      practicesHelped: '420+',
      rating: 4.8,
      servicesOffered: 7
    },
    {
      name: 'Barbara Taylor',
      title: 'Founder',
      specialty: 'operations',
      company: 'Barb the Beauty Concierge',
      profileImage: '/facultyheadshots/BARBARA TAYLOR.png',
      companyLogo: '/companylogos/barb-beauty-concierge.png',
      expertise: 'Client Experience & Service Excellence',
      experience: '10+ years',
      practicesHelped: '380+',
      rating: 4.7,
      servicesOffered: 5
    },
    {
      name: 'Dana Hatch',
      title: 'Founder',
      specialty: 'operations',
      company: 'Dana Hatch Coaching & Consulting',
      profileImage: '/facultyheadshots/DANA HATCH.png',
      companyLogo: '/companylogos/dana-hatch-coaching.png',
      expertise: 'Leadership Development & Coaching',
      experience: '13+ years',
      practicesHelped: '560+',
      rating: 4.8,
      servicesOffered: 8
    },

    // Social Media & Marketing (3)
    {
      name: 'Mary Robb',
      title: 'Founder & CEO',
      specialty: 'social',
      company: 'Social Practice',
      profileImage: '/facultyheadshots/MARY ROBB.png',
      companyLogo: '/companylogos/social-practice.png',
      expertise: 'Social Media Strategy & Content',
      experience: '11+ years',
      practicesHelped: '1,200+',
      rating: 4.9,
      servicesOffered: 10
    },
    {
      name: 'Andrew Jones',
      title: 'Founder & CEO',
      specialty: 'social',
      company: 'MAVAN Marketing Agency',
      profileImage: '/facultyheadshots/ANDREW JONES.png',
      companyLogo: '/companylogos/mavan-marketing-agency.png',
      expertise: 'Digital Marketing & Brand Development',
      experience: '9+ years',
      practicesHelped: '780+',
      rating: 4.8,
      servicesOffered: 12
    },
    {
      name: 'Jared Rohrer',
      title: 'CEO',
      specialty: 'social',
      company: 'Aesthetic Conversion',
      profileImage: '/facultyheadshots/JARED ROHRER.png',
      companyLogo: '/companylogos/aesthetic-conversion.png',
      expertise: 'Conversion Optimization & Sales Funnels',
      experience: '8+ years',
      practicesHelped: '620+',
      rating: 4.7,
      servicesOffered: 6
    }
  ];

  const applicationSteps = [
    {
      title: 'Interest Form',
      description: 'Submit your initial application',
      icon: Mail,
      status: 'completed'
    },
    {
      title: 'Application Review',
      description: 'Our team evaluates your credentials',
      icon: Shield,
      status: 'current'
    },
    {
      title: 'Terms Acceptance',
      description: 'Review and accept partnership terms',
      icon: CheckCircle,
      status: 'pending'
    },
    {
      title: 'Credential Provision',
      description: 'Receive all-access credentials',
      icon: Crown,
      status: 'pending'
    },
    {
      title: 'Content Launch',
      description: 'Begin content submission and promotion',
      icon: Zap,
      status: 'pending'
    }
  ];

  const faqItems = [
    {
      question: 'What are the requirements to become a Faculty member?',
      answer: 'Faculty members must have verified business credentials, 5+ years of industry experience, and demonstrated expertise in their specialty area. We also require a proven track record of training or educating others in the aesthetic field.'
    },
    {
      question: 'How does the revenue sharing work for Faculty?',
      answer: 'Faculty members receive a percentage of revenue generated from their content and training sessions. The exact percentage varies based on content type, engagement metrics, and exclusivity agreements. Detailed terms are provided during the application process.'
    },
    {
      question: 'What support do Ambassadors receive?',
      answer: 'Ambassadors get access to promotional tools, personalized referral systems, marketing materials, and ongoing training. We also provide performance analytics and dedicated support to help maximize your success.'
    },
    {
      question: 'Can I apply for both tracks?',
      answer: 'While you can express interest in both tracks, we typically recommend starting with the track that best matches your current professional status and goals. You can always transition between tracks as your involvement grows.'
    },
    {
      question: 'How long does the application process take?',
      answer: 'The typical application process takes 2-3 weeks from initial submission to final approval. This includes credential verification, content review, and onboarding preparation.'
    }
  ];

  const filteredFaculty = selectedFilter === 'all' 
    ? facultyMembers 
    : facultyMembers.filter(member => member.specialty === selectedFilter);

  return (
    <div className="pt-10 md:pt-24 bg-gradient-to-br from-black via-gray-900 to-black min-h-screen">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <motion.div
          ref={ref}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          {/* Applications Badge */}
          <motion.div
            className="flex justify-center mb-6 md:mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div 
              className="inline-flex items-center px-4 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 rounded-full"
              animate={{
                scale: [1, 1.01, 1],
                boxShadow: [
                  '0 0 0px rgba(34, 197, 94, 0.3)',
                  '0 0 20px rgba(34, 197, 94, 0.4)',
                  '0 0 0px rgba(34, 197, 94, 0.3)'
                ]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <motion.div 
                className="w-2 h-2 bg-green-400 rounded-full mr-3"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.span 
                className="text-sm font-normal text-green-400"
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { 
                  opacity: 1, 
                  x: 0,
                  color: ['#4ade80', '#22c55e', '#4ade80']
                } : { opacity: 0, x: -10 }}
                transition={{ 
                  duration: 1.5, 
                  ease: "easeInOut",
                  delay: 0.4,
                  color: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }
                }}
              >
                Now Accepting Applications
              </motion.span>
            </motion.div>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-4xl lg:text-5xl xl:text-7xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Faculty &
            <span className="block bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] bg-clip-text text-transparent">
              Ambassadors
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-base md:text-lg lg:text-lg text-white/70 leading-relaxed mb-8 md:mb-16 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Join our elite network of industry experts and help shape the future of aesthetic sales training. 
            Share your expertise, build your brand, and generate revenue through our platform.
          </motion.p>

          <motion.div
            className="flex flex-col-2 sm:flex-row gap-2 md:gap-4 justify-center pt-0 md:pt-5 px-0 md:px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link to="/application">
              <motion.button
                className="group relative px-10 py-4 md:px-8 md:py-4 bg-gradient-to-r from-[#00d9ff] to-[#00bfff] rounded-xl font-medium text-sm md:text-base overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Apply Now
              </motion.button>
            </Link>
            <motion.button
              className="group px-6 py-2 md:px-8 md:py-4 bg-gray-800/60 backdrop-blur-sm border-2 border-gray-700/50 rounded-xl font-medium text-sm md:text-base hover:bg-white/10 hover:border-[#ffffff]/50 transition-all duration-300 flex items-center justify-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('application-process');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <Play size={20} />
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </section>



      {/* The Hero Academy Section */}
      <section className="py-24 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">The Hero Academy</h2>
            <p className="text-medium md:text-lg text-white/70 max-w-2xl mx-auto">
              Each faculty member brings unique insights into a specific niche, creating a rich well-rounded learning experience.
            </p>
          </motion.div>

          {/* Dashboard Interface */}
          <motion.div
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-3 md:p-6 mb-12 max-w-5xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Central Focal Image */}
              <div className="lg:col-span-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#00d9ff]/20 to-[#ff41fd]/20 blur-2xl rounded-full"></div>
                  <div className="relative z-10 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-3 md:p-8 border border-white/10 text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-[#00d9ff]/30 to-[#ff41fd]/30 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
                      <Award className="text-[#00d9ff]" size={40} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 md:mb-4">Expert Network</h3>
                    <p className="text-white/70 text-xs md:text-sm">40+ Industry Leaders</p>
                  </div>
                </div>
              </div>

              {/* Faculty Grid */}
              <div className="lg:col-span-4">
                {/* Specialty Filters */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {specialties.map((specialty) => (
                    <button
                      key={specialty.id}
                      onClick={() => setSelectedFilter(specialty.id)}
                      className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                        selectedFilter === specialty.id
                          ? 'bg-[#00d9ff] text-black'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      {specialty.name} ({specialty.count})
                    </button>
                  ))}
                </div>

                {/* Faculty Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence mode="wait">
                    {filteredFaculty.map((member, index) => (
                      <motion.div
                        key={member.name}
                        className="group bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        layout
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-600">
                            <img
                              src={member.profileImage}
                              alt={member.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-[#00d9ff] to-[#ff41fd] flex items-center justify-center text-white font-bold">' + member.name.split(' ').map(n => n[0]).join('') + '</div>';
                                }
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm group-hover:text-[#00d9ff] transition-colors truncate">
                              {member.name}
                            </h4>
                            <p className="text-xs text-white/60 mb-1">{member.title}</p>
                            <p className="text-xs text-white/90 mb-3">{member.company}</p>
                          </div>
                        </div>
                        
                        <div className="text-xs text-white/70 mb-3">{member.expertise}</div>
                        
                        {/* Faculty Showcase Features */}
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div className="bg-white/5 rounded-lg p-2">
                            <div className="text-xs text-white/50">Experience</div>
                            <div className="text-xs font-semibold text-[#00d9ff]">{member.experience}</div>
                          </div>
                          <div className="bg-white/5 rounded-lg p-2">
                            <div className="text-xs text-white/50">Practices Helped</div>
                            <div className="text-xs font-semibold text-[#ff41fd]">{member.practicesHelped}</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mb-0">
                          <div className="bg-white/5 rounded-lg p-2">
                            <div className="text-xs text-white/50">Rating</div>
                            <div className="text-xs font-semibold text-yellow-400 flex items-center gap-1">
                              <Star size={10} fill="currentColor" />
                              {member.rating}
                            </div>
                          </div>
                          <div className="bg-white/5 rounded-lg p-2">
                            <div className="text-xs text-white/50">Services Offered</div>
                            <div className="text-xs font-semibold text-green-400">{member.servicesOffered}</div>
                          </div>
                        </div>


                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Process Section */}
      <section id="application-process" className="py-6 md:py-24 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-10 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Application Process</h2>
            <p className="text-medium md:text-xl text-white/70 max-w-2xl mx-auto">
              Join our network in 5 simple steps. The entire process typically takes 2-3 weeks from application to launch.
            </p>
          </motion.div>

          {/* Timeline Visualization */}
          <div className="relative max-w-2xl md:max-w-3xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#00d9ff] to-[#ff41fd] rounded-full"></div>
            
            <div className="space-y-4 md:space-y-10">
              {applicationSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-3 md:p-5 hover:bg-white/10 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-1 md:mb-3">
                        <div className="w-12 h-12 md:w-10 md:h-10 bg-gradient-to-r from-[#00d9ff]/20 to-[#ff41fd]/20 rounded-full flex items-center justify-center">
                          <step.icon className="text-[#ff41fd]" size={20} />
                        </div>
                        <h3 className="text-base md:text-lg font-bold">{step.title}</h3>
                      </div>
                      <p className="text-xs md:text-base text-white/70">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full border-4 border-black bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] z-10">
                    <div className="w-full h-full rounded-full scale-50" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dual Application Paths */}
      <section className="py-10 md:py-24 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Choose Your Path</h2>
            <p className="text-medium md:text-xl text-white/70 max-w-3xl mx-auto">
              Select the track that best matches your professional status and goals.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Faculty Track */}
            <motion.div
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Crown className="text-[#00d9ff]" size={32} />
                <h3 className="text-2xl font-bold">Faculty Track</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2 text-[#00d9ff]">Target Audience</h4>
                  <p className="text-white/70">Enterprise practices, manufacturers, MSOs/GPOs and industry experts</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-[#00d9ff]">Requirements</h4>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-400" />
                      Verified business credentials
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-400" />
                      5+ years industry experience
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-400" />
                      Proven training/education background
                    </li>
                  </ul>
                </div>

                <div className="mt-6">
                  <Link to="/application">
                    <button className="w-full px-6 py-3 bg-[#00d9ff] rounded-xl font-semibold text-m shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2">
                      Apply for Faculty Track
                      <ArrowRight size={20} />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Ambassador Track */}
            <motion.div
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Star className="text-[#ff41fd]" size={32} />
                <h3 className="text-2xl font-bold">Ambassador Track</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2 text-[#ff41fd]">Target Audience</h4>
                  <p className="text-white/70">Individual practitioners, professionals, and industry influencers</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-[#ff41fd]">Requirements</h4>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-400" />
                      Active industry presence
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-400" />
                      Professional credentials
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-400" />
                      Commitment to promotion
                    </li>
                  </ul>
                </div>

                <div className="mt-6">
                  <Link to="/application">
                    <button className="w-full px-6 py-3 bg-[#ff41fd] rounded-xl font-semibold text-xs md:text-base shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-1 md:gap-2">
                      Apply for Ambassador Track
                      <ArrowRight size={20} />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 relative">
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-white/70">
              Get answers to common questions about our Faculty & Ambassador programs.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between hover:text-[#00d9ff] transition-colors duration-300"
                >
                  <h3 className="text-lg font-bold pr-8">{item.question}</h3>
                  <div className="flex-shrink-0">
                    {expandedFAQ === index ? (
                      <ChevronUp className="text-[#00d9ff]" size={24} />
                    ) : (
                      <ChevronDown className="text-white/70" size={24} />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {expandedFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6">
                        <p className="text-white/80 leading-relaxed">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-4 md:py-24 relative">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 mt-2 md:mt-0">Ready to Join Our Network?</h2>
            <p className="text-medium md:text-xl text-white/70 mb-8 leading-relaxed">
              Take the next step in your career and become part of the most influential network 
              in aesthetic sales training. Applications are reviewed on a rolling basis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/application">
                <button className="px-8 py-4 bg-gradient-to-r from-[#00d9ff] to-[#ff41fd] rounded-xl font-semibold text-medium md:text-base shadow-lg hover:scale-105 transition-transform">
                  Start Application
                </button>
              </Link>
              <button 
                className="px-8 py-4 border-2 border-white/20 rounded-xl font-semibold text-medium md:text-base hover:bg-white/10 transition-all duration-300"
                onClick={() => window.location.href = 'mailto:contact@aestheticsaleshero.com?subject=Schedule Consultation - Faculty Program'}
              >
                Schedule Consultation
              </button>
            </div>
            
            <p className="text-sm text-white/60 mt-6">
              Questions? Contact our team at contact@aestheticsaleshero.com
            </p>
          </motion.div>
        </div>
      </section>
      <FloatingPriceGuide />
    </div>
  );
};

export default Faculty;