import { StyleSheet } from "react-native";
import Colors from "@constants/colors";

export const styles = (theme) =>
  StyleSheet.create({
    container: {
      marginTop: 40,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 34,
      maxWidth: "100%",
      flexWrap: "wrap",
    },
    image: {
      width: 82,
      height: 82,
    },
    titleCard: {
      padding: 16,
      backgroundColor:  theme == "dark" ? Colors.charcoal : Colors.pastelBlue,
      borderRadius: 20,
      flex: 1,
    },
    title: {
      fontSize: 18,
      fontFamily: "BalooChettan-B",
      color: Colors[theme].text, 
    },
    languages: {
      gap: 18,
    },
  });
