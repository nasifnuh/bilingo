import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";

import Colors from "@constants/colors";

import { styles } from "./styles";

const LessonCard = ({ lessons }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {lessons.map((lesson, index) => (
        <TouchableOpacity
          key={index}
          style={styles.lessonContainer}
          onPress={() => navigation.navigate("Lesson")}
        >
          <View style={styles.unit}>
            <Text style={styles.unitLabel}>A</Text>
            {/* <FontAwesome6 name="check" size={24} color={Colors.silverGray} /> */}
          </View>
          <View style={styles.lesson}>
            <Text style={styles.lessonLabel}>Saying Hello and Goodbye</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default LessonCard;
