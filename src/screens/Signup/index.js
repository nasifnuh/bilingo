import React from "react";
import { View, Text, Image } from "react-native";

import Layout from "@/layout";
import BackButton from "@components/BackButton";

import MascotImage from "@assets/images/mascot_love.png";
import { styles } from "./styles";

const Signup = () => {

  return (
    <Layout>
      <View style={styles.container}>
        <BackButton />
        <Image source={MascotImage} style={styles.image} />
        <Text style={styles.title}>Create an Account</Text>
      </View>
    </Layout>
  );
};

export default Signup;
