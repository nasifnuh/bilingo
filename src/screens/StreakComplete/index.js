import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
          <Text style={styles.description}>day streak!</Text>
          <Text style={styles.info}>Practice everyday to keep your streak</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button label="Continue" onPress={() => navigation.replace("App")} />
        </View>
      </View>
    </Layout>
  );
};

export default StreakComplete;
