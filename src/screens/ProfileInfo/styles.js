import { StyleSheet } from "react-native";

import Colors from "@constants/colors";

export const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 18,
      backgroundColor: Colors[theme].background, 
    },
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 25,
      minHeight: 36,
      backgroundColor: theme == "dark" ? Colors.charcoal : Colors.offWhite, 
    },
    headerLabel: {
      flex: 1,
      textAlign: "center",
      fontFamily: "BalooChettan-B",
      fontSize: 18,
      color: Colors[theme].text, 
    },
    form: {
      gap: 24,
      marginTop: 20,
    },
    inputBox: {
      backgroundColor: Colors[theme].buttonBackground, 
      color: Colors[theme].text, 
    },
    editButton: {
      backgroundColor: Colors[theme].buttonBackground, 
      borderColor: Colors[theme].border, 
      marginBottom: 20,
    },
    deleteButton: {
      borderColor: Colors.crimsonRed,
    },
  });
