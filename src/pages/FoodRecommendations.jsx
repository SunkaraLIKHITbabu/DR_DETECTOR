import { motion } from 'framer-motion';
import VitaminsMinerals from '../components/food/VitaminsMinerals';
import MealPlans from '../components/food/MealPlans';
import NutritionalFacts from '../components/food/NutritionalFacts';
import DietaryTips from '../components/food/DietaryTips';
import SuperfoodsList from '../components/food/SuperfoodsList';
import ExerciseTips from '../components/food/ExerciseTips';
import SleepManagement from '../components/food/SleepManagement';
import StressManagement from '../components/food/StressManagement';

function FoodRecommendations() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-green-700 mb-8"
      >
        Comprehensive Health Guide for Eye Care
      </motion.h1>

      <div className="space-y-12">
        {/* Nutrition Sections */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl">
          <h2 className="text-3xl font-semibold text-center mb-8">Nutrition & Diet</h2>
          <VitaminsMinerals />
          <SuperfoodsList />
          <NutritionalFacts />
          <DietaryTips />
          <MealPlans />
        </div>

        {/* Exercise Section */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-xl">
          <h2 className="text-3xl font-semibold text-center mb-8">Exercise & Physical Activity</h2>
          <ExerciseTips />
        </div>

        {/* Sleep Management Section */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-xl">
          <h2 className="text-3xl font-semibold text-center mb-8">Sleep Management</h2>
          <SleepManagement />
        </div>

        {/* Stress Management Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl">
          <h2 className="text-3xl font-semibold text-center mb-8">Stress Management</h2>
          <StressManagement />
        </div>
      </div>
    </div>
  );
}

export default FoodRecommendations;