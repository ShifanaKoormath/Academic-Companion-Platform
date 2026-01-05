

# 📘 Acadmate — AI-Powered Academic Companion (Prototype)

Acadmate is a **demo-ready academic companion application** designed to help students **understand, anticipate, and act on their academic standing** using clear rules, realistic data, and explainable insights.

This project is intentionally built as a **decision-support layer** that can conceptually integrate with existing Learning Management Systems (LMS) such as **ETLab**, without attempting to replace them.

---

## 🎯 Project Objective

Most academic portals present **raw academic data** (attendance %, marks, deadlines) but do not explain:

* What the data means
* Why it matters
* What the student should focus on next

Acadmate addresses this gap by **interpreting academic data into understandable academic signals**.

### Example

Instead of only showing:

> Attendance: 76%

Acadmate highlights:

> Eligibility risk exists due to attendance trends.

---

## 🧠 Key Features

### 1️⃣ Academic Snapshot Dashboard

A consolidated overview of the student’s academic condition:

* Attendance status *(Safe / Borderline / At Risk)*
* Internal marks *(progressively calculated)*
* Pending academic tasks
* Exam awareness & urgency

📌 All values are **computed dynamically**, not hard-coded.

---

### 2️⃣ Attendance Analysis

* Subject-wise attendance breakdown
* Lowest attendance highlighted *(real institutional rule)*
* Clear visual cues instead of dense numbers

Focuses on **interpretability over raw percentages**.

---

### 3️⃣ Tasks & Assignments

* Pending vs completed tasks
* Due dates shown clearly
* Completed tasks show obtained marks
* Academic rule explained once per section *(no UI clutter)*

---

### 4️⃣ Internal Marks Calculation

Internal assessment is calculated using standard academic components:

| Component    | Max Marks |
| ------------ | --------- |
| Assignments  | 15        |
| Attendance   | 10        |
| Series Exams | 25        |
| **Total**    | **50**    |

✔ Progressive calculation supported
✔ Internals projected if only Series 1 is completed
✔ Automatically updates when Series 2 data is available

---

### 5️⃣ Exams Schedule

* Series 1, Series 2, and Final exams
* Organized into exam periods
* Subject-wise exam dates
* Marks displayed where available

---

### 6️⃣ Academic Risk Analysis

* Overall academic risk score
* Subject-wise risk classification
* Reasons behind each risk clearly stated
* Designed to be **explainable, not predictive**

---

### 7️⃣ Risk Timeline (New)

A chronological view of how academic risk **evolves over time**.

Shows events such as:

* Attendance threshold changes
* Internal assessment updates
* Eligibility risk detection

📌 Demonstrates that **academic risk is dynamic**, not static.

---

### 8️⃣ Study Focus Module (New)

A focused planning view that answers:

> *What should the student revise next — and why?*

Includes:

#### 🔹 Priority Topics

* Derived from **Previous Year Question (PYQ) patterns**
* Ranked as High / Medium / Low priority
* Subject-wise filtering

#### 🔹 Missed Topics (Due to Absence)

* Lists topics missed on absent dates
* Connects attendance gaps to learning gaps
* Shown only where absences exist
  *(Above-average students may show none)*

This module combines **exam relevance + attendance impact** into one actionable view.

---

### 9️⃣ AI Companion (Prototype)

* Displays academic guidance messages
* Currently **rule-based and deterministic**
* Architecture designed to support real LLM APIs in the future

📌 No external AI dependency is used in this prototype.

---

## 🧪 Demo Design (Important)

This application uses **structured mock academic datasets** to support clear evaluation.

### Three student profiles are included:

* **Above Average** — stable academic condition
* **Average** — borderline, recoverable condition
* **At Risk** — low attendance and cumulative gaps

This allows evaluators to observe **multiple realistic scenarios** without live LMS integration.

---

## 🧱 Technology Stack

### Frontend

* React Native (Expo)

Runs on:

* Android *(Expo Go)*
* Web *(browser)*

### Navigation

* React Navigation (Stack)

### Data Layer

* Local mock data structured like LMS outputs
* No external APIs

### Logic

* Deterministic, rule-based calculations
* Fully explainable *(viva-friendly)*

### Styling

* Custom reusable UI components
* SafeArea-aware layout
* Mobile-first design

---

## 📂 Project Structure (Simplified)

```
src/
│
├── screens/        → App screens (Dashboard, Study Focus, Risk Timeline, etc.)
├── logic/          → Academic rules & calculations
├── data/           → Mock academic datasets
├── ui/             → Reusable UI components
├── types/          → TypeScript definitions
└── navigation/     → App navigation setup
```

---

## ⚙️ Setup Instructions

### 1️⃣ Prerequisites

* Node.js *(LTS recommended)*
* npm or yarn
* Expo Go *(Android)* or modern web browser

### 2️⃣ Install Dependencies

```bash
npm install
```
for gemini ai:

cd backend 

npm install @google/generative-ai
npm install express cors dotenv @google/generative-ai
npm install nodemon

### 3️⃣ Start the Application

```bash
npm start
```

Then:

* Press **w** → run in browser
* OR scan QR code using **Expo Go** (Android)

### 4️⃣ If Mobile Load Fails (Common Fix)

```bash
npx expo start --clear
```

---

## 🧭 How to Demo the Project

1. Select a student profile
2. Observe Academic Snapshot changes
3. Open Attendance → note lowest-subject logic
4. Open Internals → observe progressive calculation
5. Open Study Focus → see priority topics & missed topics
6. Open Risk Timeline → view academic risk progression
7. Switch students → observe contrasting academic scenarios

---

## 🚫 Explicit Exclusions (By Design)

This prototype **intentionally does NOT include**:

* Live LMS integration
* Automatic data fetching
* Teacher or admin dashboards
* App Store / Play Store deployment
* AI model training

These exclusions preserve **clarity, focus, and evaluability**.

---

## 🎓 Academic Relevance

Acadmate demonstrates:

* Real academic rule modeling
* Explainable decision logic
* Student-centric UI/UX design
* Practical software engineering practices

Designed to perform strongly in:

* Project evaluation
* Viva voce
* Live demo presentations

---

## 📌 Future Scope (Optional)

* Integrate real LMS APIs
* Replace rule-based companion with LLM APIs
* Push notifications for academic risk
* Faculty read-only dashboards

---

## 👩‍💻 Author

**Acadmate**
Academic Companion — *Prototype Version*

Built for **academic demonstration and evaluation**.

---

