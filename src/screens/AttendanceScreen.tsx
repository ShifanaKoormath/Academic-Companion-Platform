import { ScrollView, Text, View, StyleSheet } from "react-native";
import Screen from "../ui/Screen";

import { getStudentById } from "../data/mockAcademicData";
import { COLORS } from "../ui/colors";

export default function AttendanceScreen({ route }: any) {
  const student = getStudentById(route.params.studentId);

  return (
  <Screen>

      {student.attendance.map(a => {
        const subject = student.subjects.find(s => s.code === a.subjectCode);
        const status =
          a.percentage >= 85 ? "Safe" :
          a.percentage >= 75 ? "Borderline" : "At Risk";

        return (
          <View key={a.subjectCode} style={styles.card}>
            <Text style={styles.title}>{subject?.name}</Text>
            <Text style={styles.value}>{a.percentage}%</Text>
            <Text style={[
              styles.status,
              status === "Safe" && { color: COLORS.success },
              status === "Borderline" && { color: COLORS.warning },
              status === "At Risk" && { color: COLORS.danger },
            ]}>
              {status}
            </Text>
          </View>
        );
      })}
  </Screen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: COLORS.background },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  card: {
    backgroundColor: COLORS.card,
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
  },
  title: { fontWeight: "600" },
  value: { fontSize: 20, fontWeight: "700", marginTop: 6 },
  status: { marginTop: 4, fontSize: 13 },
});
