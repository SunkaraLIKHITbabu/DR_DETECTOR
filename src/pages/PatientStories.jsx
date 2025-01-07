import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFilter } from 'react-icons/fa';
import StoryCard from '../components/stories/StoryCard';
import { patientStories } from '../data/patientStoriesData';

function PatientStories() {
  const [expandedStory, setExpandedStory] = useState(null);
  const [ageFilter, setAgeFilter] = useState('all');

  const filteredStories = patientStories.filter(story => {
    if (ageFilter === 'all') return true;
    if (ageFilter === 'under40') return story.age < 40;
    if (ageFilter === '40to60') return story.age >= 40 && story.age <= 60;
    if (ageFilter === 'over60') return story.age > 60;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center text-green-700 mb-8"
      >
        Patient Stories
      </motion.h1>

      <div className="mb-8">
        {/* Age Filter */}
        <div className="flex items-center gap-4">
          <FaFilter className="text-gray-400" />
          <select
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Ages</option>
            <option value="under40">Under 40</option>
            <option value="40to60">40-60</option>
            <option value="over60">Over 60</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {filteredStories.map((story) => (
          <StoryCard
            key={story.id}
            story={story}
            isExpanded={expandedStory === story.id}
            onToggle={() => setExpandedStory(expandedStory === story.id ? null : story.id)}
          />
        ))}
        
        {filteredStories.length === 0 && (
          <p className="text-center text-gray-500">No stories found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}

export default PatientStories;