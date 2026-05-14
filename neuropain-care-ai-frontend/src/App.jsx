import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import DashboardPage from './pages/DashboardPage';
import PainAssessmentPage from './pages/PainAssessmentPage';
import ChatBotPage from './pages/ChatBotPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import OptionsPage from './pages/OptionsPage';
import BodyMappingPage from './pages/BodyMappingPage';
import SuggestionPage from './pages/SuggestionPage';
import EmergencyPage from './pages/EmergencyPage';
import ProfilePage from './pages/ProfilePage';
import TrackerPage from './pages/TrackerPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/options" element={<OptionsPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/assessment" element={<PainAssessmentPage />} />
            <Route path="/chatbot" element={<ChatBotPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/body-mapping" element={<BodyMappingPage />} />
            <Route path="/suggestion" element={<SuggestionPage />} />
            <Route path="/emergency" element={<EmergencyPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/trackers" element={<TrackerPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
