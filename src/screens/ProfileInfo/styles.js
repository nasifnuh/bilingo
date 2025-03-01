import { StyleSheet } from "react-native";

import Colors from "@constants/colors";

export const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    height: 36,
  },
  headerLabel: {
    flex: 1,
    textAlign: "center",
    fontFamily: "BalooChettan-B",
    fontSize: 18,
    color: Colors.black,
  },
  container: {
    marginTop: 20,
    paddingVertical: 18,
    flex: 1,
  },
  form: {
    gap: 24,
  },
  editButton: {
    marginTop: 40,
    marginBottom: 10,
  },
  logoutButton: {
    marginTop: "auto",
  },
  notificationSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  notificationLabel: {
    fontSize: 16,
    color: Colors.text,
  },
  timePickerSection: {
    marginVertical: 10,
  },
  timePickerLabel: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 5,
  },
});
