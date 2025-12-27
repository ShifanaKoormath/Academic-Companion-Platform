import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Screen from "../ui/Screen";
import { COLORS } from "../ui/colors";
import { getStudentById } from "../data/mockAcademicData";
import { calculateAcademicRisk } from "../logic/riskEngine";
import { calculateInternalMarks } from "../logic/internalCalculation";

export default function RiskDetailsScreen({ route, navigation }: any) {
  const student = getStudentById(route.params.studentId);

  /* ================= INTERNAL AVG ================= */

  const internalTotals = student.subjects.map((s) =>
    calculateInternalMarks(student, s.code).total
  );

  const avgInternal = Math.round(
    internalTotals.reduce((a, b) => a + b, 0) / internalTotals.length
  );

  /* ================= RISK ================= */

  const risk = calculateAcademicRisk(student, avgInternal);

  /* ================= WHAT-IF ================= */

  const pendingTasks = student.assignments.filter(
    (a) => a.scoredMarks === undefined
  ).length;

  const whatIfReduction =
    pendingTasks > 0 ? Math.min(pendingTasks * 8, 20) : 0;

  const projectedRisk = Math.max(risk.score - whatIfReduction, 0);

  return (
    <Screen>
      {/* ================= HEADER ================= */}
      <Text style={styles.title}>Academic Risk Analysis</Text>

      <View style={styles.summaryCard}>
        <Text style={styles.score}>{risk.score} / 100</Text>
        <Text
          style={[
            styles.level,
            {
              color:
                risk.level === "High"
                  ? COLORS.danger
                  : risk.level === "Moderate"
                  ? COLORS.warning
                  : COLORS.success,
            },
          ]}
        >
          {risk.level} Risk
        </Text>
      </View>

      {/* ================= REASONS ================= */}
      <Text style={styles.sectionTitle}>Why this risk?</Text>

      {risk.reasons.length === 0 ? (
        <Text style={styles.safe}>No critical academic risks detected.</Text>
      ) : (
        risk.reasons.map((reason, i) => (
          <View key={i} style={styles.reasonCard}>
            <Text style={styles.reasonText}>• {reason}</Text>
          </View>
        ))
      )}

      {/* ================= WHAT-IF ================= */}
      <Text style={styles.sectionTitle}>What if you act now?</Text>

      {pendingTasks === 0 ? (
        <Text style={styles.safe}>
          No pending tasks. Maintain current performance.
        </Text>
      ) : (
        <View style={styles.simulationCard}>
          <Text style={styles.simText}>
            Completing all pending tasks can reduce your risk score to:
          </Text>

          <Text style={styles.simScore}>
            {projectedRisk} / 100
          </Text>

          <Text style={styles.simHint}>
            (Improved internal marks + reduced academic pressure)
          </Text>
        </View>
      )}

      {/* ================= DRILL DOWN ================= */}
      <TouchableOpacity
        style={styles.exploreBtn}
        onPress={() =>
          navigation.navigate("SubjectRisk", {
            studentId: student.id,
          })
        }
      >
        <Text style={styles.exploreText}>
          Explore Subject-wise Risk →
        </Text>
      </TouchableOpacity>
    </Screen>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: COLORS.textPrimary,
  },

  summaryCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },

  score: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 6,
  },

  level: {
    fontSize: 15,
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 18,
  },

  reasonCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
  },

  reasonText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },

  simulationCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 18,
    alignItems: "center",
  },

  simText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
  },

  simScore: {
    fontSize: 24,
    fontWeight: "800",
    marginVertical: 10,
    color: COLORS.success,
  },

  simHint: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: "center",
  },

  safe: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  exploreBtn: {
    marginTop: 20,
    padding: 14,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },

  exploreText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
