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
      backgroundColor: Colors[theme].background, 
    },
    headerLabel: {
      flex: 1,
      textAlign: "center",
      fontFamily: "BalooChettan-B",
      fontSize: 18,
      color: Colors[theme].text, 
    },
    container: {
      flex: 1,
      paddingVertical: 18,
      backgroundColor: Colors[theme].background, 
    },
    empty: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors[theme].background, 
    },
    emptyText: {
      fontFamily: "BalooChettan-B",
      fontSize: 18,
      color: Colors[theme].text, 
      textAlign: "center",
    },
    image: {
      width: 150,
      height: 150,
      marginBottom: 20,
    },
  });
