import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Octicons } from "@expo/vector-icons";

import Colors from "@constants/colors";

const BackButton = ({ screenName }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (screenName) {
      navigation.navigate(screenName);
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Octicons name="chevron-left" size={24} color={Colors.darkGray} />
    </TouchableOpacity>
  );
};

export default BackButton;
