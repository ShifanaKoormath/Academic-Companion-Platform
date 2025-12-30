import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Screen from "../ui/Screen";
import { COLORS } from "../ui/colors";
import { getStudentById } from "../data/mockAcademicData";
import { calculateSubjectRisk } from "../logic/riskEngine";
import { calculateAttendanceSimulator } from "../logic/attendanceRecovery";
import { calculateInternalRecovery } from "../logic/internalRecovery";
import { useNavigation } from "@react-navigation/native";

export default function CompanionScreen({ route }: any) {
  const student = getStudentById(route.params.studentId);
  const navigation = useNavigation<any>();

  const subjectRisks = calculateSubjectRisk(student);

  const atRisk = subjectRisks.filter(
    (s: any) => s.level === "At Risk"
  );

  const borderline = subjectRisks.filter(
    (s: any) => s.level === "Borderline"
  );

  /* ================= AI INSIGHT GENERATION ================= */

  function generateInsights(): string[] {
    const insights: string[] = [];

    if (atRisk.length > 0) {
      insights.push(
        `Eligibility risk detected in ${atRisk.length} subject(s). Immediate academic attention is required.`
      );

      atRisk.forEach((s: any) => {
        const attendance = calculateAttendanceSimulator(
          student,
          s.subjectCode
        );

        const internals = calculateInternalRecovery(
          student,
          s.subjectCode
        );

        if (attendance && attendance.currentPercent < 75) {
          insights.push(
            `${s.subjectName}: Attendance is below the minimum eligibility threshold (${attendance.currentPercent}%).`
          );
        }

        if (internals.maxPossible < 35) {
          insights.push(
            `${s.subjectName}: Internal assessment recovery scope is limited based on remaining evaluations.`
          );
        }
      });
    } else if (borderline.length > 0) {
      insights.push(
        `Academic performance is borderline in ${borderline.length} subject(s). Minor changes may affect eligibility.`
      );

      borderline.forEach((s: any) => {
        insights.push(
          `${s.subjectName}: Performance is close to academic risk thresholds.`
        );
      });
    } else {
      insights.push(
        "Academic performance is stable across all subjects. No immediate eligibility risks detected."
      );
    }

    return insights;
  }

  const insights = generateInsights();

  return (
    <Screen>
      {/* ---------- HEADER ---------- */}
      <Text style={styles.title}>AI Insights</Text>
      <Text style={styles.subtitle}>
        System-generated academic analysis
      </Text>

      {/* ---------- INSIGHT CARDS ---------- */}
      {insights.map((text, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.message}>{text}</Text>
        </View>
      ))}

      {/* ---------- OPTIONAL CHATBOT CTA ---------- */}
      <TouchableOpacity
        style={styles.chatCta}
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate("Chatbot", {
            studentId: student.id,
          })
        }
      >
        <Text style={styles.chatCtaTitle}>
          Try AI Query Assistant 
        </Text>
        <Text style={styles.chatCtaSub}>
          Ask predefined academic questions using AI-backed logic
        </Text>
      </TouchableOpacity>

      {/* ---------- FOOTNOTE ---------- */}
      <Text style={styles.note}>
        Insights are generated using explainable academic rules and simulations.
        This module is designed to be extensible with real AI models.
      </Text>
    </Screen>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },

  card: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },

  message: {
    fontSize: 14,
    color: COLORS.textPrimary,
    lineHeight: 22,
  },

  chatCta: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginTop: 18,
    borderWidth: 1,
    borderColor: COLORS.muted,
  },

  chatCtaTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
  },

  chatCtaSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },

  note: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 14,
    lineHeight: 18,
  },
});
