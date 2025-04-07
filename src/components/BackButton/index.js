import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Octicons } from "@expo/vector-icons";

import Colors from "@constants/colors";
import { useTheme } from "@/context/ThemeContext"; 

const BackButton = ({ screenName, style = {} }) => {
  const navigation = useNavigation();
  const { theme } = useTheme(); 

  const handlePress = () => {
    if (screenName) {
      navigation.navigate(screenName);
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={style}>
      <Octicons name="chevron-left" size={24} color={theme === "dark" ? Colors.offWhite : Colors.darkGray } />
    </TouchableOpacity>
  );
};

export default BackButton;
