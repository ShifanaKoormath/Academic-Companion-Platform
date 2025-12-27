import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import Screen from "../ui/Screen";
import { COLORS } from "../ui/colors";
import { getStudentById } from "../data/mockAcademicData";
import {
  calculateSubjectRisk,
  getSubjectGuidance,
} from "../logic/riskEngine";
import { calculateAttendanceRecovery } from "../logic/attendanceRecovery";
import { calculateInternalRecovery } from "../logic/internalRecovery";

export default function SubjectRiskScreen({ route }: any) {
  const student = getStudentById(route.params.studentId);
  const subjectRisks = calculateSubjectRisk(student) || [];

  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>
          Subject-wise Risk Analysis
        </Text>

        {subjectRisks.map((s: any) => {
          const isOpen = expanded === s.subjectCode;
          const guidance = getSubjectGuidance(
            s.level,
            s.context
          );

          const attendanceRecovery =
            calculateAttendanceRecovery(student, s.subjectCode);

          const internalRecovery =
            calculateInternalRecovery(student, s.subjectCode);

          return (
            <View key={s.subjectCode} style={styles.card}>
              {/* ================= HEADER ================= */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  setExpanded(isOpen ? null : s.subjectCode)
                }
              >
                <View style={styles.headerRow}>
                  <Text style={styles.subject}>
                    {s.subjectName}
                  </Text>

                  <View
                    style={[
                      styles.badge,
                      s.level === "At Risk"
                        ? styles.badgeDanger
                        : s.level === "Borderline"
                        ? styles.badgeWarning
                        : styles.badgeSafe,
                    ]}
                  >
                    <Text style={styles.badgeText}>
                      {s.level}
                    </Text>
                  </View>
                </View>

                <Text style={styles.reason}>
                  {s.reason}
                </Text>

                {!isOpen && (
                  <Text style={styles.expandHint}>
                    Tap to view recovery plan →
                  </Text>
                )}
              </TouchableOpacity>

              {/* ================= EXPANDED ================= */}
              {isOpen && (
                <View style={styles.expandArea}>
                  {/* ---------- RECOVERY SNAPSHOT ---------- */}
                  <Text style={styles.section}>
                    Recovery Snapshot
                  </Text>

                  {attendanceRecovery && (
                    <View style={styles.recoveryBox}>
                      <Text style={styles.recoveryTitle}>
                        Attendance
                      </Text>
                      <Text style={styles.recoveryMain}>
                        Avoid missing any further classes
                      </Text>
                      <Text style={styles.recoverySub}>
                        Attend next{" "}
                        {attendanceRecovery.requiredClasses}{" "}
                        classes to reach eligibility
                      </Text>
                      <Text style={styles.recoveryMeta}>
                        Current attendance:{" "}
                        {attendanceRecovery.currentPercent}%
                      </Text>
                    </View>
                  )}

                  {internalRecovery && (
                    <View style={styles.recoveryBox}>
                      <Text style={styles.recoveryTitle}>
                        Internal Marks
                      </Text>

                      <View style={styles.marksRow}>
                        <View>
                          <Text style={styles.marksLabel}>
                            Current
                          </Text>
                          <Text style={styles.marksValue}>
                            {internalRecovery.current} / 50
                          </Text>
                        </View>

                        <View>
                          <Text style={styles.marksLabel}>
                            Max Possible
                          </Text>
                          <Text
                            style={[
                              styles.marksValue,
                              { color: COLORS.success },
                            ]}
                          >
                            {internalRecovery.maxPossible} / 50
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}

                  {/* ---------- ACTIONABLE GUIDANCE ---------- */}
                  <Text style={styles.section}>
                    What to focus on
                  </Text>
                  {guidance.focus.map(
                    (g: string, i: number) => (
                      <Text
                        key={i}
                        style={styles.bullet}
                      >
                        • {g}
                      </Text>
                    )
                  )}

                  {guidance.avoid.length > 0 && (
                    <>
                      <Text style={styles.section}>
                        Avoid
                      </Text>
                      {guidance.avoid.map(
                        (a: string, i: number) => (
                          <Text
                            key={i}
                            style={styles.bullet}
                          >
                            • {a}
                          </Text>
                        )
                      )}
                    </>
                  )}

                  {guidance.strategy.length > 0 && (
                    <>
                      <Text style={styles.section}>
                        Strategy
                      </Text>
                      {guidance.strategy.map(
                        (st: string, i: number) => (
                          <Text
                            key={i}
                            style={styles.bullet}
                          >
                            • {st}
                          </Text>
                        )
                      )}
                    </>
                  )}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </Screen>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    color: COLORS.textPrimary,
  },

card: {
  backgroundColor: COLORS.card,
  borderRadius: 20,
  padding: 18,
  marginBottom: 14,
  shadowColor: "#000",
  shadowOpacity: 0.04,
  shadowRadius: 10,
  elevation: 2,
},


  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

 subject: {
  fontSize: 15,          // matches Dashboard + Internals titles
  fontWeight: "600",     // not bold-heavy, consistent hierarchy
  color: COLORS.textPrimary,
  lineHeight: 20,
}
,

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#fff",
  },

  badgeDanger: { backgroundColor: COLORS.danger },
  badgeWarning: { backgroundColor: COLORS.warning },
  badgeSafe: { backgroundColor: COLORS.success },

  reason: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },

  expandHint: {
    fontSize: 12,
    color: COLORS.primary,
    marginTop: 6,
  },

  expandArea: {
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 12,
  },

  section: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 12,
    color: COLORS.textPrimary,
  },

  recoveryBox: {
    backgroundColor: "#f7f9fc",
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },

  recoveryTitle: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
  },

  recoveryMain: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },

  recoverySub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  recoveryMeta: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  marksRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  marksLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },

  marksValue: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },

  bullet: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
});
