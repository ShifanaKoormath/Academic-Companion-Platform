import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import Screen from "../ui/Screen";
import { COLORS } from "../ui/colors";
import { getStudentById } from "../data/mockAcademicData";
import { calculateSubjectRisk } from "../logic/riskEngine";
import { calculateAttendanceSimulator } from "../logic/attendanceRecovery";
import { calculateInternalRecovery } from "../logic/internalRecovery";
import { getMissedTopics } from "../logic/attendanceImpact";
import { getSubjectStudyFocus } from "../logic/studyFocus";

/* ================= PREDEFINED QUESTIONS ================= */

const QUESTIONS = [
  "Am I currently eligible for exams?",
  "What is the main reason affecting my eligibility?",
  "Which subject needs my attention first?",
  "Is recovery still possible for my weak subjects?",
  "How can I improve my internal marks?",
  "What topics have I missed due to absence?",
  "Why am I at academic risk?",
  "What happens if I miss more classes?",
  "Which subjects have the lowest attendance buffer?",
  "What is the maximum internal score I can still achieve?",
  "Which topics should I prioritize for exams?",
  "What should I focus on this week academically?",
];

export default function ChatbotScreen({ route }: any) {
  const student = getStudentById(route.params.studentId);
  const subjectRisks = calculateSubjectRisk(student);

  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);

  const [availableQuestions, setAvailableQuestions] =
    useState<string[]>(QUESTIONS);

  const atRisk = subjectRisks.filter(
    (s) => s.level === "At Risk"
  );

  const borderline = subjectRisks.filter(
    (s) => s.level === "Borderline"
  );

  /* ================= ANSWER ENGINE ================= */

  function generateAnswer(question: string): string {
    /* ---------- ELIGIBILITY ---------- */
    if (question.includes("eligible")) {
      return atRisk.length > 0
        ? "You are currently not eligible in one or more subjects due to attendance or internal assessment constraints."
        : "You currently meet eligibility criteria across all subjects.";
    }

    /* ---------- MAIN REASON ---------- */
    if (question.includes("main reason")) {
      return atRisk.length > 0
        ? `Primary eligibility risk driver:\n\n• ${atRisk[0].subjectName}\n\nDriven mainly by low attendance buffer and limited internal recovery scope.`
        : "No dominant academic risk factor detected at this time.";
    }

    /* ---------- PRIORITY SUBJECT ---------- */
    if (question.includes("attention")) {
      if (atRisk.length > 0) {
        return `Highest priority subject:\n\n• ${atRisk[0].subjectName}\n\nThis subject currently poses the greatest eligibility risk.`;
      }

      if (borderline.length > 0) {
        return `Monitor closely:\n\n• ${borderline[0].subjectName}\n\nThis subject is approaching academic risk thresholds.`;
      }

      return "All subjects are currently within safe academic limits.";
    }

    /* ---------- RECOVERY POSSIBILITY ---------- */
    if (question.includes("recovery")) {
      const lines: string[] = [];

      student.subjects.forEach((s) => {
        const rec = calculateInternalRecovery(
          student,
          s.code
        );

        if (rec.status === "Recoverable") {
          lines.push(
            `• ${s.name}: Recovery is possible with strong performance in remaining assessments.`
          );
        }

        if (rec.status === "At Risk") {
          lines.push(
            `• ${s.name}: Recovery is limited and requires near-perfect performance.`
          );
        }
      });

      return lines.length > 0
        ? lines.join("\n")
        : "All subjects currently have sufficient recovery scope.";
    }

    /* ---------- INTERNAL IMPROVEMENT ---------- */
    if (question.includes("improve my internal")) {
      const lines = student.subjects.map((s) => {
        const rec = calculateInternalRecovery(
          student,
          s.code
        );
        return `• ${s.name}: Maximum achievable ${rec.maxPossible} / 50 through remaining assessments.`;
      });

      return (
        "Internal improvement scope:\n\n" +
        lines.join("\n")
      );
    }

    /* ---------- MISSED TOPICS ---------- */
    if (question.includes("missed")) {
      const grouped: Record<string, string[]> =
        {};

      student.subjects.forEach((s) => {
        const missed = getMissedTopics(
          student.id,
          s.code
        );
        if (missed.length > 0) {
          grouped[s.name] = missed.map(
            (m) => m.topic
          );
        }
      });

      if (Object.keys(grouped).length === 0) {
        return "No missed topics recorded due to absence.";
      }

      return (
        "Missed topics due to absence:\n\n" +
        Object.entries(grouped)
          .map(
            ([subject, topics]) =>
              `${subject}:\n${topics
                .map((t) => `• ${t}`)
                .join("\n")}`
          )
          .join("\n\n")
      );
    }

    /* ---------- WHY AT RISK ---------- */
    if (question.includes("academic risk")) {
      return atRisk.length === 0
        ? "No subjects are currently below academic safety thresholds."
        : `You are at academic risk in the following subject(s):\n\n${atRisk
            .map(
              (s) =>
                `• ${s.subjectName} (attendance or internal assessment constraints)`
            )
            .join("\n")}`;
    }

    /* ---------- MISS MORE CLASSES ---------- */
    if (question.includes("miss more classes")) {
      const impacts: string[] = [];

      subjectRisks.forEach((s) => {
        const sim = calculateAttendanceSimulator(
          student,
          s.subjectCode
        );
        if (sim && sim.safeMisses <= 1) {
          impacts.push(
            `• ${s.subjectName}: Attendance buffer is critically low.`
          );
        }
      });

      return impacts.length > 0
        ? `Attendance impact summary:\n\n${impacts.join(
            "\n"
          )}`
        : "Attendance buffers are currently within safe limits.";
    }

    /* ---------- LOWEST ATTENDANCE ---------- */
    if (question.includes("lowest attendance")) {
      const buffers = subjectRisks
        .map((s) => {
          const sim = calculateAttendanceSimulator(
            student,
            s.subjectCode
          );
          return sim
            ? {
                subject: s.subjectName,
                buffer: sim.safeMisses,
              }
            : null;
        })
        .filter(Boolean) as {
        subject: string;
        buffer: number;
      }[];

      buffers.sort((a, b) => a.buffer - b.buffer);

      return buffers.length > 0
        ? `Lowest attendance buffer:\n\n• ${buffers[0].subject}`
        : "Attendance data indicates no immediate concern.";
    }

    /* ---------- MAX INTERNAL ---------- */
    if (question.includes("maximum internal")) {
      return (
        "Maximum achievable internal scores:\n\n" +
        student.subjects
          .map((s) => {
            const rec =
              calculateInternalRecovery(
                student,
                s.code
              );
            return `• ${s.name}: ${rec.maxPossible} / 50`;
          })
          .join("\n")
      );
    }

    /* ---------- PRIORITY TOPICS ---------- */
    if (question.includes("prioritize for exams")) {
      const topics = student.subjects.flatMap(
        (s) =>
          getSubjectStudyFocus(
            student,
            s.code
          )
            .filter((t) => t.priority === "High")
            .map(
              (t) =>
                `• ${s.name}: ${t.topic}`
            )
      );

      return topics.length > 0
        ? `High-priority exam topics:\n\n${topics.join(
            "\n"
          )}`
        : "No high-priority exam topics identified.";
    }

    /* ---------- WEEKLY FOCUS ---------- */
    if (question.includes("this week")) {
      return atRisk.length > 0
        ? `This week’s academic focus:\n\n• Strengthen attendance consistency\n• Address pending assessments in ${atRisk[0].subjectName}`
        : "Maintain consistency and revise upcoming exam topics.";
    }

    return "This query cannot be resolved with the current academic data.";
  }

  function handleQuestion(q: string) {
    setMessages((prev) => [
      ...prev,
      { role: "user", text: q },
      { role: "ai", text: generateAnswer(q) },
    ]);

    setAvailableQuestions((prev) =>
      prev.filter((x) => x !== q)
    );
  }

  /* ================= UI ================= */

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>
          AI Query Assistant
        </Text>
        <Text style={styles.subheader}>
          Guided academic insights based on your data
        </Text>

        {messages.map((m, i) => (
          <View
            key={i}
            style={[
              styles.bubble,
              m.role === "user"
                ? styles.userBubble
                : styles.aiBubble,
            ]}
          >
            <Text style={styles.text}>
              {m.text}
            </Text>
          </View>
        ))}

        {availableQuestions.map((q) => (
          <TouchableOpacity
            key={q}
            style={styles.prompt}
            onPress={() => handleQuestion(q)}
          >
            <Text style={styles.promptText}>
              {q}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Screen>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },

  subheader: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 14,
  },

  bubble: {
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    maxWidth: "95%",
  },

  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#eef2ff",
  },

  aiBubble: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.card,
  },

  text: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.textPrimary,
  },

  prompt: {
    backgroundColor: COLORS.card,
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.muted,
  },

  promptText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.primary,
  },
});
