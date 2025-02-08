import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Landing = () => (
  <View style={styles.container}>
    <Text>Landing Screen</Text>
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

export default Landing;
