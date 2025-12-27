import { Student } from "../types/academic";

/* =========================
   CONFIG (Academic Rules)
   ========================= */

const MIN_ATTENDANCE_PERCENT = 75;

/* =========================
   TYPES
   ========================= */

export type RiskLevel = "Low" | "Moderate" | "High";

export interface RiskResult {
  score: number;          // 0 – 100
  level: RiskLevel;
  reasons: string[];
  projections: string[];
}

/* =========================
   ATTENDANCE RISK
   ========================= */

function calculateAttendanceRisk(student: Student): {
  risk: number;
  reason?: string;
} {
  let highestRisk = 0;
  let reason = "";

  student.attendance.forEach((a) => {
    const { classesConducted, classesAttended } = a;

    const percentage =
      (classesAttended / classesConducted) * 100;

    const remainingClasses = classesConducted < 60
      ? 60 - classesConducted
      : 0;

    const minRequiredAttendance =
      Math.ceil((MIN_ATTENDANCE_PERCENT / 100) * 60);

    const remainingAllowedAbsences =
      classesAttended + remainingClasses - minRequiredAttendance;

    if (remainingAllowedAbsences <= 0) {
      highestRisk = 35;
      reason =
        "Attendance eligibility at risk — no remaining safe absences";
    }
  });

  return { risk: highestRisk, reason };
}

/* =========================
   TASK RISK
   ========================= */

function calculateTaskRisk(student: Student): {
  risk: number;
  reason?: string;
} {
  const pending = student.assignments.filter(
    (a) => a.scoredMarks === undefined
  );

  if (pending.length === 0) {
    return { risk: 0 };
  }

  const risk = Math.min(pending.length * 10, 25);

  return {
    risk,
    reason: `${pending.length} pending academic task(s) affecting internals`,
  };
}

/* =========================
   INTERNAL MARK RISK
   ========================= */

function calculateInternalRisk(avgInternal: number): {
  risk: number;
  reason?: string;
} {
  if (avgInternal >= 40) return { risk: 0 };

  if (avgInternal >= 30) {
    return {
      risk: 15,
      reason: "Internal marks currently in average range",
    };
  }

  return {
    risk: 25,
    reason: "Internal marks critically low",
  };
}

/* =========================
   EXAM PROXIMITY RISK
   ========================= */

function calculateExamRisk(student: Student): {
  risk: number;
  reason?: string;
} {
  const today = new Date();

  const upcomingDates = student.examPeriods
    .flatMap((p) => p.papers)
    .map((p) => new Date(p.date))
    .filter((d) => d > today);

  if (upcomingDates.length === 0) {
    return { risk: 0 };
  }

  const nearestExam = Math.min(
    ...upcomingDates.map((d) => d.getTime())
  );

  const daysLeft =
    (nearestExam - today.getTime()) / (1000 * 60 * 60 * 24);

  if (daysLeft <= 7) {
    return {
      risk: 15,
      reason: "Upcoming exams within the next 7 days",
    };
  }

  if (daysLeft <= 14) {
    return {
      risk: 8,
      reason: "Exams approaching within two weeks",
    };
  }

  return { risk: 0 };
}

/* =========================
   MAIN RISK ENGINE
   ========================= */

export function calculateAcademicRisk(
  student: Student,
  avgInternal: number
): RiskResult {
  const reasons: string[] = [];
  const projections: string[] = [];

  const attendance = calculateAttendanceRisk(student);
  const tasks = calculateTaskRisk(student);
  const internals = calculateInternalRisk(avgInternal);
  const exams = calculateExamRisk(student);

  const score =
    attendance.risk +
    tasks.risk +
    internals.risk +
    exams.risk;

  if (attendance.reason) reasons.push(attendance.reason);
  if (tasks.reason) reasons.push(tasks.reason);
  if (internals.reason) reasons.push(internals.reason);
  if (exams.reason) reasons.push(exams.reason);

  if (tasks.risk > 0) {
    projections.push(
      "Completing pending tasks can improve internal marks and reduce risk"
    );
  }

  if (attendance.risk > 0) {
    projections.push(
      "Attending upcoming classes can restore attendance safety margin"
    );
  }

  let level: RiskLevel = "Low";
  if (score >= 60) level = "High";
  else if (score >= 30) level = "Moderate";

  return {
    score,
    level,
    reasons,
    projections,
  };
}
/* =========================
   SUBJECT-WISE RISK ANALYSIS
   ========================= */

export function calculateSubjectRisk(student: Student) {
  const TOTAL_CLASSES = 60;

  return student.subjects.map((subject) => {
    /* ---------- Attendance ---------- */
    const attendance = student.attendance.find(
      (a) => a.subjectCode === subject.code
    );

    let attendancePercent = 0;
    let classesNeeded = 0;
    let attendanceRisk = false;

    if (attendance) {
      attendancePercent =
        (attendance.classesAttended / attendance.classesConducted) * 100;

      const minRequired =
        Math.ceil((MIN_ATTENDANCE_PERCENT / 100) * TOTAL_CLASSES);

      const remainingClasses =
        TOTAL_CLASSES - attendance.classesConducted;

      const maxPossibleAttendance =
        attendance.classesAttended + remainingClasses;

      classesNeeded = Math.max(
        minRequired - attendance.classesAttended,
        0
      );

      attendanceRisk = maxPossibleAttendance < minRequired;
    }

    /* ---------- Pending Tasks ---------- */
    const pendingTasks = student.assignments.filter(
      (a) =>
        a.subjectCode === subject.code &&
        a.scoredMarks === undefined
    ).length;

    /* ---------- Series Performance ---------- */
    const seriesMarks = student.examPeriods
      .filter((p) => p.type === "Series 1")
      .flatMap((p) => p.papers)
      .filter(
        (paper) =>
          paper.subjectCode === subject.code &&
          paper.scoredMarks !== undefined
      )
      .map((p) => p.scoredMarks as number);

    const seriesAvg =
      seriesMarks.length > 0
        ? seriesMarks.reduce((a, b) => a + b, 0) /
          seriesMarks.length
        : null;

    const weakSeries = seriesAvg !== null && seriesAvg < 30;

    /* ---------- Risk Decision ---------- */
    let level: "Safe" | "Borderline" | "At Risk" = "Safe";
    let reason = "No immediate academic risk detected";

    if (attendanceRisk || weakSeries || pendingTasks >= 2) {
      level = "At Risk";
      reason = "Multiple academic risk factors detected";
    } else if (
      attendancePercent < 80 ||
      pendingTasks === 1
    ) {
      level = "Borderline";
      reason = "Academic performance needs attention";
    }

    return {
      subjectCode: subject.code,
      subjectName: subject.name,
      level,
      reason,
      context: {
        attendancePercent: Math.round(attendancePercent),
        classesNeeded,
        pendingTasks,
        weakSeries,
        seriesAvg:
          seriesAvg !== null ? Math.round(seriesAvg) : null,
      },
    };
  });
}
/* =========================
   SUBJECT GUIDANCE ENGINE
   ========================= */
export function getSubjectGuidance(
  level: "Safe" | "Borderline" | "At Risk",
  context: {
    attendancePercent: number;
    classesNeeded: number;
    pendingTasks: number;
    weakSeries: boolean;
    seriesAvg: number | null;
  }
) {
  const focus: string[] = [];
  const avoid: string[] = [];
  const strategy: string[] = [];

  /* ---------- ATTENDANCE ---------- */
  if (context.classesNeeded > 0) {
    focus.push(
      "Avoid missing any further classes"
    );
    strategy.push(
      `To remain eligible, you must attend at least ${context.classesNeeded} of the remaining classes`
    );
    strategy.push(
      `Current attendance: ${context.attendancePercent}%`
    );
  }

  /* ---------- TASKS ---------- */
  if (context.pendingTasks > 0) {
    focus.push(
      `Complete ${context.pendingTasks} pending task(s) to improve internal marks`
    );
    avoid.push(
      "Delaying submissions — unsubmitted work contributes zero marks"
    );
  }

  /* ---------- EXAMS ---------- */
  if (context.weakSeries && context.seriesAvg !== null) {
    focus.push(
      `Revisit Series 1 topics (current average: ${context.seriesAvg}/50)`
    );
    strategy.push(
      "Strengthen fundamentals before moving to advanced concepts"
    );
  }

  /* ---------- SAFE CASE ---------- */
  if (level === "Safe") {
    focus.push("Maintain consistent attendance and submission habits");
    avoid.push("Complacency due to current good performance");
    strategy.push("Continue current academic rhythm");
  }

  return {
    focus,
    avoid,
    strategy,
  };
}
