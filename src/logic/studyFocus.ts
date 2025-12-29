import { Student } from "../types/academic";
import { PYQ_TOPICS } from "../data/pyqTopics";
import { calculateInternalRecovery } from "./internalRecovery";

export function getSubjectStudyFocus(
  student: Student,
  subjectCode: string
) {
  const pyqs = PYQ_TOPICS[subjectCode] || [];
  const internals = calculateInternalRecovery(student, subjectCode);

  const isWeak =
    internals.current < 35 ||
    internals.status !== "Safe";

  return pyqs.map((t) => ({
    topic: t.topic,
    frequency: t.frequency,
    priority:
      isWeak && t.frequency >= 3
        ? "High"
        : t.frequency >= 3
        ? "Medium"
        : "Low",
  }));
}
