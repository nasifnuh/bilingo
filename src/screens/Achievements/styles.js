import { StyleSheet } from "react-native";
import Colors from "@constants/colors";

export const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors[theme].background, // Dynamic background color
    },
    achievementsContainer: {
      alignItems: "center",
      padding: 20,
    },
    title: {
      fontSize: 18,
      fontFamily: "BalooChettan-B",
      color: Colors[theme].text, // Dynamic text color
      textAlign: "center",
      marginBottom: 20,
    },
    image: {
      width: 150,
      height: 150,
      marginBottom: 20,
    },
    buttonContainer: {
      marginTop: "auto",
      padding: 20,
      backgroundColor: Colors[theme].background, // Dynamic background color
    },
  });
