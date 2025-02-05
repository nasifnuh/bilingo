import { StyleSheet } from "react-native";
import colors from "@constants/colors";

const styles = StyleSheet.create({
  container: { width: "100%" },
  label: {
    fontFamily: "BalooChettan-B",
    fontSize: 14,
    color: colors.black,
    marginBottom: 8,
  },
  errorLabel: { color: colors.crimsonRed },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 50,
    borderRadius: 16,
    paddingHorizontal: 15,
    fontSize: 14,
    backgroundColor: colors.offWhite,
    flex: 1,
  },
  icon: {
    position: "absolute",
    right: 15,
    padding: 5,
  },
  errorText: {
    fontSize: 12,
    color: colors.crimsonRed,
    marginTop: 4,
  },
});

export default styles;
