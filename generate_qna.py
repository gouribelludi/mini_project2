import os
import csv
from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.set_font("Helvetica", "B", 14)
        self.set_text_color(15, 23, 42) # Slate-900
        self.cell(0, 10, "NeuroPain Care AI - Chatbot Training Dataset", new_x="LMARGIN", new_y="NEXT", align="C")
        self.set_font("Helvetica", "I", 10)
        self.set_text_color(100, 116, 139) # Slate-500
        self.cell(0, 5, "600+ Programmatically Generated Q&A Pairs for Botpress Knowledge Base", new_x="LMARGIN", new_y="NEXT", align="C")
        self.ln(5)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(148, 163, 184) # Slate-400
        self.cell(0, 10, f"Page {self.page_no()}/{{nb}}", align="C")

def generate_questions():
    qnas = []

    # Category 1: Symptom & Location Questions (Combinatorial generation)
    body_parts = ["feet", "hands", "legs", "arms", "back", "shoulders", "wrists", "fingers", "toes", "calves", "thighs", "chest", "forearms", "heels"]
    sensations = ["burning sensation", "tingling feeling", "numbness", "pins and needles", "sharp shooting pain", "electric shocks"]
    times = ["at night", "when trying to sleep", "while walking", "in cold weather", "in hot weather", "in the morning", "after sitting too long"]

    # Generate combination Q&As
    for part in body_parts:
        for sens in sensations:
            for t in times:
                q = f"Why do I feel a {sens} in my {part} {t}?"
                a = (f"A {sens} in the {part} {t} is a common symptom of peripheral neuropathy. "
                     f"This type of nerve pain is often caused by damaged nerve fibers firing abnormal signals. "
                     f"To manage this, ensure the area is comfortable (e.g. avoid tight sheets or extreme temperatures), "
                     f"practice light stretching, stay hydrated, and consult your physician regarding appropriate medication timings.")
                qnas.append((q, a))

    # Category 2: Medication Questions
    meds = [
        {"name": "Gabapentin", "type": "anticonvulsant", "dosage": "300mg to 900mg", "use": "calming overactive nerve pathways", "side_effects": "drowsiness, dizziness, fatigue, and dry mouth"},
        {"name": "Pregabalin (Lyrica)", "type": "neuropathic pain modulator", "dosage": "75mg to 150mg", "use": "reducing nerve signal transmission", "side_effects": "dizziness, sleepiness, weight gain, and dry mouth"},
        {"name": "Amitriptyline", "type": "tricyclic antidepressant", "dosage": "10mg to 50mg", "use": "boosting neurotransmitters that block pain signals", "side_effects": "dry mouth, blurred vision, constipation, and drowsiness"},
        {"name": "Duloxetine (Cymbalta)", "type": "SNRI antidepressant", "dosage": "30mg to 60mg", "use": "balancing chemicals in the brain to reduce pain perception", "side_effects": "nausea, dry mouth, sleepiness, and loss of appetite"}
    ]

    med_questions = [
        ("What is the standard dosage for {name}?", "The starting dosage for {name} typically ranges around {dosage}, taken as prescribed by your doctor. Dosages may be adjusted slowly based on efficacy and side-effect tolerance."),
        ("How does {name} work for nerve pain?", "{name} is a {type} that helps manage neuropathic pain by {use}. It stabilizes abnormal electrical activity in damaged nerves."),
        ("What are the side effects of {name}?", "Common side effects of {name} include {side_effects}. Always consult your pharmacist or doctor if side effects persist or become severe."),
        ("Can I drink alcohol while taking {name}?", "It is highly recommended to avoid alcohol while taking {name}. Alcohol can amplify central nervous system side effects like dizziness, severe drowsiness, and impaired coordination."),
        ("What should I do if I miss a dose of {name}?", "If you miss a dose of {name}, take it as soon as you remember, unless it is almost time for your next scheduled dose. Do not take a double dose to make up for a missed one.")
    ]

    for med in meds:
        for q_tpl, a_tpl in med_questions:
            q = q_tpl.format(**med)
            a = a_tpl.format(**med)
            qnas.append((q, a))

    # Category 3: Trigger Questions
    triggers = [
        {"name": "cold weather", "reason": "cold constricts blood vessels, reducing blood flow to peripheral nerves, which intensifies painful sensations"},
        {"name": "high blood sugar", "reason": "excess glucose in the blood damages the tiny blood vessels that supply nerves with oxygen and nutrients over time"},
        {"name": "alcohol consumption", "reason": "heavy alcohol use depletes essential nutrients like B-vitamins and acts as a direct toxin to peripheral nerves"},
        {"name": "chemotherapy treatments", "reason": "certain chemo drugs are toxic to nerve cells, resulting in chemotherapy-induced peripheral neuropathy (CIPN)"},
        {"name": "stress and anxiety", "reason": "stress releases cortisol and adrenaline, which heighten nervous system sensitivity and amplify pain perception"},
        {"name": "poor sleeping habits", "reason": "lack of sleep impairs the body's natural pain-inhibition mechanisms, making nerve pain feel more intense"}
    ]

    trigger_questions = [
        ("Does {name} trigger neuropathic pain?", "Yes, {name} is a known trigger. This happens because {reason}."),
        ("How can I avoid neuropathy flare-ups caused by {name}?", "To prevent flare-ups triggered by {name}, focus on mitigation strategies (e.g. keeping warm, managing blood sugar, limiting alcohol, practicing stress relief)."),
        ("Why does my pain get worse with {name}?", "Your nerve pain intensifies with {name} because {reason}. Managing this underlying trigger is key to long-term relief.")
    ]

    for trig in triggers:
        for q_tpl, a_tpl in trigger_questions:
            q = q_tpl.format(**trig)
            a = a_tpl.format(**trig)
            qnas.append((q, a))

    # Category 4: App Feature Guide Questions
    features = [
        {"name": "3D Body Mapping Page", "steps": "navigate to the Body Mapping tab, select the affected body part on the interactive model, choose your pain level and sensation, and hit submit"},
        {"name": "Health Dashboard", "steps": "go to the Dashboard tab to view your active pain zones, daily checklist completion, weekly pain trends, and sleep ratings"},
        {"name": "Smart Medication Tracker", "steps": "open the Dashboard, click 'Edit List' in the medication section to add your schedule, and tap 'Log Intake' once you take each dose"},
        {"name": "AI Care Insights", "steps": "look at the AI Care Insights card on your Dashboard. It analyzes your latest pain reports and suggests specific nerve-care tips"},
        {"name": "CSV Data Export", "steps": "click the 'Export CSV Report' button at the top of your Dashboard. It compiles your pain, sleep, hydration, and medication logs into a file to share with your doctor"},
        {"name": "Emergency Assistance Map", "steps": "navigate to the Emergency page to view a live map of nearest hospitals, contact info, and self-care warning signs"}
    ]

    feature_questions = [
        ("How do I use the {name}?", "To use the {name}, simply {steps} in the app interface."),
        ("Where can I find the {name} in the app?", "You can access the {name} by selecting its tab from the main navigation header in the app."),
        ("How does the {name} help with my nerve pain?", "The {name} is designed to help you track your symptoms, maintain compliance, and collect valuable logs that you can share with your doctor.")
    ]

    for feat in features:
        for q_tpl, a_tpl in feature_questions:
            q = q_tpl.format(**feat)
            a = a_tpl.format(**feat)
            qnas.append((q, a))

    # Category 5: Self-Care & Lifestyle Exercises
    activities = [
        {"name": "gentle stretching", "benefit": "relieving muscle tension surrounding nerves and promoting nerve gliding to improve mobility"},
        {"name": "daily foot inspections", "benefit": "detecting early cuts, blisters, or sores that you might not feel due to neuropathy-induced numbness, preventing infections"},
        {"name": "hydration (drinking 8 cups of water)", "benefit": "maintaining optimal blood volume and circulation to deliver oxygen and nutrients to healing nerve tissues"},
        {"name": "warm Epsom salt baths", "benefit": "providing magnesium to soothe nerve endings and dilating blood vessels to increase localized circulation"},
        {"name": "nerve flossing exercises", "benefit": "mobilizing peripheral nerves within their pathways to reduce compression and burning sensations"}
    ]

    activity_questions = [
        ("Why is {name} important for neuropathy?", "{name} is critical because it helps by {benefit}. Incorporating this into your daily checklist boosts recovery."),
        ("How often should I do {name}?", "You should practice {name} daily. Consistent habits are vital for managing chronic neuropathic symptoms."),
        ("Does {name} reduce neuropathic burning or tingling?", "Yes, {name} directly aids in alleviating symptoms by {benefit}.")
    ]

    for act in activities:
        for q_tpl, a_tpl in activity_questions:
            q = q_tpl.format(**act)
            a = a_tpl.format(**act)
            qnas.append((q, a))

    return qnas

def main():
    qnas = generate_questions()
    print(f"Generated {len(qnas)} Q&A pairs.")

    # 1. Save as CSV (for direct Botpress Q&A import)
    csv_file = "neuropain_care_chatbot_qna.csv"
    with open(csv_file, mode="w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["Question", "Answer"])
        for q, a in qnas:
            writer.writerow([q, a])
    print(f"Saved Q&A dataset to CSV: {csv_file}")

    # 2. Save as PDF (for Botpress Knowledge Base upload)
    pdf = PDF()
    pdf.alias_nb_pages()
    pdf.add_page()
    pdf.set_font("Helvetica", size=10)

    for i, (q, a) in enumerate(qnas, 1):
        if pdf.get_y() > 250:
            pdf.add_page()
            
        # Draw question header
        pdf.set_font("Helvetica", "B", 10)
        pdf.set_text_color(37, 99, 235) # Blue-600
        pdf.multi_cell(w=pdf.epw, h=6, txt=f"Q{i}: {q}", new_x="LMARGIN", new_y="NEXT")
        
        # Draw answer body
        pdf.set_font("Helvetica", "", 10)
        pdf.set_text_color(51, 65, 85) # Slate-700
        pdf.multi_cell(w=pdf.epw, h=5, txt=f"A: {a}", new_x="LMARGIN", new_y="NEXT")
        pdf.ln(4)

    pdf_file = "neuropain_care_chatbot_qna.pdf"
    pdf.output(pdf_file)
    print(f"Saved Q&A dataset to PDF: {pdf_file}")

if __name__ == "__main__":
    main()
