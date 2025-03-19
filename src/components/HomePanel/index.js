import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Text from "@/components/ui/Text";
import LanguageIcon from "@components/LanguageIcon";

import Colors from "@constants/colors";
import { styles } from "./styles";

const HomePanel = ({ language, streak, diamonds }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Languages")}>
        <LanguageIcon icon={language} />
      </TouchableOpacity>
      <View style={styles.group}>
        <Text style={styles.icon}>🔥</Text>
        <Text style={[styles.text, { color: Colors.goldenOrange }]}>
          {streak || 0}
        </Text>
      </View>
      <View style={styles.group}>
        <Text style={styles.icon}>💎</Text>
        <Text style={[styles.text, { color: Colors.skyBlue }]}>
          {diamonds || 0}
        </Text>
      </View>
    </View>
  );
};

export default HomePanel;
