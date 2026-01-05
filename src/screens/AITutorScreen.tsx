import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useRef } from "react";

import Screen from "../ui/Screen";
import { COLORS } from "../ui/colors";
import { askGemini } from "../services/gemini";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

export default function AITutorScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const listRef = useRef<FlatList>(null);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const reply = await askGemini(userMessage.text);

      const aiMessage: Message = {
        id: Date.now().toString() + "_ai",
        role: "assistant",
        text: reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "_err",
          role: "assistant",
          text: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }

  function renderItem({ item }: { item: Message }) {
    const isUser = item.role === "user";

    return (
      <View
        style={[
          styles.messageBubble,
          isUser ? styles.userBubble : styles.aiBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            isUser && styles.userText,
          ]}
        >
          {item.text}
        </Text>
      </View>
    );
  }

  return (
    <Screen>
      <Text style={styles.title}>AI Tutor</Text>
      <Text style={styles.subtitle}>
        Ask anything from your syllabus
      </Text>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.chatArea}
        />

        {loading && (
          <Text style={styles.typing}>AI is typing…</Text>
        )}

        <View style={styles.inputRow}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask a question…"
            style={styles.input}
            multiline
          />

          <TouchableOpacity
            style={[
              styles.sendBtn,
              loading && { opacity: 0.6 },
            ]}
            onPress={handleSend}
            disabled={loading}
          >
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 10,
  },

  chatArea: {
    paddingBottom: 12,
  },

  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 14,
    marginBottom: 10,
  },

  userBubble: {
    backgroundColor: COLORS.primary,
    alignSelf: "flex-end",
  },

  aiBubble: {
    backgroundColor: "#f1f5f9",
    alignSelf: "flex-start",
  },

  messageText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },

  userText: {
    color: "#fff",
  },

  typing: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 6,
    marginLeft: 4,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingTop: 8,
  },

  input: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    borderRadius: 14,
    padding: 12,
    fontSize: 14,
    maxHeight: 120,
  },

  sendBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    marginLeft: 8,
    justifyContent: "center",
  },

  sendText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
