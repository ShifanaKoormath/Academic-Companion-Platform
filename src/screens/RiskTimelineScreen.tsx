import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import Screen from "../ui/Screen";
import { COLORS } from "../ui/colors";
import { getStudentById } from "../data/mockAcademicData";
import { generateRiskTimeline } from "../logic/riskTimeline";

export default function RiskTimelineScreen({ route }: any) {
  const student = getStudentById(route.params.studentId);
  const subjectCode = route.params.subjectCode;

  const subject = student.subjects.find(
    (s) => s.code === subjectCode
  );

  const timeline = generateRiskTimeline(
    student,
    subjectCode
  );

  /* ---------- Overall severity summary ---------- */
  const highestSeverity =
    timeline.some((e) => e.severity === "At Risk")
      ? "At Risk"
      : timeline.some((e) => e.severity === "Borderline")
      ? "Borderline"
      : "Safe";

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>
          Academic Risk Timeline
        </Text>

        {subject && (
          <Text style={styles.subtitle}>
            {subject.name}
          </Text>
        )}

        {/* ---------- ONE-LINE SUMMARY ---------- */}
        <Text
          style={[
            styles.summary,
            highestSeverity === "At Risk"
              ? styles.summaryRisk
              : highestSeverity === "Borderline"
              ? styles.summaryWarning
              : styles.summarySafe,
          ]}
        >
          {highestSeverity === "At Risk"
            ? "Overall status: High academic risk identified for this subject."
            : highestSeverity === "Borderline"
            ? "Overall status: Academic risk emerging; close monitoring required."
            : "Overall status: No immediate academic risk detected."}
        </Text>

        {/* ---------- TIMELINE ---------- */}
        {timeline.map((event, index) => (
          <View key={index} style={styles.timelineRow}>
            <View
              style={[
                styles.dot,
                event.severity === "Safe"
                  ? styles.dotSafe
                  : event.severity === "Borderline"
                  ? styles.dotWarning
                  : styles.dotDanger,
              ]}
            />

            <View style={styles.card}>
              <Text style={styles.date}>
                {event.date}
              </Text>

              <Text style={styles.title}>
                {event.title}
              </Text>

              <Text style={styles.desc}>
                {event.description}
              </Text>

              <View
                style={[
                  styles.badge,
                  event.severity === "Safe"
                    ? styles.badgeSafe
                    : event.severity === "Borderline"
                    ? styles.badgeWarning
                    : styles.badgeDanger,
                ]}
              >
                <Text style={styles.badgeText}>
                  {event.severity}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
    color: COLORS.textPrimary,
  },

  subtitle: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.textSecondary,
    marginBottom: 10,
  },

  summary: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 16,
  },

  summarySafe: { color: COLORS.success },
  summaryWarning: { color: COLORS.warning },
  summaryRisk: { color: COLORS.danger },

  timelineRow: {
    flexDirection: "row",
    marginBottom: 16,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 10,
    marginRight: 12,
  },

  dotSafe: { backgroundColor: COLORS.success },
  dotWarning: { backgroundColor: COLORS.warning },
  dotDanger: { backgroundColor: COLORS.danger },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 12,
    flex: 1,
  },

  date: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
    color: COLORS.textPrimary,
  },

  desc: {
    fontSize: 12,
    marginTop: 4,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },

  badge: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#fff",
  },

  badgeSafe: { backgroundColor: COLORS.success },
  badgeWarning: { backgroundColor: COLORS.warning },
  badgeDanger: { backgroundColor: COLORS.danger },
});
