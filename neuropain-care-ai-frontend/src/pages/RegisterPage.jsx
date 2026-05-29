import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await registerUser(name, email, password);
      if (res.status === 'success') {
        navigate('/options');
      } else {
        setError(res.message || 'Registration failed.');
      }
    } catch (err) {
      setError('Connection to server failed. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={styles.card}
      >
        <h2 style={styles.title}>Join NeuroPain</h2>
        <p style={styles.subtitle}>Start your personalized care journey</p>

        {error && <div style={styles.errorText}>{error}</div>}
        
        <form onSubmit={handleRegister} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              style={styles.input} 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              style={styles.input} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              style={styles.input} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button 
            type="submit" 
            style={styles.button}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account? <Link to="/login" style={styles.link}>Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    background: '#0f172a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem'
  },
  card: {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '3rem',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    width: '100%',
    maxWidth: '450px',
    textAlign: 'center'
  },
  title: {
    fontSize: '2rem',
    color: '#f8fafc',
    marginBottom: '0.5rem'
  },
  subtitle: {
    color: '#94a3b8',
    marginBottom: '2rem'
  },
  errorText: {
    color: '#ef4444',
    background: 'rgba(239, 68, 68, 0.1)',
    padding: '0.8rem',
    borderRadius: '12px',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    textAlign: 'center'
  },
  label: {
    color: '#94a3b8',
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    textAlign: 'left'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  input: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    padding: '0.8rem 1rem',
    color: '#f8fafc',
    outline: 'none'
  },
  button: {
    background: '#38bdf8',
    color: '#0f172a',
    border: 'none',
    borderRadius: '10px',
    padding: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '1rem'
  },
  footerText: {
    marginTop: '2rem',
    color: '#94a3b8'
  },
  link: {
    color: '#38bdf8',
    textDecoration: 'none'
  }
};

export default RegisterPage;
