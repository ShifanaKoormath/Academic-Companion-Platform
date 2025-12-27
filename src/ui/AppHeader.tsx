import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "./colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function AppHeader() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <View style={styles.row}>
        <View>
          <Text style={styles.brand}>Acadmate</Text>
          <Text style={styles.tagline}>
            Academic Companion Platform
          </Text>
        </View>

   <TouchableOpacity
  onPress={() => navigation.navigate("StudentSelector")}
  activeOpacity={0.7}
>
  <Text style={styles.logout}>Logout</Text>
</TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  brand: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.primary,
    letterSpacing: 0.3,
  },

  tagline: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  switch: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.primary,
    opacity: 0.85,
  },
  logout: {
  fontSize: 13,
  fontWeight: "600",
  color: COLORS.danger, // subtle red → logout semantics
},

});
