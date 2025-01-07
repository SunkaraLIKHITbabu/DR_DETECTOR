import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import SignUpForm from '../../components/auth/SignUpForm';
import SuccessMessage from '../../components/auth/SuccessMessage';
import logo from '../../assets/logo.jpg';

function SignUp() {
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    // Store user data in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/signin');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-blue-400 to-blue-300 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden relative">
        {/* Left Side - Logo */}
        <div className="hidden md:flex flex-col items-center justify-center bg-green-700 text-white p-12">
          <div className="w-72 h-72 rounded-full border-8 border-white/30 p-4 mb-8">
            <img
              src={logo}
              alt="DR Detector Logo"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <h2 className="text-3xl font-bold text-center mb-4">D R Detector</h2>
          <p className="text-center mb-8">Already have an account? Sign In Here</p>
          <Link
            to="/signin"
            className="px-8 py-2 border-2 border-white rounded-lg hover:bg-white hover:text-green-700 transition-colors"
          >
            Sign In
          </Link>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:p-12 bg-white relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <h1 className="text-3xl font-bold text-center mb-4">Sign Up</h1>
            <p className="text-center text-gray-600 mb-8">Join D R Detector to access all features</p>
            
            <SignUpForm onSubmit={handleSubmit} />
          </motion.div>
        </div>

        <AnimatePresence>
          {showSuccess && (
            <SuccessMessage message="You have successfully signed up" />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SignUp;