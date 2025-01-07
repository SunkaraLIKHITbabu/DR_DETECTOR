import { motion } from 'framer-motion';

function FeatureSection() {
  const features = [
    {
      title: "Image Analysis",
      description: "Upload retinal images for instant analysis",
      delay: 0.2
    },
    {
      title: "Risk Assessment",
      description: "Get personalized risk assessment and recommendations",
      delay: 0.4
    },
    {
      title: "Expert Support",
      description: "Connect with healthcare professionals and community",
      delay: 0.6
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: feature.delay }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default FeatureSection;