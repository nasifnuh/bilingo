import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";

const LessonCard = ({ lessons }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {lessons.map((lesson) => (
        <TouchableOpacity
          key={lesson.id}
          style={styles.lessonContainer}
          onPress={() => navigation.navigate("Lesson", { lesson: lesson })}
        >
          <View style={styles.unit}>
            <Text style={styles.unitLabel}>{lesson.unit}</Text>
          </View>
          <View style={styles.lesson}>
            <Text style={styles.lessonLabel}>{lesson.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default LessonCard;
