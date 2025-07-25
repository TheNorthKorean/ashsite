import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Coaching from './pages/Coaching';
import Blog from './pages/Blog';
import Faculty from './pages/Faculty';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import CaseStudies from './pages/CaseStudies';
import BlogPost from './pages/BlogPost';
import Application from './pages/Application';
import GetStarted from './pages/GetStarted';
import Enterprise from './pages/Enterprise';
import CoachingDemo from './pages/CoachingDemo';
import ProgressUpdate from './pages/ProgressUpdate';
// Wrapper component to handle conditional rendering
function AppContent() {
  const location = useLocation();
  
  // Check if we're in assessment or results view
  const isAssessmentView = location.pathname === '/coaching-demo' && 
    (location.search.includes('view=assessment') || location.search.includes('view=results'));
  
  return (
    <motion.div 
      className="min-h-screen bg-black text-white overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {!isAssessmentView && <Navigation />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/coaching" element={<Coaching />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/application" element={<Application />} />
          <Route path="/getstarted" element={<GetStarted />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/coaching-demo" element={<CoachingDemo />} />
          <Route path="/progress-update" element={<ProgressUpdate />} />
        </Routes>
      </main>
      {!isAssessmentView && <Footer />}
    </motion.div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time - increased by 1 second
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // 4.5 seconds to show the full animation

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;