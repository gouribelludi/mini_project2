import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  // Core Data States
  const [assessments, setAssessments] = useState([]);
  const [checklist, setChecklist] = useState({
    medication: false,
    sensory: false,
    stretching: false,
    hydration: false,
    sleep: false
  });
  const [meds, setMeds] = useState({
    gabapentin: { name: 'Gabapentin (300mg)', time: 'Morning', taken: false, takenTime: null },
    pregabalin: { name: 'Pregabalin (75mg)', time: 'Evening', taken: false, takenTime: null },
    amitriptyline: { name: 'Amitriptyline (10mg)', time: 'Night', taken: false, takenTime: null }
  });
  const [sleepRating, setSleepRating] = useState(4); // default 4/5 stars
  const [hoveredBar, setHoveredBar] = useState(null);
  const [isEditingMeds, setIsEditingMeds] = useState(false);
  const [tempMeds, setTempMeds] = useState([]);

  const todayStr = new Date().toDateString();

  // Load user data on mount/user change
  useEffect(() => {
    if (currentUser) {
      // 1. Load assessment history
      const historyKey = `assessments_${currentUser.email}`;
      const savedAssessments = localStorage.getItem(historyKey);
      if (savedAssessments) {
        setAssessments(JSON.parse(savedAssessments));
      }

      // 2. Load checklist state for today
      const checklistKey = `checklist_${currentUser.email}_${todayStr}`;
      const savedChecklist = localStorage.getItem(checklistKey);
      if (savedChecklist) {
        setChecklist(JSON.parse(savedChecklist));
      }

      // 3. Load medication master list and combine with today's log
      const masterKey = `meds_master_${currentUser.email}`;
      let savedMaster = localStorage.getItem(masterKey);
      let masterList = [];

      const medsKey = `meds_${currentUser.email}_${todayStr}`;
      const savedMeds = localStorage.getItem(medsKey);
      let todayLogs = savedMeds ? JSON.parse(savedMeds) : {};

      if (savedMaster) {
        masterList = JSON.parse(savedMaster);
      } else {
        // If master doesn't exist, try to construct it from today's saved meds if available
        if (savedMeds) {
          const parsedMeds = JSON.parse(savedMeds);
          masterList = Object.keys(parsedMeds).map(key => ({
            id: key,
            name: parsedMeds[key].name,
            time: parsedMeds[key].time
          }));
        } else {
          // fallback to default three
          masterList = [
            { id: 'gabapentin', name: 'Gabapentin (300mg)', time: 'Morning' },
            { id: 'pregabalin', name: 'Pregabalin (75mg)', time: 'Evening' },
            { id: 'amitriptyline', name: 'Amitriptyline (10mg)', time: 'Night' }
          ];
        }
        localStorage.setItem(masterKey, JSON.stringify(masterList));
      }

      // Combine masterList with todayLogs
      const combinedMeds = {};
      masterList.forEach(m => {
        combinedMeds[m.id] = {
          name: m.name,
          time: m.time,
          taken: todayLogs[m.id]?.taken || false,
          takenTime: todayLogs[m.id]?.takenTime || null
        };
      });
      setMeds(combinedMeds);

      // 4. Load sleep rating
      const sleepKey = `sleep_${currentUser.email}_${todayStr}`;
      const savedSleep = localStorage.getItem(sleepKey);
      if (savedSleep) {
        setSleepRating(Number(savedSleep));
      }
    }
  }, [currentUser, todayStr]);

  // Handler for checklist change
  const handleChecklistChange = (key) => {
    const updated = { ...checklist, [key]: !checklist[key] };
    setChecklist(updated);
    if (currentUser) {
      localStorage.setItem(`checklist_${currentUser.email}_${todayStr}`, JSON.stringify(updated));
    }
  };

  // Handler for medication logging
  const handleLogMed = (medKey) => {
    const timeNow = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const updatedMeds = {
      ...meds,
      [medKey]: {
        ...meds[medKey],
        taken: true,
        takenTime: timeNow
      }
    };
    setMeds(updatedMeds);
    if (currentUser) {
      localStorage.setItem(`meds_${currentUser.email}_${todayStr}`, JSON.stringify(updatedMeds));
    }

    // Automatically check off "medication" in checklist if all/any meds are taken
    // For simplicity, taking any medication checks it off
    if (!checklist.medication) {
      handleChecklistChange('medication');
    }
  };

  // Handler for Sleep Rating Change
  const handleSleepRating = (rating) => {
    setSleepRating(rating);
    if (currentUser) {
      localStorage.setItem(`sleep_${currentUser.email}_${todayStr}`, rating.toString());
    }
    // Check off sleep log in checklist
    if (!checklist.sleep) {
      handleChecklistChange('sleep');
    }
  };

  const handleStartEditMeds = () => {
    if (currentUser) {
      const masterKey = `meds_master_${currentUser.email}`;
      const savedMaster = localStorage.getItem(masterKey);
      let masterList = [];
      if (savedMaster) {
        masterList = JSON.parse(savedMaster);
      } else {
        masterList = Object.keys(meds).map(k => ({
          id: k,
          name: meds[k].name,
          time: meds[k].time
        }));
      }
      setTempMeds(masterList);
      setIsEditingMeds(true);
    }
  };

  const handleAddTempMed = () => {
    const newId = `med_${Date.now()}`;
    setTempMeds([
      ...tempMeds,
      { id: newId, name: '', time: 'Morning' }
    ]);
  };

  const handleUpdateTempMed = (id, field, value) => {
    setTempMeds(
      tempMeds.map(m => m.id === id ? { ...m, [field]: value } : m)
    );
  };

  const handleRemoveTempMed = (id) => {
    setTempMeds(tempMeds.filter(m => m.id !== id));
  };

  const handleSaveMeds = () => {
    const invalid = tempMeds.some(m => !m.name.trim());
    if (invalid) {
      alert('Please enter a name for all medications.');
      return;
    }

    if (currentUser) {
      const masterKey = `meds_master_${currentUser.email}`;
      localStorage.setItem(masterKey, JSON.stringify(tempMeds));

      const medsKey = `meds_${currentUser.email}_${todayStr}`;
      const savedMeds = localStorage.getItem(medsKey);
      const todayLogs = savedMeds ? JSON.parse(savedMeds) : {};

      const updatedMeds = {};
      tempMeds.forEach(m => {
        const wasTaken = todayLogs[m.id]?.taken || false;
        const takenTime = todayLogs[m.id]?.takenTime || null;
        
        updatedMeds[m.id] = {
          name: m.name,
          time: m.time,
          taken: wasTaken,
          takenTime: takenTime
        };
      });

      setMeds(updatedMeds);
      localStorage.setItem(medsKey, JSON.stringify(updatedMeds));
    }

    setIsEditingMeds(false);
  };

  const handleCancelSaveMeds = () => {
    setIsEditingMeds(false);
    setTempMeds([]);
  };

  // Derived Values
  const totalTasks = Object.keys(checklist).length;
  const completedTasks = Object.values(checklist).filter(Boolean).length;
  const complianceScore = Math.round((completedTasks / totalTasks) * 100);

  const avgPain = assessments.length > 0
    ? (assessments.reduce((acc, curr) => acc + curr.painLevel, 0) / assessments.length).toFixed(1)
    : '0.0';

  const activeZones = assessments.length > 0
    ? new Set(assessments.map(a => a.bodyPart?.toLowerCase())).size
    : 0;

  // Active pain parts from the most recent 3 assessments
  const activePainParts = assessments.slice(0, 3).map(a => a.bodyPart?.toLowerCase() || '');

  // Pain trend (chronological order, max 7)
  const recentAssessments = [...assessments].reverse().slice(-7);

  // SVG Coordinates for Mini Body Map overlay
  const partCoordinates = {
    'head': [{ x: 50, y: 23 }],
    'neck': [{ x: 50, y: 33 }],
    'shoulders': [{ x: 38, y: 42 }, { x: 62, y: 42 }],
    'chest': [{ x: 50, y: 55 }],
    'upper back': [{ x: 50, y: 65 }],
    'lower back': [{ x: 50, y: 80 }],
    'hips': [{ x: 50, y: 95 }],
    'arms': [{ x: 34, y: 60 }, { x: 66, y: 60 }],
    'elbows': [{ x: 33, y: 70 }, { x: 67, y: 70 }],
    'wrists': [{ x: 31, y: 85 }, { x: 69, y: 85 }],
    'hands': [{ x: 30, y: 98 }, { x: 70, y: 98 }],
    'knees': [{ x: 42, y: 145 }, { x: 58, y: 145 }],
    'ankles': [{ x: 42, y: 180 }, { x: 58, y: 180 }],
    'feet': [{ x: 42, y: 198 }, { x: 58, y: 198 }]
  };

  // Get active highlight points
  const activeHighlights = [];
  activePainParts.forEach(part => {
    if (partCoordinates[part]) {
      partCoordinates[part].forEach(coord => {
        activeHighlights.push({ ...coord, name: part });
      });
    }
  });

  // Weather insight based on typical triggers
  const getAiRecommendation = () => {
    if (assessments.length === 0) {
      return {
        icon: '💡',
        text: 'Log your first pain assessment to receive tailored nerve-care guidelines and triggers analysis.'
      };
    }
    const latest = assessments[0];
    const bp = latest.bodyPart;
    const sens = latest.sensation?.toLowerCase() || '';

    if (sens.includes('burn')) {
      return {
        icon: '❄️',
        text: `For burning sensations logged in your ${bp}, try cool compression or aloe vera gel. Avoid direct ice which can worsen neuropathy.`
      };
    }
    if (sens.includes('pins') || sens.includes('shock')) {
      return {
        icon: '🔋',
        text: `Electric shock sensations in the ${bp} suggest high nerve activity. Light, rhythmic massage or warm magnesium baths can help soothe nerve fibers.`
      };
    }
    return {
      icon: '🌿',
      text: `Sensory changes in the ${bp} reported. Daily stretching of limbs and hydration reduces tightness around the peripheral nerves.`
    };
  };

  const aiRec = getAiRecommendation();

  const handleDownloadCSV = () => {
    if (!currentUser) return;

    // Helper to format string values for CSV
    const csvCell = (val) => {
      if (val === null || val === undefined) return '';
      let str = String(val);
      str = str.replace(/"/g, '""');
      if (str.includes(',') || str.includes('\n') || str.includes('"')) {
        return `"${str}"`;
      }
      return str;
    };

    let csvContent = '';

    // 1. User Information
    csvContent += '=== USER INFORMATION ===\n';
    csvContent += 'Name,Email,Export Date\n';
    csvContent += `${csvCell(currentUser.name)},${csvCell(currentUser.email)},${csvCell(new Date().toLocaleString())}\n\n`;

    // 2. Today's Dashboard & Trackers Report
    csvContent += `=== TODAY'S REPORT (${todayStr}) ===\n`;
    csvContent += 'Metric,Value,Target/Details\n';
    
    // Read current trackers from localStorage
    const waterVal = localStorage.getItem(`water_${currentUser.email}_${todayStr}`) || '1.5';
    const sleepHoursVal = localStorage.getItem(`sleep_hours_${currentUser.email}_${todayStr}`) || '7.0';
    const moodVal = localStorage.getItem(`mood_${currentUser.email}_${todayStr}`);
    const moodLabels = ['Awful', 'Bad', 'Neutral', 'Good', 'Excellent'];
    const moodText = moodVal !== null ? moodLabels[Number(moodVal)] : 'Good';

    csvContent += `Water Intake,${csvCell(waterVal)} Liters,Target: 3.0 Liters\n`;
    csvContent += `Sleep Duration,${csvCell(sleepHoursVal)} Hours,Target: 8.0 Hours\n`;
    csvContent += `Mood Rating,${csvCell(moodText)},(Scale: Awful to Excellent)\n`;
    csvContent += `Sleep Quality Star Rating,${csvCell(sleepRating)} / 5,⭐\n`;
    csvContent += `AI Care Compliance,${csvCell(complianceScore)}%,Based on checklist completion\n\n`;

    // 3. Today's Medication Logs
    csvContent += `=== TODAY'S MEDICATION INTAKE LOG ===\n`;
    csvContent += 'Medication Name,Scheduled Time,Status,Logged Time\n';
    Object.keys(meds).forEach(k => {
      const med = meds[k];
      const status = med.taken ? 'Taken' : 'Pending';
      const loggedTime = med.takenTime ? med.takenTime : '';
      csvContent += `${csvCell(med.name)},${csvCell(med.time)},${csvCell(status)},${csvCell(loggedTime)}\n`;
    });
    csvContent += '\n';

    // 4. Today's Checklist Completion
    csvContent += `=== TODAY'S SELF-CARE CHECKLIST ===\n`;
    csvContent += 'Activity Description,Status\n';
    const checklistItems = [
      { key: 'medication', label: 'Took Nerve Pain Medication' },
      { key: 'sensory', label: 'Hand/Foot Sensory Inspection' },
      { key: 'stretching', label: '15-Min Gentle Stretching' },
      { key: 'hydration', label: 'Hydrated 8 Cups of Water' },
      { key: 'sleep', label: 'Logged Sleep Quality' }
    ];
    checklistItems.forEach(item => {
      const status = checklist[item.key] ? 'Completed' : 'Not Completed';
      csvContent += `${csvCell(item.label)},${csvCell(status)}\n`;
    });
    csvContent += '\n';

    // 5. Today's AI Suggestion
    csvContent += `=== TODAY'S AI CARE INSIGHT ===\n`;
    csvContent += 'Recommendation\n';
    csvContent += `${csvCell(aiRec.text)}\n\n`;

    // 6. All Historical Pain Assessments
    csvContent += '=== ALL HISTORICAL PAIN ASSESSMENTS ===\n';
    csvContent += 'Date,Body Part,Pain Sensation,Pain Level (0-10),Associated Triggers,Notes\n';
    if (assessments.length === 0) {
      csvContent += 'No pain assessments logged yet.,,,,\n';
    } else {
      assessments.forEach(item => {
        csvContent += `${csvCell(item.date)},${csvCell(item.bodyPart)},${csvCell(item.sensation)},${csvCell(item.painLevel)},${csvCell(item.triggers || '')},${csvCell(item.notes || '')}\n`;
      });
    }

    // Trigger CSV download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `neuropain_care_report_${currentUser.name.replace(/\s+/g, '_')}_${todayStr.replace(/\s+/g, '_')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Health <span style={styles.highlight}>Dashboard</span></h1>
          <p style={styles.subtitle}>Welcome back, {currentUser?.name || 'User'}. Here is your neuropathic health summary.</p>
        </div>
        <button onClick={handleDownloadCSV} style={styles.downloadBtn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export CSV Report
        </button>
      </header>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        {/* Avg Pain Level Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} style={styles.statCard}>
          <div style={styles.statHeader}>
            <span style={styles.statIcon}>📉</span>
            <span style={{ ...styles.statChange, color: '#34d399' }}>Avg. Score</span>
          </div>
          <div style={styles.statValue}>{avgPain}</div>
          <div style={styles.statLabel}>Avg. Pain Level</div>
        </motion.div>

        {/* Active Zones Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={styles.statCard}>
          <div style={styles.statHeader}>
            <span style={styles.statIcon}>📍</span>
            <span style={{ ...styles.statChange, color: '#fbbf24' }}>Recent Spots</span>
          </div>
          <div style={styles.statValue}>{activeZones}</div>
          <div style={styles.statLabel}>Active Pain Zones</div>
        </motion.div>

        {/* Sleep Quality Interactive Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={styles.statCard}>
          <div style={styles.statHeader}>
            <span style={styles.statIcon}>😴</span>
            <span style={{ ...styles.statChange, color: '#818cf8' }}>Rate Quality</span>
          </div>
          <div style={styles.sleepStars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleSleepRating(star)}
                style={{
                  ...styles.star,
                  color: star <= sleepRating ? '#a78bfa' : '#475569'
                }}
              >
                ★
              </span>
            ))}
          </div>
          <div style={styles.statLabel}>Sleep Rating ({sleepRating}/5)</div>
        </motion.div>

        {/* AI Compliance Dynamic Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={styles.statCard}>
          <div style={styles.statHeader}>
            <span style={styles.statIcon}>🤖</span>
            <span style={{ ...styles.statChange, color: '#38bdf8' }}>Today</span>
          </div>
          <div style={styles.statValue}>{complianceScore}%</div>
          <div style={styles.statLabel}>AI Care Compliance</div>
        </motion.div>
      </div>

      {/* Main Layout Grid */}
      <div style={styles.mainGrid}>
        
        {/* Left Column (2fr): Pain Trends and Medication Logs */}
        <div style={styles.leftColumn}>
          
          {/* Pain Trends Chart */}
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h2 style={styles.cardTitle}>Pain Level Trend (7 Days)</h2>
              {assessments.length > 0 && <span style={styles.chartInfo}>Hover bars for details</span>}
            </div>
            
            {assessments.length === 0 ? (
              <div style={styles.chartEmpty}>
                <p>No pain assessments logged recently.</p>
                <Link to="/body-mapping" style={styles.chartBtn}>Complete Pain Assessment</Link>
              </div>
            ) : (
              <div style={styles.chartOuter}>
                <div style={styles.chartContainer}>
                  {/* Y-axis lines */}
                  <div style={styles.chartGridlines}>
                    <div style={styles.gridlineRow}><span style={styles.gridlineText}>10</span></div>
                    <div style={styles.gridlineRow}><span style={styles.gridlineText}>5</span></div>
                    <div style={styles.gridlineRow}><span style={styles.gridlineText}>1</span></div>
                  </div>

                  <div style={styles.chartBars}>
                    {recentAssessments.map((item, i) => (
                      <div 
                        key={i} 
                        style={styles.chartColumn}
                        onMouseEnter={() => setHoveredBar(i)}
                        onMouseLeave={() => setHoveredBar(null)}
                      >
                        <div style={styles.barWrapper}>
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${item.painLevel * 10}%` }}
                            style={{ 
                              ...styles.bar, 
                              background: item.painLevel >= 7 
                                ? 'linear-gradient(180deg, #f87171 0%, #ef4444 100%)' 
                                : item.painLevel >= 4 
                                ? 'linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%)' 
                                : 'linear-gradient(180deg, #38bdf8 0%, #2563eb 100%)',
                              boxShadow: item.painLevel >= 7 
                                ? '0 4px 10px rgba(239, 68, 68, 0.3)' 
                                : '0 4px 10px rgba(56, 189, 248, 0.3)'
                            }}
                          />
                          
                          {/* Tooltip on hover */}
                          <AnimatePresence>
                            {hoveredBar === i && (
                              <motion.div 
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                style={styles.tooltip}
                              >
                                <div style={styles.tooltipTitle}>{item.bodyPart}</div>
                                <div style={styles.tooltipText}>Pain: <strong>{item.painLevel}/10</strong></div>
                                <div style={styles.tooltipText}>{item.sensation}</div>
                                <div style={styles.tooltipDate}>{item.date}</div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <span style={styles.chartDay}>{item.date.split(',')[0]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Smart Medication Tracker */}
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} style={styles.medCard}>
            <div style={styles.medCardHeader}>
              <div>
                <h2 style={styles.cardTitle}>Smart Medication Tracker</h2>
                <p style={styles.cardSubtitle}>Log your prescribed neural painkillers. Adherence directly boosts compliance.</p>
              </div>
              {!isEditingMeds && (
                <button onClick={handleStartEditMeds} style={styles.editBtn}>
                  Edit List
                </button>
              )}
            </div>
            
            {isEditingMeds ? (
              <div style={styles.editFormContainer}>
                <div style={styles.tempMedList}>
                  {tempMeds.map((med) => (
                    <div key={med.id} style={styles.editMedItem}>
                      <input
                        type="text"
                        value={med.name}
                        onChange={(e) => handleUpdateTempMed(med.id, 'name', e.target.value)}
                        placeholder="Medication name & dosage"
                        style={styles.editInput}
                      />
                      <select
                        value={med.time}
                        onChange={(e) => handleUpdateTempMed(med.id, 'time', e.target.value)}
                        style={styles.editSelect}
                      >
                        <option value="Morning" style={styles.option}>Morning</option>
                        <option value="Afternoon" style={styles.option}>Afternoon</option>
                        <option value="Evening" style={styles.option}>Evening</option>
                        <option value="Night" style={styles.option}>Night</option>
                      </select>
                      <button
                        onClick={() => handleRemoveTempMed(med.id)}
                        style={styles.deleteBtn}
                        title="Remove medication"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                
                <button onClick={handleAddTempMed} style={styles.addMedBtn}>
                  + Add Medication
                </button>
                
                <div style={styles.actionButtonGroup}>
                  <button onClick={handleSaveMeds} style={styles.saveBtn}>Save Changes</button>
                  <button onClick={handleCancelSaveMeds} style={styles.cancelBtn}>Cancel</button>
                </div>
              </div>
            ) : (
              <div style={styles.medList}>
                {Object.keys(meds).length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>
                    No medications added. Click "Edit List" to get started.
                  </div>
                ) : (
                  Object.keys(meds).map((key) => {
                    const med = meds[key];
                    return (
                      <div key={key} style={styles.medItem}>
                        <div style={styles.medInfo}>
                          <span style={styles.medBadge}>{med.time}</span>
                          <div style={styles.medDetails}>
                            <div style={styles.medName}>{med.name}</div>
                            <div style={styles.medStatusText}>
                              {med.taken 
                                ? `✓ Logged at ${med.takenTime}` 
                                : `⏰ Scheduled for ${med.time}`}
                            </div>
                          </div>
                        </div>
                        {med.taken ? (
                          <span style={styles.medLogged}>Taken</span>
                        ) : (
                          <button onClick={() => handleLogMed(key)} style={styles.medLogBtn}>Log Intake</button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </motion.div>

        </div>

        {/* Right Column (1fr): Daily Checklist & Mini Body Map */}
        <div style={styles.rightColumn}>
          
          {/* Daily Checklist Card */}
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }} style={styles.checklistCard}>
            <h2 style={styles.cardTitle}>Daily Self-Care Checklist</h2>
            <div style={styles.checklistProgress}>
              <div style={styles.progressHeader}>
                <span>Completed Tasks</span>
                <span>{completedTasks}/{totalTasks}</span>
              </div>
              <div style={styles.progressBarOuter}>
                <div style={{ ...styles.progressBarInner, width: `${complianceScore}%` }} />
              </div>
            </div>

            <div style={styles.checkList}>
              {[
                { key: 'medication', label: '💊 Took Nerve Pain Medication' },
                { key: 'sensory', label: '🦶 Hand/Foot Sensory Inspection' },
                { key: 'stretching', label: '🧘 15-Min Gentle Stretching' },
                { key: 'hydration', label: '💧 Hydrated 8 Cups of Water' },
                { key: 'sleep', label: '💤 Logged Sleep Quality' }
              ].map((item) => (
                <div key={item.key} style={styles.checkItem} onClick={() => handleChecklistChange(item.key)}>
                  <div style={{
                    ...styles.checkbox,
                    borderColor: checklist[item.key] ? '#38bdf8' : 'rgba(255, 255, 255, 0.2)',
                    background: checklist[item.key] ? '#38bdf8' : 'transparent'
                  }}>
                    {checklist[item.key] && <span style={styles.checkMark}>✓</span>}
                  </div>
                  <span style={{
                    ...styles.checkLabel,
                    textDecoration: checklist[item.key] ? 'line-through' : 'none',
                    color: checklist[item.key] ? '#64748b' : '#f8fafc'
                  }}>{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Mini Body Map Pain Zone Visualizer */}
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} style={styles.miniBodyCard}>
            <h2 style={styles.cardTitle}>Current Pain Map</h2>
            <p style={styles.cardSubtitle}>Active spots from your recent reports.</p>
            
            <div style={styles.bodyViewerContainer}>
              <div style={styles.svgWrapper}>
                <svg viewBox="0 0 100 220" style={styles.miniBodySvg}>
                  {/* Human Head Silhouette */}
                  <path d="M50,15 A8,8 0 1,0 50,31 A8,8 0 1,0 50,15 Z" fill="#334155" />
                  {/* Human Body/Limbs Silhouette */}
                  <path d="M47,33 C42,34 38,36 34,39 L32,58 C31,64 36,68 40,66 L42,50 L42,95 L34,145 L36,195 C36,200 44,200 44,195 L46,148 L50,115 L54,148 L58,195 C58,200 66,200 66,195 L68,145 L60,95 L60,50 L62,66 C66,68 71,64 70,58 L68,39 C64,36 60,34 55,33 Z" fill="#334155" />
                  
                  {/* Overlay glowing circles on active pain points */}
                  {activeHighlights.map((hl, index) => (
                    <g key={index}>
                      <circle 
                        cx={hl.x} 
                        cy={hl.y} 
                        r="8" 
                        fill="#ef4444" 
                        opacity="0.4"
                        style={{ transformOrigin: `${hl.x}px ${hl.y}px` }}
                      >
                        <animate attributeName="r" values="5;12;5" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <circle cx={hl.x} cy={hl.y} r="3" fill="#ef4444" />
                    </g>
                  ))}
                </svg>
              </div>

              <div style={styles.bodyViewerLabels}>
                <div style={styles.bodyHelpText}>
                  {activeHighlights.length > 0 ? (
                    <>
                      <div style={styles.activeSpotHeading}>Glowing Pain Spots:</div>
                      <div style={styles.activeSpotList}>
                        {Array.from(new Set(activePainParts)).map((part, index) => (
                          <span key={index} style={styles.activeSpotBadge}>{part}</span>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div style={styles.noSpotsText}>No active pain spots registered. Complete a mapping assessment to view spots.</div>
                  )}
                </div>
                <Link to="/body-mapping" style={styles.bodyMapLink}>Update Body Map</Link>
              </div>
            </div>
          </motion.div>

          {/* AI Care Insights Card */}
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 }} style={styles.aiInsightsCard}>
            <h2 style={styles.cardTitle}>AI Care Insights</h2>
            <div style={styles.aiInsightItem}>
              <span style={styles.aiInsightIcon}>{aiRec.icon}</span>
              <p style={styles.aiInsightText}>{aiRec.text}</p>
            </div>
            <Link to="/chatbot" style={styles.askAiLink}>Ask AI chatbot for details →</Link>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '4rem 2rem',
    background: '#0f172a',
    color: '#f8fafc',
    minHeight: '100vh',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4rem',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto 4rem auto',
    flexWrap: 'wrap',
    gap: '2rem'
  },
  headerLeft: {
    flex: 1,
    minWidth: '280px'
  },
  downloadBtn: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '0.8rem 1.6rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.25)',
    fontSize: '0.95rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    outline: 'none'
  },
  title: {
    fontSize: '3rem',
    fontWeight: '800',
    margin: 0
  },
  highlight: {
    color: '#38bdf8'
  },
  subtitle: {
    color: '#94a3b8',
    marginTop: '0.75rem',
    fontSize: '1.1rem'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.5rem',
    maxWidth: '1200px',
    margin: '0 auto 3rem auto'
  },
  statCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    padding: '1.8rem',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)'
  },
  statHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.8rem'
  },
  statIcon: {
    fontSize: '1.5rem'
  },
  statChange: {
    fontSize: '0.8rem',
    fontWeight: '700'
  },
  statValue: {
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '0.4rem',
    color: '#f8fafc'
  },
  statLabel: {
    color: '#64748b',
    fontSize: '0.85rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  sleepStars: {
    display: 'flex',
    gap: '0.2rem',
    margin: '0.8rem 0 1.2rem 0'
  },
  star: {
    fontSize: '1.8rem',
    cursor: 'pointer',
    transition: 'color 0.2s',
    userSelect: 'none'
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    alignItems: 'start'
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },
  chartCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    padding: '2.5rem',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)'
  },
  chartHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  cardTitle: {
    fontSize: '1.4rem',
    fontWeight: '700',
    margin: 0,
    color: '#f8fafc'
  },
  chartInfo: {
    fontSize: '0.8rem',
    color: '#64748b'
  },
  chartEmpty: {
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.2rem',
    color: '#94a3b8'
  },
  chartBtn: {
    padding: '0.8rem 1.6rem',
    background: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
    color: 'white',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    boxShadow: '0 10px 15px -3px rgba(56, 189, 248, 0.3)'
  },
  chartOuter: {
    position: 'relative',
    height: '250px'
  },
  chartContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: '2.5rem',
    position: 'relative'
  },
  chartGridlines: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    pointerEvents: 'none',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
  },
  gridlineRow: {
    borderTop: '1px dashed rgba(255, 255, 255, 0.05)',
    width: '100%',
    height: '1px'
  },
  gridlineText: {
    position: 'absolute',
    left: '-20px',
    fontSize: '0.75rem',
    color: '#475569',
    transform: 'translateY(-50%)'
  },
  chartBars: {
    flex: 1,
    height: '80%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    zIndex: 10
  },
  chartColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.8rem',
    height: '100%',
    justifyContent: 'flex-end'
  },
  barWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: '45px',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  bar: {
    width: '100%',
    borderRadius: '6px 6px 0 0',
    cursor: 'pointer'
  },
  chartDay: {
    fontSize: '0.75rem',
    color: '#64748b'
  },
  tooltip: {
    position: 'absolute',
    bottom: '105%',
    background: 'rgba(15, 23, 42, 0.95)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '12px',
    padding: '0.8rem 1rem',
    width: '130px',
    color: '#f8fafc',
    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
    zIndex: 100,
    pointerEvents: 'none',
    backdropFilter: 'blur(5px)'
  },
  tooltipTitle: {
    fontWeight: 'bold',
    fontSize: '0.9rem',
    color: '#38bdf8',
    marginBottom: '0.2rem'
  },
  tooltipText: {
    fontSize: '0.8rem',
    color: '#cbd5e1',
    lineHeight: '1.3'
  },
  tooltipDate: {
    fontSize: '0.7rem',
    color: '#64748b',
    marginTop: '0.4rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    paddingTop: '0.2rem'
  },
  medCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    padding: '2.5rem',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)'
  },
  cardSubtitle: {
    color: '#64748b',
    fontSize: '0.9rem',
    margin: '0.25rem 0 2rem 0'
  },
  medList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  medItem: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    padding: '1.2rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  medInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem'
  },
  medBadge: {
    background: 'rgba(56, 189, 248, 0.1)',
    color: '#38bdf8',
    padding: '0.4rem 0.8rem',
    borderRadius: '8px',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  },
  medDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem'
  },
  medName: {
    fontSize: '1rem',
    fontWeight: '600'
  },
  medStatusText: {
    fontSize: '0.8rem',
    color: '#64748b'
  },
  medLogged: {
    color: '#34d399',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    background: 'rgba(52, 211, 153, 0.1)',
    padding: '0.5rem 1rem',
    borderRadius: '10px'
  },
  medLogBtn: {
    background: 'transparent',
    border: '1px solid #38bdf8',
    color: '#38bdf8',
    padding: '0.5rem 1rem',
    borderRadius: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.85rem',
    transition: 'all 0.2s'
  },
  checklistCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    padding: '2rem',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)'
  },
  checklistProgress: {
    marginBottom: '1.8rem',
    background: 'rgba(255, 255, 255, 0.02)',
    padding: '1rem',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.04)'
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.85rem',
    color: '#94a3b8',
    marginBottom: '0.5rem',
    fontWeight: 'bold'
  },
  progressBarOuter: {
    height: '6px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  progressBarInner: {
    height: '100%',
    background: 'linear-gradient(90deg, #38bdf8, #818cf8)',
    borderRadius: '10px',
    transition: 'width 0.3s ease-out'
  },
  checkList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem'
  },
  checkItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    background: 'rgba(255, 255, 255, 0.01)',
    padding: '0.9rem 1.2rem',
    borderRadius: '14px',
    cursor: 'pointer',
    border: '1px solid transparent',
    transition: 'all 0.2s',
    ':hover': {
      border: '1px solid rgba(255, 255, 255, 0.08)',
      background: 'rgba(255, 255, 255, 0.02)'
    }
  },
  checkbox: {
    width: '20px',
    height: '20px',
    borderRadius: '6px',
    border: '2px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s'
  },
  checkMark: {
    color: '#0f172a',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  },
  checkLabel: {
    fontSize: '0.95rem',
    fontWeight: '500',
    transition: 'color 0.2s'
  },
  miniBodyCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    padding: '2rem',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)'
  },
  bodyViewerContainer: {
    display: 'flex',
    gap: '1.5rem',
    marginTop: '1rem'
  },
  svgWrapper: {
    background: 'rgba(15, 23, 42, 0.4)',
    borderRadius: '16px',
    padding: '0.8rem',
    width: '120px',
    display: 'flex',
    justifyContent: 'center'
  },
  miniBodySvg: {
    width: '90px',
    height: '200px'
  },
  bodyViewerLabels: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  bodyHelpText: {
    fontSize: '0.85rem',
    color: '#94a3b8',
    lineHeight: '1.4'
  },
  activeSpotHeading: {
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: '0.5rem'
  },
  activeSpotList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.4rem'
  },
  activeSpotBadge: {
    background: 'rgba(239, 68, 68, 0.1)',
    color: '#f87171',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    padding: '0.2rem 0.5rem',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  noSpotsText: {
    color: '#475569',
    fontSize: '0.8rem',
    fontStyle: 'italic'
  },
  bodyMapLink: {
    color: '#38bdf8',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '0.85rem',
    alignSelf: 'flex-start',
    borderBottom: '1px solid transparent',
    transition: 'border 0.2s',
    ':hover': {
      borderBottom: '1px solid #38bdf8'
    }
  },
  aiInsightsCard: {
    background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(37, 99, 235, 0.08) 100%)',
    padding: '2rem',
    borderRadius: '24px',
    border: '1px solid rgba(56, 189, 248, 0.15)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)'
  },
  aiInsightItem: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start',
    marginBottom: '1.5rem'
  },
  aiInsightIcon: {
    fontSize: '1.8rem'
  },
  aiInsightText: {
    fontSize: '0.9rem',
    color: '#cbd5e1',
    margin: 0,
    lineHeight: '1.5'
  },
  askAiLink: {
    color: '#38bdf8',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '0.85rem'
  },
  medCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '2rem'
  },
  editBtn: {
    background: 'rgba(56, 189, 248, 0.1)',
    border: '1px solid rgba(56, 189, 248, 0.2)',
    color: '#38bdf8',
    padding: '0.5rem 1rem',
    borderRadius: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '0.85rem'
  },
  editFormContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  tempMedList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  editMedItem: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    padding: '1rem 1.2rem'
  },
  editInput: {
    flex: 1,
    background: 'rgba(15, 23, 42, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    padding: '0.6rem 1rem',
    color: '#f8fafc',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  editSelect: {
    background: 'rgba(15, 23, 42, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    padding: '0.6rem 1rem',
    color: '#f8fafc',
    fontSize: '0.95rem',
    outline: 'none',
    cursor: 'pointer'
  },
  option: {
    background: '#1e293b',
    color: '#f8fafc'
  },
  deleteBtn: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: '10px',
    padding: '0.6rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s'
  },
  addMedBtn: {
    alignSelf: 'flex-start',
    background: 'transparent',
    border: '1px dashed #38bdf8',
    color: '#38bdf8',
    padding: '0.6rem 1.2rem',
    borderRadius: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.2s'
  },
  actionButtonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  },
  saveBtn: {
    background: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '0.8rem 1.8rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(56, 189, 248, 0.25)',
    fontSize: '0.95rem'
  },
  cancelBtn: {
    background: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#f8fafc',
    borderRadius: '12px',
    padding: '0.8rem 1.8rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'all 0.2s'
  }
};

export default DashboardPage;
