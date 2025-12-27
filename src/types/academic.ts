/* =========================
   CORE ACADEMIC TYPES
   ========================= */

export type ExamType = "Series 1" | "Series 2" | "Final";

/* =========================
   SUBJECT
   ========================= */

export interface Subject {
  code: string;
  name: string;
}

/* =========================
   ATTENDANCE
   ========================= */
export interface Attendance {
  subjectCode: string;
  classesConducted: number;
  classesAttended: number;
}

/* =========================
   ASSIGNMENTS / TUTORIALS
   ========================= */
export type AssignmentType = "Assignment" | "Tutorial";

export interface Assignment {
  id: string;
  type: AssignmentType;   // 👈 REQUIRED
  subjectCode: string;
  title: string;
  maxMarks: 15;
  dueDate: string;
  scoredMarks?: number;
}


/* =========================
   EXAMS (SERIES + FINAL)
   ========================= */

export interface ExamPaper {
  subjectCode: string;
  date: string;
  maxMarks: number;
  scoredMarks?: number;
}

export interface ExamPeriod {
  type: ExamType;
  startDate: string;
  endDate: string;
  papers: ExamPaper[];
}

/* =========================
   STUDENT
   ========================= */

export interface Student {
  id: string;
  name: string;
  department: string;
  semester: number;

  subjects: Subject[];
  attendance: Attendance[];
  assignments: Assignment[];
  examPeriods: ExamPeriod[];
}
