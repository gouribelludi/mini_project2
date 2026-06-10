import os
from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        if self.page_no() > 1:
            self.set_font('Helvetica', 'B', 8)
            self.set_text_color(100, 116, 139)
            self.cell(0, 10, 'NEUROPAIN CARE AI -- CHATBOT TRAINING KNOWLEDGE BASE', border=0, align='L')
            self.set_x(-40)
            self.cell(0, 10, '500 Q&As', border=0, align='R')
            self.line(15, 22, 195, 22)
            self.ln(8)

    def footer(self):
        self.set_y(-15)
        self.set_font('Helvetica', 'I', 8)
        self.set_text_color(148, 163, 184)
        self.cell(0, 10, f'Page {self.page_no()}', border=0, align='C')

def create_pdf():
    pdf = PDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.set_margins(15, 25, 15)
    
    # Title Page / First Page Header
    pdf.add_page()
    pdf.set_y(20)
    pdf.set_font('Helvetica', 'B', 22)
    pdf.set_text_color(15, 23, 42) # Slate 900
    pdf.cell(0, 15, 'NeuroPain Care AI', new_x='LMARGIN', new_y='NEXT', align='C')
    
    pdf.set_font('Helvetica', 'B', 14)
    pdf.set_text_color(2, 132, 199) # Sky 600
    pdf.cell(0, 10, 'Chatbot Training Knowledge Base & 500 Q&As', new_x='LMARGIN', new_y='NEXT', align='C')
    pdf.ln(5)
    
    # Horizontal line
    pdf.set_draw_color(226, 232, 240)
    pdf.set_line_width(0.5)
    pdf.line(15, 52, 195, 52)
    pdf.ln(10)
    
    # Introduction Section
    pdf.set_font('Helvetica', 'B', 12)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(0, 8, 'Instructions for Botpress Training:', new_x='LMARGIN', new_y='NEXT')
    
    pdf.set_font('Helvetica', '', 10)
    pdf.set_text_color(51, 65, 85) # Slate 700
    intro_text = (
        "This document contains a comprehensive set of 500 training questions and answers "
        "designed specifically for the NeuroPain Care AI chatbot in Botpress. It is organized "
        "into 50 core topics spanning application features, pain symptoms, self-care strategies, "
        "and medical resources. For each topic, a detailed reference answer is provided, "
        "along with 10 natural language question variations (totaling 500 questions).\n\n"
        "To train your Botpress chatbot:\n"
        "1. Open your Botpress Cloud Dashboard and navigate to your chatbot project.\n"
        "2. Go to the 'Knowledge Bases' tab and click 'Create Knowledge Base'.\n"
        "3. Upload this generated PDF file as a Document Source.\n"
        "4. Botpress's AI engine will automatically chunk and index these Q&As, enabling your "
        "chatbot to answer questions matching any of the 500 variations or similar user intents."
    )
    pdf.multi_cell(180, 5.5, intro_text)
    pdf.ln(10)
    
    # Topics Data Definition
    topics = [
        # --- CATEGORY 1: APPLICATION FEATURES (Topics 1 - 15) ---
        {
            "category": "Application Features & Navigation",
            "title": "NeuroPain Care AI Application Overview",
            "answer": "NeuroPain Care AI is a specialized web application designed to help patients manage chronic neuropathic pain. Its core features include interactive 3D body mapping, automated AI pain assessments, daily health tracking (sleep, water, and mood), real-time progress analytics, and location-based emergency medical assistance.",
            "questions": [
                "What is NeuroPain Care AI?",
                "What does this app do?",
                "Can you tell me about this application?",
                "What are the features of NeuroPain Care AI?",
                "How does this platform help with chronic pain?",
                "What is the purpose of this website?",
                "Explain what NeuroPain Care AI is.",
                "What services does this app provide?",
                "Can you give me an overview of this app?",
                "What can I do on this platform?"
            ]
        },
        {
            "category": "Application Features & Navigation",
            "title": "Interactive 3D Body Mapping Feature",
            "answer": "The Interactive 3D Body Mapping feature allows users to visually locate and log their pain. It displays a 3D human model that can be rotated by dragging. Labeled pain zones (including Head, Neck, Shoulders, Chest, Upper Back, Lower Back, Hips, Elbows, Wrists, Hands, Knees, Ankles, and Feet) can be clicked to select the area and launch a pain assessment.",
            "questions": [
                "How do I use the 3D body map?",
                "What is 3D Body Mapping?",
                "Can I select where it hurts on a 3D model?",
                "How does the interactive body map work?",
                "How do I rotate the 3D body model?",
                "How do I select a pain zone?",
                "What parts of the body can I select on the 3D map?",
                "Where do I find the 3D mapping feature?",
                "Explain the 3D body mapping page.",
                "How do I log pain using the 3D model?"
            ]
        },
        {
            "category": "Application Features & Navigation",
            "title": "Step-by-Step Pain Assessment Form",
            "answer": "The Pain Assessment is a structured 3-step form. In Step 1, you select or type the body part in pain. In Step 2, you select what the pain feels like (such as burning, stabbing, tingling, or electric shocks), note when it is worst (morning, night, all day, or moving), and rate the intensity from 1 to 10. In Step 3, you add any extra notes before getting your AI-generated Care Plan.",
            "questions": [
                "How do I complete a pain assessment?",
                "What is the step-by-step pain assessment?",
                "How many steps are in the pain assessment form?",
                "What details do I need to provide in the pain assessment?",
                "How do I rate my pain level?",
                "Can I enter custom pain details?",
                "What is the pain assessment process?",
                "How do I start the pain assessment?",
                "What questions are asked in the pain assessment?",
                "How do I get my AI results?"
            ]
        },
        {
            "category": "Application Features & Navigation",
            "title": "AI Care Plan Suggestions",
            "answer": "After completing a pain assessment, the application generates a personalized AI Care Plan. This plan includes immediate relief recommendations (such as warm compresses or nerve glides) and long-term lifestyle adjustments (including sleep goals, hydration targets, and anti-inflammatory food suggestions) tailored to your symptoms.",
            "questions": [
                "What is the AI Care Plan?",
                "How do I get suggestions for my pain?",
                "Where do the pain management recommendations come from?",
                "What does the AI Care Plan contain?",
                "How are my recommendations generated?",
                "Where can I view my personalized suggestions?",
                "What kind of advice does the AI give?",
                "Is the Care Plan tailored to my pain?",
                "How do I access my pain suggestions?",
                "What suggestions will I get after assessment?"
            ]
        },
        {
            "category": "Application Features & Navigation",
            "title": "Dashboard Analytics & Progress Tracking",
            "answer": "The Dashboard Page displays real-time analytics and visualizations of your logged health metrics. It includes interactive progress charts showing your pain history over time, hydration tracking, sleep patterns, and daily mood logs, helping you identify correlations and track your recovery journey.",
            "questions": [
                "What is the dashboard page?",
                "How do I track my pain progress?",
                "Can I see my pain history?",
                "What analytics does the app offer?",
                "Where can I see charts of my health?",
                "What does the dashboard display?",
                "How do I monitor my metrics over time?",
                "Is there a history of my assessments?",
                "How do I view my progress charts?",
                "What reports are available on the dashboard?"
            ]
        },
        {
            "category": "Application Features & Navigation",
            "title": "Daily Water Intake Tracker",
            "answer": "The Water Intake Tracker allows you to monitor your daily hydration. You can log water in increments of 0.25 Liters towards a target of 3.0 Liters. Proper hydration is essential for cellular function and helps reduce the concentration of inflammatory markers that trigger nerve pain.",
            "questions": [
                "How do I track my water intake?",
                "What is the daily water target?",
                "How do I add water in the tracker?",
                "Why is hydration important for pain?",
                "Where is the water tracker?",
                "How much water should I drink daily?",
                "Can I log my water on the tracker page?",
                "What is the increment for logging water?",
                "How do I use the water tracker?",
                "What is the goal for water intake?"
            ]
        },
        {
            "category": "Application Features & Navigation",
            "title": "Daily Sleep Duration Tracker",
            "answer": "The Sleep Duration Tracker helps you log your nightly sleep hours in 0.5-hour increments. The default target is 8 hours. Tracking sleep is important because high-quality rest is critical for nerve recovery, tissue repair, and lowering overall pain sensitivity.",
            "questions": [
                "How do I log my sleep?",
                "What is the sleep target in the tracker?",
                "How do I add sleep hours?",
                "Why does sleep matter for pain?",
                "Where is the sleep tracker?",
                "How much sleep is recommended on the app?",
                "Can I log sleep duration?",
                "How do I use the sleep tracker?",
                "What is the increment for sleep logging?",
                "How does the sleep tracker work?"
            ]
        },
        {
            "category": "Application Features & Navigation",
            "title": "Daily Mood Tracker",
            "answer": "The Mood Tracker lets you record your emotional state daily, choosing from five levels: Awful, Bad, Neutral, Good, and Excellent. Tracking your mood is useful because stress, depression, and anxiety directly influence the brain's pain-processing centers, often amplifying physical symptoms.",
            "questions": [
                "How do I track my mood?",
                "What are the mood options?",
                "Where is the mood tracker?",
                "Why should I log my mood?",
                "How does mood affect neuropathic pain?",
                "What mood levels are available?",
                "How do I select my mood?",
                "Can I track my emotional state?",
                "What is the purpose of the mood tracker?",
                "How do I log my daily mood?"
            ]
        },
        {
            "category": "Application Features & Navigation",
            "title": "Emergency Assistance Finder",
            "answer": "The Emergency Page provides immediate assistance during severe pain crises. It includes a live map locating nearby emergency rooms and hospitals. The app attempts to auto-detect your location using GPS or IP geolocation, listing the nearest facilities, their distances in kilometers, and phone numbers.",
            "questions": [
                "What is the emergency page?",
                "How do I find nearby hospitals?",
                "What is the emergency assistance feature?",
                "How does the hospital locator work?",
                "Can I call a hospital from the app?",
                "How do I search for medical help?",
                "What should I do during a severe pain flare-up?",
                "Where is the emergency map?",
                "Does the app locate emergency rooms?",
                "How do I find help in an emergency?"
            ]
        },
        {
            "category": "Application Features & Navigation",
            "title": "SOS Map and Geolocation Search",
            "answer": "The emergency hospital locator map uses your browser's Geolocation API to center on your current position. If permission is denied, it falls back to an IP geolocation service. Additionally, you can use the manual search bar to type any city, state, or ZIP code to locate emergency rooms in that area.",
            "questions": [
                "How does the GPS location map work?",
                "Can I search for hospitals manually?",
                "What happens if GPS is disabled?",
                "How does the app find my location on the map?",
                "What mapping API is used?",
                "Can I center the map on a specific city?",
                "How do I auto-detect my location?",
                "What is the search bar on the emergency map for?",
                "How accurate is the hospital locator?",
                "What location services does the app use?"
            ]
        },
        {
            "category": "Application Features & Navigation",
            "title": "Offline Recommendations Fallback",
            "answer": "If the application cannot connect to the backend server during a pain assessment, it automatically switches to an offline fallback system. This displays default, evidence-based recommendations, including standard nerve stretches, thermal therapy guidelines, and lifestyle tips, ensuring you always receive guidance.",
            "questions": [
                "What happens if the server is offline?",
                "Does the app work without internet?",
                "What are offline recommendations?",
                "What suggestions do I get if the database fails?",
                "Can I get suggestions offline?",
                "What is the fallback care plan?",
                "How does the app handle connection errors?",
                "What advice is given when the server is down?",
                "Will I still get tips offline?",
                "Explain the offline fallback suggestions."
            ]
        },
        {
            "category": "Application Features & Navigation",
            "title": "User Registration and Login Flow",
            "answer": "Users can create an account on the Register Page using their email and a secure password. Once registered, logging in via the Login Page enables data persistence. Your trackers and historical pain assessments are saved under your user profile in local storage.",
            "questions": [
                "How do I create an account?",
                "How do I log in?",
                "Where is the register page?",
                "Why should I register?",
                "Do I need an account to use the trackers?",
                "How do I log in to my profile?",
                "Can I save my pain history?",
                "What credentials do I need to log in?",
                "How do I sign up?",
                "Is my login secure?"
            ]
        },
        {
            "category": "Application Features & Navigation",
            "title": "User Profile Page Management",
            "answer": "The Profile Page displays your account information, including your email, age, gender, and general settings. It also presents a summary of your health statistics, allows you to manage user preferences, and provides a logout button to securely close your session.",
            "questions": [
                "Where is the profile page?",
                "How do I view my account details?",
                "What information is in my profile?",
                "How do I log out?",
                "Can I edit my profile details?",
                "Where are my profile settings?",
                "What does the profile dashboard show?",
                "How do I see my user info?",
                "What preferences can I change?",
                "Where is the logout button?"
            ]
        },
        {
            "category": "Application Features & Navigation",
            "title": "Application Security and Protected Routes",
            "answer": "The application secures patient privacy by wrapping private views (such as the Dashboard, Assessment, Profile, and Trackers) in Protected Routes. If an unauthenticated user attempts to access these pages, the app automatically redirects them to the Login page.",
            "questions": [
                "Is my health data secure?",
                "Who can access the dashboard?",
                "Can anyone see my tracker data?",
                "What are protected routes?",
                "Why am I redirected to the login page?",
                "Is my personal information protected?",
                "How does the app secure my assessments?",
                "Can I view the app without logging in?",
                "How is user privacy handled?",
                "What page security is in place?"
            ]
        },
        {
            "category": "Application Features & Navigation",
            "title": "Navigation and Top Menu Bar",
            "answer": "You can navigate between all primary modules of NeuroPain Care AI using the top Navigation Bar. The navbar contains responsive links to Home, Dashboard, 3D Mapping, Health Trackers, Emergency Finder, AI Chatbot, and Profile. It highlights the page you are currently viewing.",
            "questions": [
                "How do I navigate the app?",
                "Where is the menu?",
                "What pages can I access?",
                "How do I go to the trackers?",
                "Where is the link to the emergency page?",
                "How do I return to the home page?",
                "What links are in the navigation bar?",
                "How do I switch between pages?",
                "Is there a navbar?",
                "Where can I access the chatbot page?"
            ]
        },

        # --- CATEGORY 2: NEUROPATHIC PAIN & SYMPTOMS (Topics 16 - 30) ---
        {
            "category": "Neuropathic Pain & Symptoms",
            "title": "Understanding Neuropathic Pain",
            "answer": "Neuropathic pain is chronic pain that arises from direct damage, injury, or disease affecting the somatosensory nervous system. Unlike typical tissue injury pain, neuropathic pain is caused by malfunctioning nerves that send incorrect, hypersensitive electrical signals directly to the brain.",
            "questions": [
                "What is neuropathic pain?",
                "Define neuropathy.",
                "How is nerve pain different from normal pain?",
                "What causes neuropathic pain?",
                "What does neuropathic mean?",
                "Explain the biology of nerve pain.",
                "What is somatosensory nerve damage?",
                "Why do nerves send false pain signals?",
                "What is chronic nerve pain?",
                "Is neuropathic pain permanent?"
            ]
        },
        {
            "category": "Neuropathic Pain & Symptoms",
            "title": "Burning Pain Sensations",
            "answer": "Burning pain is a primary symptom of neuropathy, often described as a hot, searing sensation on or beneath the skin. It occurs when specialized small nerve fibers (C-fibers) responsible for transmitting temperature signals are damaged, irritated, or hyperexcited.",
            "questions": [
                "What causes burning nerve pain?",
                "Why does my skin feel like it is burning?",
                "What does a burning sensation mean?",
                "How do I treat burning pain?",
                "Why does my neuropathy feel hot?",
                "Why does my foot feel like it is on fire?",
                "Explain burning neuropathy symptoms.",
                "How can I soothe burning nerve pain?",
                "What does burning skin without a burn mean?",
                "Is burning pain a nerve symptom?"
            ]
        },
        {
            "category": "Neuropathic Pain & Symptoms",
            "title": "Pins and Needles (Paresthesia)",
            "answer": "The 'pins and needles' sensation, medically called paresthesia, is a tingling or pricking feeling that commonly affects the extremities. It is caused by brief compression or chronic damage to sensory nerves, which disrupts normal neural impulse transmission to the brain.",
            "questions": [
                "What causes pins and needles?",
                "Why do my hands and feet tingle?",
                "What is paresthesia?",
                "How do I stop the pins and needles sensation?",
                "What does tingling in the limbs mean?",
                "Why do my legs feel like they are falling asleep?",
                "Is tingling a sign of nerve damage?",
                "What should I do for pins and needles?",
                "Why do I feel pricking sensations?",
                "How do nerves cause tingling?"
            ]
        },
        {
            "category": "Neuropathic Pain & Symptoms",
            "title": "Sharp, Stabbing, and Shooting Pain",
            "answer": "Sharp, stabbing, or shooting pain is characterized by sudden, intense, knife-like sensations that radiate along nerve pathways. This occurs when damaged nerves undergo sudden depolarization, firing rapid bursts of high-voltage electrical signals.",
            "questions": [
                "What causes stabbing nerve pain?",
                "Why do I get sudden shooting pain?",
                "What does sharp, stabbing pain mean?",
                "How do I manage shooting nerve pain?",
                "Why does my back have sharp stabbing sensations?",
                "Is stabbing pain normal in neuropathy?",
                "What triggers sharp shooting pain?",
                "How can I calm shooting nerve signals?",
                "What is electric-like shooting pain?",
                "Why does my leg have stabbing pain?"
            ]
        },
        {
            "category": "Neuropathic Pain & Symptoms",
            "title": "Electric Shock Sensations",
            "answer": "Electric shock sensations feel like sudden, jarring currents running through a specific body part. They are common in conditions like trigeminal neuralgia or severe spinal nerve compression, where damaged nerve sheaths allow electrical cross-talk (ephaptic transmission) between adjacent nerve fibers.",
            "questions": [
                "Why do I feel electric shocks in my body?",
                "What causes electric shock nerve pain?",
                "What does a jolt of pain mean?",
                "How do I stop electric shock sensations?",
                "Why do my nerves spark?",
                "Is electric shock pain a sign of neuropathy?",
                "What is ephaptic transmission?",
                "What triggers nerve sparks or jolts?",
                "Can nerve compression cause electric shocks?",
                "Explain electric-like jolts in legs."
            ]
        },
        {
            "category": "Neuropathic Pain & Symptoms",
            "title": "Numbness and Loss of Sensation (Hypoesthesia)",
            "answer": "Numbness, or hypoesthesia, is the partial or complete loss of sensation in a body part. In neuropathy, it occurs when sensory nerve fibers become severely damaged and fail to carry impulses to the brain, which poses a safety risk as injuries can go unnoticed.",
            "questions": [
                "Why are my feet numb?",
                "What causes numbness in fingers?",
                "What is hypoesthesia?",
                "Is numbness a sign of nerve damage?",
                "How do I treat numb hands?",
                "What should I do if I lose sensation?",
                "Why can't I feel my toes?",
                "Is nerve numbness permanent?",
                "What are the dangers of numbness?",
                "How does nerve damage lead to loss of feeling?"
            ]
        },
        {
            "category": "Neuropathic Pain & Symptoms",
            "title": "Deep Achy or Heavy Sensation",
            "answer": "Deep achy or heavy pain in neuropathy is a dull, persistent discomfort that resembles muscle fatigue or severe muscle soreness. It is often caused by inflammation in deep-tissue nerve branches or secondary muscle guarding, where muscles tense up to protect painful nerves.",
            "questions": [
                "Why does my nerve pain feel like a deep ache?",
                "What causes heavy, achy limbs?",
                "Why do my muscles ache from nerve pain?",
                "Is dull achiness a neuropathic symptom?",
                "How do I relieve deep achy pain?",
                "What does heavy limb sensation mean?",
                "How is achy pain related to nerves?",
                "Why do my legs feel heavy and tired?",
                "What is muscle guarding in chronic pain?",
                "Can nerve inflammation cause dull aches?"
            ]
        },
        {
            "category": "Neuropathic Pain & Symptoms",
            "title": "Allodynia (Hypersensitivity to Light Touch)",
            "answer": "Allodynia is a condition where normally non-painful stimuli (such as a light breeze, bedsheets brushing the skin, or a soft touch) cause pain. It is caused by central sensitization, where spinal cord neurons become hyperexcitable, causing the brain to misinterpret normal touch signals as painful.",
            "questions": [
                "Why does light touch hurt my skin?",
                "What is allodynia?",
                "Why does clothing brush cause pain?",
                "Why does a breeze hurt my legs?",
                "How do I treat allodynia?",
                "Is pain from light touch a nerve issue?",
                "What causes central sensitization?",
                "Why is my skin hypersensitive?",
                "How do I desensitize my skin?",
                "Explain allodynia in neuropathy."
            ]
        },
        {
            "category": "Neuropathic Pain & Symptoms",
            "title": "Hyperalgesia (Exaggerated Pain Response)",
            "answer": "Hyperalgesia is an extreme, exaggerated sensitivity to stimuli that are normally only mildly painful (such as a pinprick or lukewarm water). It is caused by nociceptive receptors and spinal pathways entering a hyper-reactive state, magnifying minor pain inputs.",
            "questions": [
                "Why am I extremely sensitive to pain?",
                "What is hyperalgesia?",
                "Why does a minor scratch hurt so much?",
                "How does nerve damage increase pain sensitivity?",
                "What causes hyperalgesia?",
                "How is hyperalgesia treated?",
                "Why do my nerves overreact to minor pain?",
                "Can pain sensitivity be reduced?",
                "What is the difference between allodynia and hyperalgesia?",
                "Why is my pain response exaggerated?"
            ]
        },
        {
            "category": "Neuropathic Pain & Symptoms",
            "title": "Common Neuropathic Triggers",
            "answer": "Common triggers that exacerbate neuropathic pain include sudden changes in temperature (particularly cold weather), high stress levels, lack of restorative sleep, poor hydration, prolonged sitting or poor posture, tight clothing, and physical overexertion.",
            "questions": [
                "What triggers neuropathic pain?",
                "Why does cold weather make nerve pain worse?",
                "How does stress affect nerve pain?",
                "What causes neuropathy flare-ups?",
                "Why does my pain spike suddenly?",
                "How can I prevent nerve pain triggers?",
                "Can tight clothes cause a flare-up?",
                "Why does prolonged sitting hurt my nerves?",
                "What makes neuropathic pain worse?",
                "How does dehydration trigger pain?"
            ]
        },
        {
            "category": "Neuropathic Pain & Symptoms",
            "title": "Phantom Limb Pain",
            "answer": "Phantom limb pain is a neuropathic condition where pain is perceived in a body part that has been surgically removed. It is caused by the severed nerve endings in the stump continues to fire signals, and the brain's somatosensory cortex maintaining a map of the missing limb.",
            "questions": [
                "What is phantom limb pain?",
                "Why do amputees feel pain in missing limbs?",
                "How do you treat phantom pain?",
                "What causes phantom sensations?",
                "Is phantom limb pain real?",
                "How does the brain create phantom pain?",
                "Can nerves misfire after amputation?",
                "How can I manage pain in a missing leg?",
                "Explain phantom pain.",
                "What therapies help phantom limb pain?"
            ]
        },
        {
            "category": "Neuropathic Pain & Symptoms",
            "title": "Diabetic Neuropathy Overview",
            "answer": "Diabetic neuropathy is a type of nerve damage that occurs as a result of chronic high blood sugar associated with diabetes. It most commonly damages nerves in the feet and legs, resulting in burning sensations, numbness, tingling, and an increased risk of diabetic foot ulcers.",
            "questions": [
                "What is diabetic neuropathy?",
                "How does diabetes cause nerve damage?",
                "What are symptoms of diabetic nerve pain?",
                "How do I prevent diabetic neuropathy?",
                "Why does high blood sugar damage nerves?",
                "What parts of the body are affected by diabetic neuropathy?",
                "Is diabetic nerve damage reversible?",
                "How is diabetic neuropathy managed?",
                "What are the signs of diabetic feet?",
                "Explain nerve pain in diabetics."
            ]
        },
        {
            "category": "Neuropathic Pain & Symptoms",
            "title": "Sciatica (Sciatic Nerve Compression)",
            "answer": "Sciatica is pain radiating along the sciatic nerve pathway, extending from the lower back, through the hips and buttocks, and down the legs. It is typically caused by a herniated disc, bone spur, or spinal narrowing (stenosis) compressing a lumbar nerve root.",
            "questions": [
                "What is sciatica?",
                "What causes sciatic nerve pain?",
                "What does sciatica feel like?",
                "How do I relieve sciatic pain?",
                "Why does pain run down my leg?",
                "What exercises help with sciatica?",
                "Is sciatica a type of neuropathy?",
                "How is sciatica diagnosed?",
                "What triggers sciatic nerve compression?",
                "How do I stop lower back and leg pain?"
            ]
        },
        {
            "category": "Neuropathic Pain & Symptoms",
            "title": "Trigeminal Neuralgia Overview",
            "answer": "Trigeminal neuralgia is a chronic facial pain syndrome affecting the fifth cranial (trigeminal) nerve. It causes sudden, severe, electric shock-like facial spasms, which can be triggered by mild tactile stimuli such as washing the face, shaving, brushing teeth, or a gust of wind.",
            "questions": [
                "What is trigeminal neuralgia?",
                "What causes facial nerve shocks?",
                "Why does brushing my teeth trigger face pain?",
                "How is trigeminal neuralgia treated?",
                "What does trigeminal nerve pain feel like?",
                "Is facial pain a nerve problem?",
                "What triggers trigeminal neuralgia shocks?",
                "How do I manage face pain?",
                "What is facial nerve pain called?",
                "Explain trigeminal nerve disorder."
            ]
        },
        {
            "category": "Neuropathic Pain & Symptoms",
            "title": "Postherpetic Neuralgia (PHN)",
            "answer": "Postherpetic neuralgia is a chronic pain condition that occurs as a complication of shingles (herpes zoster). It develops when the shingles virus damages cutaneous nerve fibers, causing them to fire abnormal and hyperactive pain signals to the brain long after the shingles rash has resolved.",
            "questions": [
                "What is postherpetic neuralgia?",
                "Why does pain persist after shingles?",
                "How long does shingles nerve pain last?",
                "What is PHN?",
                "How is postherpetic neuralgia managed?",
                "What does shingles nerve damage feel like?",
                "Can shingles cause permanent nerve pain?",
                "How do I treat shingles pain?",
                "Why does my skin hurt after shingles heals?",
                "What causes PHN?"
            ]
        },

        # --- CATEGORY 3: PAIN MANAGEMENT & RELIEF (Topics 31 - 40) ---
        {
            "category": "Pain Management & Relief",
            "title": "Immediate Relief: Thermal Therapy (Heat vs. Cold)",
            "answer": "Heat therapy (like warm compresses) expands blood vessels, improves blood flow, and relaxes tight muscles, which is excellent for stiff joints. Cold therapy (like ice packs) numbs pain, slows nerve conduction, and reduces inflammation. Avoid extreme temperatures on numb areas to prevent skin burns.",
            "questions": [
                "Should I use heat or cold for nerve pain?",
                "Is ice or heat better for neuropathy?",
                "How do I apply a warm compress?",
                "When should I use an ice pack?",
                "Can heat worsen nerve inflammation?",
                "How long should I apply ice?",
                "Is a warm bath good for neuropathy?",
                "What are safety tips for temperature therapy?",
                "How does heat help chronic pain?",
                "Can ice reduce nerve shooting pain?"
            ]
        },
        {
            "category": "Pain Management & Relief",
            "title": "Nerve Gliding (Flossing) Exercises",
            "answer": "Nerve gliding, or nerve flossing, consists of gentle exercises designed to move nerves through their surrounding paths. This reduces adhesion, inflammation, and compression. Common examples include median nerve glides for carpal tunnel or sciatic nerve flossing for leg pain.",
            "questions": [
                "What are nerve gliding exercises?",
                "How do I perform nerve flossing?",
                "What is nerve gliding?",
                "How does nerve flossing help with pain?",
                "Can nerve glides reduce nerve compression?",
                "Are nerve glides safe?",
                "What exercises help sciatic nerves slide?",
                "How do I do nerve glides for arms?",
                "What is neural mobilization?",
                "How often should I practice nerve gliding?"
            ]
        },
        {
            "category": "Pain Management & Relief",
            "title": "Gentle Stretching & Yoga for Relief",
            "answer": "Gentle stretching and therapeutic yoga help improve structural flexibility and release muscle spasms that compress adjacent nerves. Stretching should be slow and controlled, focusing on deep breathing. Avoid overstretching or moving into positions that trigger sharp pain.",
            "questions": [
                "What stretches are good for back pain?",
                "Can yoga help with neuropathy?",
                "What are gentle stretches for nerve pain?",
                "How does stretching relieve neuropathy?",
                "Is yoga safe for chronic pain?",
                "What poses help with neck tension?",
                "How do I stretch safely with neuropathy?",
                "Can tight muscles compress nerves?",
                "What is restorative yoga?",
                "How often should I stretch?"
            ]
        },
        {
            "category": "Pain Management & Relief",
            "title": "Low-Impact Exercise Benefits",
            "answer": "Low-impact exercises like walking, swimming, water aerobics, and stationary cycling improve circulation to damaged nerve endings and trigger the release of endorphins, the body's natural painkillers. Aim for 20-30 minutes of moderate activity most days.",
            "questions": [
                "What exercises are safe for neuropathy?",
                "Can I exercise with nerve pain?",
                "How does walking help chronic pain?",
                "Is swimming good for neuropathy?",
                "What is low-impact exercise?",
                "How does exercise release endorphins?",
                "What cardio can I do with foot pain?",
                "How often should I exercise with chronic pain?",
                "Can exercise repair damaged nerves?",
                "What are the benefits of walking for neuropathy?"
            ]
        },
        {
            "category": "Pain Management & Relief",
            "title": "Medication Management for Neuropathy",
            "answer": "Standard anti-inflammatory painkillers (like ibuprofen) are often ineffective for neuropathy. Doctors commonly prescribe gabapentinoids (gabapentin, pregabalin), tricyclic antidepressants (amitriptyline), SNRIs (duloxetine), or topical lidocaine and capsaicin patches to quiet overactive nerves.",
            "questions": [
                "What medications treat nerve pain?",
                "Does ibuprofen help with neuropathy?",
                "What is gabapentin used for?",
                "What is pregabalin?",
                "Why do doctors prescribe antidepressants for pain?",
                "How do nerve pain medications work?",
                "What are topical treatments for neuropathy?",
                "What is capsaicin cream?",
                "Are there prescription pills for nerve pain?",
                "How do I manage my pain medication?"
            ]
        },
        {
            "category": "Pain Management & Relief",
            "title": "Guided Breathing and Mindfulness Meditation",
            "answer": "Deep breathing and mindfulness meditation reduce neuropathic pain by calming the sympathetic nervous system. Techniques like the 4-7-8 breathing method trigger a relaxation response, lowering heart rate and reducing the brain's focus on and amplification of pain inputs.",
            "questions": [
                "How does breathing help with pain?",
                "What is the 4-7-8 breathing technique?",
                "Can mindfulness reduce pain?",
                "How do I practice meditation for pain relief?",
                "What is the link between stress and pain perception?",
                "How do I calm my nervous system?",
                "What are mindfulness exercises for neuropathy?",
                "Can deep breathing lower pain levels?",
                "How do I start meditating?",
                "Explain breathing-induced pain relief."
            ]
        },
        {
            "category": "Pain Management & Relief",
            "title": "Activity Pacing and Energy Conservation",
            "answer": "Pacing is a self-management strategy where you structure your daily tasks to include planned rest breaks before pain escalates. This avoids the common 'boom-and-bust' pattern, where overexerting yourself on low-pain days leads to severe pain flare-ups later.",
            "questions": [
                "How do I pace myself during the day?",
                "What is the boom-and-bust cycle?",
                "How do I manage my energy with chronic pain?",
                "Why should I take breaks when not in pain?",
                "What is activity pacing?",
                "How do I avoid overexertion?",
                "How do I plan my day with neuropathy?",
                "What are pacing strategies?",
                "How can I stay active without causing flare-ups?",
                "Explain energy conservation."
            ]
        },
        {
            "category": "Pain Management & Relief",
            "title": "Sleep Hygiene Guidelines for Pain Relief",
            "answer": "Good sleep hygiene reduces chronic pain by allowing nerve regeneration and reducing systemic inflammation. Key practices include maintaining a regular bedtime, keeping the bedroom dark and cool, avoiding screens before bed, and using proper body positioning with pillows.",
            "questions": [
                "How can I sleep better with neuropathy?",
                "What is sleep hygiene?",
                "How does sleep help nerve recovery?",
                "Why does nerve pain keep me awake?",
                "What is a good bedtime routine for pain?",
                "How do I position my pillows for back pain?",
                "Does sleep deprivation increase pain?",
                "How do I design a sleep-friendly bedroom?",
                "How do I manage nighttime foot burning?",
                "What are natural sleep aids for neuropathy?"
            ]
        },
        {
            "category": "Pain Management & Relief",
            "title": "Nerve Health and Hydration",
            "answer": "Dehydration increases nerve sensitivity and can intensify pain signals. Drinking 2.5 to 3.0 Liters of water daily helps maintain cellular electrolyte balances (sodium, potassium) necessary for normal nerve conduction and assists in flushing out metabolic toxins.",
            "questions": [
                "Why is water important for nerve health?",
                "How much water should I drink for neuropathy?",
                "Does dehydration cause nerve pain?",
                "How does water affect nerve signals?",
                "What is the daily hydration target?",
                "How does drinking water reduce flare-ups?",
                "What are signs of dehydration in nerves?",
                "Can water intake flush out toxins?",
                "How do I improve my hydration habits?",
                "Why do hydrated nerves hurt less?"
            ]
        },
        {
            "category": "Pain Management & Relief",
            "title": "Anti-inflammatory Diet and Nutrition",
            "answer": "An anti-inflammatory diet high in leafy greens, berries, omega-3 fatty acids (fatty fish), and spices (like turmeric and ginger) helps reduce systemic inflammation. Limiting processed sugars, refined grains, and alcohol helps decrease neuropathy flare-ups.",
            "questions": [
                "What foods reduce nerve inflammation?",
                "Is turmeric good for neuropathy?",
                "What is an anti-inflammatory diet?",
                "What foods should I avoid with nerve pain?",
                "How does ginger help with pain?",
                "Can diet change neuropathic symptoms?",
                "What are the benefits of omega-3 for nerves?",
                "Does sugar make nerve pain worse?",
                "What is a healthy meal plan for chronic pain?",
                "How does nutrition affect neuropathy?"
            ]
        },

        # --- CATEGORY 4: MENTAL HEALTH, SELF-CARE & MEDICAL (Topics 41 - 50) ---
        {
            "category": "Mental Health, Self-Care & Medical Support",
            "title": "Coping with Anxiety and Stress",
            "answer": "Anxiety and physical pain are closely linked; stress releases cortisol and adrenaline, which sensitize nerves and increase pain perception. Effective coping mechanisms include cognitive reframing, progressive muscle relaxation, journaling, and regular deep breathing.",
            "questions": [
                "How do I manage anxiety from chronic pain?",
                "What is the pain-anxiety cycle?",
                "How does stress affect my nervous system?",
                "What are coping strategies for stress?",
                "How do I calm my mind during a flare-up?",
                "Can stress cause neuropathic pain?",
                "What is progressive muscle relaxation?",
                "How do I use journaling for stress?",
                "What mental exercises reduce pain?",
                "How does cortisol affect nerve pain?"
            ]
        },
        {
            "category": "Mental Health, Self-Care & Medical Support",
            "title": "Symptom and Pain Journaling",
            "answer": "Logging your symptoms daily (including pain levels, sleep hours, water intake, triggers, and mood) helps pinpoint pain patterns and tracks the effectiveness of treatments. Sharing these structured logs gives your doctor valuable data to guide your care.",
            "questions": [
                "How do I keep a pain journal?",
                "What should I write in a symptom log?",
                "Why is journaling helpful for neuropathy?",
                "How do I track my pain triggers?",
                "What are journaling prompts for chronic pain?",
                "How do I document my pain for my doctor?",
                "Can journaling help find pain patterns?",
                "What metrics should I log in a journal?",
                "How do I start symptom tracking?",
                "What is the best way to write down symptoms?"
            ]
        },
        {
            "category": "Mental Health, Self-Care & Medical Support",
            "title": "Cognitive Behavioral Therapy (CBT)",
            "answer": "Cognitive Behavioral Therapy (CBT) is an evidence-based therapy that helps patients identify and change negative thought patterns, such as catastrophizing. CBT helps reduce pain-related distress and retrains the brain to modulate physical pain signals.",
            "questions": [
                "What is CBT for chronic pain?",
                "How does therapy help with nerve pain?",
                "What is catastrophizing in pain?",
                "How does cognitive behavioral therapy work?",
                "Can a psychologist help with neuropathy?",
                "How do I retrain my brain to feel less pain?",
                "What are CBT techniques for pain management?",
                "Is CBT effective for chronic pain?",
                "Where do I find a pain therapist?",
                "Explain the psychological aspects of pain."
            ]
        },
        {
            "category": "Mental Health, Self-Care & Medical Support",
            "title": "Posture and Workplace Ergonomics",
            "answer": "Maintaining proper posture and an ergonomic desk setup (chair supporting the lower back, screen at eye level, and arms bent at 90 degrees) minimizes spinal nerve compression. Take short breaks to stand and stretch every 30 to 60 minutes to reduce nerve tension.",
            "questions": [
                "How do I improve my posture?",
                "What is the best chair for neck pain?",
                "How do I set up an ergonomic desk?",
                "Can poor posture cause nerve compression?",
                "What are postural alignment tips?",
                "How often should I take movement breaks?",
                "Why does my neck hurt at my computer?",
                "How do I protect my nerves while sitting?",
                "What is ergonomic alignment?",
                "How do I stop slouching?"
            ]
        },
        {
            "category": "Mental Health, Self-Care & Medical Support",
            "title": "Support Resources & Community Connection",
            "answer": "Connecting with peer support groups or online forums can help combat the isolation associated with chronic pain. Sharing experiences and coping mechanisms provides emotional comfort and practical advice for daily pain management.",
            "questions": [
                "Where can I find chronic pain support groups?",
                "How do I deal with feeling isolated?",
                "Are there communities for neuropathic pain?",
                "How do I talk to my family about my pain?",
                "Who can I turn to for support?",
                "What resources exist for nerve pain patients?",
                "How do support groups help?",
                "Can I talk to others with my condition?",
                "What online forums are good for neuropathy?",
                "How do I find comfort in communities?"
            ]
        },
        {
            "category": "Mental Health, Self-Care & Medical Support",
            "title": "Preparing for Medical Appointments",
            "answer": "Prepare for your doctor appointments by writing down key questions, including: What diagnostic tests (like EMG or MRI) are recommended? What are the potential side effects of my medications? What alternative therapies are safe to combine with my care plan?",
            "questions": [
                "What should I ask my doctor about nerve pain?",
                "What questions should I prepare for my appointment?",
                "How do I talk to my neurologist?",
                "What tests diagnose neuropathy?",
                "How do I know if my doctor understands neuropathy?",
                "What information should I bring to my check-up?",
                "What questions help clarify my treatment?",
                "How do I ask about medication side effects?",
                "What are good medical questions?",
                "How do I get a second opinion?"
            ]
        },
        {
            "category": "Mental Health, Self-Care & Medical Support",
            "title": "Physical Therapy (PT) Benefits",
            "answer": "A physical therapist can design a customized program focusing on targeted strengthening, flexibility training, and soft-tissue mobilization. These interventions help reduce mechanical pressure on compressed nerves, correct movement imbalances, and improve function.",
            "questions": [
                "What does a physical therapist do for nerve pain?",
                "Can PT help neuropathy?",
                "What is physical therapy for chronic pain?",
                "What exercises will a physical therapist teach me?",
                "How does PT reduce nerve pressure?",
                "Is physical therapy painful?",
                "How often should I go to PT?",
                "What are the benefits of physical therapy?",
                "Can physical therapy restore movement?",
                "How is PT different from home exercise?"
            ]
        },
        {
            "category": "Mental Health, Self-Care & Medical Support",
            "title": "Alternative and Complementary Therapies",
            "answer": "Alternative therapies such as acupuncture, chiropractic care, therapeutic massage, and TENS (Transcutaneous Electrical Nerve Stimulation) devices can help control pain. They work by improving blood circulation, stimulating endorphins, or blocking pain signals at the spinal cord level.",
            "questions": [
                "Does acupuncture work for neuropathy?",
                "What is a TENS unit?",
                "How does electrical stimulation help nerve pain?",
                "Can massage therapy relieve nerve pain?",
                "What are alternative treatments for chronic pain?",
                "Is chiropractic care safe for nerve compression?",
                "How does acupuncture block pain signals?",
                "What is electrical nerve stimulation?",
                "Are there non-traditional therapies for pain?",
                "Can herbal supplements help?"
            ]
        },
        {
            "category": "Mental Health, Self-Care & Medical Support",
            "title": "Emergency Warning Signs (Red Flags)",
            "answer": "Seek immediate emergency care (or dial 911) if you experience 'red flag' symptoms, including: sudden, severe limb weakness or paralysis, loss of bowel or bladder function, numbness in the saddle area (inner thighs/groin), chest pain, difficulty breathing, or slurred speech.",
            "questions": [
                "What are warning signs of a nerve emergency?",
                "When is nerve pain an emergency?",
                "When should I go to the ER for back pain?",
                "What is saddle anesthesia?",
                "What are dangerous symptoms of neuropathy?",
                "Can a nerve pinch be an emergency?",
                "When should I dial 911 for nerve issues?",
                "What are red flag symptoms of spinal compression?",
                "How do I know if my symptoms are life-threatening?",
                "What requires immediate hospital care?"
            ]
        },
        {
            "category": "Mental Health, Self-Care & Medical Support",
            "title": "Managing Pain Flare-ups",
            "answer": "When experiencing a severe pain flare-up, implement a rescue plan: rest immediately, apply safe hot/cold compresses, perform deep breathing to reduce physiological stress, drink water, and take any prescribed rescue medications as directed by your healthcare provider.",
            "questions": [
                "How do I manage a pain flare-up?",
                "What should I do during a sudden spike in pain?",
                "How do I calm a nerve pain flare-up?",
                "What is a rescue plan for severe pain?",
                "Should I rest during a flare-up?",
                "How do I survive a pain crisis?",
                "What is the quickest way to ease a flare-up?",
                "Can breathing exercises calm a pain spike?",
                "How long do flare-ups last?",
                "What should I avoid during a pain spike?"
            ]
        }
    ]
    
    # Render Q&A blocks to PDF
    pdf.set_font('Helvetica', '', 10)
    pdf.set_text_color(51, 65, 85)
    
    q_counter = 1
    for index, topic in enumerate(topics, 1):
        # Keep Category and Title together using page break check or space management
        pdf.ln(5)
        
        # Draw a subtle separator line before all except the first
        if index > 1:
            pdf.set_draw_color(241, 245, 249)
            pdf.line(15, pdf.get_y(), 195, pdf.get_y())
            pdf.ln(4)
        
        # We check if we have enough vertical space for the header, answer and at least a couple of questions.
        # If less than 60mm remains, we force a new page.
        if pdf.get_y() > 220:
            pdf.add_page()
            
        # Category tag
        pdf.set_font('Helvetica', 'B', 8)
        pdf.set_text_color(2, 132, 199)
        pdf.cell(0, 5, f"CATEGORY: {topic['category'].upper()}", new_x='LMARGIN', new_y='NEXT')
        
        # Topic Title
        pdf.set_font('Helvetica', 'B', 12)
        pdf.set_text_color(15, 23, 42)
        pdf.cell(0, 7, f"Topic {index}: {topic['title']}", new_x='LMARGIN', new_y='NEXT')
        pdf.ln(2)
        
        # Answer
        pdf.set_font('Helvetica', 'B', 10)
        pdf.set_text_color(51, 65, 85)
        pdf.cell(0, 5, "Answer:", new_x='LMARGIN', new_y='NEXT')
        
        pdf.set_font('Helvetica', '', 10)
        pdf.set_text_color(71, 85, 105)
        pdf.multi_cell(0, 5, topic['answer'], new_x='LMARGIN', new_y='NEXT')
        pdf.ln(2)
        
        # Questions Header
        pdf.set_font('Helvetica', 'B', 9)
        pdf.set_text_color(15, 23, 42)
        pdf.cell(0, 5, "Training Question Variations:", new_x='LMARGIN', new_y='NEXT')
        
        # Questions list
        pdf.set_font('Helvetica', 'I', 9)
        pdf.set_text_color(100, 116, 139)
        for q in topic['questions']:
            pdf.multi_cell(0, 4.5, f"  {q_counter}. {q}", new_x='LMARGIN', new_y='NEXT')
            q_counter += 1
            
        pdf.ln(3)

    pdf_file = 'bootpress-chatbot-questions-500.pdf'
    pdf.output(pdf_file)
    print(f'Successfully generated {pdf_file} with {q_counter - 1} detailed questions and answers.')

if __name__ == '__main__':
    create_pdf()
