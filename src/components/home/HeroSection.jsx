import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SignInPrompt from '../auth/SignInPrompt';
import { useState } from 'react';
import drScanGif from '../../assets/dr_scan.gif';

function HeroSection() {
  const { user } = useAuth();
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);

  const handleAnalysisClick = (e) => {
    if (!user) {
      e.preventDefault();
      setShowSignInPrompt(true);
    }
  };

  return (
    <div className="relative">
      <div className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          src={drScanGif}
          alt="DR Scan Animation"
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-4 text-center"
          >
            Early Detection, Better Vision
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-center mb-8 max-w-2xl"
          >
            Smart Technology for Diabetic Retinopathy Diagnosis and Eye Health
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to={user ? "/analysis" : "#"}
              onClick={handleAnalysisClick}
              className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors inline-block"
            >
              Start Analysis
            </Link>
          </motion.div>
        </div>
      </div>

      <SignInPrompt 
        isOpen={showSignInPrompt} 
        onClose={() => setShowSignInPrompt(false)} 
      />
    </div>
  );
}

export default HeroSection;