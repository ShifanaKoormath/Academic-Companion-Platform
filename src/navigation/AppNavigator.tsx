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


};

const Stack = createNativeStackNavigator<RootStackParamList>();

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

    </Stack.Navigator>
  );
}
