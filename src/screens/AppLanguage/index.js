import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FormattedMessage } from "react-intl";

import { useLanguage } from "@/context/LanguageContext";

import Layout from "@/layout";
import BackButton from "@/components/BackButton";
import LanguageIcon from "@components/LanguageIcon";

import Colors from "@/constants/colors";
import { styles } from "./styles";

const AppLanguage = () => {
  const { language, setLanguage } = useLanguage();

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
      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.cardContainer,
            language === "en" && {
              borderColor: Colors.freshGreen,
              borderWidth: 3,
            },
          ]}
          onPress={() => setLanguage("en")}
        >
          <LanguageIcon icon="english" />
          <Text style={styles.cardLabel}><FormattedMessage id="english" /></Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.cardContainer,
            language === "fr" && {
              borderColor: Colors.freshGreen,
              borderWidth: 3,
            },
          ]}
          onPress={() => setLanguage("fr")}
        >
          <LanguageIcon icon="french" />
          <Text style={styles.cardLabel}><FormattedMessage id="french" /></Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default AppLanguage;
