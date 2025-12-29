import { AttendanceSession } from "../types/attendanceLog";

/*
  Only ABSENT sessions are logged.
  Density of logs reflects attendance severity.
*/

export const ATTENDANCE_LOGS: Record<
  string,
  AttendanceSession[]
> = {
  /* ================= STUDENT 2 =================
     Ananya — Average / Borderline
     Subjects: DS, OOP, CO
  =============================================== */
  s2: [
    {
      date: "2025-01-10",
      subjectCode: "DS",
      topic: "Stacks and Queues",
      status: "Absent",
    },
    {
      date: "2025-01-16",
      subjectCode: "DS",
      topic: "Binary Trees",
      status: "Absent",
    },
    {
      date: "2025-01-18",
      subjectCode: "OOP",
      topic: "Inheritance",
      status: "Absent",
    },
    {
      date: "2025-01-22",
      subjectCode: "CO",
      topic: "CPU Scheduling Algorithms",
      status: "Absent",
    },
  ],

  /* ================= STUDENT 3 =================
     Rahul — Below Average / At Risk
     Subjects: CN, OS, DBMS
     Low attendance → high topic loss
  =============================================== */
  s3: [
    /* ---------- Operating Systems ---------- */
    {
      date: "2025-01-08",
      subjectCode: "OS",
      topic: "Process Scheduling",
      status: "Absent",
    },
    {
      date: "2025-01-10",
      subjectCode: "OS",
      topic: "Deadlocks",
      status: "Absent",
    },
    {
      date: "2025-01-12",
      subjectCode: "OS",
      topic: "Deadlock Prevention & Avoidance",
      status: "Absent",
    },
    {
      date: "2025-01-15",
      subjectCode: "OS",
      topic: "Paging",
      status: "Absent",
    },
    {
      date: "2025-01-18",
      subjectCode: "OS",
      topic: "Virtual Memory",
      status: "Absent",
    },

    /* ---------- Computer Networks ---------- */
    {
      date: "2025-01-20",
      subjectCode: "CN",
      topic: "OSI Model",
      status: "Absent",
    },
    {
      date: "2025-01-22",
      subjectCode: "CN",
      topic: "TCP/IP Architecture",
      status: "Absent",
    },
    {
      date: "2025-01-25",
      subjectCode: "CN",
      topic: "Congestion Control",
      status: "Absent",
    },

    /* ---------- DBMS ---------- */
    {
      date: "2025-01-27",
      subjectCode: "DBMS",
      topic: "Functional Dependencies",
      status: "Absent",
    },
    {
      date: "2025-01-29",
      subjectCode: "DBMS",
      topic: "Normalization",
      status: "Absent",
    },
    {
      date: "2025-02-01",
      subjectCode: "DBMS",
      topic: "Indexing Techniques",
      status: "Absent",
    },
  ],
};
