import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';
import ChatBot from './components/ChatBot';
import VoiceAssistant from './components/VoiceAssistant';
import toast,{Toaster} from 'react-hot-toast';



function App() {
  return (
    
    <AuthProvider>
      {/* <Toaster position='top-center'/> */}
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8 mt-16">
            <AppRoutes />
          </main>
          <div className="fixed bottom-4 right-4 flex flex-col gap-4">
            <ChatBot />
            <VoiceAssistant />
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;