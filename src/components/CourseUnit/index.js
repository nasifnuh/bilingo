import React from "react";
import { View, Text } from "react-native";

import ChapterCard from "@/components/CourseUnit/ChapterCard";
import LessonCard from "@/components/CourseUnit/LessonCard";

import { styles } from "./styles";

const CourseUnit = ({ units }) => {
  return (
    <View style={styles.container}>
      {units.map((unit, index) => (
        <View key={index} style={styles.unitContainer}>
          <ChapterCard />
          <LessonCard lessons={[1, 2, 3]} />
        </View>
      ))}
    </View>
  );
};

export default CourseUnit;
