import { motion } from 'framer-motion';

const DashboardPage = () => {
  const stats = [
    { label: 'Avg. Pain Level', value: '4.2', change: '-12%', icon: '📉', color: '#34d399' },
    { label: 'Active Zones', value: '3', change: '+1', icon: '📍', color: '#fbbf24' },
    { label: 'Sleep Quality', value: '85%', change: '+5%', icon: '😴', color: '#818cf8' },
    { label: 'AI Compliance', value: '92%', change: 'Steady', icon: '🤖', color: '#38bdf8' }
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Health <span style={styles.highlight}>Dashboard</span></h1>
        <p style={styles.subtitle}>Welcome back, John. Here is your neuropathic health summary.</p>
      </header>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={styles.statCard}
          >
            <div style={styles.statHeader}>
              <span style={styles.statIcon}>{stat.icon}</span>
              <span style={{ ...styles.statChange, color: stat.color }}>{stat.change}</span>
            </div>
            <div style={styles.statValue}>{stat.value}</div>
            <div style={styles.statLabel}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div style={styles.mainGrid}>
        {/* Pain Trend Chart (Simulated) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={styles.chartCard}
        >
          <h2 style={styles.cardTitle}>Pain Level Trend (7 Days)</h2>
          <div style={styles.chartContainer}>
            {[4, 6, 5, 8, 3, 4, 5].map((val, i) => (
              <div key={i} style={styles.chartColumn}>
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${val * 10}%` }}
                  style={{ ...styles.bar, background: val > 6 ? '#f87171' : '#38bdf8' }}
                />
                <span style={styles.chartDay}>Day {i+1}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Recommendations Summary */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          style={styles.aiCard}
        >
          <h2 style={styles.cardTitle}>AI Care Insights</h2>
          <div style={styles.recommendationList}>
            <div style={styles.recItem}>
              <span style={styles.recIcon}>💧</span>
              <p>Hydration was low today. Increasing water intake can reduce nerve sensitivity.</p>
            </div>
            <div style={styles.recItem}>
              <span style={styles.recIcon}>🚶</span>
              <p>Evening walk recommended. Gentle movement helps in blood circulation to nerve endings.</p>
            </div>
            <div style={styles.recItem}>
              <span style={styles.recIcon}>💊</span>
              <p>Next medication due in 2 hours. Set a reminder.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '4rem 2rem',
    background: '#0f172a',
    color: '#f8fafc',
    minHeight: '100vh'
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
    marginTop: '0.5rem'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.5rem',
    maxWidth: '1200px',
    margin: '0 auto 3rem auto'
  },
  statCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '2rem',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  statHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  },
  statIcon: {
    fontSize: '1.5rem'
  },
  statChange: {
    fontSize: '0.8rem',
    fontWeight: 'bold'
  },
  statValue: {
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '0.5rem'
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: '0.9rem'
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    '@media (max-width: 900px)': {
      gridTemplateColumns: '1fr'
    }
  },
  chartCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '2.5rem',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },
  cardTitle: {
    fontSize: '1.5rem',
    marginBottom: '2rem'
  },
  chartContainer: {
    height: '250px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: '1rem',
    paddingBottom: '2rem'
  },
  chartColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem'
  },
  bar: {
    width: '100%',
    borderRadius: '8px 8px 0 0',
    minHeight: '20px'
  },
  chartDay: {
    fontSize: '0.8rem',
    color: '#64748b'
  },
  aiCard: {
    background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)',
    padding: '2.5rem',
    borderRadius: '24px',
    border: '1px solid rgba(56, 189, 248, 0.2)'
  },
  recommendationList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  recItem: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start'
  },
  recIcon: {
    fontSize: '1.5rem'
  }
};

export default DashboardPage;
