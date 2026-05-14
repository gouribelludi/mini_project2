import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBotPage = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello John! I am your NeuroPain Assistant. How are you feeling today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    
    // Simulate AI Response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: 'Based on your description, this sounds like a flare-up. Have you tried the breathing exercises in your care plan?' 
      }]);
    }, 1000);
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h3 style={styles.sidebarTitle}>Recent Chats</h3>
        <div style={styles.chatHistory}>
          {['Pain flare-up help', 'Morning stiffness', 'Medication query'].map((chat, i) => (
            <div key={i} style={styles.historyItem}>{chat}</div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={styles.chatMain}>
        <div style={styles.chatHeader}>
          <div style={styles.aiStatus}>
            <div style={styles.statusDot}></div>
            <span>NeuroPain AI Assistant</span>
          </div>
        </div>

        <div style={styles.messageArea}>
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  ...styles.message,
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.role === 'user' ? '#38bdf8' : 'rgba(255, 255, 255, 0.05)',
                  color: msg.role === 'user' ? '#0f172a' : '#f8fafc'
                }}
              >
                {msg.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div style={styles.inputArea}>
          <input 
            type="text" 
            placeholder="Type your symptoms or questions..." 
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend} style={styles.sendBtn}>Send</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: 'calc(100vh - 70px)',
    background: '#0f172a',
    color: '#f8fafc'
  },
  sidebar: {
    width: '280px',
    background: 'rgba(255, 255, 255, 0.02)',
    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '2rem',
    '@media (max-width: 768px)': {
      display: 'none'
    }
  },
  sidebarTitle: {
    fontSize: '0.9rem',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '1.5rem'
  },
  chatHistory: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  historyItem: {
    padding: '0.8rem 1rem',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.03)',
    fontSize: '0.9rem',
    cursor: 'pointer',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.08)'
    }
  },
  chatMain: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  chatHeader: {
    padding: '1.5rem 2rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  aiStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    fontWeight: 'bold'
  },
  statusDot: {
    width: '10px',
    height: '10px',
    background: '#34d399',
    borderRadius: '50%',
    boxShadow: '0 0 10px #34d399'
  },
  messageArea: {
    flex: 1,
    padding: '2rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  message: {
    maxWidth: '70%',
    padding: '1rem 1.5rem',
    borderRadius: '18px',
    fontSize: '1rem',
    lineHeight: '1.5'
  },
  inputArea: {
    padding: '2rem',
    display: 'flex',
    gap: '1rem'
  },
  input: {
    flex: 1,
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '1rem 1.5rem',
    color: '#f8fafc',
    outline: 'none'
  },
  sendBtn: {
    padding: '0 2rem',
    background: '#38bdf8',
    color: '#0f172a',
    border: 'none',
    borderRadius: '12px',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

export default ChatBotPage;
