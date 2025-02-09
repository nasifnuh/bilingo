import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import LanguageIcon from "@components/LanguageIcon";

import Colors from "@constants/colors";
import { styles } from "./styles";

const HomePanel = ({ language }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Languages")}>
        <LanguageIcon icon={language} />
      </TouchableOpacity>
      <View style={styles.group}>
        <Text style={styles.icon}>🔥</Text>
        <Text style={[styles.text, { color: Colors.goldenOrange }]}>123</Text>
      </View>
      <View style={styles.group}>
        <Text style={styles.icon}>💎</Text>
        <Text style={[styles.text, { color: Colors.skyBlue }]}>123</Text>
      </View>
      <View style={styles.group}>
        <Text style={styles.icon}>🔔</Text>
      </View>
    </View>
  );
};

export default HomePanel;
