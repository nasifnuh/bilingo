// screens/LoginScreen.js

import React, { useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <Button title="Signup" onPress={() => navigation.navigate("Signup")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default LoginScreen;
