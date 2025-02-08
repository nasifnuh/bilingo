import React from "react";
import { View, Text } from "react-native";

import LanguageIcon from "@components/LanguageIcon";

import Colors from "@constants/colors";
import { styles } from "./styles";

const HomePanel = () => {
  return (
    <View style={styles.container}>
      <LanguageIcon icon="france" />
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
