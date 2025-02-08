import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Favorite = () => (
  <View style={styles.container}>
    <Text>Favorite Screen</Text>
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

export default Favorite;
