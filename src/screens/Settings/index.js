import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FormattedMessage, useIntl } from "react-intl";

import { signOut } from "firebase/auth";
import { auth } from "@services/firebaseConfig";

import Layout from "@/layout";
import Text from "@/components/ui/Text";
import BackButton from "@/components/BackButton";
import Button from "@/components/ui/Button";
import { useTheme } from "@/context/ThemeContext";

import Colors from "@constants/colors";
import { styles } from "./styles";

const Settings = () => {
  const { formatMessage } = useIntl();
  const navigation = useNavigation();
  const { theme, toggleTheme } = useTheme(); 
  const themeStyles = styles(theme); 

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert(formatMessage({ id: "error" }), error.message);
    }
  };

  return (
    <Layout
      headerComponent={
        <View style={themeStyles.header}>
          <BackButton />
          <Text style={themeStyles.headerLabel}>
            <FormattedMessage id="settings" />
          </Text>
        </View>
      }
    >
      <View style={themeStyles.container}>
        <TouchableOpacity
          style={themeStyles.option}
          onPress={() => navigation.navigate("ProfileInfo")}
        >
          <Text style={themeStyles.optionLabel}>
            <FormattedMessage id="profile" />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={themeStyles.option}
          onPress={() => navigation.navigate("Notification")}
        >
          <Text style={themeStyles.optionLabel}>
            <FormattedMessage id="notifications" />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={themeStyles.option}
          onPress={() => navigation.navigate("AppLanguage")}
        >
          <Text style={themeStyles.optionLabel}>
            <FormattedMessage id="appLanguage" />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={themeStyles.option}
          onPress={() => navigation.navigate("Accessibility")}
        >
          <Text style={themeStyles.optionLabel}>
            <FormattedMessage id="accessibility" />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={themeStyles.option} onPress={toggleTheme}>
          <Text style={themeStyles.optionLabel}>
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
          </Text>
        </TouchableOpacity>

        <Button
          label={<FormattedMessage id="logout" />}
          variant="outlined"
          onPress={handleLogout}
          customBoxStyle={themeStyles.logoutButton}
          customLabelStyle={{ color: Colors.crimsonRed }}
        />
      </View>
    </Layout>
  );
};

export default Settings;
