import { StyleSheet } from "react-native";

import colors from "@constants/colors";

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    height: 50,
    width: "100%",
  },
  contained: {
    backgroundColor: colors.royalPurple,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.royalPurple,
    backgroundColor: "transparent",
  },
  label: {
    color: colors.white,
    fontSize: 18,
    fontFamily: "BalooChettan-EB",
  },
  labelOutlined: {
    color: colors.royalPurple,
  },
  labelOutlinedDisabled: {
    color: colors.silverGray,
  },
  containedDisabled: {
    backgroundColor: colors.silverGray,
  },
  outlinedDisabled: {
    borderColor: colors.silverGray,
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
