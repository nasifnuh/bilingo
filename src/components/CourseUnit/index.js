import React, { useState, useCallback } from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { ref, get } from "firebase/database";
import { auth, database } from "@services/firebaseConfig";

import { useLanguage } from "@/context/LanguageContext";

import ChapterCard from "@/components/CourseUnit/ChapterCard";
import LessonCard from "@/components/CourseUnit/LessonCard";

import { styles } from "./styles";

const CourseUnit = ({ units, language }) => {
  const { language: appLanguage } = useLanguage();

  const [progress, setProgress] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchProgress = async () => {
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
          const progressRef = ref(database, `users/${userId}/progress`);
          const snapshot = await get(progressRef);
          const currentProgress = snapshot.val() || [];

          setProgress(Array.isArray(currentProgress) ? currentProgress : []);
        }
      };

      fetchProgress();
    }, [])
  );

  return (
    <View style={styles.container}>
      {units.map((unit) => {
        const completedLessons = unit.lessons.filter((lesson) =>
          progress.includes(lesson.id)
        ).length;
        const totalLessons = unit.lessons.length;

        return (
          <View key={unit.id} style={styles.unitContainer}>
            <ChapterCard
              unit={unit.unit}
              name={unit.name[appLanguage]}
              color={unit.color}
              progress={`${completedLessons}/${totalLessons}`}
            />
            <LessonCard
              lessons={unit.lessons}
              color={unit.color}
              progress={progress}
              language={language}
            />
          </View>
        );
      })}
    </View>
  );
};

export default CourseUnit;
