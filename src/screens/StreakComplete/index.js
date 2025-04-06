import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FormattedMessage } from "react-intl";

import Layout from "@/layout";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";

import { styles } from "./styles";

const StreakComplete = ({ route }) => {
  const navigation = useNavigation();
  const { streak } = route.params;

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.icon}>🔥</Text>
          <Text style={styles.count}>{streak}</Text>
          <Text style={styles.description}>
            <FormattedMessage id="dayStreak" />!
          </Text>
          <Text style={styles.info}>
            <FormattedMessage id="practiceEveryday" />
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label={<FormattedMessage id="continue" />}
            onPress={() => navigation.replace("App")}
          />
        </View>
      </View>
    </Layout>
  );
};

export default StreakComplete;
