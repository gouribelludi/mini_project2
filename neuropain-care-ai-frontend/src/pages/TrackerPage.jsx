import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const renderMoodIcon = (index, size = 32, active = false) => {
  const strokeColor = active ? '#38bdf8' : 'rgba(255, 255, 255, 0.5)';
  const fillColor = active ? 'rgba(56, 189, 248, 0.15)' : 'none';
  
  switch (index) {
    case 0: // Awful
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M16 16c-.5-1.5-2-2.5-4-2.5s-3.5 1-4 2.5" />
          <line x1="9" x2="9.01" y1="9" y2="9" strokeWidth="2" />
          <line x1="15" x2="15.01" y1="9" y2="9" strokeWidth="2" />
        </svg>
      );
    case 1: // Bad
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M16 15.5c-1-1-3-1-4 0" />
          <line x1="9" x2="9.01" y1="9" y2="9" strokeWidth="2" />
          <line x1="15" x2="15.01" y1="9" y2="9" strokeWidth="2" />
        </svg>
      );
    case 2: // Neutral
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="8" x2="16" y1="15" y2="15" />
          <line x1="9" x2="9.01" y1="9" y2="9" strokeWidth="2" />
          <line x1="15" x2="15.01" y1="9" y2="9" strokeWidth="2" />
        </svg>
      );
    case 3: // Good
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" x2="9.01" y1="9" y2="9" strokeWidth="2" />
          <line x1="15" x2="15.01" y1="9" y2="9" strokeWidth="2" />
        </svg>
      );
    case 4: // Excellent
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 13a4 4 0 0 0 8 0H8Z" fill={active ? '#38bdf8' : strokeColor} />
          <path d="M9 9c.5-.5 1.5-.5 2 0" />
          <path d="M13 9c.5-.5 1.5-.5 2 0" />
        </svg>
      );
    default:
      return null;
  }
};

const TrackerPage = () => {
  const { user: currentUser } = useAuth();
  const todayStr = new Date().toDateString();

  const [water, setWater] = useState(1.5);
  const [sleep, setSleep] = useState(7);
  const [mood, setMood] = useState(3); // 0: Awful, 1: Bad, 2: Neutral, 3: Good, 4: Excellent

  const moodLabels = ['Awful', 'Bad', 'Neutral', 'Good', 'Excellent'];

  useEffect(() => {
    if (currentUser) {
      const waterKey = `water_${currentUser.email}_${todayStr}`;
      const sleepKey = `sleep_hours_${currentUser.email}_${todayStr}`;
      const moodKey = `mood_${currentUser.email}_${todayStr}`;

      const savedWater = localStorage.getItem(waterKey);
      if (savedWater) setWater(Number(savedWater));

      const savedSleep = localStorage.getItem(sleepKey);
      if (savedSleep) setSleep(Number(savedSleep));

      const savedMood = localStorage.getItem(moodKey);
      if (savedMood !== null) setMood(Number(savedMood));
    }
  }, [currentUser, todayStr]);

  const handleUpdateWater = (newValue) => {
    setWater(newValue);
    if (currentUser) {
      localStorage.setItem(`water_${currentUser.email}_${todayStr}`, newValue.toString());
    }
  };

  const handleUpdateSleep = (newValue) => {
    setSleep(newValue);
    if (currentUser) {
      localStorage.setItem(`sleep_hours_${currentUser.email}_${todayStr}`, newValue.toString());
    }
  };

  const handleUpdateMood = (newValue) => {
    setMood(newValue);
    if (currentUser) {
      localStorage.setItem(`mood_${currentUser.email}_${todayStr}`, newValue.toString());
    }
  };

  const trackers = [
    {
      title: 'Water Intake',
      value: water,
      unit: 'Liters',
      target: 3,
      icon: (color) => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z" fill={`${color}20`} />
        </svg>
      ),
      color: '#38bdf8',
      action: () => {
        const next = Math.min(water + 0.25, 5);
        handleUpdateWater(next);
      }
    },
    {
      title: 'Sleep Duration',
      value: sleep,
      unit: 'Hours',
      target: 8,
      icon: (color) => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill={`${color}20`} />
          <path d="M19 3v4M21 5h-4" strokeWidth="1.5" />
        </svg>
      ),
      color: '#818cf8',
      action: () => {
        const next = Math.min(sleep + 0.5, 12);
        handleUpdateSleep(next);
      }
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
              <span style={styles.icon}>{tracker.icon(tracker.color)}</span>
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
            <span style={styles.icon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8Z" />
                <path d="M22 12a3 3 0 0 0-3-3v6a3 3 0 0 0 3-3Z" />
              </svg>
            </span>
            <h3>Mood Tracker</h3>
          </div>
          <div style={styles.moodGrid}>
            {[0, 1, 2, 3, 4].map(m => (
              <button 
                key={m} 
                onClick={() => handleUpdateMood(m)}
                style={{ 
                  ...styles.moodBtn,
                  background: mood === m ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                  borderColor: mood === m ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)'
                }}
              >
                {renderMoodIcon(m, 28, mood === m)}
              </button>
            ))}
          </div>
          <div style={styles.moodStatusContainer}>
            <span style={styles.moodStatusLabel}>Current Mood:</span>
            {renderMoodIcon(mood, 22, true)}
            <span style={styles.moodStatusValue}>{moodLabels[mood]}</span>
          </div>
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px'
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
    padding: '0.6rem',
    border: '1px solid',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent'
  },
  moodStatusContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    marginTop: '1.5rem',
    background: 'rgba(255, 255, 255, 0.02)',
    padding: '0.5rem 1rem',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.05)'
  },
  moodStatusLabel: {
    color: '#94a3b8',
    fontSize: '0.9rem'
  },
  moodStatusValue: {
    color: '#38bdf8',
    fontWeight: 'bold',
    fontSize: '0.95rem'
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
