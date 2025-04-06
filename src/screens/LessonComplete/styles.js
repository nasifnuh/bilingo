import { StyleSheet } from "react-native";

import Colors from "@constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 30,
  },
  content: {
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    color: Colors.royalPurple,
    fontFamily: "BalooChettan-B",
    fontSize: 28,
  },
  image: {
    width: 220,
    height: 220,
    marginTop: 60,
    marginBottom: 40,
  },
  rewardContainer: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.royalPurple,
    width: "100%",
  },
  rewardTitleContainer: {
    backgroundColor: Colors.royalPurple,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    padding: 12,
    flex: 1,
  },
  rewardTitleContainerText: {
    color: Colors.white,
    fontFamily: "BalooChettan-SB",
    fontSize: 18,
    textAlign: "center",
  },
  rewardValueContainer: {
    padding: 18,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 45,
  },
  icon: { fontFamily: "BalooChettan-SB", fontSize: 30 },
  reward: {
    color: Colors.darkGray,
    fontFamily: "BalooChettan-SB",
    fontSize: 28,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  contentDark: {
    backgroundColor: "#121212",
  },
  titleDark: {
    color: "#ffffff",
  },
  rewardContainerDark: {
    backgroundColor: "#1e1e1e",
  },
  rewardTitleContainerTextDark: {
    color: "#ffffff",
  },
  iconDark: {
    color: "#ffffff",
  },
  rewardDark: {
    color: "#ffffff",
  },
});
