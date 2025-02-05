import React from "react";
import { Text } from "react-native";

import Button from "@components/Button";
import Layout from "@/layout";

const LoginScreen = ({ navigation }) => {
  return (
    <Layout>
      <>
        <Text>Login Screen</Text>
        <Button label="Signup" onPress={() => navigation.navigate("Signup")} />
      </>
    </Layout>
  );
};

export default LoginScreen;
