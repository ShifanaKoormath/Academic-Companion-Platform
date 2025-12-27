export function calculateAttendancePercentage(
  classesAttended: number,
  classesConducted: number
): number {
  if (classesConducted === 0) return 0;
  return Math.round(
    (classesAttended / classesConducted) * 100
  );
}

export function getAttendanceStatus(
  percentage: number
): "Safe" | "Borderline" | "At Risk" {
  if (percentage >= 85) return "Safe";
  if (percentage >= 75) return "Borderline";
  return "At Risk";
}
