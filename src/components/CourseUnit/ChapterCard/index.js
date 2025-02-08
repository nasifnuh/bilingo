import React from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";

const ChapterCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.chapterLabel}>Chapter 1</Text>
      <Text style={styles.lessonLabel}>Basic Phrases</Text>
    </View>
  );
};

export default ChapterCard;
