import { StyleSheet, StatusBar } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
  },
});
