import React, { useEffect, useState, useCallback } from "react";
import { View } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { get, ref, onValue } from "firebase/database";
import { database, auth } from "@services/firebaseConfig";

import Layout from "@/layout";
import HomePanel from "@components/HomePanel";
import CourseUnit from "@/components/CourseUnit";

import { styles } from "./styles";

const Home = () => {
  const navigation = useNavigation();

  const [units, setUnits] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState("english");
  const [streakCount, setStreakCount] = useState(0);
  const [diamonds, setDiamonds] = useState(0);

  useEffect(() => {
    const unitsRef = ref(database, `courses/${currentLanguage}/chapters/`);

    const getCourseData = onValue(unitsRef, (snapshot) => {
      const data = snapshot.val();
      setUnits(data ? Object.values(data) : []);
    });

    return () => getCourseData();
  }, [navigation, currentLanguage]);

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
        />
      }
    >
      <View style={styles.container}>
        <CourseUnit units={units} />
      </View>
    </Layout>
  );
};

export default Home;
