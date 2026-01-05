const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export async function askGemini(prompt: string): Promise<string> {
  if (!API_KEY) {
    throw new Error("Gemini API key missing");
  }

  const res = await fetch(`${GEMINI_URL}?key=${API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }),
  });

  const json = await res.json();

  if (!res.ok) {
    console.error(json);
    throw new Error("Gemini API error");
  }

  return (
    json.candidates?.[0]?.content?.parts?.[0]?.text ??
    "No response generated."
  );
}
