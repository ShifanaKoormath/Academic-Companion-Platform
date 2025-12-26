import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { STUDENTS } from "../data/students";
import { COLORS } from "../ui/colors";
import Screen from "../ui/Screen";

export default function StudentSelectorScreen({ navigation }: any) {
  return (
     <Screen>

      {/* ================= HEADER ================= */}
      <Text style={styles.title}>Select Student Profile</Text>
      <Text style={styles.subtitle}>
        Choose a student to explore different academic scenarios
      </Text>

      {/* ================= STUDENT CARDS ================= */}
      {STUDENTS.map((student) => (
        <TouchableOpacity
          key={student.id}
          style={styles.card}
          activeOpacity={0.85}
          onPress={() =>
            navigation.navigate("Dashboard", {
              studentId: student.id,
            })
          }
        >
          <View>
            <Text style={styles.name}>{student.name}</Text>
            <Text style={styles.meta}>
              {student.department} · Semester {student.semester}
            </Text>
          </View>

          <Text style={styles.action}>View →</Text>
        </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 24,
  },

  card: {
    backgroundColor: COLORS.card,
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  name: {
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },

  meta: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  action: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.primary,
  },
});
