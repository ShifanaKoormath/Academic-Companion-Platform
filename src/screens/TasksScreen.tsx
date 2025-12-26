import { View, Text, StyleSheet } from "react-native";
import Screen from "../ui/Screen";
import { COLORS } from "../ui/colors";
import { getStudentById } from "../data/mockAcademicData";

export default function TasksScreen({ route }: any) {
  const student = getStudentById(route.params.studentId);

  const subjectMap = Object.fromEntries(
    student.subjects.map((s) => [s.code, s.name])
  );

  const pendingAssignments = student.assignments.filter(
    (a) => a.scoredMarks === undefined
  );

  const completedAssignments = student.assignments.filter(
    (a) => a.scoredMarks !== undefined
  );

 function TaskCard({
  title,
  subject,
  status,
  marks,
  dueDate,
}: {
  title: string;
  subject: string;
  status: "pending" | "completed";
  marks?: string;
  dueDate: string;
}) {
  return (
    <View
      style={[
        styles.card,
        status === "pending" ? styles.pending : styles.completed,
      ]}
    >
      <Text style={styles.taskTitle}>{title}</Text>
      <Text style={styles.meta}>{subject}</Text>
      <Text style={styles.due}>Due · {dueDate}</Text>

      {status === "completed" && (
        <Text style={styles.success}>{marks}</Text>
      )}
    </View>
  );
}

  return (
    <Screen>
  
      {/* ================= PENDING ================= */}
<Text style={styles.sectionTitle}>Pending Tasks</Text>

{pendingAssignments.length === 0 && (
  <Text style={styles.empty}>No pending tasks 🎉</Text>
)}

{pendingAssignments.map((task) => (
  <TaskCard
    key={task.id}
    title={task.title}
    subject={subjectMap[task.subjectCode]}
    status="pending"
    dueDate={task.dueDate}
  />
))}

{pendingAssignments.length > 0 && (
  <Text style={styles.sectionNote}>
    ⚠ Complete pending tasks before the due date. Incomplete submissions
    contribute 0 internal marks.
  </Text>
)}


      {/* ================= COMPLETED ================= */}
      <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
        Completed Tasks
      </Text>

      {completedAssignments.length === 0 && (
        <Text style={styles.empty}>No completed tasks yet</Text>
      )}

      {completedAssignments.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          subject={subjectMap[task.subjectCode]}
          status="completed"
          marks={`${task.scoredMarks}/${task.maxMarks}`}
          dueDate={task.dueDate}
        />
      ))}
    </Screen>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 0,
    color: COLORS.textPrimary,
  },
  sectionNote: {
  fontSize: 12,
  color: COLORS.warning,
  marginTop: 6,
  lineHeight: 18,
},

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },

  pending: {
    borderLeftWidth: 6,
    borderLeftColor: COLORS.warning,
  },

  completed: {
    borderLeftWidth: 6,
    borderLeftColor: COLORS.success,
  },

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

  due: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  warning: {
    fontSize: 12,
    color: COLORS.warning,
    marginTop: 8,
    lineHeight: 18,
  },

  success: {
    fontSize: 13,
    color: COLORS.success,
    marginTop: 8,
    fontWeight: "600",
  },

  empty: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
});
