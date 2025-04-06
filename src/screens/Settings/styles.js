import { StyleSheet } from "react-native";

import Colors from "@constants/colors";

export const styles = (theme) =>
  StyleSheet.create({
    container: {
      marginTop: 20,
      paddingVertical: 18,
      flex: 1,
      gap: 14,
      backgroundColor: Colors[theme].background, // Dynamic background color
    },
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 25,
      minHeight: 36,
      backgroundColor: Colors[theme].background, // Dynamic background color
    },
    headerLabel: {
      flex: 1,
      textAlign: "center",
      fontFamily: "BalooChettan-B",
      fontSize: 18,
      color: Colors[theme].text, // Dynamic text color
    },
    option: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 14,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: Colors[theme].border, // Dynamic border color
      backgroundColor: Colors[theme].buttonBackground, // Dynamic button background
    },
    optionLabel: {
      fontFamily: "BalooChettan-B",
      fontSize: 16,
      color: Colors[theme].text, // Dynamic text color
    },
    logoutButton: {
      marginTop: "auto",
      borderColor: Colors.crimsonRed,
    },
  });
