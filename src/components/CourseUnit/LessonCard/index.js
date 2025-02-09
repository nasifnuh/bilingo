import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";

import { ref, get } from "firebase/database";
import { auth, database } from "@services/firebaseConfig";

import Colors from "@constants/colors";

import { styles } from "./styles";

const LessonCard = ({ lessons, color }) => {
  const navigation = useNavigation();
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
          setProgress(currentProgress);
        }
      };

      fetchProgress();
    }, [])
  );

  return (
    <View style={styles.container}>
      {lessons.map((lesson) => (
        <TouchableOpacity
          key={lesson.id}
          style={styles.lessonContainer}
          onPress={() => navigation.navigate("Lesson", { lesson: lesson })}
        >
          <View
            style={[
              styles.unit,
              progress.includes(lesson.id) && { borderColor: color },
            ]}
          >
            {progress.includes(lesson.id) ? (
              <FontAwesome6 name="check" size={24} color={color} />
            ) : (
              <Text style={styles.unitLabel}>{lesson.unit}</Text>
            )}
          </View>
          <View
            style={[
              styles.lesson,
              progress.includes(lesson.id) && { borderColor: color },
            ]}
          >
            <Text
              style={[
                styles.lessonLabel,
                progress.includes(lesson.id) && { color: color },
              ]}
            >
              {lesson.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default LessonCard;
