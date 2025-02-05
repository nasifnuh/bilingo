import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text>Home Screen</Text>
    <Button title="Lesson" onPress={() => navigation.navigate("Lesson")} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default HomeScreen;
