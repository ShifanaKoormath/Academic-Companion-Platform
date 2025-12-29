export interface AttendanceSession {
  date: string;              // YYYY-MM-DD
  subjectCode: string;
  topic: string;
  status: "Present" | "Absent";
}
