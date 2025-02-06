import { StyleSheet, StatusBar } from "react-native";

import Colors from "@constants/colors";

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.white,
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  scrollViewContent: {
    flex: 1,
    paddingHorizontal: 25,
  },
});
