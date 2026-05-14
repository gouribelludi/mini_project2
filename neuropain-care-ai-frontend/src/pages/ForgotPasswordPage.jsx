import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  return (
    <div style={styles.container}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={styles.card}
      >
        <h2 style={styles.title}>Reset Password</h2>
        <p style={styles.subtitle}>Enter your email to receive a reset link</p>
        
        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input type="email" placeholder="name@example.com" style={styles.input} />
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={styles.button}
          >
            Send Reset Link
          </motion.button>
        </div>

        <p style={styles.footerText}>
          Remember your password? <Link to="/login" style={styles.link}>Sign in</Link>
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
    borderRadius: '24px',
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
  label: {
    color: '#94a3b8',
    fontSize: '0.875rem'
  },
  input: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '0.8rem 1rem',
    color: '#f8fafc',
    outline: 'none'
  },
  button: {
    background: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
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

export default ForgotPasswordPage;
