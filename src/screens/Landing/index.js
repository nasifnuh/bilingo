import React from "react";
import { View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FormattedMessage } from "react-intl";

import Layout from "@/layout";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";

import LogoImage from "@assets/images/logo.png";
import { styles } from "./styles";

const Landing = () => {
  const navigation = useNavigation();

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={LogoImage} style={styles.image} />
          <Text style={styles.title}>
            <FormattedMessage id="bilingo" />
          </Text>
          <Text style={styles.subTitle}>
            <FormattedMessage id="description" />
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label={<FormattedMessage id="letsGo" />}
            onPress={() => navigation.navigate("Signup")}
            customBoxStyle={styles.signupButton}
          />
          <Button
            label={<FormattedMessage id="alreadyHaveProfile" />}
            onPress={() => navigation.navigate("Login")}
            variant="outlined"
            customBoxStyle={styles.loginButton}
          />
        </View>
      </View>
    </Layout>
  );
};

export default Landing;
