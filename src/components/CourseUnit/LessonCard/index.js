import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";

import Text from "@/components/ui/Text";

import { styles } from "./styles";

const LessonCard = ({ lessons, color, progress, language }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {lessons.map((lesson) => (
        <TouchableOpacity
          key={lesson.id}
          style={styles.lessonContainer}
          onPress={() => navigation.navigate("Lesson", { lesson: lesson, language })}
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
