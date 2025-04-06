import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ref, update } from "firebase/database";
import { auth, database } from "@services/firebaseConfig";

import Text from "@/components/ui/Text";
import LanguageIcon from "@components/LanguageIcon";

import { styles } from "./styles";
import { useTheme } from "@/context/ThemeContext"; 

const LanguageCard = ({ icon, name }) => {
  const navigation = useNavigation();
  const { theme } = useTheme(); 
  const themeStyles = styles(theme); 

  const handleSelection = async (language) => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      await update(ref(database, `users/${userId}`), { language });
    }

    navigation.navigate("App");
  };

  return (
    <TouchableOpacity
      style={themeStyles.container} 
      onPress={() => handleSelection(icon)}
    >
      <LanguageIcon icon={icon} />
      <Text style={themeStyles.label}>{name}</Text> 
    </TouchableOpacity>
  );
};

export default LanguageCard;
