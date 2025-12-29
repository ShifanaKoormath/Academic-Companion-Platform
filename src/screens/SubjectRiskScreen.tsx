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
import { calculateAttendanceSimulator } from "../logic/attendanceRecovery";
import { calculateInternalRecovery } from "../logic/internalRecovery";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

export default function SubjectRiskScreen({ route }: any) {
  const student = getStudentById(route.params.studentId);
  const subjectRisks = calculateSubjectRisk(student) || [];

  const [expanded, setExpanded] = useState<string | null>(null);
  const [showAttendanceImpact, setShowAttendanceImpact] =
    useState<string | null>(null);
  const [showInternalSources, setShowInternalSources] =
    useState<string | null>(null);
const navigation =
  useNavigation<
    NativeStackNavigationProp<RootStackParamList>
  >();

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>
          Subject-wise Risk Analysis
        </Text>

        {subjectRisks.map((s: any) => {
          const isOpen = expanded === s.subjectCode;

          const attendanceSim = calculateAttendanceSimulator(
            student,
            s.subjectCode
          );

          const internalRecovery = calculateInternalRecovery(
            student,
            s.subjectCode
          );

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
                    Tap to view analysis →
                  </Text>
                )}
              </TouchableOpacity>

              {/* ================= EXPANDED ================= */}
              {isOpen && (
                <View style={styles.expandArea}>
                  <Text style={styles.section}>
                    Academic Risk Overview
                  </Text>

                  {/* ================= ATTENDANCE ================= */}
                  {attendanceSim && (
                    <View style={styles.recoveryBox}>
                      <Text style={styles.recoveryTitle}>
                        Attendance Risk
                      </Text>

                      <View style={styles.bufferBox}>
                        <Text style={styles.bufferText}>
                          Attendance risk margin:{" "}
                          {attendanceSim.safeMisses} class
                          {attendanceSim.safeMisses !== 1
                            ? "es"
                            : ""}
                        </Text>
                      </View>

                      <Text style={styles.recoveryMeta}>
                        Current attendance:{" "}
                        {attendanceSim.currentPercent}% | Minimum
                        required: 75%
                      </Text>

                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() =>
                          setShowAttendanceImpact(
                            showAttendanceImpact ===
                              s.subjectCode
                              ? null
                              : s.subjectCode
                          )
                        }
                      >
                        <Text
                          style={[
                            styles.recoveryMeta,
                            { marginTop: 8 },
                          ]}
                        >
                          If additional classes are missed{" "}
                          {showAttendanceImpact ===
                          s.subjectCode
                            ? "▾"
                            : "▸"}
                        </Text>
                      </TouchableOpacity>

                      {showAttendanceImpact ===
                        s.subjectCode && (
                        <View style={styles.simulationBox}>
                          {attendanceSim.simulation.map(
                            (sim) => (
                              <View
                                key={sim.miss}
                                style={
                                  styles.simulationRow
                                }
                              >
                                <Text
                                  style={
                                    styles.simulationText
                                  }
                                >
                                  Missing {sim.miss} class
                                  {sim.miss > 1
                                    ? "es"
                                    : ""}
                                </Text>

                                <Text
                                  style={[
                                    styles.simulationResult,
                                    sim.status !==
                                      "Safe" && {
                                      color:
                                        COLORS.danger,
                                    },
                                  ]}
                                >
                                  →{" "}
                                  {sim.resultingPercent}% (
                                  {sim.status ===
                                  "Safe"
                                    ? "Eligible"
                                    : sim.status ===
                                      "At Risk"
                                    ? "At risk"
                                    : "Not eligible"}
                                  )
                                </Text>
                              </View>
                            )
                          )}
                        </View>
                      )}

                      <Text
                        style={[
                          styles.recoveryMeta,
                          { marginTop: 8 },
                        ]}
                      >
                        This analysis highlights attendance
                        risk thresholds, not attendance
                        recommendations.
                      </Text>
                    </View>
                  )}

                  {/* ================= INTERNALS ================= */}
                  {internalRecovery && (
                    <View style={styles.recoveryBox}>
                      <Text style={styles.recoveryTitle}>
                        Internal Assessment
                      </Text>

                      <View style={styles.metricRow}>
                        <Text style={styles.metricLabel}>
                          Current score
                        </Text>
                        <Text style={styles.metricValue}>
                          {internalRecovery.current} /
                          50
                        </Text>
                      </View>

                      <View style={styles.metricRow}>
                        <Text style={styles.metricLabel}>
                          Minimum required
                        </Text>
                        <Text style={styles.metricValue}>
                          35 / 50
                        </Text>
                      </View>

                      <View style={styles.metricRow}>
                        <Text style={styles.metricLabel}>
                          Max achievable
                        </Text>
                        <Text style={styles.metricValue}>
                          {
                            internalRecovery.maxPossible
                          }{" "}
                          / 50
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.metricRow,
                          {
                            marginTop: 8,
                            alignItems: "center",
                          },
                        ]}
                      >
                        <Text
                          style={styles.metricLabel}
                        >
                          Status
                        </Text>

                        <View
                          style={[
                            styles.statusBadge,
                            internalRecovery.status ===
                            "Safe"
                              ? styles.statusSafe
                              : styles.statusWarning,
                          ]}
                        >
                          <Text
                            style={styles.statusText}
                          >
                            {internalRecovery.status ===
                            "Safe"
                              ? "Eligible"
                              : internalRecovery.status ===
                                "Recoverable"
                              ? "Recovery possible"
                              : "Below threshold"}
                          </Text>
                        </View>
                      </View>

                      {(internalRecovery.actions
                        .assignments > 0 ||
                        internalRecovery.actions
                          .series > 0) && (
                        <>
                          <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() =>
                              setShowInternalSources(
                                showInternalSources ===
                                  s.subjectCode
                                  ? null
                                  : s.subjectCode
                              )
                            }
                          >
                            <Text
                              style={[
                                styles.recoveryMeta,
                                { marginTop: 10 },
                              ]}
                            >
                              Possible improvement sources{" "}
                              {showInternalSources ===
                              s.subjectCode
                                ? "▾"
                                : "▸"}
                            </Text>
                          </TouchableOpacity>

                          {showInternalSources ===
                            s.subjectCode && (
                            <>
                              {internalRecovery.actions
                                .assignments >
                                0 && (
                                <Text
                                  style={
                                    styles.recoverySub
                                  }
                                >
                                  • Assignments → up to{" "}
                                  {
                                    internalRecovery
                                      .actions
                                      .assignments
                                  }{" "}
                                  marks
                                </Text>
                              )}

                              {internalRecovery.actions
                                .series > 0 && (
                                <Text
                                  style={
                                    styles.recoverySub
                                  }
                                >
                                  • Next series → up to{" "}
                                  {
                                    internalRecovery
                                      .actions.series
                                  }{" "}
                                  marks
                                </Text>
                              )}
                            </>
                          )}
                        </>
                      )}

                      <Text
                        style={[
                          styles.recoveryMeta,
                          { marginTop: 8 },
                        ]}
                      >
                        Values indicate maximum possible
                        improvement, not guaranteed results.
                      </Text>
                    </View>
                  )}
                  <TouchableOpacity
  style={styles.timelineButton}
  onPress={() =>
    navigation.navigate("RiskTimeline", {
      studentId: student.id,
      subjectCode: s.subjectCode,
    })
  }
>
  <Text style={styles.timelineButtonText}>
    View Risk Timeline →
  </Text>
</TouchableOpacity>

                </View>
                
              )}
              
            </View>
          );
        
        }
        
        )}
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
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },

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
    marginBottom: 8,
    color: COLORS.textPrimary,
  },

  recoveryBox: {
    backgroundColor: "#f7f9fc",
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },

  recoveryTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 6,
  },

  recoveryMeta: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  recoverySub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  bufferBox: {
    backgroundColor: "#eef3ff",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 8,
  },

  bufferText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
  },

  simulationBox: {
    marginTop: 4,
  },

  simulationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },

  simulationText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  simulationResult: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },

  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },

  metricLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  metricValue: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },

  statusSafe: {
    backgroundColor: COLORS.success,
  },

  statusWarning: {
    backgroundColor: COLORS.warning,
  },
  timelineButton: {
  marginTop: 14,
  paddingVertical: 10,
  borderRadius: 10,
  backgroundColor: "#eef3ff",
  alignItems: "center",
},

timelineButtonText: {
  fontSize: 13,
  fontWeight: "600",
  color: COLORS.primary,
},

});
