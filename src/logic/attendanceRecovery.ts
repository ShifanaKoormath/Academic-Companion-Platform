import { Student } from "../types/academic";

const TOTAL_CLASSES = 60;
const MIN_PERCENT = 75;

export function calculateAttendanceSimulator(
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

  const minRequiredClasses = Math.ceil(
    (MIN_PERCENT / 100) * TOTAL_CLASSES
  );

  const remainingClasses = TOTAL_CLASSES - classesConducted;

  const maxMissableClasses =
    TOTAL_CLASSES -
    minRequiredClasses -
    (classesConducted - classesAttended);

  const safeMisses = Math.max(0, maxMissableClasses);

  return {
    currentPercent,
    classesConducted,
    classesAttended,
    remainingClasses,
    safeMisses,
 simulation: [
  {
    miss: 1,
    resultingPercent: Math.round(
      (classesAttended / (classesConducted + 1)) * 100
    ),
    status:
      Math.round(
        (classesAttended / (classesConducted + 1)) * 100
      ) >= MIN_PERCENT
        ? "Safe"
        : "At Risk",
  },
  {
    miss: 2,
    resultingPercent: Math.round(
      (classesAttended / (classesConducted + 2)) * 100
    ),
    status:
      Math.round(
        (classesAttended / (classesConducted + 2)) * 100
      ) >= MIN_PERCENT
        ? "Safe"
        : "High Risk",
  },
],

  };
}
