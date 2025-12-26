import { Student } from "../types/academic";

/* =========================
   ATTENDANCE → MARKS (10)
   ========================= */
export function attendanceToMarks(percentage: number): number {
  if (percentage >= 90) return 10;
  if (percentage >= 80) return 8;
  if (percentage >= 75) return 6;
  return 0;
}

/* =========================
   INTERNAL MARK CALCULATION
   ========================= */
export function calculateInternalMarks(
  student: Student,
  subjectCode: string
) {
  /* ---------- Attendance (10) ---------- */
  const attendanceEntry = student.attendance.find(
    (a) => a.subjectCode === subjectCode
  );

  const attendanceMarks = attendanceEntry
    ? attendanceToMarks(attendanceEntry.percentage)
    : 0;

  /* ---------- Assignments (15) ---------- */
  const assignmentMarks = student.assignments
    .filter((a) => a.subjectCode === subjectCode)
    .reduce((sum, a) => sum + (a.scoredMarks ?? 0), 0);

  const cappedAssignmentMarks = Math.min(assignmentMarks, 15);

  /* ---------- Series Exams Avg (25) ---------- */
const seriesMarks = student.examPeriods
  .filter((p) => p.type === "Series 1" || p.type === "Series 2")
  .flatMap((p) => p.papers)
  .filter(
    (paper) =>
      paper.subjectCode === subjectCode &&
      paper.scoredMarks !== undefined
  )
  .map((paper) => paper.scoredMarks as number);

/* ---------- Series Exams Avg (25) ---------- */
let seriesAvgMarks = 0;

if (seriesMarks.length === 2) {
  // Both series conducted → average of two
  const avgOutOf50 = (seriesMarks[0] + seriesMarks[1]) / 2;
  seriesAvgMarks = Math.round((avgOutOf50 / 50) * 25);
} else if (seriesMarks.length === 1) {
  // Only Series 1 conducted → provisional scaling
  seriesAvgMarks = Math.round((seriesMarks[0] / 50) * 25);
}


  /* ---------- TOTAL INTERNAL (50) ---------- */
  const totalInternalMarks =
    cappedAssignmentMarks + attendanceMarks + seriesAvgMarks;

  return {
    assignmentMarks: cappedAssignmentMarks, // /15
    attendanceMarks,                         // /10
    seriesAvg: seriesAvgMarks,               // /25
    total: totalInternalMarks,               // /50
  };
}
