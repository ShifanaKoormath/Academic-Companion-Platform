import { Text, View, StyleSheet } from "react-native";
import { getStudentById } from "../data/mockAcademicData";
import { COLORS } from "../ui/colors";
import Screen from "../ui/Screen";

export default function ExamsScreen({ route }: any) {
  const student = getStudentById(route.params.studentId);

  const subjectMap = Object.fromEntries(
    student.subjects.map((s) => [s.code, s.name])
  );

  return (
    <Screen>
      {student.examPeriods.map((period) => (
        <View key={period.type} style={styles.periodBlock}>
          {/* ===== Period Header ===== */}
          <Text style={styles.periodTitle}>{period.type}</Text>
          <Text style={styles.periodRange}>
            {period.startDate} → {period.endDate}
          </Text>

          {/* ===== Papers ===== */}
          {period.papers.map((paper, idx) => (
            <View key={idx} style={styles.paperCard}>
              <Text style={styles.paperTitle}>
                {subjectMap[paper.subjectCode]}
              </Text>

              <Text style={styles.paperMeta}>
                Exam Date · {paper.date}
              </Text>

              {paper.scoredMarks !== undefined && (
                <Text style={styles.paperMarks}>
                  Marks · {paper.scoredMarks}/{paper.maxMarks}
                </Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </Screen>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  /* ===== Period ===== */
  periodBlock: {
    marginBottom: 22, // space between Series / Final
  },

  periodTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },

  periodRange: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
    marginBottom: 10,
  },

  /* ===== Paper Card ===== */
  paperCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },

  paperTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },

  paperMeta: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 6,
  },

  paperMarks: {
    fontSize: 13,
    color: COLORS.success,
    marginTop: 6,
    fontWeight: "600",
  },
});
