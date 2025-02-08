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
  },
  image: {
    width: 164,
    height: 164,
    marginTop: 144,
    marginBottom: 54,
  },
  title: {
    fontFamily: "BalooChettan-EB",
    fontSize: 44,
    textAlign: "center",
    color: Colors.royalPurple,
    marginBottom: 4,
  },
  subTitle: {
    fontFamily: "BalooChettan-EB",
    fontSize: 16,
    textAlign: "center",
    color: Colors.darkGray,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  loginButton: {
    marginTop: 10,
  },
});
