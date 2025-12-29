import { createNativeStackNavigator } from "@react-navigation/native-stack";

import StudentSelectorScreen from "../screens/StudentSelectorScreen";
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
import RiskTimelineScreen from "../screens/RiskTimelineScreen"; // ✅ FIX 1
import StudyFocusScreen from "../screens/StudyFocusScreen";

/* ================= PARAM TYPES ================= */

export type RootStackParamList = {
  StudentSelector: undefined;
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

  // ✅ FIX 2
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
      initialRouteName="StudentSelector"
      screenOptions={{ headerTitleAlign: "center" }}
    >
      <Stack.Screen
        name="StudentSelector"
        component={StudentSelectorScreen}
        options={{ title: "Select Student" }}
      />

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

      {/* ✅ Risk Timeline */}
      <Stack.Screen
        name="RiskTimeline"
        component={RiskTimelineScreen}
        options={{ title: "Risk Timeline" }}
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
        options={{ title: "Academic Companion" }}
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
  name="StudyFocus"
  component={StudyFocusScreen}
  options={{ title: "Study Focus" }}
/>

    </Stack.Navigator>
  );
}
