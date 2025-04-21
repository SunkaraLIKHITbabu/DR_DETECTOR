function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">D R Detector</h3>
            <p className="text-gray-300">Early Detection, Better Vision</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/analysis" className="text-gray-300 hover:text-white">Image Analysis</a></li>
              <li><a href="/risk-assessment" className="text-gray-300 hover:text-white">Risk Assessment</a></li>
              <li><a href="/symptoms" className="text-gray-300 hover:text-white">Symptom Checker</a></li>
              <li><a href="/food-recommendations" className="text-gray-300 hover:text-white">Health Guide</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="/blog" className="text-gray-300 hover:text-white">Suggestions</a></li>
              <li><a href="/stories" className="text-gray-300 hover:text-white">Patient Stories</a></li>
              <li><a href="/team" className="text-gray-300 hover:text-white">Our Team</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-300">support@drdetector.com</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300">&copy; {new Date().getFullYear()} D R Detector. All rights reserved.</p>
          <p className="text-gray-300 mt-2 italic">EYES ON THE FUTURE: EMPOWERING DIABETIC CARE FOR A BRIGHTER TOMORROW</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
