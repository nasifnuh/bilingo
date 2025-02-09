import { StyleSheet } from "react-native";

import Colors from "@constants/colors";

export const styles = StyleSheet.create({
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
    backgroundColor: Colors.pastelBlue,
    borderRadius: 20,
    flex: 1,
  },
  title: {
    fontFamily: "BalooChettan-EB",
    fontSize: 18,
    color: Colors.charcoal,
  },
  languages: {
    gap: 18,
  },
});
