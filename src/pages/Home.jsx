import HeroSection from '../components/home/HeroSection';
import FeatureSection from '../components/home/FeatureSection';
import TopicsSection from '../components/home/TopicsSection';
import ClosingSection from '../components/home/ClosingSection';

function Home() {
  return (
    <div>
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <FeatureSection />
        <div className="mt-16">
          <TopicsSection />
        </div>
        <div className="mt-16">
          <ClosingSection />
        </div>
      </div>
    </div>
  );
}

export default Home;