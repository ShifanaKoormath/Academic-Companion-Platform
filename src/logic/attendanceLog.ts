import { ATTENDANCE_LOGS } from "../data/attendanceLog";

export function getAttendanceLog(
  studentId: string,
  subjectCode: string
) {
  return (
    ATTENDANCE_LOGS[studentId]?.filter(
      (s) => s.subjectCode === subjectCode
    ) || []
  );
}

export function getMissedTopics(
  studentId: string,
  subjectCode: string
) {
  return getAttendanceLog(studentId, subjectCode).filter(
    (s) => s.status === "Absent"
  );
}
