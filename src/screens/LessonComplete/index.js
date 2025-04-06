import React from "react";
import { View, Image, useColorScheme } from "react-native";
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
  const colorScheme = useColorScheme(); // Add color scheme detection

  return (
    <Layout>
      <View style={styles.container}>
        <View style={[styles.content, colorScheme === "dark" && styles.contentDark]}>
          <Text style={[styles.title, colorScheme === "dark" && styles.titleDark]}>
            <FormattedMessage id="lessonCompleted" />!
          </Text>
          <Image source={MascotImage} style={styles.image} />
          <View style={[styles.rewardContainer, colorScheme === "dark" && styles.rewardContainerDark]}>
            <View style={styles.rewardTitleContainer}>
              <Text style={[styles.rewardTitleContainerText, colorScheme === "dark" && styles.rewardTitleContainerTextDark]}>
                <FormattedMessage id="gains" /> 💪
              </Text>
            </View>
            <View style={styles.rewardValueContainer}>
              <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                <Text style={[styles.icon, colorScheme === "dark" && styles.iconDark]}>💎</Text>
                <Text style={[styles.reward, colorScheme === "dark" && styles.rewardDark]}>+5</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                <Text style={[styles.icon, colorScheme === "dark" && styles.iconDark]}>⚡️</Text>
                <Text style={[styles.reward, colorScheme === "dark" && styles.rewardDark]}>+10</Text>
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
