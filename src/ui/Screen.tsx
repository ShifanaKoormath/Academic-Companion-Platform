import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, ViewStyle } from "react-native";
import { COLORS } from "./colors";

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
  contentStyle?: ViewStyle;
};

export default function Screen({
  children,
  scroll = true,
  contentStyle,
}: Props) {
  if (scroll) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
        <ScrollView
      contentContainerStyle={[
  {
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 0, // 👈 almost flush, but not cramped
  },
  contentStyle,
]}


          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
{
  flex: 1,
  backgroundColor: COLORS.background,
  paddingHorizontal: 20,
  paddingBottom: 32,
  paddingTop: 0,
}
,
        contentStyle,
      ]}
    >
      {children}
    </SafeAreaView>
  );
}
