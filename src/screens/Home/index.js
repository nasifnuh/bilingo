import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { get, ref, onValue} from "firebase/database";
import { database, auth } from "@services/firebaseConfig";

import Layout from "@/layout";
import HomePanel from "@components/HomePanel";
import CourseUnit from "@/components/CourseUnit";

import { styles } from "./styles";

const Home = () => {
  const navigation = useNavigation();

  const [units, setUnits] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState();

  useEffect(() => {
    const unitsRef = ref(database, `courses/${currentLanguage}/chapters/`);

    const getCourseData = onValue(unitsRef, (snapshot) => {
      const data = snapshot.val();
      setUnits(data ? Object.values(data) : []);
    });

    return () => getCourseData();
  }, [navigation, currentLanguage]);

  useEffect(() => {
    const checkUserLanguage = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
          const snapshot = await get(ref(database, `users/${userId}`));

          if (snapshot.exists()) {
            const userData = snapshot.val();
            const language = userData.language;

            setCurrentLanguage(language);

            if (!language) {
              navigation.replace("Languages");
            }
          }
        }
      } catch (error) {
        console.error("Error checking language:", error);
      }
    };

    checkUserLanguage();
  }, [navigation]);

  return (
    <Layout headerComponent={<HomePanel language={currentLanguage} />}>
      <View style={styles.container}>
        <CourseUnit units={units} />
      </View>
    </Layout>
  );
};

export default Home;
