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
      paddingVertical: 18,
      flex: 1,
      backgroundColor: Colors[theme].background, 
    },
    form: {
      gap: 24,
      marginTop: 20,
    },
    label: {
      fontFamily: "BalooChettan-SB",
      fontSize: 16,
      color: Colors[theme].text,
    },
    slider: {
      width: "100%",
    },
  });
