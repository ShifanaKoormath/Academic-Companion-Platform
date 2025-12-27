import { View, Text, StyleSheet } from "react-native";
import Screen from "../ui/Screen";
import { getStudentById } from "../data/mockAcademicData";
import { COLORS } from "../ui/colors";

export default function AttendanceScreen({ route }: any) {
  const student = getStudentById(route.params.studentId);

  return (
    <Screen>
      <Text style={styles.header}>Attendance</Text>

      {student.attendance.map((a) => {
        const subject = student.subjects.find(
          (s) => s.code === a.subjectCode
        );

        const percentage =
          a.classesConducted === 0
            ? 0
            : Math.round(
                (a.classesAttended / a.classesConducted) * 100
              );

        const status =
          percentage >= 85
            ? "Safe"
            : percentage >= 75
            ? "Borderline"
            : "At Risk";

        return (
          <View key={a.subjectCode} style={styles.card}>
            <Text style={styles.title}>
              {subject?.name}
            </Text>

            <Text style={styles.value}>
              {percentage}%
            </Text>

            <Text
              style={[
                styles.status,
                status === "Safe" && { color: COLORS.success },
                status === "Borderline" && { color: COLORS.warning },
                status === "At Risk" && { color: COLORS.danger },
              ]}
            >
              {status}
            </Text>

            <Text style={styles.meta}>
              Attended {a.classesAttended} of{" "}
              {a.classesConducted} classes
            </Text>
          </View>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    color: COLORS.textPrimary,
  },

  card: {
    backgroundColor: COLORS.card,
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },

  value: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 6,
    color: COLORS.textPrimary,
  },

  status: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "600",
  },

  meta: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 6,
  },
});
