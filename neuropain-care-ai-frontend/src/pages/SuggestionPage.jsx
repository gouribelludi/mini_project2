import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SuggestionPage = () => {
  const navigate = useNavigate();

  const recommendations = [
    {
      title: 'Immediate Relief',
      tips: [
        'Apply a warm compress to the affected area.',
        'Perform gentle nerve gliding exercises.',
        'Maintain a comfortable posture to reduce nerve pressure.'
      ],
      color: '#38bdf8'
    },
    {
      title: 'Lifestyle Adjustments',
      tips: [
        'Ensure 8 hours of quality sleep for nerve recovery.',
        'Stay hydrated (aim for 2.5L today).',
        'Incorporate anti-inflammatory foods like turmeric and ginger.'
      ],
      color: '#818cf8'
    }
  ];

  return (
    <div style={styles.container}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={styles.header}
      >
        <div style={styles.warningAlert}>
          <span>⚠️</span>
          <p>Note: These suggestions are AI-generated for informational purposes. Consult a doctor for medical diagnosis.</p>
        </div>
        <h1 style={styles.title}>AI-Generated <span style={styles.highlight}>Care Plan</span></h1>
        <p style={styles.subtitle}>Based on your recent assessment, here are some personalized suggestions.</p>
      </motion.div>

      <div style={styles.grid}>
        {recommendations.map((rec, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            style={styles.card}
          >
            <h2 style={{ ...styles.cardTitle, color: rec.color }}>{rec.title}</h2>
            <ul style={styles.list}>
              {rec.tips.map((tip, i) => (
                <li key={i} style={styles.listItem}>{tip}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={styles.actionArea}
      >
        <h3>Ready to track your progress?</h3>
        <div style={styles.btnGroup}>
          <button style={styles.primaryBtn} onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
          <button style={styles.secondaryBtn} onClick={() => navigate('/chatbot')}>Chat with AI Assistant</button>
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 70px)',
    background: '#0f172a',
    color: '#f8fafc',
    padding: '4rem 2rem'
  },
  header: {
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto 4rem'
  },
  warningAlert: {
    background: 'rgba(245, 158, 11, 0.1)',
    border: '1px solid #f59e0b',
    color: '#fbbf24',
    padding: '1rem',
    borderRadius: '12px',
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    marginBottom: '2rem',
    fontSize: '0.9rem',
    textAlign: 'left'
  },
  title: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  highlight: {
    color: '#38bdf8'
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#94a3b8'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  card: {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '2.5rem',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },
  cardTitle: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem'
  },
  list: {
    listStyle: 'none',
    padding: 0
  },
  listItem: {
    padding: '0.8rem 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    color: '#cbd5e1',
    lineHeight: '1.6'
  },
  actionArea: {
    marginTop: '6rem',
    textAlign: 'center'
  },
  btnGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginTop: '2rem'
  },
  primaryBtn: {
    padding: '1rem 2rem',
    background: '#38bdf8',
    color: '#0f172a',
    border: 'none',
    borderRadius: '30px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  secondaryBtn: {
    padding: '1rem 2rem',
    background: 'transparent',
    color: '#38bdf8',
    border: '2px solid #38bdf8',
    borderRadius: '30px',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

export default SuggestionPage;
