import { ATTENDANCE_LOGS } from "../data/attendanceLog";

export function getMissedTopics(
  studentId: string,
  subjectCode: string
) {
  return (
    ATTENDANCE_LOGS[studentId]?.filter(
      (s) =>
        s.subjectCode === subjectCode &&
        s.status === "Absent"
    ) || []
  );
}
