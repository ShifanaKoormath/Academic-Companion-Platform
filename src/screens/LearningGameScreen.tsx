import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Screen from "../ui/Screen";
import { COLORS } from "../ui/colors";
import { getStudentById } from "../data/mockAcademicData";
import { SUBJECT_SYLLABUS } from "../data/subjectSyllabus";
import {
  generateQuizFromNote,
  GeneratedQuestion,
} from "../logic/quizGenerator";
import { makeNoteKey } from "../utils/noteKey";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

const NOTES_KEY = "STUDENT_NOTES_V2";
const SCORE_KEY = "QUIZ_SCORES_V1";

type AnswerRecord = {
  selected: number;
  correct: number;
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  "LearningGame"
>;

export default function LearningGameScreen({ route, navigation }: Props) {
  const student = getStudentById(route.params.studentId);

 // 👉 SINGLE source of truth
  const [subject, setSubject] = useState<string | null>(
    route.params.subject ?? null
  );
  const [module, setModule] = useState<string | null>(
    route.params.module ?? null
  );
  const [topic, setTopic] = useState<string | null>(
    route.params.topic ?? null
  );
  const [questions, setQuestions] =
    useState<GeneratedQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  const [selected, setSelected] =
    useState<number | null>(null);
  const [showAnswer, setShowAnswer] =
    useState(false);

  const [answers, setAnswers] = useState<
    Record<number, AnswerRecord>
  >({});
  
  /* ---------- LOAD QUIZ ---------- */

  useEffect(() => {
    async function loadQuiz() {
      if (!subject || !module || !topic) return;

      const raw = await AsyncStorage.getItem(NOTES_KEY);
      if (!raw) {
        setQuestions([]);
        return;
      }

      const notes = JSON.parse(raw);
      const key = makeNoteKey(subject, module, topic);
      const noteText = notes[key]?.text;

      if (!noteText) {
        setQuestions([]);
        return;
      }

      const generated = generateQuizFromNote(noteText);

      setQuestions(generated);
      setIndex(0);
      setScore(0);
      setFinished(false);
      setReviewMode(false);
      setAnswers({});
      setSelected(null);
      setShowAnswer(false);
    }

    loadQuiz();
  }, [subject, module, topic]);

  const current = questions[index] ?? null;

  /* ---------- ANSWER ---------- */
  function answer(i: number) {
    if (!current || showAnswer) return;

    setSelected(i);
    setShowAnswer(true);

    setAnswers((prev) => ({
      ...prev,
      [index]: {
        selected: i,
        correct: current.answer,
      },
    }));

    if (i === current.answer) {
      setScore((s) => s + 1);
    }
  }

  /* ---------- NEXT ---------- */
  function nextQuestion() {
    setSelected(null);
    setShowAnswer(false);

    if (index + 1 >= questions.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
    }
  }

  /* ---------- SAVE SCORE ---------- */
  useEffect(() => {
    if (!finished || questions.length === 0) return;

    AsyncStorage.getItem(SCORE_KEY).then((res) => {
      const prev = res ? JSON.parse(res) : {};
      prev[student.id] = {
        score,
        total: questions.length,
        time: Date.now(),
      };
      AsyncStorage.setItem(
        SCORE_KEY,
        JSON.stringify(prev)
      );
    });
  }, [finished]);

  /* ================= UI ================= */

  /* SUBJECT SELECT */
  if (!subject)
    return (
      <Screen>
        <Text style={styles.title}>Learning Game</Text>
        <Text style={styles.subtitle}>Choose a subject</Text>

        {student.subjects.map((s) => (
          <TouchableOpacity
            key={s.code}
            style={styles.card}
            onPress={() => setSubject(s.code)}
          >
            <Text style={styles.cardText}>{s.name}</Text>
          </TouchableOpacity>
        ))}
      </Screen>
    );

  /* MODULE SELECT */
  if (!module)
    return (
      <Screen>
        <Text style={styles.title}>Select Module</Text>

        {SUBJECT_SYLLABUS[subject].modules.map((m) => (
          <TouchableOpacity
            key={m.module}
            style={styles.card}
            onPress={() => setModule(m.module)}
          >
            <Text style={styles.cardText}>{m.module}</Text>
          </TouchableOpacity>
        ))}
      </Screen>
    );

  /* TOPIC SELECT */
  if (!topic)
    return (
      <Screen>
        <Text style={styles.title}>Select Topic</Text>

        {SUBJECT_SYLLABUS[subject].modules
          .find((m) => m.module === module)!
          .topics.map((t) => (
            <TouchableOpacity
              key={t}
              style={styles.card}
              onPress={() => setTopic(t)}
            >
              <Text style={styles.cardText}>{t}</Text>
            </TouchableOpacity>
          ))}
      </Screen>
    );

  /* NO QUIZ */
if (questions.length === 0)
  return (
    <Screen>
      <Text style={styles.title}>
        No Quiz Available
      </Text>
      <Text style={styles.subtitle}>
        Add notes for this topic to generate a quiz.
      </Text>

      <TouchableOpacity
        style={styles.nextBtn}
onPress={() =>
 navigation.navigate("Notes", {
  studentId: route.params.studentId,
  subject: subject,
  module: module,
  topic: topic,
})

}
      >
        <Text style={styles.nextText}>
          Add Notes ✍️
        </Text>
      </TouchableOpacity>
    </Screen>
  );


  /* REVIEW MODE */
  if (reviewMode)
    return (
      <Screen>
        <Text style={styles.title}>Review Answers</Text>

        <ScrollView>
          {questions.map((q, i) => {
            const a = answers[i];
            return (
              <View key={i} style={styles.reviewCard}>
                <Text style={styles.reviewQ}>
                  Q{i + 1}. {q.question}
                </Text>

                <Text
                  style={[
                    styles.reviewText,
                    a.selected === a.correct
                      ? styles.correctText
                      : styles.wrongText,
                  ]}
                >
                  Your Answer: {q.options[a.selected]}
                </Text>

                {a.selected !== a.correct && (
                  <Text
                    style={[
                      styles.reviewText,
                      styles.correctText,
                    ]}
                  >
                    Correct Answer: {q.options[a.correct]}
                  </Text>
                )}

                <Text style={styles.reviewExp}>
                  {q.explanation}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </Screen>
    );

  /* RESULT */
  if (finished)
    return (
      <Screen>
        <Text style={styles.title}>Quiz Completed 🎉</Text>
        <Text style={styles.score}>
          {score} / {questions.length}
        </Text>

        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => setReviewMode(true)}
        >
          <Text style={styles.nextText}>
            Review All Answers
          </Text>
        </TouchableOpacity>
      </Screen>
    );

  /* QUIZ */
  return (
    <Screen>
      <Text style={styles.progress}>
        Question {index + 1} of {questions.length}
      </Text>

      <Text style={styles.question}>{current!.question}</Text>

      {current!.options.map((opt, i) => {
        const isCorrect =
          showAnswer && i === current!.answer;
        const isWrong =
          showAnswer &&
          selected === i &&
          i !== current!.answer;

        return (
          <TouchableOpacity
            key={i}
            disabled={showAnswer}
            style={[
              styles.option,
              isCorrect && styles.correctOption,
              isWrong && styles.wrongOption,
            ]}
            onPress={() => answer(i)}
          >
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        );
      })}

      {showAnswer && (
        <>
          <View style={styles.explanationBox}>
            <Text style={styles.explanationTitle}>
              Explanation
            </Text>
            <Text style={styles.explanationText}>
              {current!.explanation}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.nextBtn}
            onPress={nextQuestion}
          >
            <Text style={styles.nextText}>
              Next Question →
            </Text>
          </TouchableOpacity>
        </>
      )}
    </Screen>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "700" },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },

  card: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  cardText: { fontSize: 15 },

  progress: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },

  question: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },

  option: {
    backgroundColor: "#f1f5f9",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  optionText: { fontSize: 15 },

  correctOption: {
    backgroundColor: "#dcfce7",
    borderColor: "#22c55e",
    borderWidth: 1,
  },
  wrongOption: {
    backgroundColor: "#fee2e2",
    borderColor: "#ef4444",
    borderWidth: 1,
  },

  explanationBox: {
    marginTop: 12,
    backgroundColor: "#f8fafc",
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  explanationTitle: {
    fontWeight: "600",
    marginBottom: 4,
  },
  explanationText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  nextBtn: {
    marginTop: 16,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  nextText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },

  score: {
    fontSize: 26,
    fontWeight: "700",
    marginVertical: 12,
  },

  reviewCard: {
    backgroundColor: COLORS.card,
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
  },
  reviewQ: {
    fontWeight: "600",
    marginBottom: 6,
  },
  reviewText: {
    fontSize: 13,
    marginBottom: 4,
  },
  correctText: { color: "#16a34a" },
  wrongText: { color: "#dc2626" },
  reviewExp: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 6,
  },
});
