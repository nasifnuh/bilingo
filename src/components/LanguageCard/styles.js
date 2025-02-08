import { StyleSheet } from "react-native";

import Colors from "@constants/colors";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.silverGray,
  },
  image: {
    width: 30,
    height: 20,
  },
  label: {
    fontFamily: "BalooChettan-B",
    fontSize: 16,
    color: Colors.charcoal,
  },
});
