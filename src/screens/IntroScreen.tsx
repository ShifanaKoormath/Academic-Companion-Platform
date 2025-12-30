import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Screen from "../ui/Screen";
import { COLORS } from "../ui/colors";

export default function IntroScreen({ navigation }: any) {
  return (
    <Screen>
      {/* ---------- HERO ---------- */}
      <View style={styles.hero}>
        <Text style={styles.title}>Acadmate</Text>
        <Text style={styles.subtitle}>
          Academic Companion System
        </Text>
      </View>

      {/* ---------- CARD: WHAT ---------- */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>What is Acadmate?</Text>
        <Text style={styles.body}>
          Acadmate is an academic decision-support system that helps students
          understand their academic standing, detect eligibility risks early,
          and focus effort where it matters most.
        </Text>
      </View>

      {/* ---------- CARD: HOW ---------- */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>How this prototype works</Text>
        <Text style={styles.body}>
          The system uses structured academic data to simulate realistic
          semester progress, attendance patterns, and assessment outcomes.
          This allows the core logic to be demonstrated clearly under
          different academic conditions.
        </Text>
      </View>

      {/* ---------- CARD: SCENARIOS ---------- */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Simulated student scenarios</Text>

        <View style={styles.scenario}>
          <Text style={styles.scenarioName}>Meera</Text>
          <Text style={styles.scenarioDesc}>
            Above-average performance · Consistent attendance · Low risk
          </Text>
        </View>

        <View style={styles.scenario}>
          <Text style={styles.scenarioName}>Ananya</Text>
          <Text style={styles.scenarioDesc}>
            Borderline performance · Mixed attendance · Moderate risk
          </Text>
        </View>

        <View style={styles.scenario}>
          <Text style={styles.scenarioName}>Rahul</Text>
          <Text style={styles.scenarioDesc}>
            Low attendance · Weak internals · High academic risk
          </Text>
        </View>
      </View>

      {/* ---------- FOOTNOTE ---------- */}
      <Text style={styles.note}>
        No real student data is used. All insights are generated using
        deterministic academic rules.
      </Text>

      {/* ---------- CTA ---------- */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>
          Proceed to Login
        </Text>
      </TouchableOpacity>
    </Screen>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  hero: {
    marginTop: 24,
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 6,
  },

  body: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },

  scenario: {
    marginTop: 10,
  },

  scenarioName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },

  scenarioDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  note: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 6,
    lineHeight: 18,
  },

  button: {
    marginTop: 24,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
