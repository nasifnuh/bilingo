import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const SignupScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text>Signup Screen</Text>
    <Button title="Login" onPress={() => navigation.navigate("Login")} />
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
