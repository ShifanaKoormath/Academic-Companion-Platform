import { ScrollView, Text, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { COLORS } from "../ui/colors";
import { getStudentById } from "../data/mockAcademicData";
import Screen from "../ui/Screen";

/* ================= MOCK AI =================
   Replace later with real API if needed
=========================================== */
async function generateAcademicAdvice(snapshot: any) {
  return [
    {
      id: "ai-1",
      message:
        "Your attendance in Computer Organization is borderline. Missing another class may lead to eligibility issues.",
    },
    {
      id: "ai-2",
      message:
        "Completing the pending Graph Theory assignment can recover up to 10 internal marks.",
    },
    {
      id: "ai-3",
      message:
        "Series examinations are approaching. Prioritizing Data Structures preparation is recommended.",
    },
  ];
}

export default function CompanionScreen({ route }: any) {
  const student = getStudentById(route.params.studentId);

  const [advice, setAdvice] = useState<
    { id: string; message: string }[]
  >([]);

  useEffect(() => {
    const snapshot = {
      attendance: student.attendance,
      pendingAssignments: student.assignments.filter(
        (a) => a.scoredMarks === undefined
      ),
      examPeriods: student.examPeriods,
    };

    generateAcademicAdvice(snapshot).then(setAdvice);
  }, []);

  return (
      <Screen>


      {advice.length === 0 && (
        <Text style={styles.loading}>
          Analyzing academic data...
        </Text>
      )}

      {advice.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.message}>
            {item.message}
          </Text>
        </View>
      ))}
  </Screen>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: COLORS.background,
  },

  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: COLORS.textPrimary,
  },

  loading: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  card: {
    backgroundColor: COLORS.card,
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },

  message: {
    fontSize: 14,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
});
