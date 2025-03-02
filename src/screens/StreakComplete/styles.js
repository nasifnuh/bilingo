import { StyleSheet } from "react-native";

import Colors from "@constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 30,
  },
  content: {
    alignItems: "center",
    marginTop: 50,
  },
  icon: {
    fontFamily: "BalooChettan-SB",
    fontSize: 160,
  },
  count: {
    fontFamily: "BalooChettan-SB",
    fontSize: 120,
    color: Colors.darkOrange,
    marginTop: -50,
  },
  description: {
    fontFamily: "BalooChettan-B",
    fontSize: 30,
    color: Colors.darkOrange,
    marginTop: -30,
  },
  info: {
    fontFamily: "BalooChettan-SB",
    fontSize: 16,
    color: Colors.black,
    marginTop: 60,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
