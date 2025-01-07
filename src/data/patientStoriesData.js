import { getRandomIndianFace } from '../utils/imageUtils';

// Helper function to format dates consistently
const formatDate = (date) => date.toISOString().split('T')[0];

export const patientStories = [
  // Under 40 Stories (10)
  {
    id: 1,
    name: "Rahul Sharma",
    age: 28,
    image: getRandomIndianFace('male'),
    preview: "Early detection saved my vision...",
    fullStory: "As a young software developer, I never thought I'd face vision problems. Regular screening during my annual health check-up revealed early signs of diabetic retinopathy. Thanks to timely intervention and lifestyle changes, I've maintained my vision and continue my work without interruption.",
    date: formatDate(new Date('2024-02-15')),
    location: "Bangalore, Karnataka"
  },
  {
    id: 2,
    name: "Priya Patel",
    age: 35,
    image: getRandomIndianFace('female'),
    preview: "Managing diabetes and vision together...",
    fullStory: "Being diagnosed with diabetes at 30 was challenging enough, but when I started experiencing vision problems, it was overwhelming. Through proper medication, diet control, and regular exercise, I've successfully managed both conditions. My story shows that early intervention makes all the difference.",
    date: formatDate(new Date('2024-02-10')),
    location: "Ahmedabad, Gujarat"
  },
  // Add 8 more stories for under 40...

  // Age 40-60 Stories (10)
  {
    id: 11,
    name: "Suresh Kumar",
    age: 45,
    image: getRandomIndianFace('male'),
    preview: "A journey of transformation...",
    fullStory: "My wake-up call came when I started having trouble reading. As a business owner, clear vision is crucial. The diagnosis led to a complete lifestyle overhaul - better diet, regular exercise, and stress management. Today, I'm healthier than ever and my vision is stable.",
    date: formatDate(new Date('2024-02-05')),
    location: "Chennai, Tamil Nadu"
  },
  {
    id: 12,
    name: "Anjali Desai",
    age: 52,
    image: getRandomIndianFace('female'),
    preview: "Finding strength in community support...",
    fullStory: "The support groups and community programs helped me understand I wasn't alone. Sharing experiences and tips with others facing similar challenges made the journey easier. Regular check-ups and lifestyle modifications have helped me maintain my independence.",
    date: formatDate(new Date('2024-02-01')),
    location: "Mumbai, Maharashtra"
  },
  // Add 8 more stories for 40-60...

  // Above 60 Stories (10)
  {
    id: 21,
    name: "Rajendra Singh",
    age: 65,
    image: getRandomIndianFace('male'),
    preview: "Never too late for better health...",
    fullStory: "At my age, I thought vision problems were inevitable. But when I learned about diabetic retinopathy, I realized I could take control. With proper medical care and lifestyle changes, I've maintained my independence and continue to enjoy reading and spending time with my grandchildren.",
    date: formatDate(new Date('2024-01-25')),
    location: "Jaipur, Rajasthan"
  },
  {
    id: 22,
    name: "Lakshmi Rao",
    age: 68,
    image: getRandomIndianFace('female'),
    preview: "Age is just a number...",
    fullStory: "I discovered I had diabetic retinopathy during a routine check-up. Instead of letting it limit me, I embraced the challenge. Regular exercise, a balanced diet, and staying active in my community have helped me manage my condition effectively.",
    date: formatDate(new Date('2024-01-20')),
    location: "Hyderabad, Telangana"
  },
  // Add 8 more stories for above 60...

  // Continue adding more stories to reach total of 30...
];