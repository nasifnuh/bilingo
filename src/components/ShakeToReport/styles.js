import { StyleSheet } from "react-native";
import Colors from "@constants/colors";

export default (theme) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
    },
    modalContent: {
      backgroundColor: theme === "dark" ? Colors.black : Colors.white,
      padding: 20,
      borderRadius: 20,
      width: "80%",
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
      color: theme === "dark" ? Colors.white : Colors.black,
    },
    modalText: {
      fontSize: 16,
      marginBottom: 15,
      textAlign: "center",
      color: theme === "dark" ? Colors.white : Colors.black,
    },
    ownerButton: {
      padding: 10,
      borderRadius: 10,
    },
  });
