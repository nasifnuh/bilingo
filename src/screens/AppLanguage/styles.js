import { StyleSheet } from "react-native";

import Colors from "@constants/colors";

export const styles = (theme) =>
  StyleSheet.create({
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 25,
      minHeight: 36,
    },
    headerLabel: {
      flex: 1,
      textAlign: "center",
      fontFamily: "BalooChettan-B",
      fontSize: 18,
      color: Colors[theme].text,
    },
    container: {
      marginTop: 20,
      paddingVertical: 18,
      flex: 1,
      gap: 14,
      backgroundColor: Colors[theme].background, // Dynamic background color
      padding: 20,
    },
    cardContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 14,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: Colors.silverGray,
    },
    cardContainerSelected: {
      borderColor: Colors.royalPurple,
      borderWidth: 3,
    },
    cardIcon: {
      width: 30,
      height: 20,
    },
    cardLabel: {
      fontFamily: "BalooChettan-B",
      fontSize: 16,
      color: Colors[theme].text, // Dynamic text color
    },
  });
