import React from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";

const ChapterCard = ({ unit, name, color, progress }) => {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View>
        <Text style={styles.chapterLabel}>Chapter {unit}</Text>
        <Text style={styles.lessonLabel}>{name}</Text>
      </View>
      <Text style={styles.progressLabel}>{progress}</Text>
    </View>
  );
};

export default ChapterCard;
