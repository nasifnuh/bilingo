import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FormattedMessage } from "react-intl";

import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

import { ref, onValue } from "firebase/database";
import { database } from "@services/firebaseConfig";

import Layout from "@/layout";
import Text from "@/components/ui/Text";
import LanguageCard from "@components/LanguageCard";

import MascotLearn from "@assets/images/mascot_learn.png";
import { styles } from "./styles";

const Languages = () => {
  const { language: appLanguage } = useLanguage();
  const { theme } = useTheme(); 
  const themeStyles = styles(theme); 
  const navigation = useNavigation();

  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const langRef = ref(database, `courses/`);

    const getLanguages = onValue(langRef, (snapshot) => {
      if (snapshot.exists()) {
        setLanguages(snapshot.val());
      }
    });

    return () => getLanguages();
  }, [navigation]);

  return (
    <Layout>
      <View style={themeStyles.container}>
        <View style={themeStyles.header}>
          <Image source={MascotLearn} style={themeStyles.image} />
          <View style={themeStyles.titleCard}>
            <Text style={themeStyles.title}>
              <FormattedMessage id="languageToLearnLabel" />
            </Text>
          </View>
        </View>

        <View style={themeStyles.languages}>
          {Object.values(languages)
            .filter(
              // Filter out languages that are not Chinese, English, or French
              // as other languages don't support 'en' & 'fr' app translations
              (language) =>
                language.icon === "chinese" ||
                language.icon === "english" ||
                language.icon === "french"
            )
            .map((language, index) => (
              <LanguageCard
                key={index}
                icon={language.icon}
                name={language.name[appLanguage]}
              />
            ))}
        </View>
      </View>
    </Layout>
  );
};

export default Languages;
