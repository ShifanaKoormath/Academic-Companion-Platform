import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getStudentById } from "../data/mockAcademicData";
import { COLORS } from "../ui/colors";
import Screen from "../ui/Screen";
import AppHeader from "../ui/AppHeader";

import { calculateInternalMarks } from "../logic/internalCalculation";
import { calculateAcademicRisk } from "../logic/riskEngine";

export default function DashboardScreen({ route, navigation }: any) {
  const student = getStudentById(route.params.studentId);

  /* ================= ATTENDANCE CALC ================= */

  const attendancePercentages = student.attendance.map((a) =>
    Math.round((a.classesAttended / a.classesConducted) * 100)
  );

  const minAttendance = Math.min(...attendancePercentages);

  const attendanceStatus =
    minAttendance >= 85
      ? { hint: "Safe", color: COLORS.success }
      : minAttendance >= 75
      ? { hint: "Borderline", color: COLORS.warning }
      : { hint: "At Risk", color: COLORS.danger };

  /* ================= INTERNALS CALC ================= */

  const internalTotals = student.subjects.map((subject) =>
    calculateInternalMarks(student, subject.code).total
  );

  const avgInternal = Math.round(
    internalTotals.reduce((a, b) => a + b, 0) / internalTotals.length
  );

  const internalStatus =
    avgInternal >= 40
      ? { hint: "Strong", color: COLORS.success }
      : avgInternal >= 30
      ? { hint: "Average", color: COLORS.warning }
      : { hint: "Weak", color: COLORS.danger };

  /* ================= ACADEMIC RISK ================= */

  const risk = calculateAcademicRisk(student, avgInternal);

  return (
    <>
      <AppHeader />

      <Screen>
        {/* ================= GREETING ================= */}
        <View style={styles.greetingBlock}>
          <Text style={styles.greeting}>
            Good day, <Text style={styles.name}>{student.name}</Text> 👋
          </Text>

          <Text style={styles.subGreeting}>
            Semester {student.semester} · {student.department}
          </Text>
        </View>

        {/* ================= URGENT SIGNALS ================= */}
        <View style={styles.alertColumn}>
          <AlertCard
            title="To-Do"
            subtitle="Tasks need attention"
            color={COLORS.warning}
            onPress={() =>
              navigation.navigate("Todo", { studentId: student.id })
            }
          />

          <AlertCard
            title="Exams"
            subtitle="Countdown active"
            color={COLORS.primary}
            onPress={() =>
              navigation.navigate("ExamCountdown", {
                studentId: student.id,
              })
            }
          />
        </View>

        {/* ================= SNAPSHOT ================= */}
        <Text style={styles.sectionTitle}>Academic Snapshot</Text>

        <View style={styles.snapshotRow}>
          <SnapshotCard
            label="Attendance"
            value={`${minAttendance}%`}
            hint={attendanceStatus.hint}
            color={attendanceStatus.color}
            onPress={() =>
              navigation.navigate("Attendance", {
                studentId: student.id,
              })
            }
          />

          <SnapshotCard
            label="Internals"
            value={`${avgInternal} / 50`}
            hint={internalStatus.hint}
            color={internalStatus.color}
            onPress={() =>
              navigation.navigate("Internals", {
                studentId: student.id,
              })
            }
          />
        </View>

        {/* ================= RISK SNAPSHOT ================= */}
        <View style={{ marginTop: 14 }}>
          <SnapshotCard
            label="Academic Risk"
            value={`${risk.score} / 100`}
            hint={risk.level}
            color={
              risk.level === "High"
                ? COLORS.danger
                : risk.level === "Moderate"
                ? COLORS.warning
                : COLORS.success
            }
            onPress={() =>
              navigation.navigate("RiskDetails", {
                studentId: student.id,
              })
            }
          />
        </View>

        {/* ================= NAVIGATION ================= */}
        <Text style={styles.sectionTitle}>Academic Modules</Text>

        {[
          ["Tasks", "Tasks"],
          ["Exams Schedule", "Exams"],
          ["Academic Companion", "Companion"],
        ].map(([label, screen]) => (
          <TouchableOpacity
            key={screen}
            style={styles.navCard}
            onPress={() =>
              navigation.navigate(screen, {
                studentId: student.id,
              })
            }
          >
            <Text style={styles.navText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </Screen>
    </>
  );
}

/* ================= COMPONENTS ================= */

function AlertCard({ title, subtitle, color, onPress }: any) {
  return (
    <TouchableOpacity
      style={[styles.alertCard, { borderLeftColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.alertTitle}>{title}</Text>
      <Text style={styles.alertSub}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

function SnapshotCard({ label, value, hint, color, onPress }: any) {
  return (
    <TouchableOpacity style={styles.snapshotCard} onPress={onPress}>
      <Text style={styles.snapshotLabel}>{label}</Text>
      <Text style={[styles.snapshotValue, { color }]}>{value}</Text>
      <Text style={styles.snapshotHint}>{hint}</Text>
    </TouchableOpacity>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  greetingBlock: {
    marginBottom: 14,
  },

  greeting: {
    fontSize: 22,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },

  name: {
    fontWeight: "700",
  },

  subGreeting: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 14,
    color: COLORS.textPrimary,
  },

  alertColumn: {
    marginBottom: 18,
  },

  alertCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderLeftWidth: 6,
  },

  alertTitle: {
    fontWeight: "600",
    fontSize: 15,
    color: COLORS.textPrimary,
  },

  alertSub: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },

  snapshotRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  snapshotCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    marginRight: 10,
  },

  snapshotLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  snapshotValue: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 6,
  },

  snapshotHint: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  navCard: {
    backgroundColor: COLORS.card,
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
  },

  navText: {
    fontSize: 15,
    fontWeight: "500",
  },
});
