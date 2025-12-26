import { Student } from "../types/academic";

export const STUDENTS: Student[] = [
  /* =====================================================
     STUDENT 1 — ABOVE AVERAGE / SAFE
     ===================================================== */
  {
    id: "s1",
    name: "Meera",
    department: "Computer Science",
    semester: 7,

    subjects: [
      { code: "AI", name: "Artificial Intelligence" },
      { code: "ML", name: "Machine Learning" },
      { code: "SE", name: "Software Engineering" },
    ],

    attendance: [
      { subjectCode: "AI", percentage: 95 },
      { subjectCode: "ML", percentage: 93 },
      { subjectCode: "SE", percentage: 92 },
    ],

    assignments: [
      {
        id: "s1-ai-a1",
        type: "Assignment",
        subjectCode: "AI",
        title: "Search Algorithms",
        maxMarks: 15,
        dueDate: "2025-01-15",
        scoredMarks: 14,
      },
      {
        id: "s1-ml-a1",
        type: "Assignment",
        subjectCode: "ML",
        title: "Regression Models",
        maxMarks: 15,
        dueDate: "2025-01-18",
        scoredMarks: 13,
      },
      {
        id: "s1-se-t1",
        type: "Tutorial",
        subjectCode: "SE",
        title: "SDLC Models",
        maxMarks: 15,
        dueDate: "2025-01-22",
        scoredMarks: 15,
      },
    ],

    examPeriods: [
      {
        type: "Series 1",
        startDate: "2025-02-10",
        endDate: "2025-02-15",
        papers: [
          { subjectCode: "AI", date: "2025-02-10", maxMarks: 50, scoredMarks: 45 },
          { subjectCode: "ML", date: "2025-02-12", maxMarks: 50, scoredMarks: 44 },
          { subjectCode: "SE", date: "2025-02-14", maxMarks: 50, scoredMarks: 46 },
        ],
      },
      {
        type: "Series 2",
        startDate: "2025-03-05",
        endDate: "2025-03-10",
        papers: [
          { subjectCode: "AI", date: "2025-03-05", maxMarks: 50 },
          { subjectCode: "ML", date: "2025-03-07", maxMarks: 50 },
          { subjectCode: "SE", date: "2025-03-09", maxMarks: 50 },
        ],
      },
      {
        type: "Final",
        startDate: "2025-04-20",
        endDate: "2025-04-30",
        papers: [
          { subjectCode: "AI", date: "2025-04-20", maxMarks: 100 },
          { subjectCode: "ML", date: "2025-04-23", maxMarks: 100 },
          { subjectCode: "SE", date: "2025-04-26", maxMarks: 100 },
        ],
      },
    ],
  },

  /* =====================================================
     STUDENT 2 — AVERAGE / BORDERLINE
     ===================================================== */
  {
    id: "s2",
    name: "Ananya",
    department: "Computer Science",
    semester: 3,

    subjects: [
      { code: "DS", name: "Data Structures" },
      { code: "OOP", name: "Object Oriented Programming" },
      { code: "CO", name: "Computer Organization" },
    ],

    attendance: [
      { subjectCode: "DS", percentage: 82 },
      { subjectCode: "OOP", percentage: 78 },
      { subjectCode: "CO", percentage: 76 },
    ],

    assignments: [
      {
        id: "s2-ds-a1",
        type: "Assignment",
        subjectCode: "DS",
        title: "Stack Applications",
        maxMarks: 15,
        dueDate: "2025-01-20",
        scoredMarks: 10,
      },
      {
        id: "s2-oop-t1",
        type: "Tutorial",
        subjectCode: "OOP",
        title: "Inheritance Tutorial",
        maxMarks: 15,
        dueDate: "2025-02-10",
      },
      {
        id: "s2-co-a1",
        type: "Assignment",
        subjectCode: "CO",
        title: "CPU Scheduling",
        maxMarks: 15,
        dueDate: "2025-01-28",
      },
    ],

    examPeriods: [
      {
        type: "Series 1",
        startDate: "2025-02-10",
        endDate: "2025-02-15",
        papers: [
          { subjectCode: "DS", date: "2025-02-10", maxMarks: 50, scoredMarks: 38 },
          { subjectCode: "OOP", date: "2025-02-12", maxMarks: 50, scoredMarks: 42 },
          { subjectCode: "CO", date: "2025-02-14", maxMarks: 50, scoredMarks: 35 },
        ],
      },
      {
        type: "Series 2",
        startDate: "2025-03-05",
        endDate: "2025-03-10",
        papers: [
          { subjectCode: "DS", date: "2025-03-05", maxMarks: 50 },
          { subjectCode: "OOP", date: "2025-03-07", maxMarks: 50 },
          { subjectCode: "CO", date: "2025-03-09", maxMarks: 50 },
        ],
      },
      {
        type: "Final",
        startDate: "2025-04-20",
        endDate: "2025-04-30",
        papers: [
          { subjectCode: "DS", date: "2025-04-20", maxMarks: 100 },
          { subjectCode: "OOP", date: "2025-04-23", maxMarks: 100 },
          { subjectCode: "CO", date: "2025-04-26", maxMarks: 100 },
        ],
      },
    ],
  },

  /* =====================================================
     STUDENT 3 — BELOW AVERAGE / AT RISK
     ===================================================== */
  {
    id: "s3",
    name: "Rahul",
    department: "Computer Science",
    semester: 5,

    subjects: [
      { code: "CN", name: "Computer Networks" },
      { code: "OS", name: "Operating Systems" },
      { code: "DBMS", name: "Database Management Systems" },
    ],

    attendance: [
      { subjectCode: "CN", percentage: 68 },
      { subjectCode: "OS", percentage: 65 },
      { subjectCode: "DBMS", percentage: 72 },
    ],

    assignments: [
      {
        id: "s3-cn-a1",
        type: "Assignment",
        subjectCode: "CN",
        title: "OSI Model Analysis",
        maxMarks: 15,
        dueDate: "2025-01-18",
      },
      {
        id: "s3-os-t1",
        type: "Tutorial",
        subjectCode: "OS",
        title: "Deadlocks",
        maxMarks: 15,
        dueDate: "2025-01-25",
      },
      {
        id: "s3-dbms-a1",
        type: "Assignment",
        subjectCode: "DBMS",
        title: "Normalization",
        maxMarks: 15,
        dueDate: "2025-01-30",
      },
    ],

    examPeriods: [
      {
        type: "Series 1",
        startDate: "2025-02-10",
        endDate: "2025-02-15",
        papers: [
          { subjectCode: "CN", date: "2025-02-10", maxMarks: 50, scoredMarks: 28 },
          { subjectCode: "OS", date: "2025-02-12", maxMarks: 50, scoredMarks: 30 },
          { subjectCode: "DBMS", date: "2025-02-14", maxMarks: 50, scoredMarks: 32 },
        ],
      },
      {
        type: "Series 2",
        startDate: "2025-03-05",
        endDate: "2025-03-10",
        papers: [
          { subjectCode: "CN", date: "2025-03-05", maxMarks: 50 },
          { subjectCode: "OS", date: "2025-03-07", maxMarks: 50 },
          { subjectCode: "DBMS", date: "2025-03-09", maxMarks: 50 },
        ],
      },
      {
        type: "Final",
        startDate: "2025-04-20",
        endDate: "2025-04-30",
        papers: [
          { subjectCode: "CN", date: "2025-04-20", maxMarks: 100 },
          { subjectCode: "OS", date: "2025-04-23", maxMarks: 100 },
          { subjectCode: "DBMS", date: "2025-04-26", maxMarks: 100 },
        ],
      },
    ],
  },
];
