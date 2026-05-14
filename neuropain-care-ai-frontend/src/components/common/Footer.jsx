import logoImg from '../../assets/images/Neuro Paincare AI Logo with Shield Design.png';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.content}>
        <div style={styles.brand}>
          <div style={styles.logoWrapper}>
            <img src={logoImg} alt="Logo" style={styles.footerLogo} />
            <h2 style={styles.logoText}>NeuroPain Care AI</h2>
          </div>
          <p style={styles.tagline}>Empowering chronic pain management through medical AI.</p>
        </div>
        <div style={styles.links}>
          <div style={styles.linkColumn}>
            <h4>Platform</h4>
            <span>Dashboard</span>
            <span>Assessment</span>
            <span>AI Chat</span>
          </div>
          <div style={styles.linkColumn}>
            <h4>Support</h4>
            <span>Emergency</span>
            <span>Help Center</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
      <div style={styles.bottom}>
        <p>&copy; 2026 NeuroPain Care AI. All rights reserved. Medical Disclaimer: This AI is for assessment support and not a substitute for professional medical advice.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: '#020617',
    color: '#94a3b8',
    padding: '4rem 2rem 2rem 2rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)'
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '3rem'
  },
  brand: {
    maxWidth: '300px'
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    marginBottom: '1rem'
  },
  footerLogo: {
    height: '32px',
    width: 'auto',
    borderRadius: '6px'
  },
  logoText: {
    color: '#38bdf8',
    fontSize: '1.4rem',
    margin: 0
  },
  tagline: {
    fontSize: '0.9rem',
    lineHeight: '1.6'
  },
  links: {
    display: 'flex',
    gap: '4rem',
    flexWrap: 'wrap'
  },
  linkColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem'
  },
  bottom: {
    maxWidth: '1200px',
    margin: '4rem auto 0 auto',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    textAlign: 'center',
    fontSize: '0.8rem'
  }
};

export default Footer;
