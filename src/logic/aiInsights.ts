import { Student } from "../types/academic";
import { calculateSubjectRisk } from "./riskEngine";
import { calculateAttendanceSimulator } from "./attendanceRecovery";

export function generateAcademicInsight(
  student: Student
): string {
  const subjectRisks = calculateSubjectRisk(student);

  const highRisk = subjectRisks.filter(
    (s) => s.level === "At Risk"
  );

  if (highRisk.length > 0) {
    return `AI Insight: Eligibility risk detected in ${highRisk.length} subject(s). Attendance and internal assessments are the primary contributors.`;
  }

  const borderline = subjectRisks.filter(
    (s) => s.level === "Borderline"
  );

  if (borderline.length > 0) {
    return `AI Insight: Academic performance is borderline. Small changes in attendance or assessment scores may impact eligibility.`;
  }

  return `AI Insight: Academic performance is stable. No immediate eligibility risks detected.`;
}
