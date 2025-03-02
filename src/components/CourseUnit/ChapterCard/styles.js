import { StyleSheet } from "react-native";

import Colors from "@constants/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.freshGreen,
    padding: 12,
    borderRadius: 16,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  chapterLabel: {
    fontFamily: "BalooChettan-SB",
    fontSize: 12,
    color: Colors.white,
  },
  lessonLabel: {
    fontFamily: "BalooChettan-B",
    fontSize: 14,
    color: Colors.white,
  },
  progressLabel: {
    fontFamily: "BalooChettan-SB",
    fontSize: 14,
    color: Colors.white,
  },
});
