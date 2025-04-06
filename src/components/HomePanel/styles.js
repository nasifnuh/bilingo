import { StyleSheet } from "react-native";
import Colors from "@constants/colors";

export const styles = (theme) =>
  StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      minHeight: 36,
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: theme == "dark" ? Colors.charcoal : Colors.offWhite, // Dynamic background color
    },
    group: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      fontSize: 22,
      color: Colors[theme].text, // Dynamic icon color
    },
    text: {
      marginLeft: 6,
      fontFamily: "BalooChettan-B",
      fontSize: 22,
      color: Colors[theme].text, // Dynamic text color
    },
  });
