import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { getStudentById } from "../data/mockAcademicData";
import { COLORS } from "../ui/colors";
import { DEMO_TODAY } from "../config/demoConfig";
import Screen from "../ui/Screen";

export default function ExamCountdownScreen({ route }: any) {
  const student = getStudentById(route.params.studentId);
  const today = DEMO_TODAY;

  const subjectMap = Object.fromEntries(
    student.subjects.map((s) => [s.code, s.name])
  );

  const upcomingPapers = student.examPeriods
    .flatMap((period) =>
      period.papers.map((paper) => ({
        ...paper,
        periodType: period.type,
        periodStart: period.startDate,
      }))
    )
    .filter((paper) => new Date(paper.date) >= today)
    .sort(
      (a, b) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
    );

  if (upcomingPapers.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Exam Countdown</Text>
        <Text style={styles.empty}>
          No upcoming exams
        </Text>
      </View>
    );
  }

  const nextPaper = upcomingPapers[0];
  const daysLeft = Math.ceil(
    (new Date(nextPaper.date).getTime() -
      today.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <Screen>


      {/* ================= HERO CARD ================= */}
      <View style={styles.heroCard}>
        <Text style={styles.period}>
          {nextPaper.periodType}
        </Text>

        <Text style={styles.subject}>
          {subjectMap[nextPaper.subjectCode]}
        </Text>

        <Text style={styles.days}>
          {daysLeft}
        </Text>

        <Text style={styles.daysLabel}>
          day{daysLeft !== 1 && "s"} left
        </Text>

        <Text style={styles.date}>
          {nextPaper.date}
        </Text>
      </View>

      {/* ================= UPCOMING ================= */}
      <Text style={styles.sectionTitle}>
        Upcoming Papers
      </Text>

      {upcomingPapers.map((paper, idx) => {
        const diff = Math.ceil(
          (new Date(paper.date).getTime() -
            today.getTime()) /
            (1000 * 60 * 60 * 24)
        );

        return (
          <View key={idx} style={styles.paperCard}>
            <Text style={styles.paperSubject}>
              {subjectMap[paper.subjectCode]}
            </Text>

            <Text style={styles.paperMeta}>
              {paper.periodType}
            </Text>

            <Text style={styles.paperMeta}>
              Date: {paper.date}
            </Text>

            <Text
              style={[
                styles.paperMeta,
                diff <= 2 && styles.urgent,
              ]}
            >
              In {diff} day{diff !== 1 && "s"}
            </Text>
          </View>
        );
      })}
     </Screen>

  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.background,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 16,
  },

  heroCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 28,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
  },

  period: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: "600",
  },

  subject: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 6,
    textAlign: "center",
  },

  days: {
    fontSize: 48,
    fontWeight: "700",
    color: COLORS.primary,
    marginTop: 10,
  },

  daysLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  date: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 8,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },

  paperCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },

  paperSubject: {
    fontSize: 15,
    fontWeight: "600",
  },

  paperMeta: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  urgent: {
    color: COLORS.danger,
    fontWeight: "600",
  },

  empty: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});
