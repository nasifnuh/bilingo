import React from "react";
import { Text, TouchableOpacity } from "react-native";

import LanguageIcon from "@components/LanguageIcon";

import { styles } from "./styles";

const LanguageCard = ({ icon, name }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <LanguageIcon icon={icon} />
      <Text style={styles.label}>{name}</Text>
    </TouchableOpacity>
  );
};

export default LanguageCard;
