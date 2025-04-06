import { StyleSheet } from "react-native";

import Colors from "@constants/colors";

export const styles = (theme) =>
  StyleSheet.create({
    container: {
      paddingVertical: 18,
      flex: 1,
      backgroundColor: Colors[theme].background, // Dynamic background color
    },
    headerContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      position: "relative",
      backgroundColor: Colors.offWhite,
      marginHorizontal: -25,
      paddingHorizontal: 25,
      height: 200,
      overflow: "hidden",
    },
    settingsButton: { position: "absolute", right: 25, top: 15 },
    avatar: { width: 200, height: 200, position: "absolute", bottom: -50 },
    section: {
      marginTop: 24,
    },
    sectionLabel: {
      fontFamily: "BalooChettan-B",
      fontSize: 26,
      color: Colors[theme].text, // Dynamic text color
    },
    sectionSubLabel: {
      fontFamily: "BalooChettan-M",
      fontSize: 16,
      color: Colors[theme].text, // Dynamic text color
    },
    overviewInfoContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
      gap: 5,
    },
    overviewInfoBox: {
      display: "flex",
      alignItems: "flex-start",
      flex: 1,
      padding: 12,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: Colors[theme].border, // Dynamic border color
    },
    overviewInfoSubBox: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    overviewInfoLabel: {
      fontSize: 14,
      color: Colors[theme].text, // Dynamic text color
    },
    overviewInfo: {
      marginLeft: 6,
      fontFamily: "BalooChettan-B",
      fontSize: 22,
      color: Colors[theme].text, // Dynamic text color
    },
    overviewInfoSubLabel: {
      fontSize: 14,
      color: Colors[theme].text, // Dynamic text color
    },
    achievementContainer: {
      display: "flex",
      flexDirection: "row",
      marginTop: 10,
      gap: 20,
    },
    achievementImage: {
      height: 75,
      width: 75,
    },
  });
