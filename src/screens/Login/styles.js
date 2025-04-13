import { StyleSheet } from "react-native";
import Colors from "@constants/colors";

export const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: 30,
      position: "relative",
      backgroundColor: Colors[theme].background, // Apply theme-based background
    },
    backButton: {
      color: Colors[theme].text, // Apply theme-based text color
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
      color: Colors[theme].text, // Apply theme-based text color
      marginBottom: 30,
    },
    form: {
      gap: 24,
    },
    loginButton: {
      marginTop: 40,
    },
  });
