import { Student } from "../types/academic";
import { calculateInternalMarks } from "./internalCalculation";

const INTERNAL_PASS = 35; // ✅ UPDATED

export function calculateInternalRecovery(
  student: Student,
  subjectCode: string
) {
  const current = calculateInternalMarks(student, subjectCode);

  const pendingTasks = student.assignments.filter(
    (a) =>
      a.subjectCode === subjectCode &&
      a.scoredMarks === undefined
  ).length;

  const recoverableAssignmentMarks =
    Math.min(pendingTasks * 5, 15 - current.assignmentMarks);

  const potentialSeriesGain =
    current.seriesAvg < 25 ? 5 : 0;

  const maxPossible =
    current.total +
    recoverableAssignmentMarks +
    potentialSeriesGain;

  const cappedMax = Math.min(maxPossible, 50);

  const buffer = cappedMax - INTERNAL_PASS;

  return {
    current: current.total,
    maxPossible: cappedMax,

    buffer: Math.max(0, buffer),

    actions: {
      assignments: recoverableAssignmentMarks,
      series: potentialSeriesGain,
    },

    status:
      current.total >= INTERNAL_PASS
        ? "Safe"
        : cappedMax >= INTERNAL_PASS
        ? "Recoverable"
        : "At Risk",
  };
}
