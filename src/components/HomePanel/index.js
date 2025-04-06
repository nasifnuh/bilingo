import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Text from "@/components/ui/Text";
import LanguageIcon from "@components/LanguageIcon";

import Colors from "@constants/colors";
import { styles } from "./styles";
import { useTheme } from "@/context/ThemeContext"; // Import theme context

const HomePanel = ({ language, streak, diamonds, onWordOfTheDayPress }) => {
  const navigation = useNavigation();
  const { theme } = useTheme(); // Get the current theme
  const themeStyles = styles(theme); // Apply theme styles dynamically

  return (
    <View style={themeStyles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Languages")}>
        <LanguageIcon icon={language} />
      </TouchableOpacity>
      <View style={themeStyles.group}>
        <Text style={themeStyles.icon}>🔥</Text>
        <Text style={[themeStyles.text, { color: Colors.goldenOrange }]}>
          {streak || 0}
        </Text>
      </View>
      <View style={themeStyles.group}>
        <Text style={themeStyles.icon}>💎</Text>
        <Text style={[themeStyles.text, { color: Colors.skyBlue }]}>
          {diamonds || 0}
        </Text>
      </View>
      <TouchableOpacity onPress={onWordOfTheDayPress}>
        <Text style={themeStyles.icon}>📖</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomePanel;