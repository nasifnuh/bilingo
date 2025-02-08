import { StyleSheet } from "react-native";
import Colors from "@constants/colors";

const styles = StyleSheet.create({
  container: { width: "100%" },
  label: {
    fontFamily: "BalooChettan-B",
    fontSize: 14,
    color: Colors.black,
    marginBottom: 8,
  },
  errorLabel: { color: Colors.crimsonRed },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 50,
    borderRadius: 16,
    paddingHorizontal: 15,
    fontSize: 14,
    backgroundColor: Colors.offWhite,
    flex: 1,
  },
  inputDisabled: {
    backgroundColor: Colors.grayish,
  },
  icon: {
    position: "absolute",
    right: 15,
    padding: 5,
  },
});

export default styles;
