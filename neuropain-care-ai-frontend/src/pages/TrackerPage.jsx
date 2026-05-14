import { motion } from 'framer-motion';
import { useState } from 'react';

const TrackerPage = () => {
  const [water, setWater] = useState(1.5);
  const [sleep, setSleep] = useState(7);
  const [mood, setMood] = useState('😊');

  const trackers = [
    {
      title: 'Water Intake',
      value: water,
      unit: 'Liters',
      target: 3,
      icon: '💧',
      color: '#38bdf8',
      action: () => setWater(prev => Math.min(prev + 0.25, 5))
    },
    {
      title: 'Sleep Duration',
      value: sleep,
      unit: 'Hours',
      target: 8,
      icon: '😴',
      color: '#818cf8',
      action: () => setSleep(prev => Math.min(prev + 0.5, 12))
    }
  ];

  return (
    <div style={styles.container}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.header}
      >
        <h1 style={styles.title}>Health <span style={styles.highlight}>Trackers</span></h1>
        <p style={styles.subtitle}>Log your daily habits to see their impact on your pain levels.</p>
      </motion.div>

      <div style={styles.grid}>
        {trackers.map((tracker, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            style={styles.card}
          >
            <div style={styles.cardHeader}>
              <span style={styles.icon}>{tracker.icon}</span>
              <h3>{tracker.title}</h3>
            </div>
            <div style={styles.valueDisplay}>
              <span style={{ ...styles.value, color: tracker.color }}>{tracker.value.toFixed(2)}</span>
              <span style={styles.unit}>{tracker.unit}</span>
            </div>
            <div style={styles.progressContainer}>
              <div style={{ 
                ...styles.progressBar, 
                width: `${(tracker.value / tracker.target) * 100}%`,
                background: tracker.color 
              }}></div>
            </div>
            <p style={styles.targetText}>Target: {tracker.target} {tracker.unit}</p>
            <button 
              onClick={tracker.action}
              style={{ ...styles.addBtn, background: tracker.color }}
            >
              Add {tracker.unit === 'Liters' ? '0.25L' : '0.5h'}
            </button>
          </motion.div>
        ))}

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          style={styles.card}
        >
          <div style={styles.cardHeader}>
            <span style={styles.icon}>🎭</span>
            <h3>Mood Tracker</h3>
          </div>
          <div style={styles.moodGrid}>
            {['😢', '😕', '😐', '😊', '🤩'].map(m => (
              <button 
                key={m} 
                onClick={() => setMood(m)}
                style={{ 
                  ...styles.moodBtn,
                  background: mood === m ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                  borderColor: mood === m ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)'
                }}
              >
                {m}
              </button>
            ))}
          </div>
          <p style={styles.moodStatus}>Current Mood: {mood}</p>
        </motion.div>
      </div>

      <div style={styles.summary}>
        <h3>Summary Tip</h3>
        <p>Consistent sleep and hydration are proven to reduce neuropathic flare-ups. Keep it up!</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 70px)',
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
    fontSize: '3rem',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    width: '100%',
    maxWidth: '1000px'
  },
  card: {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '2rem',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  icon: {
    fontSize: '2rem'
  },
  valueDisplay: {
    marginBottom: '1rem'
  },
  value: {
    fontSize: '3rem',
    fontWeight: 'bold'
  },
  unit: {
    marginLeft: '0.5rem',
    color: '#94a3b8'
  },
  progressContainer: {
    width: '100%',
    height: '8px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '0.5rem'
  },
  progressBar: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  },
  targetText: {
    fontSize: '0.8rem',
    color: '#64748b',
    marginBottom: '1.5rem'
  },
  addBtn: {
    width: '100%',
    padding: '0.8rem',
    border: 'none',
    borderRadius: '12px',
    color: '#0f172a',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  moodGrid: {
    display: 'flex',
    gap: '0.8rem',
    margin: '1.5rem 0'
  },
  moodBtn: {
    fontSize: '1.5rem',
    padding: '0.5rem',
    border: '1px solid',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  moodStatus: {
    marginTop: '1rem',
    color: '#94a3b8'
  },
  summary: {
    marginTop: '4rem',
    background: 'rgba(56, 189, 248, 0.1)',
    padding: '2rem',
    borderRadius: '24px',
    border: '1px solid rgba(56, 189, 248, 0.2)',
    textAlign: 'center',
    maxWidth: '600px'
  }
};

export default TrackerPage;
