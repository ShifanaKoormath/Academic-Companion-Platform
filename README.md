# 📘 Acadmate — AI-Powered Academic Companion (Prototype)

Acadmate is a **demo-ready academic companion application** designed to help students **understand, anticipate, and act on their academic standing** using clear academic rules, structured data, and explainable insights.

The system is intentionally built as a **decision-support layer** that can conceptually integrate with existing Learning Management Systems (LMS) such as **ETLab**, without attempting to replace them.

---

## 🎯 Project Objective

Most academic portals present **raw academic data** (attendance %, marks, deadlines) but fail to explain:

- What the data means  
- Why it matters  
- What the student should focus on next  

Acadmate addresses this gap by **interpreting academic data into clear academic signals and actions**.

### Example

Instead of only showing:

> Attendance: 76%

Acadmate highlights:

> ⚠️ Eligibility risk exists due to declining attendance trends.

---

## 🧠 Key Features

### 1️⃣ Academic Snapshot Dashboard

A consolidated overview of the student’s academic condition:

- Attendance status *(Safe / Borderline / At Risk)*
- Internal marks *(progressively calculated)*
- Pending academic tasks
- Exam urgency indicators
- Floating AI Tutor access

📌 All values are **computed dynamically**, not hard-coded.

---

### 2️⃣ Attendance Analysis

- Subject-wise attendance breakdown  
- Lowest attendance automatically highlighted *(real institutional rule)*  
- Clear visual cues instead of dense numbers  

---

### 3️⃣ Tasks & Assignments

- Pending vs completed tasks  
- Due dates shown clearly  
- Completed tasks show obtained marks  
- Academic rule explanation shown once *(no UI clutter)*  

---

### 4️⃣ Internal Marks Calculation

Internal assessment is calculated using standard academic components:

| Component    | Max Marks |
|-------------|-----------|
| Assignments | 15        |
| Attendance  | 10        |
| Series Exams| 25        |
| **Total**   | **50**    |

✔ Progressive calculation supported  
✔ Internals projected if only Series-1 is completed  
✔ Automatically updates when Series-2 data is available  

---

### 5️⃣ Exams Schedule

- Series-1, Series-2, and Final exams  
- Organized into exam periods  
- Subject-wise exam dates  
- Marks displayed where available  

---

### 6️⃣ Academic Risk Analysis

- Overall academic risk score  
- Subject-wise risk classification  
- Clear reasoning behind each risk  
- Designed to be **explainable, not predictive**  

---

### 7️⃣ Risk Timeline

A chronological view of how academic risk **evolves over time**.

Shows events such as:

- Attendance threshold crossings  
- Internal assessment updates  
- Eligibility risk detection  

📌 Demonstrates that **academic risk is dynamic**, not static.

---

### 8️⃣ Study Focus Module

A focused planning view that answers:

> *What should the student revise next — and why?*

Includes:

#### 🔹 Priority Topics
- Derived from **Previous Year Question (PYQ) patterns**
- Ranked as High / Medium / Low priority
- Subject-wise filtering

#### 🔹 Missed Topics (Due to Absence)
- Lists topics missed on absent dates
- Connects attendance gaps to learning gaps
- Shown only where applicable  

---

### 9️⃣ Personal Notes System

- Syllabus-wise notes mapped to **Subject → Module → Topic**
- Add, edit, delete notes per topic
- Pin important notes
- Search notes across subjects and topics
- Notes persist locally using storage

📌 Acts as the **knowledge source** for the learning game and AI tutor.

---

### 🔟 Learning Game — Notes-Driven Quiz

- Automatically generates quizzes from student notes  
- Multiple-choice questions with:
  - Correct answer highlighted in green
  - Wrong answer highlighted in red
  - Short explanation derived from notes
- Review all answers at the end
- Scores stored per student session

📌 Reinforces **active recall and revision**, not rote testing.

---

### 1️⃣1️⃣ AI Tutor (Gemini-Ready)

- Chat-based AI tutor UI accessible via a floating button on the dashboard  
- Students can ask syllabus-related questions  
- Integrated using **Google Gemini API placeholders**  
- **API keys and credentials are intentionally not bundled with the project**

📌 Students must create and configure their **own Gemini API credentials**.  
📌 This follows best practices by avoiding hard-coded secrets.

---

## 🧪 Demo Design

The application uses **structured mock academic datasets**.

### Included student profiles:

- **Above Average** — stable academic condition  
- **Average** — borderline, recoverable condition  
- **At Risk** — low attendance and cumulative gaps  

---

## 🧱 Technology Stack

### Frontend
- React Native (Expo)

### Navigation
- React Navigation (Stack)

### Data Layer
- Local mock LMS-style data  
- AsyncStorage for notes & quizzes  

### Logic
- Deterministic, rule-based  
- Fully explainable *(viva-friendly)*  

### AI Integration
- Google Gemini API (student-configured)
- No hard-coded API keys

---

## 📂 Project Structure

src/
├── screens/ → Dashboard, Notes, Learning Game, AI Tutor, etc.
├── logic/ → Academic rules & quiz generator
├── data/ → Mock academic datasets
├── ui/ → Reusable UI components
├── utils/ → Helpers
├── services/ → Gemini service abstraction
└── navigation/ → App navigation


---

## ⚙️ Setup Instructions


### 1️⃣ Prerequisites
- Node.js (LTS)
- npm
- Android phone (for mobile testing)


### Install Dependencies

```bash
npm install

For Gemini AI:

npm install @google/generative-ai

Configure Gemini

Create API key from Google AI Studio

Add it to the placeholder file

Restart the app

📌 API keys are not included.

Start App


npm start

Press W to open in browser.


Run on Android Phone (Recommended for Demo)
Step 1: Install Expo Go

Download Expo Go from Google Play Store

Step 2: Start the Project
npm start

Step 3: Connect Phone

Ensure phone and laptop are on the same Wi-Fi

Open Expo Go

Scan the QR code shown in terminal or browser

📌 App will load instantly on the phone
📌 No APK build required

🔧 If App Fails to Load
npx expo start --clear


Then scan QR again.


🚫 Exclusions (By Design)

No live LMS integration

No faculty/admin dashboards

No hard-coded secrets

No production deployment

🎓 Academic Relevance

Acadmate demonstrates:

Real academic rule modeling

Explainable logic

Notes-driven learning

AI-ready secure architecture

Designed for:

Project evaluation

Viva voce

Live demo

👩‍💻 Author

Acadmate
AI-Powered Academic Companion — Prototype Version

Built for academic demonstration and evaluation.