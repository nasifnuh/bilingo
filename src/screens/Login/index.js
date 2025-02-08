import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Login = () => (
  <View style={styles.container}>
    <Text>Login Screen</Text>
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

export default Login;
