import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Screen from "../ui/Screen";
import { COLORS } from "../ui/colors";
import { getStudentById } from "../data/mockAcademicData";

export default function LoginScreen({ route, navigation }: any) {
  const { studentId } = route.params;
  const student = getStudentById(studentId);

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    if (password === student.demoPassword) {
      navigation.replace("Dashboard", { studentId });
    } else {
      setError("Invalid credentials (demo)");
    }
  }

  return (
    <Screen>
      <Text style={styles.title}>Student Login</Text>

      <View style={styles.card}>
        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.meta}>
          {student.department} · Semester {student.semester}
        </Text>

        <TextInput
          placeholder="Enter demo password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        {error !== "" && (
          <Text style={styles.error}>{error}</Text>
        )}

        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.hint}>
          Demo only · No real authentication
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    color: COLORS.textPrimary,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 20,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
  },

  meta: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 14,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },

  error: {
    color: COLORS.danger,
    fontSize: 12,
    marginBottom: 8,
  },

  btn: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "600",
  },

  hint: {
    marginTop: 12,
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
});
