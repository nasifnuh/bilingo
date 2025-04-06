import React from "react";
import { View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FormattedMessage } from "react-intl";

import Layout from "@/layout";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";

import MascotImage from "@assets/images/mascot_hats.png";

import { styles } from "./styles";

const LessonComplete = ({ route }) => {
  const navigation = useNavigation();
  const { isDaysFirstLesson, streak } = route.params;

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>
            <FormattedMessage id="lessonCompleted" />!
          </Text>
          <Image source={MascotImage} style={styles.image} />
          <View style={styles.rewardContainer}>
            <View style={styles.rewardTitleContainer}>
              <Text style={styles.rewardTitleContainerText}>
                <FormattedMessage id="gains" /> 💪
              </Text>
            </View>
            <View style={styles.rewardValueContainer}>
              <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                <Text style={styles.icon}>💎</Text>
                <Text style={styles.reward}>+5</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                <Text style={styles.icon}>⚡️</Text>
                <Text style={styles.reward}>+10</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label={<FormattedMessage id="continue" />}
            onPress={() =>
              isDaysFirstLesson
                ? navigation.replace("StreakComplete", { streak })
                : navigation.replace("App")
            }
          />
        </View>
      </View>
    </Layout>
  );
};

export default LessonComplete;
