import { StyleSheet } from "react-native";

import Colors from "@constants/colors";

export const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginTop: 20,
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
    pickerContainer: {
      flexDirection: "row",
      width: "100%",
      marginBottom: 20,
      gap: 10,
    },
    pickerWrapper: {
      flex: 1,
      borderWidth: 2,
      borderColor: Colors.royalPurple,
      borderRadius: 16,
      backgroundColor: theme == "dark" ? Colors.charcoal : Colors.pastelPurple,
    },
    picker: {
      width: "100%",
      height: 40,
      justifyContent: "center",
      color: Colors[theme].text,
      fontFamily: "BalooChettan-B",
      display: "flex",
      alignItems: "center",
    },
    selectedPickerItem: {
      fontFamily: "BalooChettan-B",
      color: Colors[theme].text, 
      fontSize: 16,
    },
    pickerItem: {
      fontFamily: "BalooChettan-B",
      fontSize: 16,
      height: 130,
      color: Colors[theme].text, 
    },
    selectedItemHighlight: {
      fontWeight: "bold",
      color: Colors.royalPurple,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    modalContent: {
      backgroundColor: theme == "dark" ? Colors.charcoal : Colors.pastelPurple, 
      padding: 20,
      width: "80%",
      borderRadius: 10,
    },
    doneButtonText: {
      color: Colors.royalPurple,
      fontFamily: "BalooChettan-B",
      textAlign: "center",
      fontSize: 20,
      marginTop: 10,
    },
    overviewContainer: {
      width: "100%",
      padding: 20,
      backgroundColor: theme == "dark" ? Colors.charcoal : Colors.pastelPurple, 
      borderRadius: 16,
      marginBottom: 10,
    },
    overviewHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    overviewTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: Colors[theme].text, 
      fontFamily: "BalooChettan-B",
    },
    overviewItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    overviewLabel: {
      fontSize: 16,
      color: Colors[theme].text, 
      fontFamily: "BalooChettan-B",
    },
    overviewValue: {
      fontSize: 16,
      fontWeight: "bold",
      color: Colors[theme].text, 
      fontFamily: "BalooChettan-B",
    },
    loadingText: {
      fontFamily: "BalooChettan-B",
      fontSize: 16,
      color: Colors[theme].text, 
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors[theme].background, 
    },
    emptyText: {
      fontFamily: "BalooChettan-M",
      fontSize: 18,
      color: Colors[theme].text, 
      textAlign: "center",
    },
    image: {
      width: 150,
      height: 150,
      marginBottom: 30,
    },
  });
