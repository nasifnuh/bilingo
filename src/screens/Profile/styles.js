import { StyleSheet } from "react-native";

import Colors from "@constants/colors";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    flex: 1,
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
  },
  sectionSubLabel: {
    fontFamily: "BalooChettan-M",
    fontSize: 16,
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
    justifyContent: "center",
    flex: 1,
    padding: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.silverGray,
  },
  overviewInfoSubBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  overviewInfoLabel: {
    fontSize: 14,
  },
  overviewInfo: {
    marginLeft: 6,
    fontFamily: "BalooChettan-B",
    fontSize: 22,
  },
  overviewInfoSubLabel: {
    fontSize: 14,
  },
});
