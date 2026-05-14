import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div style={styles.container}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={styles.card}
      >
        <h2 style={styles.title}>Join NeuroPain</h2>
        <p style={styles.subtitle}>Start your personalized care journey</p>
        
        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label>Email Address</label>
            <input type="email" placeholder="name@example.com" style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label>Password</label>
            <input type="password" placeholder="••••••••" style={styles.input} />
          </div>
          <button style={styles.button}>Create Account</button>
        </div>

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
