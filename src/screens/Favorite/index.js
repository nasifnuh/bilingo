import React, { useEffect, useState, useCallback } from "react";
import { View, Image, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { get, ref, onValue } from "firebase/database";
import { database, auth } from "@services/firebaseConfig";

import Layout from "@/layout";
import Text from "@/components/ui/Text";
import BackButton from "@components/BackButton";
import CourseUnit from "@/components/CourseUnit";

import MascotCry from "@assets/images/mascot_cry.png";
import { styles } from "./styles";

const Header = () => {
  return (
    <View style={styles.header}>
      <BackButton />
      <Text style={styles.headerLabel}>Saved lessons</Text>
    </View>
  );
};

const Favorite = () => {
  const navigation = useNavigation();

  const [currentLanguage, setCurrentLanguage] = useState(null);
  const [units, setUnits] = useState([]);
  const [favoriteLessons, setFavoriteLessons] = useState([]);

  useFocusEffect(
    useCallback(() => {
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
    }, [navigation])
  );

  useFocusEffect(
    useCallback(() => {
      if (!auth.currentUser) return;

      const userId = auth.currentUser.uid;
      const favRef = ref(database, `users/${userId}/favorites/`);

      const fetchFavorites = async () => {
        try {
          const snapshot = await get(favRef);
          if (snapshot.exists()) {
            setFavoriteLessons(Object.keys(snapshot.val()));
          } else {
            setFavoriteLessons([]);
          }
        } catch (error) {
          Alert.alert("Error", "Failed to fetch favorites, try again.");
        }
      };

      fetchFavorites();
    }, [navigation])
  );

  useEffect(() => {
    if (!currentLanguage) return;

    const unitsRef = ref(database, `courses/${currentLanguage}/chapters/`);

    const getCourseData = onValue(unitsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const filteredData = filterFavorites(
          Object.values(data),
          favoriteLessons
        );
        setUnits(filteredData);
      }
    });

    return () => getCourseData();
  }, [currentLanguage, favoriteLessons]);

  const filterFavorites = (chapters, favoriteLessons) => {
    return chapters
      .map((chapter) => {
        const filteredLessons = chapter.lessons.filter((lesson) =>
          favoriteLessons.includes(lesson.id)
        );

        if (filteredLessons.length > 0) {
          return { ...chapter, lessons: filteredLessons };
        }

        return null;
      })
      .filter((chapter) => chapter !== null);
  };

  return (
    <Layout headerComponent={<Header />}>
      {units.length === 0 ? (
        <View style={styles.empty}>
          <Image source={MascotCry} style={styles.image} />
          <Text style={styles.emptyText}>No favorites</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <CourseUnit units={units} />
        </View>
      )}
    </Layout>
  );
};

export default Favorite;
