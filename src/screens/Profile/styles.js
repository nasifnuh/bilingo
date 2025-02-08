import { StyleSheet } from "react-native";

import Colors from "@constants/colors";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    flex: 1,
  },
  headerLabel: {
    textAlign: "center",
    fontFamily: "BalooChettan-B",
    fontSize: 18,
    color: Colors.black,
  },
  form: {
    gap: 24,
  },
  editButton: {
    marginTop: 40,
    marginBottom: 10,
  },
  logoutButton: {
    marginTop: "auto",
  },
});
