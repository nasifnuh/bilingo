import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ref, update } from "firebase/database";
import { auth, database } from "@services/firebaseConfig";

import LanguageIcon from "@components/LanguageIcon";

import { styles } from "./styles";

const LanguageCard = ({ icon, name }) => {
  const navigation = useNavigation();

  const handleSelection = async (language) => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      await update(ref(database, `users/${userId}`), { language });
    }

    navigation.navigate("App");
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleSelection(icon)}
    >
      <LanguageIcon icon={icon} />
      <Text style={styles.label}>{name}</Text>
    </TouchableOpacity>
  );
};

export default LanguageCard;
