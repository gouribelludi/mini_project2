import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { submitPainAssessment } from '../services/api';

const BodyMappingPage = () => {
  const navigate = useNavigate();
  const [selectedPart, setSelectedPart] = useState(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [rotation, setRotation] = useState(0); 
  const iframeRef = useRef(null);
  const [apiReady, setApiReady] = useState(false);
const [details, setDetails] = useState('');
  // Selection states for the form
  const [sensation, setSensation] = useState('');
  const [timing, setTiming] = useState('');
  const [trigger, setTrigger] = useState('');
  const [painLevel, setPainLevel] = useState(5);

  const initialParts = [
    { id: 'head', name: 'Head', icon: '👤', px: 50, py: 15, lx: 50, ly: 7, angle: 0, r: 0 },
    { id: 'neck', name: 'Neck', icon: '🦒', px: 50, py: 22, lx: 40, ly: 22, angle: 0, r: 2 },
    { id: 'shoulders', name: 'Shoulders', icon: '💪', px: 58, py: 28, lx: 68, ly: 25, angle: 0.3, r: 8 },
    { id: 'chest', name: 'Chest', icon: '👕', px: 50, py: 35, lx: 50, ly: 42, angle: 0, r: 5 },
    { id: 'u_back', name: 'Upper Back', icon: '🦴', px: 46, py: 32, lx: 35, ly: 30, angle: -0.2, r: 6 },
    { id: 'l_back', name: 'Lower Back', icon: '🦴', px: 46, py: 48, lx: 35, ly: 50, angle: -0.2, r: 6 },
    { id: 'hips', name: 'Hips', icon: '👖', px: 50, py: 58, lx: 40, ly: 60, angle: 0, r: 4 },
    { id: 'elbows', name: 'Elbows', icon: '🦾', px: 63, py: 48, lx: 73, ly: 50, angle: 0.5, r: 15 },
    { id: 'wrists', name: 'Wrists', icon: '✋', px: 70, py: 62, lx: 80, ly: 62, angle: 0.6, r: 20 },
    { id: 'hands', name: 'Hands', icon: '✋', px: 74, py: 72, lx: 84, ly: 72, angle: 0.7, r: 25 },
    { id: 'knees', name: 'Knees', icon: '🦵', px: 56, py: 78, lx: 66, ly: 78, angle: 0.2, r: 8 },
    { id: 'ankles', name: 'Ankles', icon: '👣', px: 54, py: 90, lx: 64, ly: 90, angle: 0.1, r: 6 },
    { id: 'feet', name: 'Feet', icon: '👣', px: 50, py: 96, lx: 50, ly: 102, angle: 0, r: 2 }
  ];

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const modelUid = 'f022e4a3641943328b2fbfdf0f7c3e1e';
    if (window.Sketchfab) {
      const client = new window.Sketchfab('1.12.1', iframe);
      client.init(modelUid, {
        success: (api) => {
          api.start();
          api.addEventListener('viewerready', () => {
            setApiReady(true);
            api.addEventListener('cameraChanged', (info) => {
              const [x, y, z] = info.position;
              setRotation(Math.atan2(x, y));
            });
          });
        },
        autostart: 1, ui_controls: 0, ui_infos: 0, scrollwheel: 0
      });
    }
  }, []);

  const handlePartClick = (part) => {
    setSelectedPart(part);
    setShowQuestions(true);
  };
  const handleAnalyzePain = async () => {
  try {
    const assessmentData = {
      bodyPart: selectedPart?.name,
      painLevel: Number(painLevel),
      sensation,
      timing,
      details
    };

    console.log("Sending:", assessmentData);

    const carePlan = await submitPainAssessment(assessmentData);

    console.log("AI Response:", carePlan);

    navigate('/suggestion', {
      state: { carePlan }
    });

  } catch (error) {
    console.error(error);
    alert("Failed to generate AI care plan");
  }
};

  const activeParts = initialParts.map(part => {
    const shift = Math.sin(rotation + part.angle) * part.r;
    return { ...part, currentPx: part.px + shift, currentLx: part.lx + shift * 1.5 };
  });

  return (
    <div style={styles.container}>
      {!showQuestions ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.mappingView}>
          <div style={styles.header}>
            <h1>Interactive <span style={styles.highlight}>Body Mapping</span></h1>
            <p>Point where it hurts. The labels stay sticky as you move the model!</p>
          </div>
          <div style={styles.modelWrapper}>
            <div style={styles.modelContainer}>
              <iframe ref={iframeRef} title="HUMAN_BODY" frameBorder="0" style={styles.iframe}></iframe>
              <svg style={styles.svgOverlay} viewBox="0 0 100 100" preserveAspectRatio="none">
                {activeParts.map((part) => (
                  <line key={`line-${part.id}`} x1={`${part.currentPx}%`} y1={`${part.py}%`} x2={`${part.currentLx}%`} y2={`${part.ly}%`} stroke="black" strokeWidth="0.5" style={{ opacity: 0.6 }} />
                ))}
              </svg>
              {activeParts.map((part) => (
                <div key={`dot-${part.id}`} style={{ ...styles.dot, top: `${part.py}%`, left: `${part.currentPx}%` }} />
              ))}
              {activeParts.map((part) => (
                <motion.div key={`label-${part.id}`} whileHover={{ scale: 1.05 }} onClick={() => handlePartClick(part)} style={{ ...styles.label, top: `${part.ly}%`, left: `${part.currentLx}%`, transform: part.lx < 50 ? 'translate(-100%, -50%)' : 'translate(0, -50%)' }}>
                  <span style={styles.labelIcon}>{part.icon}</span>
                  <span>{part.name}</span>
                </motion.div>
              ))}
            </div>
            <div style={styles.tip}><span>🔄</span> Drag to rotate. Click labels to report pain.</div>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={styles.assessmentView}>
          <div style={styles.assessmentCard}>
            <button onClick={() => setShowQuestions(false)} style={styles.backBtn}>← Back to Mapping</button>
            <h2 style={styles.assessmentTitle}>Assessment for <span style={styles.highlight}>{selectedPart?.name}</span></h2>
            
            <div style={styles.questionGroup}>
              <label style={styles.questionLabel}>What does the pain feel like?</label>
              <div style={styles.chipContainer}>
                {[
                  { id: 'burn', label: '🔥 Like burning or heat' },
                  { id: 'pins', label: '📌 Pins and needles' },
                  { id: 'stab', label: '🔪 Sharp or stabbing' },
                  { id: 'achy', label: '☁️ Heavy or achy' },
                  { id: 'numb', label: '🧊 Can\'t feel anything (Numb)' },
                  { id: 'shock', label: '⚡ Like an electric shock' }
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

            <div style={styles.questionGroup}>
              <label style={styles.questionLabel}>When do you feel it the most?</label>
              <div style={styles.chipContainer}>
                {['☀️ In the morning', '🌙 At night', '📅 All day long', '⚡ Only when moving'].map(t => (
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

            <div style={styles.questionGroup}>
              <label style={styles.questionLabel}>What makes it feel worse?</label>
              <div style={styles.chipContainer}>
                {['🚶 Walking/Standing', '🛋️ Resting', '❄️ Cold weather', '😰 Stress/Anxiety'].map(w => (
                  <button 
                    key={w} 
                    onClick={() => setTrigger(w)}
                    style={{
                      ...styles.chip,
                      background: trigger === w ? '#38bdf8' : 'rgba(56, 189, 248, 0.05)',
                      color: trigger === w ? '#0f172a' : '#38bdf8',
                      borderColor: trigger === w ? '#38bdf8' : 'rgba(56, 189, 248, 0.3)'
                    }}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.questionGroup}>
              <label style={styles.questionLabel}>How bad is it? (1 = Tiny, 10 = Severe)</label>
              <div style={styles.sliderContainer}>
                <span style={styles.sliderVal}>Level: {painLevel}</span>
                <input type="range" min="1" max="10" value={painLevel} onChange={(e) => setPainLevel(e.target.value)} style={styles.slider} />
              </div>
            </div>

            <div style={styles.questionGroup}>
              <label style={styles.questionLabel}>Any other notes for the AI?</label>
            <textarea
  placeholder="Tell us more in simple words..."
  style={styles.textarea}
  value={details}
  onChange={(e) => setDetails(e.target.value)}
/>
            </div>

         <button
  style={styles.submitBtn}
  onClick={handleAnalyzePain}
>
  Analyze My Pain
</button>
         
          </div>
        </motion.div>
      )}
    </div>
  );
};

const styles = {
  container: { minHeight: 'calc(100vh - 70px)', background: '#0f172a', color: '#f8fafc', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  mappingView: { width: '100%', maxWidth: '1200px' },
  header: { textAlign: 'center', marginBottom: '2rem' },
  highlight: { color: '#38bdf8' },
  modelWrapper: { position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  modelContainer: { position: 'relative', width: '100%', height: '750px', background: '#f1f5f9', borderRadius: '32px', overflow: 'hidden', border: '2px solid rgba(0, 0, 0, 0.1)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' },
  iframe: { width: '100%', height: '100%', border: 'none' },
  svgOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 },
  dot: { position: 'absolute', width: '6px', height: '6px', background: '#38bdf8', borderRadius: '50%', border: '1px solid white', transform: 'translate(-50%, -50%)', zIndex: 10 },
  label: { position: 'absolute', background: '#000000', color: '#ffffff', padding: '4px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', zIndex: 15, boxShadow: '0 4px 6px rgba(0,0,0,0.3)', transition: 'all 0.05s linear', whiteSpace: 'nowrap' },
  labelIcon: { fontSize: '0.9rem' },
  tip: { marginTop: '1.5rem', color: '#94a3b8', fontSize: '0.85rem', background: 'rgba(255, 255, 255, 0.03)', padding: '0.6rem 1.2rem', borderRadius: '20px' },
  assessmentView: { width: '100%', display: 'flex', justifyContent: 'center', padding: '2rem 0' },
  assessmentCard: { background: 'rgba(255, 255, 255, 0.05)', padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.1)', maxWidth: '700px', width: '100%' },
  backBtn: { background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', marginBottom: '1rem', fontSize: '1rem' },
  assessmentTitle: { fontSize: '2rem', marginBottom: '2rem' },
  questionGroup: { marginBottom: '2.5rem' },
  questionLabel: { fontSize: '1.1rem', fontWeight: '600', color: '#cbd5e1', display: 'block', marginBottom: '1rem' },
  chipContainer: { display: 'flex', flexWrap: 'wrap', gap: '0.8rem' },
  chip: { padding: '0.7rem 1.2rem', borderRadius: '12px', border: '1px solid', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.9rem', fontWeight: '600', outline: 'none' },
  sliderContainer: { display: 'flex', alignItems: 'center', gap: '1.5rem' },
  sliderVal: { background: '#38bdf8', color: '#0f172a', padding: '0.4rem 0.8rem', borderRadius: '8px', fontWeight: 'bold' },
  slider: { flex: 1, height: '6px', borderRadius: '5px', background: '#334155', outline: 'none' },
  textarea: { width: '100%', height: '120px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '1rem', color: '#f8fafc', marginTop: '0.5rem', outline: 'none', resize: 'none' },
  submitBtn: { width: '100%', padding: '1.2rem', background: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.2rem', marginTop: '1rem', boxShadow: '0 10px 20px -5px rgba(56, 189, 248, 0.4)' }
};

export default BodyMappingPage;
