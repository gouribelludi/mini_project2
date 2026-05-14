import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import illustration from '../assets/images/login-illustration.png';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login and navigate to options
    navigate('/options');
  };

  return (
    <div style={styles.container}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.card}
      >
        <div style={styles.illustrationContainer}>
          <img src={illustration} alt="Medical Illustration" style={styles.image} />
        </div>

        <h1 style={styles.title}>NEUROPAIN CARE AI</h1>
        
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input type="email" placeholder="Enter your email" style={styles.input} required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input type="password" placeholder="Enter your password" style={styles.input} required />
          </div>
          
          <div style={styles.forgotContainer}>
            <Link to="/forgot-password" style={styles.forgotLink}>Forgot Password?</Link>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            style={styles.loginButton}
          >
            LOGIN
          </motion.button>
        </form>

        <p style={styles.registerText}>
          New here? <Link to="/register" style={styles.registerLink}>Register Here</Link>
        </p>
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: '#0f172a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem'
  },
  card: {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '2.5rem',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
  },
  illustrationContainer: {
    width: '100%',
    height: '180px',
    marginBottom: '1.5rem',
    borderRadius: '16px',
    overflow: 'hidden',
    background: 'rgba(0, 0, 0, 0.2)'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#f8fafc',
    letterSpacing: '0.1em',
    marginBottom: '2rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
    textAlign: 'left'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    color: '#94a3b8',
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  input: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '0.8rem 1rem',
    color: '#f8fafc',
    outline: 'none',
    width: '100%'
  },
  forgotContainer: {
    textAlign: 'right'
  },
  forgotLink: {
    color: '#38bdf8',
    textDecoration: 'none',
    fontSize: '0.875rem'
  },
  loginButton: {
    background: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '0.5rem',
    fontSize: '1rem',
    letterSpacing: '0.05em',
    width: '100%'
  },
  registerText: {
    marginTop: '2rem',
    color: '#94a3b8',
    fontSize: '0.875rem'
  },
  registerLink: {
    color: '#38bdf8',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};

export default LoginPage;
