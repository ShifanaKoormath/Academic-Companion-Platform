import { Student } from "../types/academic";

const TOTAL_CLASSES = 60;
const MIN_PERCENT = 75;

export function calculateAttendanceRecovery(
  student: Student,
  subjectCode: string
) {
  const attendance = student.attendance.find(
    (a) => a.subjectCode === subjectCode
  );

  if (!attendance) return null;

  const { classesAttended, classesConducted } = attendance;

  const currentPercent = Math.round(
    (classesAttended / classesConducted) * 100
  );

  // Already safe → no recovery needed
  if (currentPercent >= MIN_PERCENT) {
    return null;
  }

  const minRequired = Math.ceil(
    (MIN_PERCENT / 100) * TOTAL_CLASSES
  );

  const remainingClasses = TOTAL_CLASSES - classesConducted;
  const requiredClasses =
    minRequired - classesAttended;

  return {
    currentPercent,
    requiredClasses:
      requiredClasses > 0
        ? Math.min(requiredClasses, remainingClasses)
        : 0,
  };
}
