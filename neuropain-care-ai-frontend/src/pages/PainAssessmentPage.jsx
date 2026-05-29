import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { submitPainAssessment } from '../services/api';

const PainAssessmentPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedPart, setSelectedPart] = useState('');
  const [painLevel, setPainLevel] = useState(5);
  
  // Selection states
  const [sensation, setSensation] = useState('');
  const [timing, setTiming] = useState('');
  const [trigger, setTrigger] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);

  const bodyParts = ['Head', 'Neck', 'Shoulders', 'Chest', 'Upper Back', 'Lower Back', 'Hips', 'Arms', 'Elbows', 'Wrists', 'Hands', 'Knees', 'Ankles', 'Feet'];

  const nextStep = () => {
    if (step === 1 && !selectedPart) {
      alert("Please select or type a body part first.");
      return;
    }
    setStep(s => Math.min(s + 1, 3));
  };
  
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const assessmentData = {
        bodyPart: selectedPart,
        painLevel: parseInt(painLevel),
        sensation,
        timing,
        details
      };
      const response = await submitPainAssessment(assessmentData);
      navigate('/suggestion', { state: { carePlan: response } });
    } catch (error) {
      console.error(error);
      alert("Failed to connect to the backend server. Using offline recommendations instead.");
      navigate('/suggestion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.card}
      >
        <div style={styles.header}>
          <div style={styles.stepInfo}>Step {step} of 3</div>
          <div style={styles.progressBarBg}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(step / 3) * 100}%` }}
              style={styles.progressBar}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
            >
              <h2 style={styles.questionTitle}>Which <span style={styles.highlight}>body part</span> is in pain?</h2>
              <p style={styles.subtitle}>Select an area or type it below to begin your AI assessment.</p>
              
              <div style={styles.chipContainer}>
                {bodyParts.map(part => (
                  <button 
                    key={part} 
                    onClick={() => setSelectedPart(part)}
                    style={{
                      ...styles.chip,
                      background: selectedPart === part ? '#38bdf8' : 'rgba(56, 189, 248, 0.05)',
                      color: selectedPart === part ? '#0f172a' : '#38bdf8',
                      borderColor: selectedPart === part ? '#38bdf8' : 'rgba(56, 189, 248, 0.3)'
                    }}
                  >
                    {part}
                  </button>
                ))}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Other (if not listed):</label>
                <input 
                  type="text" 
                  placeholder="e.g. Fingers, Toes..." 
                  value={selectedPart}
                  onChange={(e) => setSelectedPart(e.target.value)}
                  style={styles.textInput}
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
            >
              <h2 style={styles.questionTitle}>Assessment for <span style={styles.highlight}>{selectedPart}</span></h2>
              
              <div style={styles.subQuestion}>
                <label style={styles.label}>What does the pain feel like?</label>
                <div style={styles.chipContainer}>
                  {[
                    { id: 'burn', label: '🔥 Like burning' },
                    { id: 'pins', label: '📌 Pins & needles' },
                    { id: 'stab', label: '🔪 Stabbing' },
                    { id: 'achy', label: '☁️ Achy' },
                    { id: 'shock', label: '⚡ Electric shock' }
                  ].map(s => (
                    <button 
                      key={s.id} 
                      onClick={() => setSensation(s.label)}
                      style={{
                        ...styles.chip,
                        background: sensation === s.label ? '#38bdf8' : 'rgba(56, 189, 248, 0.05)',
                        color: sensation === s.label ? '#0f172a' : '#38bdf8',
                        borderColor: sensation === s.label ? '#38bdf8' : 'rgba(56, 189, 248, 0.3)'
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={styles.subQuestion}>
                <label style={styles.label}>When is it worst?</label>
                <div style={styles.chipContainer}>
                  {['Morning', 'Night', 'All day', 'Moving'].map(t => (
                    <button 
                      key={t} 
                      onClick={() => setTiming(t)}
                      style={{
                        ...styles.chip,
                        background: timing === t ? '#38bdf8' : 'rgba(56, 189, 248, 0.05)',
                        color: timing === t ? '#0f172a' : '#38bdf8',
                        borderColor: timing === t ? '#38bdf8' : 'rgba(56, 189, 248, 0.3)'
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div style={styles.subQuestion}>
                <label style={styles.label}>Intensity (1-10)</label>
                <div style={styles.sliderContainer}>
                  <span style={styles.sliderVal}>{painLevel}</span>
                  <input 
                    type="range" min="1" max="10" 
                    value={painLevel}
                    onChange={(e) => setPainLevel(e.target.value)}
                    style={styles.slider} 
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
            >
              <h2 style={styles.questionTitle}>Final <span style={styles.highlight}>Details</span></h2>
              <p style={styles.subtitle}>Is there anything else you want to tell the AI about your {selectedPart} pain?</p>
              <textarea 
                placeholder="e.g. It gets better when I use a heat pack..." 
                style={styles.textarea}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              ></textarea>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={styles.footer}>
          {step > 1 && (
            <button onClick={prevStep} style={styles.backBtn} disabled={loading}>Back</button>
          )}
          <button 
            onClick={() => step === 3 ? handleSubmit() : nextStep()} 
            style={{
              ...styles.submitBtn,
              opacity: loading ? 0.7 : 1,
              pointerEvents: loading ? 'none' : 'auto'
            }}
            disabled={loading}
          >
            {loading ? 'Analyzing...' : step === 3 ? 'Get AI Results' : 'Next Step'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
  container: { padding: '6rem 2rem', background: '#0f172a', minHeight: 'calc(100vh - 70px)', display: 'flex', justifyContent: 'center' },
  card: { background: 'rgba(255, 255, 255, 0.05)', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.1)', maxWidth: '700px', width: '100%', color: '#f8fafc', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' },
  header: { marginBottom: '3rem' },
  stepInfo: { fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.8rem', fontWeight: '600' },
  progressBarBg: { height: '6px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px', overflow: 'hidden' },
  progressBar: { height: '100%', background: 'linear-gradient(90deg, #38bdf8, #2563eb)', borderRadius: '10px' },
  questionTitle: { fontSize: '2.2rem', marginBottom: '0.5rem', fontWeight: '800' },
  highlight: { color: '#38bdf8' },
  subtitle: { color: '#94a3b8', marginBottom: '2rem', lineHeight: '1.6' },
  chipContainer: { display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '2rem' },
  chip: { padding: '0.7rem 1.4rem', borderRadius: '12px', border: '1px solid', cursor: 'pointer', transition: 'all 0.2s', fontWeight: '600', outline: 'none' },
  inputGroup: { marginTop: '1rem' },
  label: { display: 'block', marginBottom: '0.8rem', color: '#cbd5e1', fontWeight: '600' },
  textInput: { width: '100%', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: '#f8fafc', fontSize: '1rem', outline: 'none' },
  subQuestion: { marginBottom: '2rem' },
  sliderContainer: { display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '0.5rem' },
  sliderVal: { background: '#38bdf8', color: '#0f172a', padding: '0.4rem 1rem', borderRadius: '8px', fontWeight: 'bold', minWidth: '40px', textAlign: 'center' },
  slider: { flex: 1, height: '6px', borderRadius: '5px', background: '#334155', outline: 'none' },
  textarea: { width: '100%', height: '150px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '1.2rem', color: '#f8fafc', fontSize: '1rem', outline: 'none', resize: 'none' },
  footer: { marginTop: '4rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' },
  submitBtn: { padding: '1rem 2.5rem', background: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)', color: 'white', border: 'none', borderRadius: '14px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem', boxShadow: '0 10px 20px -5px rgba(56, 189, 248, 0.4)' },
  backBtn: { padding: '1rem 2.5rem', background: 'transparent', color: '#38bdf8', border: '1px solid #38bdf8', borderRadius: '14px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }
};

export default PainAssessmentPage;
