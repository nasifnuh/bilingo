import React from "react";
import { Image } from "react-native";

import { styles } from "./styles";

const icons = {
  chinese: require("../../../assets/images/flags/chinese.png"),
  english: require("../../../assets/images/flags/english.png"),
  french: require("../../../assets/images/flags/french.png"),
  german: require("../../../assets/images/flags/german.png"),
  japanese: require("../../../assets/images/flags/japanese.png"),
  korean: require("../../../assets/images/flags/korean.png"),
  russian: require("../../../assets/images/flags/russian.png"),
  spanish: require("../../../assets/images/flags/spanish.png"),
};

const LanguageIcon = ({ icon, style }) => {
  const flagImage = icons[icon];

  return <Image source={flagImage} style={[styles.image, style]} />;
};

export default LanguageIcon;
