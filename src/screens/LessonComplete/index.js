import React from "react";
import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Layout from "@/layout";
import Button from "@components/Button";

import MascotImage from "@assets/images/mascot_hats.png";

import { styles } from "./styles";

const LessonComplete = ({ route }) => {
  const navigation = useNavigation();
  const { isDaysFirstLesson, streak } = route.params;

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Lesson Completed!</Text>
          <Image source={MascotImage} style={styles.image} />
          <View style={styles.rewardContainer}>
            <View style={styles.rewardTitleContainer}>
              <Text style={styles.rewardTitleContainerText}>Gains 💪</Text>
            </View>
            <View style={styles.rewardValueContainer}>
              <View style={{ display: "flex", flexDirection:'row', gap: 10 }}>
                <Text style={styles.icon}>💎</Text>
                <Text style={styles.reward}>+5</Text>
              </View>
              <View style={{ display: "flex", flexDirection:'row', gap: 5 }}>
                <Text style={styles.icon}>⚡️</Text>
                <Text style={styles.reward}>+10</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label="Continue"
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
