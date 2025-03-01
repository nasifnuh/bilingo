import { StyleSheet } from "react-native";

import Colors from "@constants/colors";

export const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingVertical: 18,
    flex: 1,
    gap: 14,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    height: 36,
  },
  headerLabel: {
    flex: 1,
    textAlign: "center",
    fontFamily: "BalooChettan-B",
    fontSize: 18,
    color: Colors.black,
  },
  option: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.silverGray,
  },
  optionLabel: {
    fontFamily: "BalooChettan-B",
    fontSize: 16,
    color: Colors.charcoal,
  },
  logoutButton: {
    marginTop: "auto",
    borderColor: Colors.crimsonRed
  },
});
