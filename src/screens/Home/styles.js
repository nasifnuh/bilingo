import { StyleSheet } from "react-native";
import Colors from "@constants/colors";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 320,
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
    alignItems: "left",
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  word: {
    fontSize: 24,
    fontFamily: "BalooChettan-B",
    color: Colors.royalPurple,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: "BalooChettan-B",
    color: Colors.grayish,
    marginBottom: 5,
  },
  pronounce: {
    fontSize: 18,
    fontFamily: "BalooChettan-B",
    color: Colors.darkGray,
    marginBottom: 10,
  },
  phoneticTranscript: {
    fontSize: 16,
    fontFamily: "BalooChettan-B",
    color: Colors.grayish,
    marginBottom: 10,
  },
  meaning: {
    fontSize: 16,
    fontFamily: "BalooChettan-B",
    color: Colors.charcoal,
    marginBottom: 20,
    textAlign: "left",
  },
  closeButton: {
    backgroundColor: Colors.royalPurple,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "BalooChettan-B",
    color: Colors.white,
  },
});