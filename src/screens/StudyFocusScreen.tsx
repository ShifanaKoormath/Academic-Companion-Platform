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
import { getSubjectStudyFocus } from "../logic/studyFocus";
import { getMissedTopics } from "../logic/attendanceImpact";

export default function StudyFocusScreen({ route }: any) {
  const student = getStudentById(route.params.studentId);

  const [activeSubject, setActiveSubject] = useState(
    student.subjects[0].code
  );

  const focusTopics = getSubjectStudyFocus(
    student,
    activeSubject
  );

  const missedTopics = getMissedTopics(
    student.id,
    activeSubject
  );

  return (
    <Screen>
      {/* ---------- HEADER CONTEXT ---------- */}
      <View style={styles.headerInfo}>
        
      </View>

      {/* ---------- SUBJECT TABS ---------- */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabs}
      >
        {student.subjects.map((s) => (
          <TouchableOpacity
            key={s.code}
            onPress={() => setActiveSubject(s.code)}
            style={[
              styles.tab,
              activeSubject === s.code && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeSubject === s.code && styles.activeTabText,
              ]}
            >
              {s.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
        <Text style={styles.contextNote}>
  Study priorities inferred from exam trends and recent performance
</Text>

      {/* ---------- CONTENT ---------- */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 14 }}
      >
        {/* ---------- PRIORITY TOPICS ---------- */}
        <Text style={styles.sectionTitle}>
          Priority Topics
        </Text>

        {focusTopics.length === 0 ? (
          <Text style={styles.meta}>
            No priority topics identified for this subject.
          </Text>
        ) : (
          focusTopics.map((t, i) => (
            <View key={i} style={styles.topicRow}>
              <Text style={styles.topicText}>
                {t.topic}
              </Text>

              <View
                style={[
                  styles.priorityBadge,
                  t.priority === "High"
                    ? styles.badgeDanger
                    : t.priority === "Medium"
                    ? styles.badgeWarning
                    : styles.badgeSafe,
                ]}
              >
                <Text style={styles.badgeText}>
                  {t.priority}
                </Text>
              </View>
            </View>
          ))
        )}

        {/* ---------- DIVIDER ---------- */}
        <View style={styles.divider} />

        {/* ---------- MISSED TOPICS ---------- */}
        <Text style={styles.sectionTitle}>
          Missed Topics
        </Text>

        {missedTopics.length === 0 ? (
          <Text style={styles.meta}>
            No missed classes recorded for this subject.
          </Text>
        ) : (
          missedTopics.map((m, i) => (
            <View key={i} style={styles.missedRow}>
              <Text style={styles.missedDate}>
                {m.date}
              </Text>
              <Text style={styles.missedTopic}>
                {m.topic}
              </Text>
            </View>
          ))
        )}

        {/* ---------- FOOTNOTE ---------- */}
        <Text style={[styles.meta, { marginTop: 12 }]}>
          Topics reflect exam relevance and recorded absences.
        </Text>
      </ScrollView>
    </Screen>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  headerInfo: {
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 10,
  },
contextNote: {
  fontSize: 12,
  color: COLORS.textSecondary,
  marginTop: 10,
  marginBottom: 6,
},

  subtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  tabs: {
    flexGrow: 0,
  },

  tab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f2f5",
    marginRight: 8,
  },

  activeTab: {
    backgroundColor: COLORS.primary,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  tabText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  activeTabText: {
    color: "#fff",
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 16,
    color: COLORS.textPrimary,
  },

  topicRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  topicText: {
    fontSize: 13,
    color: COLORS.textPrimary,
  },

  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#fff",
  },

  badgeDanger: { backgroundColor: "#d9534f" },
  badgeWarning: { backgroundColor: COLORS.warning },
  badgeSafe: { backgroundColor: COLORS.success },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 12,
  },

  missedRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },

  missedDate: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  missedTopic: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.textPrimary,
  },

  meta: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 6,
    lineHeight: 18,
  },
});
