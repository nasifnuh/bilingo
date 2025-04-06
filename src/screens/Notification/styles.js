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
      backgroundColor: Colors[theme].background, // Dynamic background color
    },
    headerLabel: {
      flex: 1,
      textAlign: "center",
      fontFamily: "BalooChettan-B",
      fontSize: 18,
      color: Colors[theme].text, // Dynamic text color
    },
    container: {
      paddingVertical: 18,
      flex: 1,
      backgroundColor: Colors[theme].background, // Dynamic background color
    },
    form: {
      gap: 24,
      marginTop: 20,
    },
    notificationSection: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    notificationLabel: {
      fontFamily: "BalooChettan-B",
      fontSize: 16,
      color: Colors[theme].text, // Dynamic text color
    },
    timePickerSection: {
      marginTop: 20,
    },
    timePickerLabel: {
      fontFamily: "BalooChettan-SB",
      fontSize: 16,
      color: Colors[theme].text, // Dynamic text color
      marginBottom: 5,
    },
    timePickerValue: {
      fontFamily: "BalooChettan-M",
      fontSize: 18,
      color: Colors[theme].text, // Dynamic text color
      textDecorationLine: "underline",
    },
  });
