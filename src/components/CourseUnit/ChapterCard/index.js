import React from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";

const ChapterCard = ({ unit, name }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.chapterLabel}>Chapter {unit}</Text>
      <Text style={styles.lessonLabel}>{name}</Text>
    </View>
  );
};

export default ChapterCard;
