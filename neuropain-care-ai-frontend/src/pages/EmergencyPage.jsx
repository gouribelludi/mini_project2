import { motion } from 'framer-motion';
import { useState } from 'react';

const EmergencyPage = () => {
  const [sosActive, setSosActive] = useState(false);

  const handleSos = () => {
    setSosActive(true);
    // In a real app, this would trigger an API call or location sharing
    setTimeout(() => alert('Emergency services have been notified (Simulation)'), 1000);
  };

  const hospitals = [
    { name: 'City General Hospital', distance: '1.2 km', contact: '+1 234 567 890' },
    { name: 'NeuroCare Specialty Center', distance: '2.5 km', contact: '+1 987 654 321' },
    { name: 'St. Mary\'s Neurological Institute', distance: '4.8 km', contact: '+1 555 012 345' }
  ];

  return (
    <div style={styles.container}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.header}
      >
        <h1 style={styles.title}>Emergency <span style={styles.highlight}>Assistance</span></h1>
        <p style={styles.subtitle}>Immediate help for severe pain episodes or medical emergencies.</p>
      </motion.div>

      <div style={styles.content}>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSos}
          style={{
            ...styles.sosButton,
            background: sosActive ? '#ef4444' : 'rgba(239, 68, 68, 0.1)',
            borderColor: '#ef4444'
          }}
        >
          <motion.div 
            animate={sosActive ? { scale: [1, 1.2, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1 }}
            style={styles.sosText}
          >
            {sosActive ? 'SOS ACTIVE' : 'SOS'}
          </motion.div>
        </motion.div>

        <div style={styles.infoSection}>
          <h2 style={styles.sectionTitle}>Nearby Emergency Centers</h2>
          <div style={styles.hospitalList}>
            {hospitals.map((hospital, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                style={styles.hospitalCard}
              >
                <div>
                  <h3>{hospital.name}</h3>
                  <p style={styles.distance}>{hospital.distance} away</p>
                </div>
                <button style={styles.callBtn}>Call {hospital.contact}</button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.warning}>
        <p>⚠️ If you are experiencing a life-threatening emergency, please dial <strong>911</strong> or your local emergency number immediately.</p>
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
    color: '#ef4444'
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: '1.1rem',
    marginTop: '1rem'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4rem',
    width: '100%',
    maxWidth: '800px'
  },
  sosButton: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    border: '4px solid',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: '0 0 30px rgba(239, 68, 68, 0.3)',
    transition: 'all 0.3s'
  },
  sosText: {
    fontSize: '2.5rem',
    fontWeight: '900',
    color: '#ef4444'
  },
  infoSection: {
    width: '100%'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    textAlign: 'center'
  },
  hospitalList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  hospitalCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '1.5rem',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  distance: {
    color: '#94a3b8',
    fontSize: '0.9rem'
  },
  callBtn: {
    padding: '0.6rem 1.2rem',
    background: '#34d399',
    color: '#0f172a',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  warning: {
    marginTop: '4rem',
    background: 'rgba(239, 68, 68, 0.1)',
    color: '#f87171',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    maxWidth: '600px',
    textAlign: 'center'
  }
};

export default EmergencyPage;
