import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* ================= SCREENS ================= */

import IntroScreen from "../screens/IntroScreen";
import LoginScreen from "../screens/LoginScreen";

import DashboardScreen from "../screens/DashboardScreen";
import AttendanceScreen from "../screens/AttendanceScreen";
import TasksScreen from "../screens/TasksScreen";
import InternalsScreen from "../screens/InternalsScreen";
import ExamsScreen from "../screens/ExamsScreen";
import CompanionScreen from "../screens/CompanionScreen";
import TodoScreen from "../screens/TodoScreen";
import ExamCountdownScreen from "../screens/ExamCountdownScreen";
import RiskDetailsScreen from "../screens/RiskDetailsScreen";
import SubjectRiskScreen from "../screens/SubjectRiskScreen";
import RiskTimelineScreen from "../screens/RiskTimelineScreen";
import StudyFocusScreen from "../screens/StudyFocusScreen";
import ChatbotScreen from "../screens/ChatbotScreen";

/* ================= PARAM TYPES ================= */

export type RootStackParamList = {
  /* Entry flow */
  Intro: undefined;
  Login: undefined;

  /* Core student flow */
  Dashboard: { studentId: string };
  Attendance: { studentId: string };
  Tasks: { studentId: string };
  Internals: { studentId: string };
  Exams: { studentId: string };
  Companion: { studentId: string };
  Todo: { studentId: string };
  ExamCountdown: { studentId: string };
  RiskDetails: { studentId: string };
  SubjectRisk: { studentId: string };
  StudyFocus: { studentId: string };
  Chatbot: { studentId: string };

  /* Advanced analysis */
  RiskTimeline: {
    studentId: string;
    subjectCode: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/* ================= NAVIGATOR ================= */

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Intro"
      screenOptions={{ headerTitleAlign: "center" }}
    >
      {/* ================= ENTRY ================= */}
      <Stack.Screen
        name="Intro"
        component={IntroScreen}
        options={{ headerShown: false }}
      />
  <Stack.Screen
  name="Chatbot"
  component={ChatbotScreen}
  options={{ title: "AI Query Assistant" }}
/>

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login" }}
      />

      {/* ================= CORE FLOW ================= */}
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Attendance"
        component={AttendanceScreen}
        options={{ title: "Attendance" }}
      />

      <Stack.Screen
        name="Tasks"
        component={TasksScreen}
        options={{ title: "Tasks" }}
      />

      <Stack.Screen
        name="Internals"
        component={InternalsScreen}
        options={{ title: "Internal Assessment" }}
      />

      <Stack.Screen
        name="Exams"
        component={ExamsScreen}
        options={{ title: "Exams" }}
      />

      <Stack.Screen
        name="Companion"
        component={CompanionScreen}
        options={{ title: "AI Insights" }}
      />

      <Stack.Screen
        name="Todo"
        component={TodoScreen}
        options={{ title: "To-Do" }}
      />

      <Stack.Screen
        name="ExamCountdown"
        component={ExamCountdownScreen}
        options={{ title: "Exam Countdown" }}
      />

      {/* ================= RISK & INSIGHTS ================= */}
      <Stack.Screen
        name="RiskDetails"
        component={RiskDetailsScreen}
        options={{ title: "Risk Analysis" }}
      />

      <Stack.Screen
        name="SubjectRisk"
        component={SubjectRiskScreen}
        options={{ title: "Subject Risk" }}
      />

      <Stack.Screen
        name="RiskTimeline"
        component={RiskTimelineScreen}
        options={{ title: "Risk Timeline" }}
      />

      <Stack.Screen
        name="StudyFocus"
        component={StudyFocusScreen}
        options={{ title: "Study Focus" }}
      />
    </Stack.Navigator>
  );
}
