import { StyleSheet } from "react-native";

import Colors from "@constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    position: "relative",
  },
  image: {
    width: 124,
    height: 124,
    marginTop: 10,
    marginBottom: 12,
    marginHorizontal: "auto",
  },
  title: {
    fontFamily: "BalooChettan-EB",
    fontSize: 24,
    textAlign: "center",
    color: Colors.black,
    marginBottom: 30,
  },
  form: {
    gap: 24,
  },
  signupButton: {
    marginTop: 40,
  },
});
