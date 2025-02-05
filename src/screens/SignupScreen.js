import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Button from "@components/Button";

const SignupScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text>Signup Screen</Text>
    <Button label="Login" onPress={() => navigation.navigate("Login")} />
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

export default SignupScreen;
