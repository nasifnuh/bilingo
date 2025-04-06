import { StyleSheet } from "react-native";

import Colors from "@constants/colors";

export const styles = (theme) =>
  StyleSheet.create({
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 25,
      minHeight: 36,
    },
    container: {
      paddingVertical: 18,
      flex: 1,
      backgroundColor: Colors[theme].background, 
    },
    generalLabel: {
      fontFamily: "BalooChettan-B",
      fontSize: 18,
      color: Colors[theme].text, 
    },
    questionContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 18,
      marginTop: 40,
      marginBottom: 34,
      maxWidth: "100%",
      flexWrap: "wrap",
    },
    image: {
      width: 75,
      height: 75,
    },
    questionCard: {
      padding: 16,
      backgroundColor: Colors.pastelBlue,
      borderRadius: 20,
      flex: 1,
    },
    questionText: {
      fontFamily: "BalooChettan-B",
      fontSize: 18,
      color: Colors.charcoal,
    },
    answerContainer: {
      marginVertical: 50,
      gap: 14,
    },
    answerOption: {
      borderWidth: 1,
      borderColor: Colors.silverGray,
      borderRadius: 16,
      padding: 12,
    },
    correctOption: { borderColor: Colors.freshGreen },
    wrongOption: { borderColor: Colors.crimsonRed },
    answerText: {
      fontFamily: "BalooChettan-B",
      fontSize: 18,
      color: Colors[theme].text, 
      textAlign: "center",
    },
    correctAnswerText: { color: Colors.freshGreen },
    wrongAnswerText: { color: Colors.crimsonRed },
    buttonContainer: {
      marginTop: "auto",
    },
    feedbackText: {
      fontFamily: "BalooChettan-SB",
      fontSize: 16,
      textAlign: "center",
      color: Colors.white,
      marginBottom: 8,
    },
  });
