import { StyleSheet, StatusBar } from "react-native";

import colors from "@constants/colors";

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.white,
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  scrollViewContent: {
    paddingHorizontal: 25,
  },
});
