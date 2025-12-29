import { Student } from "../types/academic";
import { RiskTimelineEvent } from "../types/riskTimeline";
import { calculateAttendanceSimulator } from "./attendanceRecovery";
import { calculateInternalRecovery } from "./internalRecovery";

export function generateRiskTimeline(
  student: Student,
  subjectCode: string
): RiskTimelineEvent[] {
  const events: RiskTimelineEvent[] = [];

  const attendance = calculateAttendanceSimulator(
    student,
    subjectCode
  );

  const internals = calculateInternalRecovery(
    student,
    subjectCode
  );

  const attendanceBelowMin =
    attendance ? attendance.currentPercent < 75 : false;

  /* ---------- Attendance checkpoint ---------- */
  if (attendance) {
    events.push({
      date: "2025-01-10",
      title: "Attendance threshold check",
      description: `Attendance recorded at ${attendance.currentPercent}%.`,
      severity:
        attendance.currentPercent < 75
          ? "At Risk"
          : attendance.currentPercent < 80
          ? "Borderline"
          : "Safe",
    });
  }

  /* ---------- Internal assessment checkpoint ---------- */
  events.push({
    date: "2025-02-05",
    title: "Internal assessment snapshot",
    description: `Internal score recorded: ${internals.current} / 50.`,
    severity:
      internals.status === "Safe"
        ? "Safe"
        : internals.status === "Recoverable"
        ? "Borderline"
        : "At Risk",
  });

  /* ---------- Eligibility checkpoint ---------- */
  events.push({
    date: "2025-03-01",
    title: "Eligibility status assessment",
    description:
      internals.maxPossible < 35 || attendanceBelowMin
        ? "Eligibility constraints identified."
        : "Eligibility conditions currently satisfied.",
    severity:
      internals.maxPossible < 35 || attendanceBelowMin
        ? "At Risk"
        : "Borderline",
  });

  /* ---------- Chronological ordering ---------- */
  events.sort(
    (a, b) =>
      new Date(a.date).getTime() -
      new Date(b.date).getTime()
  );

  return events;
}
