import { StyleSheet } from "react-native";

import Colors from "@constants/colors";

export const styles = StyleSheet.create({
  container: {
    gap: 14,
  },
  lessonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  unit: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: Colors.silverGray,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  unitLabel: {
    fontFamily: "BalooChettan-B",
    fontSize: 24,
    color: Colors.silverGray,
  },
  lesson: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: Colors.silverGray,
    borderRadius: 16,
  },
  lessonLabel: {
    fontFamily: "BalooChettan-B",
    fontSize: 14,
    color: Colors.silverGray,
    flex: 1,
  },
});
