import React, { useEffect, useState, useCallback } from "react";
import { View, Modal, TouchableOpacity, Alert, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FormattedMessage, useIntl } from "react-intl";

import { ref, get, update, onValue } from "firebase/database";
import { auth, database } from "@services/firebaseConfig";

import Layout from "@/layout";
import HomePanel from "@components/HomePanel";
import CourseUnit from "@components/CourseUnit";
import { useTheme } from "@/context/ThemeContext";

import { styles } from "./styles";

const Home = () => {
  const { formatMessage } = useIntl();
  const navigation = useNavigation();
  const { theme } = useTheme(); // Add theme context
  const themeStyles = styles(theme); 

  const [units, setUnits] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState("english");
  const [streakCount, setStreakCount] = useState(0);
  const [diamonds, setDiamonds] = useState(0);
  const [wordOfTheDay, setWordOfTheDay] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const unitsRef = ref(database, `courses/${currentLanguage}/chapters/`);

    const getCourseData = onValue(unitsRef, (snapshot) => {
      const data = snapshot.val();
      setUnits(data ? Object.values(data) : []);
    });

    return () => getCourseData();
  }, [navigation, currentLanguage]);

  const fetchWordOfTheDay = async () => {
    try {
      const snapshot = await get(
        ref(database, `courses/${currentLanguage}/words`)
      );
      if (snapshot.exists()) {
        const words = snapshot.val();
        const word = words.find((word) => !word.isShown);

        if (word) {
          setWordOfTheDay(word);
          setIsModalVisible(true);

          const wordIndex = words.indexOf(word);
          const wordRef = ref(
            database,
            `courses/${currentLanguage}/words/${wordIndex}`
          );
          await update(wordRef, { isShown: true });
        } else {
          Alert.alert(formatMessage({ id: "noMoreWords" }));
        }
      }
    } catch (error) {
      console.error("Error fetching word of the day:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const getUserData = async () => {
        try {
          const user = auth.currentUser;
          if (user) {
            const userId = user.uid;
            const snapshot = await get(ref(database, `users/${userId}`));

            if (snapshot.exists()) {
              const userData = snapshot.val();
              const language = userData.language;
              const streak = userData.streak;
              const diamonds = userData.diamonds;

              if (!language) {
                navigation.replace("Languages");
              }

              setCurrentLanguage(language);
              setStreakCount(streak);
              setDiamonds(diamonds);
            }
          }
        } catch (error) {
          console.error("Error checking language:", error);
        }
      };

      getUserData();
    }, [navigation])
  );

  return (
    <Layout
      headerComponent={
        <HomePanel
          language={currentLanguage}
          streak={streakCount}
          diamonds={diamonds}
          onWordOfTheDayPress={fetchWordOfTheDay}
        />
      }
    >
      <View style={themeStyles.container}>
        <CourseUnit units={units} language={currentLanguage} />
      </View>
      <Modal visible={isModalVisible} transparent>
        <View style={themeStyles.modalContainer}>
          <View style={themeStyles.modalContent}>
            {wordOfTheDay && (
              <>
                <Text style={themeStyles.word}>{wordOfTheDay.word}</Text>
                <Text style={themeStyles.label}>
                  <FormattedMessage id="pronunciation" />:
                </Text>
                <Text style={themeStyles.pronounce}>
                  {wordOfTheDay.pronounce}
                </Text>
                <Text style={themeStyles.label}>
                  <FormattedMessage id="phoneticTranscript" />:
                </Text>
                <Text style={themeStyles.phoneticTranscript}>
                  {wordOfTheDay.phoneticTranscript}
                </Text>
                <Text style={themeStyles.label}>
                  <FormattedMessage id="meaning" />:
                </Text>
                <Text style={themeStyles.meaning}>{wordOfTheDay.meaning}</Text>
              </>
            )}
            <TouchableOpacity
              style={themeStyles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={themeStyles.closeButtonText}>
                <FormattedMessage id="close" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Layout>
  );
};

export default Home;
