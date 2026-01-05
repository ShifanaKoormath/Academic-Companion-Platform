export type GeneratedQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

/* ================= PRIMARY KEYWORDS ================= */

const KEYWORDS = [
  "intelligent agent",
  "performance measure",
  "agent function",
  "waterfall model",
  "incremental model",
  "spiral model",
  "agile model",
  "local area network",
  "metropolitan area network",
  "wide area network",
  "personal area network",
  "linear regression",
  "gradient descent",
];

/* ================= MAIN GENERATOR ================= */

export function generateQuizFromNote(
  note: string
): GeneratedQuestion[] {
  if (!note || note.length < 40) return [];

  const sentences = note
    .split(".")
    .map((s) => s.trim())
    .filter((s) => s.length > 30);

  /* ---------- 1️⃣ KEYWORD-BASED ---------- */
  const keywordQuestions: GeneratedQuestion[] = [];
  const used = new Set<string>();

  for (const sentence of sentences) {
    const lower = sentence.toLowerCase();

    const keyword = KEYWORDS.find(
      (k) => lower.includes(k) && !used.has(k)
    );

    if (!keyword) continue;

    used.add(keyword);

    const options = shuffle([
      keyword,
      "operating system",
      "database system",
      "network protocol",
    ]);

    keywordQuestions.push({
      question:
        sentence.replace(
          new RegExp(keyword, "i"),
          "____"
        ) + "?",
      options,
      answer: options.indexOf(keyword),
      explanation: sentence + ".",
    });

    if (keywordQuestions.length === 3) break;
  }

  if (keywordQuestions.length > 0) {
    return keywordQuestions;
  }

  /* ---------- 2️⃣ FALLBACK: GENERIC ---------- */
  return generateGenericQuestions(sentences);
}

/* ================= FALLBACK LOGIC ================= */

function generateGenericQuestions(
  sentences: string[]
): GeneratedQuestion[] {
  const questions: GeneratedQuestion[] = [];

  for (const sentence of sentences.slice(0, 3)) {
    const subject = extractSubject(sentence);

    const options = shuffle([
      sentence,
      "A type of hardware component",
      "A network security protocol",
      "An unrelated system concept",
    ]);

    questions.push({
      question: `Which statement best describes ${subject}?`,
      options,
      answer: options.indexOf(sentence),
      explanation: sentence + ".",
    });
  }

  return questions;
}

/* ================= HELPERS ================= */

function extractSubject(sentence: string): string {
  const words = sentence.split(" ");
  return words.slice(0, 3).join(" ");
}

function shuffle(arr: string[]): string[] {
  return [...arr].sort(() => Math.random() - 0.5);
}
