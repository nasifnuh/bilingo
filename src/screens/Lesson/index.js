import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Alert } from "react-native";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { FormattedMessage } from "react-intl";

import { ref, get, set, update, remove } from "firebase/database";
import { auth, database } from "@services/firebaseConfig";

import Layout from "@/layout";
import Text from "@/components/ui/Text";
import BackButton from "@components/BackButton";
import Button from "@/components/ui/Button";

import Colors from "@constants/colors";
import { styles } from "./styles";

const icons = {
  girl: require("../../../assets/images/icons/girl.png"),
};

const Lesson = ({ route }) => {
  const navigation = useNavigation();
  const { lesson, language } = route.params;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!auth.currentUser) return;

      const userId = auth.currentUser.uid;
      const favRef = ref(database, `users/${userId}/favorites/${lesson.id}`);

      try {
        const snapshot = await get(favRef);
        if (snapshot.exists()) {
          setFavorite(true);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to check favorite status");
      }
    };

    checkFavorite();
  }, [lesson.id]);

  const handleFavorites = async () => {
    if (!auth.currentUser) return;

    const userId = auth.currentUser.uid;
    const lessonId = lesson.id;
    const favRef = ref(database, `users/${userId}/favorites/${lessonId}`);

    try {
      const snapshot = await get(favRef);

      if (snapshot.exists()) {
        await remove(favRef);
        setFavorite(false);
      } else {
        await set(favRef, true);
        setFavorite(true);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update favorite, try again.");
    }
  };

  const handleContinue = async () => {
    const questions = lesson;

    const nextIndex = currentIndex + 1;
    if (nextIndex === questions.questions.length) {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const progressRef = ref(database, `users/${userId}/progress/`);
        const userRef = ref(database, `users/${userId}`);
        const xpRef = ref(database, `users/${userId}/xp/${language}`);

        const snapshot = await get(progressRef);
        let currentProgress = snapshot.val() || [];

        if (!currentProgress.includes(questions.id)) {
          currentProgress.push(questions.id);
          await set(progressRef, currentProgress);
        }

        const today = new Date().toISOString().split("T")[0];

        const userSnapshot = await get(userRef);
        const userData = userSnapshot.val() || {};
        const lastCompletionDate = userData.lastCompletionDate;

        let streak = userData.streak || 0;
        let diamonds = userData.diamonds || 0;

        const xpSnapshot = await get(xpRef);
        const xpData = xpSnapshot.val() || {};

        const currentXp = xpData[`"${today}"`] || 0;
        xpData[`"${today}"`] = currentXp + 10;

        if (lastCompletionDate !== today) {
          streak += 1;
        }

        await update(userRef, {
          streak: streak,
          diamonds: (diamonds += 5),
          lastCompletionDate: today,
        });

        await update(xpRef, xpData);

        setProgress(1);
        setSelectedOption(null);
        setIsCorrect(null);

        navigation.replace("Achievements", {
          userData,
          isDaysFirstLesson: lastCompletionDate !== today,
          streak,
        });

        return;
      }
    } else {
      setCurrentIndex(nextIndex);
      setProgress(nextIndex / questions.questions.length);
      setSelectedOption(null);
      setIsCorrect(null);
    }
  };

  const handleSelectOption = (option) => {
    const question = lesson.questions[currentIndex];
    setSelectedOption(option);
    if (question.answer === option) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <Layout
      headerComponent={
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
          <TouchableOpacity onPress={handleFavorites}>
            {favorite ? (
              <FontAwesome name="heart" size={24} color={Colors.crimsonRed} />
            ) : (
              <FontAwesome name="heart-o" size={24} color={Colors.crimsonRed} />
            )}
          </TouchableOpacity>
        </View>
      }
    >
      <View style={styles.container}>
        <Text style={styles.generalLabel}>
          <FormattedMessage id="selectTranslationLabel" />
        </Text>

        <View style={styles.questionContainer}>
          <Image source={icons["girl"]} style={styles.image} />
          <View style={styles.questionCard}>
            <Text style={styles.questionText}>
              {lesson.questions[currentIndex].question}
            </Text>
          </View>
        </View>

        <View style={styles.answerContainer}>
          {Object.values(lesson.questions[currentIndex].options).map(
            (option, index) => {
              const isSelected = option === selectedOption;
              const isOptionCorrect =
                isSelected && isCorrect !== null && isCorrect === true;
              const isOptionWrong =
                isSelected && isCorrect !== null && isCorrect === false;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.answerOption,
                    isOptionCorrect && styles.correctOption,
                    isOptionWrong && styles.wrongOption,
                  ]}
                  onPress={() => handleSelectOption(option)}
                >
                  <Text
                    style={[
                      styles.answerText,
                      isOptionCorrect && styles.correctAnswerText,
                      isOptionWrong && styles.wrongAnswerText,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            }
          )}
        </View>

        <View style={styles.buttonContainer}>
          {isCorrect !== null && (
            <Text
              style={[
                styles.feedbackText,
                isCorrect ? styles.correctAnswerText : styles.wrongAnswerText,
              ]}
            >
              {isCorrect ? (
                <FormattedMessage id="correctAnswer" />
              ) : (
                <FormattedMessage id="wrongAnswer" />
              )}
            </Text>
          )}
          <Button
            label={<FormattedMessage id="continue" />}
            onPress={handleContinue}
            disabled={selectedOption === null || !isCorrect}
          />
        </View>
      </View>
    </Layout>
  );
};

export default Lesson;
