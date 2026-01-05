import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Screen from "../ui/Screen";
import { COLORS } from "../ui/colors";
import { getStudentById } from "../data/mockAcademicData";
import { SUBJECT_SYLLABUS } from "../data/subjectSyllabus";
import { makeNoteKey } from "../utils/noteKey";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

const STORAGE_KEY = "STUDENT_NOTES_V2";

type Note = {
  text: string;
  pinned: boolean;
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Notes"
>;

export default function NotesScreen({ route, navigation }: Props) {
  const student = getStudentById(route.params.studentId);

  const [activeSubject, setActiveSubject] = useState(
    student.subjects[0].code
  );
  const [openModule, setOpenModule] = useState<string | null>(null);
  const [openTopic, setOpenTopic] = useState<string | null>(null);

  const [notes, setNotes] = useState<Record<string, Note>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");

  const syllabus = SUBJECT_SYLLABUS[activeSubject];
  /* ---------- HANDLE NAVIGATION PARAMS ---------- */
  useEffect(() => {
    if (!route.params) return;

    const { subject, module, topic } = route.params;

    if (subject) {
      setActiveSubject(subject);
    }

    if (module) {
      setOpenModule(module);
    }

    if (subject && module && topic) {
      const key = makeNoteKey(subject, module, topic);
      setOpenTopic(key);
    }
  }, [route.params]);

  /* ---------- LOAD + MIGRATE ---------- */
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((res) => {
      if (!res) return;
      const raw = JSON.parse(res);

      // migrate old string notes
      const migrated: Record<string, Note> = {};
      Object.entries(raw).forEach(([k, v]: any) => {
        migrated[k] =
          typeof v === "string"
            ? { text: v, pinned: false }
            : v;
      });
      setNotes(migrated);
    });
  }, []);

  function persist(updated: Record<string, Note>) {
    setNotes(updated);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }


function topicKey(
  subject: string,
  module: string,
  topic: string
): string {
  return makeNoteKey(subject, module, topic);
}



  function parseKey(key: string) {
    const [subject, module, topic] = key.split("||");
    return { subject, module, topic };
  }

  function togglePin(key: string) {
    persist({
      ...notes,
      [key]: { ...notes[key], pinned: !notes[key].pinned },
    });
  }

  function handleSave(key: string) {
    persist({
      ...notes,
      [key]: {
        text: drafts[key],
        pinned: notes[key]?.pinned ?? false,
      },
    });
    setDrafts((p) => {
      const d = { ...p };
      delete d[key];
      return d;
    });
  }

  function handleDelete(key: string) {
    const copy = { ...notes };
    delete copy[key];
    persist(copy);
    setOpenTopic(null);
  }

  /* ---------- TEXT HIGHLIGHT ---------- */
  function highlight(text: string, query: string) {
    if (!query) return <Text>{text}</Text>;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <Text>
        {parts.map((p, i) => (
          <Text
            key={i}
            style={
              p.toLowerCase() === query.toLowerCase()
                ? styles.highlight
                : undefined
            }
          >
            {p}
          </Text>
        ))}
      </Text>
    );
  }

  /* ---------- SEARCH ---------- */
  const searchResults =
    search.trim().length === 0
      ? []
      : Object.entries(notes)
          .map(([key, note]) => {
            const meta = parseKey(key);
            const haystack = `${meta.topic} ${note.text}`.toLowerCase();
            return haystack.includes(search.toLowerCase())
              ? { key, note, ...meta }
              : null;
          })
          .filter(Boolean) as any[];

  /* ================= UI ================= */

  return (
    <Screen>
      <Text style={styles.title}>Notes</Text>
      <Text style={styles.subtitle}>Your personal academic memory</Text>

      <TextInput
        placeholder="Search topic or keyword…"
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {/* SUBJECT TABS */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs}>
        {student.subjects.map((s) => (
          <TouchableOpacity
            key={s.code}
            onPress={() => {
              setActiveSubject(s.code);
              setOpenModule(null);
              setOpenTopic(null);
            }}
            style={[styles.tab, activeSubject === s.code && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeSubject === s.code && styles.activeTabText]}>
              {s.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* SEARCH RESULTS */}
      {searchResults.length > 0 && (
        <View style={styles.searchBox}>
          {searchResults.map((r) => (
            <TouchableOpacity
              key={r.key}
              style={styles.searchCard}
              onPress={() => {
                setSearch("");
                setActiveSubject(r.subject);
                setOpenModule(r.module);
                setOpenTopic(r.key);
                setDrafts((p) => ({ ...p, [r.key]: r.note.text }));
              }}
            >
              <View style={styles.searchHeader}>
                <Text style={styles.path}>
                  {r.module} → {highlight(r.topic, search)}
                </Text>
                <TouchableOpacity onPress={() => togglePin(r.key)}>
                  <Text style={styles.star}>
                    {r.note.pinned ? "⭐" : "☆"}
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.notePreview} numberOfLines={3}>
                {highlight(r.note.text, search)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* SYLLABUS */}
      <ScrollView>
        {syllabus.modules.map((mod) => {
          const moduleOpen = openModule === mod.module;

          return (
            <View key={mod.module} style={styles.moduleBox}>
              <TouchableOpacity onPress={() => setOpenModule(moduleOpen ? null : mod.module)}>
                <Text style={styles.moduleTitle}>{mod.module}</Text>
              </TouchableOpacity>

              {moduleOpen &&
                [...mod.topics].sort((a, b) => {
                  const ka = topicKey(activeSubject, mod.module, a);
                  const kb = topicKey(activeSubject, mod.module, b);
                  return (notes[kb]?.pinned ? 1 : 0) - (notes[ka]?.pinned ? 1 : 0);
                }).map((topic) => {
                  const key = topicKey(activeSubject, mod.module, topic);
                  const note = notes[key];
                  const topicOpen = openTopic === key;

                  return (
                    <View key={topic} style={styles.topicCard}>
                      <View style={styles.topicHeader}>
                        <TouchableOpacity
                          onPress={() => {
                            setOpenTopic(topicOpen ? null : key);
                            setDrafts((p) => ({ ...p, [key]: note?.text ?? "" }));
                          }}
                        >
                          <Text style={styles.topicText}>{topic}</Text>
                        </TouchableOpacity>

                        {note && (
                          <TouchableOpacity onPress={() => togglePin(key)}>
                            <Text style={styles.star}>
                              {note.pinned ? "⭐" : "☆"}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>

                      {topicOpen && (
                        <View style={styles.editor}>
                          {note && (
                            <View style={styles.savedNote}>
                              <Text style={styles.savedText}>{note.text}</Text>
                            </View>
                          )}

                          <TextInput
                            multiline
                            placeholder="Write or refine notes…"
                            value={drafts[key] || ""}
                            onChangeText={(t) =>
                              setDrafts((p) => ({ ...p, [key]: t }))
                            }
                            style={styles.textarea}
                          />

                          <View style={styles.actions}>
                            <TouchableOpacity style={styles.save} onPress={() => handleSave(key)}>
                              <Text style={styles.btnText}>Save</Text>
                            </TouchableOpacity>

                            {note && (
                              <TouchableOpacity style={styles.delete} onPress={() => handleDelete(key)}>
                                <Text style={styles.btnText}>Delete</Text>
                              </TouchableOpacity>
                            )}
     

                          </View>
                        </View>
                      )}
                     

                    </View>
                  );
                })}
            </View>
          );
        })}
        
      </ScrollView>
      {/* ===== GLOBAL GO TO QUIZ BUTTON ===== */}
<TouchableOpacity
  style={styles.globalQuizBtn}
  onPress={() =>
    navigation.navigate("LearningGame", {
      studentId: student.id,
    })
  }
>
  <Text style={styles.globalQuizText}>
    Go to Quiz 🎮
  </Text>
</TouchableOpacity>

    </Screen>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "700" },
  subtitle: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 12 },

  search: {
    backgroundColor: "#f1f5f9",
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
  },

  tabs: { marginBottom: 12 },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: "#e5e7eb",
    marginRight: 8,
  },
  activeTab: { backgroundColor: COLORS.primary },
  tabText: { fontSize: 12 },
  activeTabText: { color: "#fff", fontWeight: "600" },

  moduleBox: { marginBottom: 16 },
  moduleTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8 },

  topicCard: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 14,
    marginBottom: 10,
    elevation: 1,
  },
  topicHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topicText: { fontSize: 14, fontWeight: "500" },

  editor: { marginTop: 10 },
  savedNote: {
    backgroundColor: "#f8fafc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  savedText: { fontSize: 14, lineHeight: 20 },

  textarea: {
    minHeight: 100,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    fontSize: 14,
    textAlignVertical: "top",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  save: {
    backgroundColor: COLORS.success,
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  delete: {
    backgroundColor: COLORS.danger,
    padding: 8,
    borderRadius: 8,
  },
  btnText: { color: "#fff", fontSize: 12, fontWeight: "600" },

  searchBox: { marginBottom: 16 },
  searchCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 14,
    marginBottom: 8,
  },
  searchHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  path: { fontSize: 12, fontWeight: "500" },
  notePreview: { fontSize: 13, color: COLORS.textSecondary },

  star: { fontSize: 18 },

  highlight: {
    backgroundColor: "#fde68a",
    fontWeight: "600",
  },
globalQuizBtn: {
  marginTop: 16,
  marginBottom: 20,
  backgroundColor: COLORS.primary,
  paddingVertical: 14,
  borderRadius: 16,
  alignItems: "center",
},

globalQuizText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "700",
},


});
