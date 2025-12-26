import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { getStudentById } from "../data/mockAcademicData";
import { COLORS } from "../ui/colors";
import Screen from "../ui/Screen";

type Priority = "High" | "Medium" | "Low";

export default function TodoScreen({ route }: any) {
  const student = getStudentById(route.params.studentId);
  const today = new Date();

  const subjectMap = Object.fromEntries(
    student.subjects.map((s) => [s.code, s.name])
  );

  function getPriority(a: any): Priority {
    const diffDays =
      (new Date(a.dueDate).getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24);

    if (diffDays < 0) return "High";
    if (diffDays <= 3) return "Medium";
    return "Low";
  }

  const todoList = student.assignments
    .filter((a) => a.scoredMarks === undefined)
    .map((a) => ({
      ...a,
      priority: getPriority(a),
    }))
    .sort((a, b) => {
      const order = { High: 0, Medium: 1, Low: 2 };
      return order[a.priority] - order[b.priority];
    });

  return (
      <Screen>

      {/* ================= HEADER ================= */}
      <Text style={styles.title}>To-Do List</Text>
      <Text style={styles.subTitle}>
        Focus on these to avoid losing marks
      </Text>

      {todoList.length === 0 && (
        <Text style={styles.empty}>
          You’re all caught up 🎉
        </Text>
      )}

      {/* ================= TASKS ================= */}
      {todoList.map((task) => (
        <View
          key={task.id}
          style={[
            styles.card,
            task.priority === "High"
              ? styles.highBorder
              : task.priority === "Medium"
              ? styles.mediumBorder
              : styles.lowBorder,
          ]}
        >
          <Text style={styles.taskTitle}>
            {task.title}
          </Text>

          <Text style={styles.meta}>
            {subjectMap[task.subjectCode]} ·{" "}
            {task.type}
          </Text>

          <View style={styles.row}>
            <Text style={styles.due}>
              Due {task.dueDate}
            </Text>

            <Text
              style={[
                styles.priority,
                task.priority === "High"
                  ? styles.high
                  : task.priority === "Medium"
                  ? styles.medium
                  : styles.low,
              ]}
            >
              {task.priority}
            </Text>
          </View>

          <Text style={styles.warning}>
            Unsubmitted tasks contribute 0 marks.
          </Text>
        </View>
      ))}
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
  },

  subTitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderLeftWidth: 6,
  },

  highBorder: { borderLeftColor: COLORS.danger },
  mediumBorder: { borderLeftColor: COLORS.warning },
  lowBorder: { borderLeftColor: COLORS.success },

  taskTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },

  meta: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },

  due: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  priority: {
    fontSize: 12,
    fontWeight: "600",
  },

  high: { color: COLORS.danger },
  medium: { color: COLORS.warning },
  low: { color: COLORS.success },

  warning: {
    marginTop: 8,
    fontSize: 12,
    color: COLORS.warning,
  },

  empty: {
    marginTop: 30,
    fontSize: 14,
    color: COLORS.success,
  },
});
