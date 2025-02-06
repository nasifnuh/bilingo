import { StyleSheet } from "react-native";

import Colors from "@constants/colors";

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    height: 50,
    width: "100%",
  },
  contained: {
    backgroundColor: Colors.royalPurple,
  },
  outlined: {
    borderWidth: 1,
    borderColor: Colors.royalPurple,
    backgroundColor: "transparent",
  },
  label: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: "BalooChettan-EB",
  },
  labelOutlined: {
    color: Colors.royalPurple,
  },
  labelOutlinedDisabled: {
    color: Colors.silverGray,
  },
  containedDisabled: {
    backgroundColor: Colors.silverGray,
  },
  outlinedDisabled: {
    borderColor: Colors.silverGray,
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
