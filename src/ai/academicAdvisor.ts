export async function generateAcademicAdvice(studentSnapshot: any) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer YOUR_API_KEY`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an academic advisor. Explain consequences and priorities clearly.",
        },
        {
          role: "user",
          content: `
Student data:
${JSON.stringify(studentSnapshot, null, 2)}

Generate short academic guidance.
          `,
        },
      ],
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
