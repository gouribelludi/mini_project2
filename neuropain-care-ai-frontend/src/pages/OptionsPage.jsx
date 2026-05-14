import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const OptionsPage = () => {
  const navigate = useNavigate();

  const options = [
    {
      id: 'text',
      title: 'Text Assessment',
      description: 'Describe your symptoms in detail for an AI-powered analysis.',
      icon: '📝',
      path: '/assessment'
    },
    {
      id: 'body',
      title: 'Body Mapping',
      description: 'Pinpoint your pain areas on an interactive 3D body model.',
      icon: '🧍',
      path: '/body-mapping'
    }
  ];

  return (
    <div style={styles.container}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.header}
      >
        <h1 style={styles.title}>Choose Your <span style={styles.highlight}>Assessment Method</span></h1>
        <p style={styles.subtitle}>Select how you would like to report your symptoms today.</p>
      </motion.div>

      <div style={styles.grid}>
        {options.map((option, index) => (
          <motion.div 
            key={option.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, translateY: -10 }}
            onClick={() => navigate(option.path)}
            style={styles.card}
          >
            <div style={styles.icon}>{option.icon}</div>
            <h2 style={styles.cardTitle}>{option.title}</h2>
            <p style={styles.cardDesc}>{option.description}</p>
            <button style={styles.button}>Get Started</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: '#0f172a',
    color: '#f8fafc',
    padding: '4rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  header: {
    textAlign: 'center',
    marginBottom: '4rem'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '800'
  },
  highlight: {
    color: '#38bdf8'
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: '1.1rem',
    marginTop: '1rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2.5rem',
    maxWidth: '900px',
    width: '100%'
  },
  card: {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '3rem 2rem',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  icon: {
    fontSize: '4rem',
    marginBottom: '1.5rem'
  },
  cardTitle: {
    fontSize: '1.75rem',
    marginBottom: '1rem',
    color: '#f8fafc'
  },
  cardDesc: {
    color: '#94a3b8',
    lineHeight: '1.6',
    marginBottom: '2rem'
  },
  button: {
    background: 'transparent',
    color: '#38bdf8',
    border: '2px solid #38bdf8',
    padding: '0.8rem 2rem',
    borderRadius: '30px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
      background: '#38bdf8',
      color: '#0f172a'
    }
  }
};

export default OptionsPage;
