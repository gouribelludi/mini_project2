import { motion } from 'framer-motion';

const ProfilePage = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 34,
    condition: 'Chronic Neuropathy',
    joined: 'Jan 2026'
  };

  const history = [
    { date: 'May 12, 2026', type: 'Body Mapping', status: 'Completed' },
    { date: 'May 10, 2026', type: 'Text Assessment', status: 'Completed' },
    { date: 'May 08, 2026', type: 'Emergency SOS', status: 'Resolved' }
  ];

  return (
    <div style={styles.container}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={styles.card}
      >
        <div style={styles.header}>
          <div style={styles.avatar}>JD</div>
          <div>
            <h1 style={styles.name}>{user.name}</h1>
            <p style={styles.email}>{user.email}</p>
          </div>
        </div>

        <div style={styles.detailsGrid}>
          <div style={styles.detailItem}>
            <label>Age</label>
            <p>{user.age}</p>
          </div>
          <div style={styles.detailItem}>
            <label>Condition</label>
            <p>{user.condition}</p>
          </div>
          <div style={styles.detailItem}>
            <label>Member Since</label>
            <p>{user.joined}</p>
          </div>
        </div>

        <div style={styles.historySection}>
          <h2 style={styles.sectionTitle}>Recent Activity</h2>
          <div style={styles.historyList}>
            {history.map((item, index) => (
              <div key={index} style={styles.historyItem}>
                <span>{item.date}</span>
                <span style={styles.type}>{item.type}</span>
                <span style={{ 
                  ...styles.status, 
                  color: item.status === 'Completed' ? '#34d399' : '#f87171' 
                }}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        <button style={styles.editBtn}>Edit Profile</button>
      </motion.div>
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
    justifyContent: 'center'
  },
  card: {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '3rem',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    maxWidth: '700px',
    width: '100%'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    marginBottom: '3rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    paddingBottom: '2rem'
  },
  avatar: {
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'white'
  },
  name: {
    fontSize: '2rem',
    marginBottom: '0.2rem'
  },
  email: {
    color: '#94a3b8'
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem'
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  historySection: {
    marginTop: '2rem'
  },
  sectionTitle: {
    fontSize: '1.25rem',
    marginBottom: '1.5rem'
  },
  historyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  historyItem: {
    background: 'rgba(255, 255, 255, 0.03)',
    padding: '1rem',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem'
  },
  type: {
    color: '#38bdf8',
    fontWeight: 'bold'
  },
  status: {
    fontWeight: 'bold'
  },
  editBtn: {
    marginTop: '3rem',
    width: '100%',
    padding: '1rem',
    background: 'transparent',
    border: '1px solid #38bdf8',
    color: '#38bdf8',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default ProfilePage;
