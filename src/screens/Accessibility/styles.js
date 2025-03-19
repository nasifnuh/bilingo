import { StyleSheet } from "react-native";

import Colors from "@constants/colors";

export const styles = StyleSheet.create({
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
  container: {
    paddingVertical: 18,
    flex: 1,
  },
  form: {
    gap: 24,
    marginTop: 20,
  },
  label: {
    fontFamily: "BalooChettan-SB",
    fontSize: 16,
    color: Colors.black,
  },
  slider: {
    width: "100%",
  },
});
