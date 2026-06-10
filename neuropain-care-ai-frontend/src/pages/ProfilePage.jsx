import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user: currentUser, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState(34);
  const [condition, setCondition] = useState('Chronic Neuropathy');
  const [joined, setJoined] = useState('Jan 2026');

  // Editing state
  const [editName, setEditName] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editCondition, setEditCondition] = useState('');

  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || 'User');
      
      const savedProfile = localStorage.getItem(`profile_${currentUser.email}`);
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setAge(parsed.age || 34);
        setCondition(parsed.condition || 'Chronic Neuropathy');
        setJoined(parsed.joined || 'Jan 2026');
      } else {
        // Set sensible defaults
        setAge(34);
        setCondition('Chronic Neuropathy');
        setJoined('Jan 2026');
        
        // Save initial default profile details to localStorage
        localStorage.setItem(`profile_${currentUser.email}`, JSON.stringify({
          age: 34,
          condition: 'Chronic Neuropathy',
          joined: 'Jan 2026'
        }));
      }

      // Load actual assessment history
      const historyKey = `assessments_${currentUser.email}`;
      const existing = localStorage.getItem(historyKey);
      if (existing) {
        setHistory(JSON.parse(existing));
      } else {
        // Default seed history if they haven't submitted any yet
        const defaultHistory = [
          { date: 'May 12, 2026', type: 'Body Mapping', status: 'Completed' },
          { date: 'May 10, 2026', type: 'Text Assessment', status: 'Completed' }
        ];
        setHistory(defaultHistory);
      }
    }
  }, [currentUser]);

  const handleEdit = () => {
    setEditName(name);
    setEditAge(age);
    setEditCondition(condition);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editName.trim()) return;

    const updatedUser = { ...currentUser, name: editName };
    updateUser(updatedUser);

    const profileDetails = {
      age: parseInt(editAge) || age,
      condition: editCondition,
      joined: joined
    };
    localStorage.setItem(`profile_${currentUser.email}`, JSON.stringify(profileDetails));

    setName(editName);
    setAge(parseInt(editAge) || age);
    setCondition(editCondition);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (fullName) => {
    if (!fullName) return 'U';
    return fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!currentUser) return null;

  return (
    <div style={styles.container}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={styles.card}
      >
        {isEditing ? (
          <div style={styles.formContainer}>
            <h2 style={styles.formTitle}>Edit Profile</h2>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <input 
                type="text" 
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                style={styles.input}
                placeholder="Full Name"
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Age</label>
              <input 
                type="number" 
                value={editAge}
                onChange={(e) => setEditAge(e.target.value)}
                style={styles.input}
                placeholder="Age"
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Condition</label>
              <select 
                value={editCondition}
                onChange={(e) => setEditCondition(e.target.value)}
                style={styles.select}
              >
                <option value="Chronic Neuropathy" style={styles.option}>Chronic Neuropathy</option>
                <option value="Fibromyalgia" style={styles.option}>Fibromyalgia</option>
                <option value="Diabetic Neuropathy" style={styles.option}>Diabetic Neuropathy</option>
                <option value="Sciatica" style={styles.option}>Sciatica</option>
                <option value="Chronic Back Pain" style={styles.option}>Chronic Back Pain</option>
                <option value="Migraine" style={styles.option}>Migraine</option>
                <option value="Other" style={styles.option}>Other</option>
              </select>
            </div>

            <div style={styles.btnRow}>
              <button onClick={handleSave} style={styles.saveBtn}>Save Changes</button>
              <button onClick={() => setIsEditing(false)} style={styles.cancelBtn}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <div style={styles.header}>
              <div style={styles.avatar}>{getInitials(name)}</div>
              <div>
                <h1 style={styles.name}>{name}</h1>
                <p style={styles.email}>{currentUser.email}</p>
              </div>
            </div>

            <div style={styles.detailsGrid}>
              <div style={styles.detailItem}>
                <label style={styles.detailLabel}>Age</label>
                <p style={styles.detailVal}>{age}</p>
              </div>
              <div style={styles.detailItem}>
                <label style={styles.detailLabel}>Condition</label>
                <p style={styles.detailVal}>{condition}</p>
              </div>
              <div style={styles.detailItem}>
                <label style={styles.detailLabel}>Member Since</label>
                <p style={styles.detailVal}>{joined}</p>
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

            <div style={styles.btnRow}>
              <button onClick={handleEdit} style={styles.editBtn}>Edit Profile</button>
              <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </div>
          </>
        )}
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
  detailLabel: {
    color: '#94a3b8',
    fontSize: '0.875rem',
    fontWeight: '500',
    marginBottom: '0.2rem'
  },
  detailVal: {
    fontSize: '1.15rem',
    fontWeight: '600',
    color: '#f8fafc'
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
  btnRow: {
    display: 'flex',
    gap: '1rem',
    marginTop: '3rem'
  },
  editBtn: {
    flex: 1,
    padding: '1rem',
    background: 'transparent',
    border: '1px solid #38bdf8',
    color: '#38bdf8',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s'
  },
  logoutBtn: {
    flex: 1,
    padding: '1rem',
    background: 'transparent',
    border: '1px solid #ef4444',
    color: '#ef4444',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formTitle: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#38bdf8'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    color: '#94a3b8',
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  input: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '0.8rem 1rem',
    color: '#f8fafc',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box'
  },
  select: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '0.8rem 1rem',
    color: '#f8fafc',
    outline: 'none',
    width: '100%',
    cursor: 'pointer',
    boxSizing: 'border-box'
  },
  option: {
    background: '#1e293b',
    color: '#f8fafc'
  },
  saveBtn: {
    flex: 1,
    padding: '1rem',
    background: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
    border: 'none',
    color: 'white',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'opacity 0.3s'
  },
  cancelBtn: {
    flex: 1,
    padding: '1rem',
    background: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#94a3b8',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.3s'
  }
};

export default ProfilePage;
