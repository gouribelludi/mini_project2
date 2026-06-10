import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ChatBotPage = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // 1. Create and inject Botpress main script
    const injectScript = document.createElement('script');
    injectScript.src = "https://cdn.botpress.cloud/webchat/v3.6/inject.js";
    injectScript.async = true;
    document.body.appendChild(injectScript);

    let configScript = null;

    injectScript.onload = () => {
      // 2. Create and inject Botpress configuration script
      configScript = document.createElement('script');
      configScript.src = "https://files.bpcontent.cloud/2026/06/02/08/20260602084010-F7QIZORA.js";
      configScript.async = true;
      document.body.appendChild(configScript);

      configScript.onload = () => {
        // Poll for window.botpress instance to be initialized
        const checkInit = setInterval(() => {
          if (window.botpress && typeof window.botpress.open === 'function') {
            clearInterval(checkInit);
            setInitialized(true);
            
            // Automatically open the chatbot widget once it initializes
            window.botpress.open();
          }
        }, 100);
        
        // Timeout safeguard to stop checking after 6 seconds
        setTimeout(() => clearInterval(checkInit), 6000);
      };
    };

    // Clean up script tags and DOM elements when navigating away
    return () => {
      if (injectScript && injectScript.parentNode) {
        injectScript.parentNode.removeChild(injectScript);
      }
      if (configScript && configScript.parentNode) {
        configScript.parentNode.removeChild(configScript);
      }

      // Instruct Botpress to close the chat overlay
      if (window.botpress && typeof window.botpress.close === 'function') {
        window.botpress.close();
      }

      // Query and purge all DOM elements injected by Botpress to prevent overlaps on other pages
      const elements = [
        ...document.querySelectorAll('iframe[src*="botpress.cloud"]'),
        ...document.querySelectorAll('iframe[src*="bpcontent.cloud"]'),
        ...document.querySelectorAll('[id^="bp-"]'),
        ...document.querySelectorAll('[class^="bp-"]'),
        ...document.querySelectorAll('#bp-web-widget-container'),
        ...document.querySelectorAll('.bp-web-widget-container'),
        ...document.querySelectorAll('div[id*="botpress"]'),
        ...document.querySelectorAll('div[class*="botpress"]')
      ];
      elements.forEach(el => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });

      // Remove window references
      delete window.botpress;
      delete window.botpressWebChat;
    };
  }, []);

  const handleOpenChat = () => {
    if (window.botpress && typeof window.botpress.open === 'function') {
      window.botpress.open();
    }
  };

  const handleAskQuestion = (question) => {
    if (window.botpress && typeof window.botpress.open === 'function') {
      // 1. Focus/Open Webchat panel
      window.botpress.open();
      
      // 2. Proactively send text to bot on user's behalf
      setTimeout(() => {
        if (typeof window.botpress.sendMessage === 'function') {
          window.botpress.sendMessage(question);
        }
      }, 350);
    } else {
      alert("AI Assistant is still initializing. Please wait a moment.");
    }
  };

  const suggestCategories = [
    {
      title: "App Guidance",
      icon: "📱",
      questions: [
        "How do I track my sleep?",
        "How does the 3D body mapping work?",
        "Where is the emergency assistance page?"
      ]
    },
    {
      title: "Symptom Info",
      icon: "⚡",
      questions: [
        "What is neuropathic pain?",
        "Why do my hands and feet tingle?",
        "What triggers a pain flare-up?"
      ]
    },
    {
      title: "Immediate Relief",
      icon: "🧘",
      questions: [
        "What are nerve gliding exercises?",
        "Should I use heat or cold for neuropathy?",
        "How can I manage a sudden flare-up?"
      ]
    },
    {
      title: "Wellness Tips",
      icon: "🥗",
      questions: [
        "What anti-inflammatory foods help?",
        "How does water intake reduce nerve pain?",
        "What is a good bedtime routine for pain?"
      ]
    }
  ];

  return (
    <div className="chat-container">
      <div className="chat-layout">
        {/* Left Column: Hero & Info */}
        <motion.div 
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="chat-hero-column"
        >
          <div className="chat-badge">
            <span className="chat-status-dot"></span>
            <span>{initialized ? "AI Assistant Online" : "Connecting..."}</span>
          </div>
          <h1 className="chat-title">NeuroPain AI<br/><span className="chat-highlight">Assistant</span></h1>
          <p className="chat-subtitle">
            Welcome to the AI Chat! I am ready to help you with self-care suggestions, symptom guidance, and instructions on how to use all the features of this app.
          </p>
          
          <div className="chat-features-list">
            <div className="chat-feature-item">
              <span className="chat-feature-icon">💬</span>
              <div>
                <h4 className="chat-feature-title">Interactive Q&A</h4>
                <p className="chat-feature-desc">Learn about different nerve sensations and get clinical lifestyle advice.</p>
              </div>
            </div>
            <div className="chat-feature-item">
              <span className="chat-feature-icon">🛡️</span>
              <div>
                <h4 className="chat-feature-title">Safety-First Triage</h4>
                <p className="chat-feature-desc">Identifies emergency symptoms and helps locate nearest emergency centers.</p>
              </div>
            </div>
            <div className="chat-feature-item">
              <span className="chat-feature-icon">🧭</span>
              <div>
                <h4 className="chat-feature-title">App Companion</h4>
                <p className="chat-feature-desc">Get walk-through instructions for our 3D Body Mapping and health trackers.</p>
              </div>
            </div>
          </div>

          <button onClick={handleOpenChat} className="chat-main-btn">
            {initialized ? "Open Chat Box" : "Initializing AI..."}
          </button>
        </motion.div>

        {/* Right Column: Pre-configured suggested questions */}
        <motion.div 
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="chat-prompts-column"
        >
          <h3 className="chat-section-title">Suggested Inquiries</h3>
          <p className="chat-section-subtitle">Click any question card below to automatically open the chat widget and query the AI.</p>
          
          <div className="chat-grid">
            {suggestCategories.map((category, index) => (
              <div key={index} className="chat-card">
                <div className="chat-card-header">
                  <span className="chat-card-icon">{category.icon}</span>
                  <h4 className="chat-card-title">{category.title}</h4>
                </div>
                <div className="chat-question-list">
                  {category.questions.map((q, qIndex) => (
                    <button 
                      key={qIndex} 
                      onClick={() => handleAskQuestion(q)}
                      className="chat-question-btn"
                    >
                      <span>{q}</span>
                      <span>&rarr;</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatBotPage;
