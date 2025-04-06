import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Alert } from "react-native";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { FormattedMessage, useIntl } from "react-intl";

import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

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
  const { language: appLanguage } = useLanguage();
  const { formatMessage } = useIntl();
  const navigation = useNavigation();
  const { lesson, language } = route.params;
  const { theme } = useTheme(); // Add theme context
  const themeStyles = styles(theme); 

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
        Alert.alert(
          formatMessage({ id: "error" }),
          formatMessage({ id: "favStatusFailed" })
        );
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
      Alert.alert(
        formatMessage({ id: "error" }),
        formatMessage({ id: "favStatusUpdateFailed" })
      );
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
        <View style={themeStyles.header}>
          <BackButton />
          <Progress.Bar
            animated={true}
            progress={progress}
            width={250}
            height={15}
            color={Colors.royalPurple}
            unfilledColor={Colors[theme].background} // Dynamic unfilled color
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
      <View style={themeStyles.container}>
        <Text style={themeStyles.generalLabel}>
          <FormattedMessage id="selectTranslationLabel" />
        </Text>

        <View style={themeStyles.questionContainer}>
          <Image source={icons["girl"]} style={themeStyles.image} />
          <View style={themeStyles.questionCard}>
            <Text style={themeStyles.questionText}>
              {lesson.questions[currentIndex].question[appLanguage]}
            </Text>
          </View>
        </View>

        <View style={themeStyles.answerContainer}>
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
                    themeStyles.answerOption,
                    isOptionCorrect && themeStyles.correctOption,
                    isOptionWrong && themeStyles.wrongOption,
                  ]}
                  onPress={() => handleSelectOption(option)}
                >
                  <Text
                    style={[
                      themeStyles.answerText,
                      isOptionCorrect && themeStyles.correctAnswerText,
                      isOptionWrong && themeStyles.wrongAnswerText,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            }
          )}
        </View>

        <View style={themeStyles.buttonContainer}>
          {isCorrect !== null && (
            <Text
              style={[
                themeStyles.feedbackText,
                isCorrect
                  ? themeStyles.correctAnswerText
                  : themeStyles.wrongAnswerText,
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
