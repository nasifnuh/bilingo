import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FormattedMessage } from "react-intl";

import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

import Layout from "@/layout";
import BackButton from "@/components/BackButton";
import LanguageIcon from "@components/LanguageIcon";

import Colors from "@/constants/colors";
import { styles } from "./styles";

const AppLanguage = () => {
  const { language, setLanguage } = useLanguage();
  const { theme } = useTheme(); // Get the current theme
  const themeStyles = styles(theme); // Apply theme styles dynamically

  return (
    <Layout
      headerComponent={
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.headerLabel}>
            <FormattedMessage id="appLanguage" />
          </Text>
        </View>
      }
    >
      <View style={themeStyles.container}>
        <TouchableOpacity
          style={[
            styles.cardContainer,
            language === "en" && styles.cardContainerSelected,
          ]}
          onPress={() => setLanguage("en")}
        >
          <LanguageIcon icon="english" />
          <Text style={styles.cardLabel}>
            <FormattedMessage id="english" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.cardContainer,
            language === "fr" && styles.cardContainerSelected,
          ]}
          onPress={() => setLanguage("fr")}
        >
          <LanguageIcon icon="french" />
          <Text style={styles.cardLabel}>
            <FormattedMessage id="french" />
          </Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default AppLanguage;
