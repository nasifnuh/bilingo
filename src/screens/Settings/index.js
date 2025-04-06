import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FormattedMessage } from "react-intl";

import { signOut } from "firebase/auth";
import { auth } from "@services/firebaseConfig";

import Layout from "@/layout";
import Text from "@/components/ui/Text";
import BackButton from "@/components/BackButton";
import Button from "@/components/ui/Button";

import Colors from "@constants/colors";
import { styles } from "./styles";

const Settings = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <Layout
      headerComponent={
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.headerLabel}>
            <FormattedMessage id="settings" />
          </Text>
        </View>
      }
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("ProfileInfo")}
        >
          <Text style={styles.optionLabel}>
            <FormattedMessage id="profile" />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("Notification")}
        >
          <Text style={styles.optionLabel}>
            <FormattedMessage id="notifications" />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("AppLanguage")}
        >
          <Text style={styles.optionLabel}>
            <FormattedMessage id="appLanguage" />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("Accessibility")}
        >
          <Text style={styles.optionLabel}>
            <FormattedMessage id="accessibility" />
          </Text>
        </TouchableOpacity>

        <Button
          label={<FormattedMessage id="logout" />}
          variant="outlined"
          onPress={handleLogout}
          customBoxStyle={styles.logoutButton}
          customLabelStyle={{ color: Colors.crimsonRed }}
        />
      </View>
    </Layout>
  );
};

export default Settings;
