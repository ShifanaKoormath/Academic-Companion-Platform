import { Student } from "../types/academic";
import { calculateInternalMarks } from "./internalCalculation";

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

  const potentialSeriesGain = current.seriesAvg < 25 ? 5 : 0;

  const maxPossible =
    current.total +
    recoverableAssignmentMarks +
    potentialSeriesGain;

  return {
    current: current.total,
    maxPossible: Math.min(maxPossible, 50),
    actions: {
      assignments: recoverableAssignmentMarks,
      series: potentialSeriesGain,
    },
  };
}
