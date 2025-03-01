import React from "react";
import { View } from "react-native";

import ChapterCard from "@/components/CourseUnit/ChapterCard";
import LessonCard from "@/components/CourseUnit/LessonCard";

import { styles } from "./styles";

const CourseUnit = ({ units }) => {
  return (
    <View style={styles.container}>
      {units.map((unit) => (
        <View key={unit.id} style={styles.unitContainer}>
          <ChapterCard unit={unit.unit} name={unit.name} color={unit.color} />
          <LessonCard lessons={unit.lessons} />
        </View>
      ))}
    </View>
  );
};

export default CourseUnit;
