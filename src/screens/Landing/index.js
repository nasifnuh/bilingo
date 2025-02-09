import React from "react";
import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Layout from "@/layout";
import Button from "@components/Button";

import LogoImage from "@assets/images/logo.png";
import { styles } from "./styles";

const Landing = () => {
  const navigation = useNavigation();

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={LogoImage} style={styles.image} />
          <Text style={styles.title}>Bilingo</Text>
          <Text style={styles.subTitle}>
            Learn languages whenever and wherever you want. Free forever!
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label="Let’s goo"
            onPress={() => navigation.navigate("Signup")}
            style={styles.signupButton}
          />
          <Button
            label="I Already Have A Profile"
            onPress={() => navigation.navigate("Login")}
            variant="outlined"
            style={styles.loginButton}
          />
        </View>
      </View>
    </Layout>
  );
};

export default Landing;
