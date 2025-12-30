import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import Screen from "../ui/Screen";
import { COLORS } from "../ui/colors";
import { STUDENTS } from "../data/students";

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    const student = STUDENTS.find(
      (s) =>
        s.name.toLowerCase() === username.toLowerCase() &&
        s.demoPassword === password
    );

    if (!student) {
      setError("Invalid username or password");
      return;
    }

    navigation.replace("Dashboard", {
      studentId: student.id,
    });
  }

  return (
    <Screen>
      {/* ---------- HEADER ---------- */}
      <Text style={styles.title}>Student Login</Text>

      <Text style={styles.subtitle}>
        Sign in to access your academic dashboard
      </Text>

      {/* ---------- INPUTS ---------- */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* ---------- ERROR ---------- */}
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}

      {/* ---------- ACTION ---------- */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* ---------- FOOTNOTE ---------- */}
      <Text style={styles.hint}>
        Authorized access only
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },

  input: {
    backgroundColor: COLORS.card,
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 14,
  },

  button: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  error: {
    color: COLORS.danger,
    fontSize: 12,
    marginBottom: 6,
  },

  hint: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 16,
    textAlign: "center",
  },
});
