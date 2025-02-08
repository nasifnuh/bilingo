import React from "react";
import { Image } from "react-native";

import { styles } from "./styles";

const icons = {
  uk: require("../../../assets/images/flags/uk.png"),
  france: require("../../../assets/images/flags/france.png"),
  china: require("../../../assets/images/flags/china.png"),
  japan: require("../../../assets/images/flags/japan.png"),
  korea: require("../../../assets/images/flags/korea.png"),
  germany: require("../../../assets/images/flags/germany.png"),
  russia: require("../../../assets/images/flags/russia.png"),
  spain: require("../../../assets/images/flags/spain.png"),
};

const LanguageIcon = ({ icon, style }) => {
  const flagImage = icons[icon];

  return <Image source={flagImage} style={[styles.image, style]} />;
};

export default LanguageIcon;
