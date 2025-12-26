Acadmate — AI-Powered Academic Companion (Prototype)

Acadmate is a demo-ready academic companion application designed to assist students in tracking and understanding their academic standing using clear logic, realistic data, and explainable insights.

This project is built as a prototype layer that can conceptually integrate with existing Learning Management Systems (LMS) such as ETLab, without replacing them.

🎯 Project Objective

Most academic portals only display raw data (attendance %, marks, deadlines) without explaining academic consequences.

Acadmate focuses on:

Making academic status understandable

Showing what matters most

Helping students act before it’s too late

Example:

Instead of just “Attendance: 76%”
Acadmate highlights that eligibility risk exists.

🧠 Key Features
1️⃣ Academic Snapshot Dashboard

Attendance status (Safe / Borderline / At Risk)

Internal marks (calculated progressively)

Pending academic tasks

Exam awareness

All values are computed, not hard-coded.

2️⃣ Attendance Analysis

Subject-wise attendance

Lowest attendance is highlighted (real academic rule)

Visual clarity over raw numbers

3️⃣ Tasks & Assignments

Pending vs Completed tasks

Due dates shown clearly

Completed tasks show marks

Academic rule stated once per section (no clutter)

4️⃣ Internal Marks Calculation

Internal marks are calculated as:

Component	Max Marks
Assignments	15
Attendance	10
Series Exams	25
Total	50

✔ If only Series 1 is completed, internals are projected
✔ Automatically updates when Series 2 is added

5️⃣ Exams Schedule

Series 1, Series 2, and Final exams

Organized as exam periods

Subject-wise exam dates

Marks shown where available

6️⃣ AI Companion (Prototype)

Displays academic guidance messages

Currently rule-based (deterministic)

Designed to be replaceable with real LLM APIs later

🧪 Demo Design (Important)

This application uses:

Mock academic datasets

Three students with different academic conditions:

Above Average

Average

At Risk

This allows evaluators to clearly see different scenarios without live LMS integration.

🧱 Technology Stack
Frontend

React Native (Expo)

Works on:

Android (Expo Go)

Web (Browser)

Navigation

React Navigation (Stack)

Data Layer

Local mock data (LMS-structured)

No external API dependency

Logic

Deterministic rule-based calculations

Fully explainable (viva-friendly)

Styling

Custom UI components

SafeArea-aware layout

Mobile-first design

📂 Project Structure (Simplified)
src/
│
├── screens/        → App screens (Dashboard, Tasks, Internals, etc.)
├── logic/          → Academic calculations & rules
├── data/           → Mock academic datasets
├── ui/             → Reusable UI components & styles
├── types/          → TypeScript definitions
└── navigation/     → App navigation setup

⚙️ Setup Instructions
1️⃣ Prerequisites

Node.js (LTS recommended)

npm or yarn

Expo Go app (Android) OR web browser

2️⃣ Install Dependencies
npm install

3️⃣ Start the Application
npm start


Then:

Press w → run in browser

OR scan QR code using Expo Go (Android)

4️⃣ If Mobile Load Fails (Common Fix)
npx expo start --clear

🧭 How to Demo the Project

Select a student profile

Observe Academic Snapshot changes

Open Attendance → note lowest subject logic

Open Tasks → pending vs completed + due dates

Open Internals → progressive calculation

Switch student → see different academic conditions

🚫 Explicit Exclusions (By Design)

This prototype does NOT include:

Live LMS integration

Automatic data fetching

Teacher or admin dashboards

App Store / Play Store deployment

AI model training

These are intentionally excluded to maintain clarity and evaluability.

🎓 Academic Relevance

This project demonstrates:

Real academic rule modeling

Clean UI/UX for student clarity

Explainable decision logic

Practical software engineering practices

It is designed to score well in:

Project evaluation

Viva voce

Demo presentation

📌 Future Scope (Optional)

Integrate real LMS APIs

Replace rule-based companion with LLM API

Push notifications for academic risks

Faculty dashboards

👩‍💻 Author

Acadmate
Academic Companion — Prototype Version
Built for academic demonstration and evaluation