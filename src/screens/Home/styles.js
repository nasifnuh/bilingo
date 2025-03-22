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
    width: 300,
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignItems: "center",
  },
  word: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pronounce: {
    fontSize: 18,
    marginBottom: 10,
  },
  phoneticTranscript: {
    fontSize: 16,
    marginBottom: 10,
  },
  meaning: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButtonText: {
    fontSize: 18,
    color: Colors.royalPurple,
  },
});