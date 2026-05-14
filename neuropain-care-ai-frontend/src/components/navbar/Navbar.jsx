import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoImg from '../../assets/images/Neuro Paincare AI Logo with Shield Design.png';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        style={styles.logoContainer}
      >
        <Link to="/" style={styles.logoLink}>
          <img src={logoImg} alt="NeuroPain Care AI Logo" style={styles.logoImage} />
          <span style={styles.logoText}>NeuroPain Care AI</span>
        </Link>
      </motion.div>
      <ul style={styles.navLinks}>
        <motion.li whileHover={{ scale: 1.1 }}><Link to="/" style={styles.link}>Home</Link></motion.li>
        <motion.li whileHover={{ scale: 1.1 }}><Link to="/dashboard" style={styles.link}>Dashboard</Link></motion.li>
        <motion.li whileHover={{ scale: 1.1 }}><Link to="/assessment" style={styles.link}>Assessment</Link></motion.li>
        <motion.li whileHover={{ scale: 1.1 }}><Link to="/chatbot" style={styles.link}>AI Chat</Link></motion.li>
        <motion.li whileHover={{ scale: 1.1 }}><Link to="/trackers" style={styles.link}>Trackers</Link></motion.li>
        <motion.li whileHover={{ scale: 1.1 }}><Link to="/profile" style={styles.link}>Profile</Link></motion.li>
        <motion.li whileHover={{ scale: 1.1 }}><Link to="/login" style={styles.link}>Login</Link></motion.li>
        <motion.li whileHover={{ scale: 1.1 }}>
          <Link to="/emergency" style={{ ...styles.link, color: '#f87171', fontWeight: 'bold' }}>Emergency</Link>
        </motion.li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.8rem 2rem',
    background: 'rgba(15, 23, 42, 0.9)',
    backdropFilter: 'blur(10px)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    textDecoration: 'none',
  },
  logoImage: {
    height: '40px',
    width: 'auto',
    borderRadius: '8px'
  },
  logoText: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#38bdf8',
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    gap: '1.5rem',
    margin: 0,
    padding: 0,
    alignItems: 'center'
  },
  link: {
    color: '#f8fafc',
    textDecoration: 'none',
    fontSize: '0.95rem',
    transition: 'color 0.3s'
  }
};

export default Navbar;
