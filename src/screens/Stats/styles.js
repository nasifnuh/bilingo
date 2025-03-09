import { StyleSheet } from "react-native";

import Colors from "@constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
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
  pickerContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
    gap: 10,
  },
  pickerWrapper: {
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.royalPurple,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  picker: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    color: "#000",
    fontFamily: "BalooChettan-B",
    display: "flex",
    alignItems: "center",
  },
  selectedPickerItem: {
    fontFamily: "BalooChettan-B",
    fontSize: 16,
  },
  pickerItem: {
    fontFamily: "BalooChettan-B",
    fontSize: 16,
    height: 130,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    width: "80%",
    borderRadius: 10,
  },
  doneButtonText: {
    color: Colors.royalPurple,
    fontFamily: "BalooChettan-B",
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
  },
  overviewContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: Colors.pastelPurple,
    borderRadius: 16,
    marginBottom: 10,
  },
  overviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
    fontFamily: "BalooChettan-B",
  },
  overviewItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  overviewLabel: {
    fontSize: 16,
    color: Colors.royalPurple,
    fontFamily: "BalooChettan-B",
  },
  overviewValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.royalPurple,
    fontFamily: "BalooChettan-B",
  },
  loadingText: {
    fontFamily: "BalooChettan-B",
    fontSize: 16,
    color: Colors.black,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontFamily: "BalooChettan-M",
    fontSize: 18,
    color: Colors.black,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
});
