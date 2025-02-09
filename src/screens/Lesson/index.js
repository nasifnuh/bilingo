import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import { FontAwesome } from "@expo/vector-icons";

import Layout from "@/layout";
import BackButton from "@components/BackButton";
import Button from "@components/Button";

import Colors from "@constants/colors";
import { styles } from "./styles";

const icons = {
  girl: require("../../../assets/images/icons/girl.png"),
};

const Header = ({ progress, favorite }) => {
  return (
    <View style={styles.header}>
      <BackButton />
      <Progress.Bar
        animated={true}
        progress={progress}
        width={250}
        height={15}
        color={Colors.royalPurple}
        unfilledColor={Colors.offWhite}
        borderWidth={0}
        borderRadius={8}
      />
      {favorite ? (
        <FontAwesome name="heart" size={24} color={Colors.crimsonRed} />
      ) : (
        <FontAwesome name="heart-o" size={24} color={Colors.crimsonRed} />
      )}
    </View>
  );
};

const Lesson = () => {
  const navigation = useNavigation();

  const [progress, setProgress] = useState(0.5);
  const [favorite, setFavorite] = useState(false);

  return (
    <Layout
      headerComponent={<Header progress={progress} favorite={favorite} />}
    >
      <View style={styles.container}>
        <Text style={styles.generalLabel}>Select the correct translation</Text>

        <View style={styles.questionContainer}>
          <Image source={icons["girl"]} style={styles.image} />
          <View style={styles.questionCard}>
            <Text style={styles.questionText}>
              What language would you like to learn?
            </Text>
          </View>
        </View>

        <View style={styles.answerContainer}>
          {["fille", "je", "femme", "other"].map((option, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={[styles.answerOption, styles.correctOption]}
              >
                <Text style={[styles.answerText, styles.correctAnswerText]}>
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.buttonContainer}>
          <Text style={[styles.feedbackText, styles.correctAnswerText]}>
            Correct Answer
          </Text>
          <Button
            label="Continue"
            onPress={() => navigation.navigate("Signup")}
            disabled={false}
          />
        </View>
      </View>
    </Layout>
  );
};

export default Lesson;
