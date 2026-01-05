export function normalizeKeyPart(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[:\-]/g, "")
    .trim();
}

export function makeNoteKey(
  subject: string,
  module: string,
  topic: string
) {
  return [
    subject,
    normalizeKeyPart(module),
    normalizeKeyPart(topic),
  ].join("||");
}
