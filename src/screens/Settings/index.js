import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { signOut } from "firebase/auth";
import { auth } from "@services/firebaseConfig";

import Layout from "@/layout";
import BackButton from "@/components/BackButton";
import Button from "@components/Button";

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
          <Text style={styles.headerLabel}>Settings</Text>
        </View>
      }
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("ProfileInfo")}
        >
          <Text style={styles.optionLabel}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("Notification")}
        >
          <Text style={styles.optionLabel}>Notifications</Text>
        </TouchableOpacity>

        <Button
          label="Logout"
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
