import { Text, View, StyleSheet } from "react-native";
import { getStudentById } from "../data/mockAcademicData";
import { calculateInternalMarks } from "../logic/internalCalculation";
import { COLORS } from "../ui/colors";
import Screen from "../ui/Screen";

export default function InternalsScreen({ route }: any) {
  const student = getStudentById(route.params.studentId);

  return (
    <Screen>
      <Text style={styles.header}>
        Internal Assessment
      </Text>

      {student.subjects.map((sub) => {
        const r = calculateInternalMarks(
          student,
          sub.code
        );

        return (
          <View key={sub.code} style={styles.card}>
            <Text style={styles.title}>
              {sub.name}
            </Text>

            <Text style={styles.meta}>
              Assignments: {r.assignmentMarks}/15
            </Text>

            <Text style={styles.meta}>
              Attendance: {r.attendanceMarks}/10
            </Text>

            <Text style={styles.meta}>
              Series Avg: {r.seriesAvg}/25
            </Text>

            <Text style={styles.total}>
              Total: {r.total}/50
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

  meta: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  total: {
    marginTop: 8,
    fontWeight: "700",
    color: COLORS.primary,
  },
});
