import React from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";

const ChapterCard = ({ unit, name, color }) => {
  const style = {backgroundColor: color}
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.chapterLabel}>Chapter {unit}</Text>
      <Text style={styles.lessonLabel}>{name}</Text>
    </View>
  );
};

export default ChapterCard;
