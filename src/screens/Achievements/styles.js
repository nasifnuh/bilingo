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
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
    fontSize: 22,
    marginBottom: 10,
  },
  achievementsContainer: {
    
    flexDirection: "column",
    alignItems: "center",
  },
});
