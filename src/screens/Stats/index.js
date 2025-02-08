import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Stats = () => (
  <View style={styles.container}>
    <Text>Stats Screen</Text>
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

export default Stats;
