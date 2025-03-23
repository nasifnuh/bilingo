import React, { useEffect, useState, useCallback } from "react";
import { View, Modal, TouchableOpacity, Alert, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ref, get, update, onValue } from "firebase/database";
import { auth, database } from "@services/firebaseConfig";

import Layout from "@/layout";
import HomePanel from "@components/HomePanel";
import CourseUnit from "@components/CourseUnit";

import { styles } from "./styles";

const Home = () => {
  const navigation = useNavigation();
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
      const snapshot = await get(ref(database, `courses/${currentLanguage}/words`));
      if (snapshot.exists()) {
        const words = snapshot.val();
        const word = words.find((word) => !word.isShown);

        if (word) {
          setWordOfTheDay(word);
          setIsModalVisible(true);

          const wordIndex = words.indexOf(word);
          const wordRef = ref(database, `courses/${currentLanguage}/words/${wordIndex}`);
          await update(wordRef, { isShown: true });
        } else {
          Alert.alert("No more words available for today.");
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
      <View style={styles.container}>
        <CourseUnit units={units} language={currentLanguage} />
      </View>
      <Modal visible={isModalVisible} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {wordOfTheDay && (
              <>
                <Text style={styles.word}>{wordOfTheDay.word}</Text>
                <Text style={styles.label}>Pronunciation:</Text>
                <Text style={styles.pronounce}>{wordOfTheDay.pronounce}</Text>
                <Text style={styles.label}>Phonetic Transcript:</Text>
                <Text style={styles.phoneticTranscript}>{wordOfTheDay.phoneticTranscript}</Text>
                <Text style={styles.label}>Meaning:</Text>
                <Text style={styles.meaning}>{wordOfTheDay.meaning}</Text>
              </>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Layout>
  );
};

export default Home;