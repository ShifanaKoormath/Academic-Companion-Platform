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
    <Screen scroll={false}>
      {/* ================= BRAND HEADER ================= */}
      <View style={styles.header}>
        <Text style={styles.brand}>Acadmate</Text>
        <Text style={styles.tagline}>
          Academic Companion Platform
        </Text>
      </View>

      {/* ================= LOGIN CARD ================= */}
      <View style={styles.card}>
        <Text style={styles.title}>Student Login</Text>
        <Text style={styles.subtitle}>
          Sign in to access your academic dashboard
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={COLORS.muted}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={COLORS.muted}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 36,
  },

  brand: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.primary,
    letterSpacing: 0.4,
  },

  tagline: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 6,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 22,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },

  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 6,
    marginBottom: 20,
  },

  input: {
    backgroundColor: COLORS.background,
    padding: 14,
    borderRadius: 12,
    fontSize: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.muted,
    color: COLORS.textPrimary,
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 6,
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  error: {
    fontSize: 12,
    color: COLORS.danger,
    marginBottom: 8,
  },
});
