import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home';
import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';
import ImageAnalysis from '../pages/ImageAnalysis';
import RiskAssessment from '../pages/RiskAssessment';
import SymptomChecker from '../pages/SymptomChecker';
import FoodRecommendations from '../pages/FoodRecommendations';
import PatientStories from '../pages/PatientStories';
import Blog from '../pages/Blog';
import Community from '../pages/Community';
import Team from '../pages/Team';
import { Toaster } from 'react-hot-toast';

function AppRoutes() {
  return (
    <>
    <Toaster position='top-center'/>
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/analysis" element={
        // <ProtectedRoute>
          <ImageAnalysis />
        //  </ProtectedRoute>
      } />
      <Route path="/risk-assessment" element={
        <ProtectedRoute>
          <RiskAssessment />
        </ProtectedRoute>
      } />
      <Route path="/symptoms" element={
        <ProtectedRoute>
          <SymptomChecker />
        </ProtectedRoute>
      } />
      <Route path="/food-recommendations" element={
        <ProtectedRoute>
          <FoodRecommendations />
        </ProtectedRoute>
      } />
      <Route path="/stories" element={
        <ProtectedRoute>
          <PatientStories />
        </ProtectedRoute>
      } />
      <Route path="/blog" element={
        <ProtectedRoute>
          <Blog />
        </ProtectedRoute>
      } />
      <Route path="/community" element={
        <ProtectedRoute>
          <Community />
        </ProtectedRoute>
      } />
      <Route path="/team" element={
        <ProtectedRoute>
          <Team />
        </ProtectedRoute>
      } />
    </Routes>
    </>
  );
}

export default AppRoutes;