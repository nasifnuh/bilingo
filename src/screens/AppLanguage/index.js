import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FormattedMessage } from "react-intl";

import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

import Layout from "@/layout";
import BackButton from "@/components/BackButton";
import LanguageIcon from "@components/LanguageIcon";

import { styles } from "./styles";

const AppLanguage = () => {
  const { language, setLanguage } = useLanguage();
  const { theme } = useTheme(); 
  const themeStyles = styles(theme); 

  return (
    
    <Layout
      headerComponent={
        <View style={themeStyles.header}>
          <BackButton />
          <Text style={themeStyles.headerLabel}>
            <FormattedMessage id="appLanguage" />
          </Text>
        </View>
      }
    >
      <View style={themeStyles.container}>
        <TouchableOpacity
          style={[
            themeStyles.cardContainer,
            language === "en" && themeStyles.cardContainerSelected,
          ]}
          onPress={() => setLanguage("en")}
        >
          <LanguageIcon icon="english" />
          <Text style={themeStyles.cardLabel}>
            <FormattedMessage id="english" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            themeStyles.cardContainer,
            language === "fr" && themeStyles.cardContainerSelected,
          ]}
          onPress={() => setLanguage("fr")}
        >
          <LanguageIcon icon="french" />
          <Text style={themeStyles.cardLabel}>
            <FormattedMessage id="french" />
          </Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default AppLanguage;
