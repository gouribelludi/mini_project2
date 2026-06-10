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
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* Protected Routes */}
              <Route path="/options" element={
                <ProtectedRoute><OptionsPage /></ProtectedRoute>
              } />
              <Route path="/home" element={
                <ProtectedRoute><Home /></ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute><DashboardPage /></ProtectedRoute>
              } />
              <Route path="/assessment" element={
                <ProtectedRoute><PainAssessmentPage /></ProtectedRoute>
              } />
              <Route path="/chatbot" element={
                <ProtectedRoute><ChatBotPage /></ProtectedRoute>
              } />
              <Route path="/body-mapping" element={
                <ProtectedRoute><BodyMappingPage /></ProtectedRoute>
              } />
              <Route path="/suggestion" element={
                <ProtectedRoute><SuggestionPage /></ProtectedRoute>
              } />
              <Route path="/emergency" element={
                <ProtectedRoute><EmergencyPage /></ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute><ProfilePage /></ProtectedRoute>
              } />
              <Route path="/trackers" element={
                <ProtectedRoute><TrackerPage /></ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

