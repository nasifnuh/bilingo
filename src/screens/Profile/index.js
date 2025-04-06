import React, { useState, useCallback } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FormattedMessage } from "react-intl";

import { ref, get } from "firebase/database";
import { auth, database } from "@services/firebaseConfig";

import Layout from "@/layout";
import Text from "@/components/ui/Text";

import Colors from "@constants/colors";
import { styles } from "./styles";
import { useTheme } from "@/context/ThemeContext"; 

import Avatar from "@assets/images/mascot_excited.png";
import Streak50 from "@assets/images/achievement-badges/streak-50.png";
import Streak100 from "@assets/images/achievement-badges/streak-100.png";
import XP50 from "@assets/images/achievement-badges/xp-50.png";
import XP100 from "@assets/images/achievement-badges/xp-100.png";

const Profile = () => {
  const navigation = useNavigation();
  const { theme } = useTheme(); 
  const themeStyles = styles(theme); 

  const [userData, setUserData] = useState({});
  const [totalXP, setTotalXP] = useState(0);
  const [streak, setStreak] = useState(0);
  const [diamonds, setDiamonds] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        const user = auth.currentUser;
        if (user) {
          const userRef = ref(database, `users/${user.uid}`);
          try {
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
              const data = snapshot.val();

              setUserData({
                name: data.name || "",
                joinedDate: data.joinedDate || "",
                achievement: data.achievement || {},
              });

              const xpData = data.xp || {};
              let totalXP = 0;
              for (const language in xpData) {
                for (const date in xpData[language]) {
                  totalXP += xpData[language][date];
                }
              }
              setTotalXP(totalXP);
              setStreak(data.streak || 0);
              setDiamonds(data.diamonds || 0);
            }
          } catch (error) {
            console.error("Error fetching user data: ", error);
          }
        }
      };

      fetchUserData();
    }, [])
  );

  return (
    <Layout>
      <View style={themeStyles.container}>
        <View style={themeStyles.headerContainer}>
          <TouchableOpacity
            style={themeStyles.settingsButton}
            onPress={() => navigation.navigate("Settings")}
          >
            <FontAwesome name="gear" size={30} color={Colors.darkGray} />
          </TouchableOpacity>
          <Image source={Avatar} style={themeStyles.avatar} />
        </View>

        <View style={themeStyles.section}>
          <Text style={themeStyles.sectionLabel}>{userData.name}</Text>
          <Text style={themeStyles.sectionSubLabel}>
            <FormattedMessage id="joined" />
            &nbsp;
            {new Date(userData.joinedDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </Text>
        </View>

        <View style={themeStyles.section}>
          <Text style={themeStyles.sectionLabel}>
            <FormattedMessage id="overview" />
          </Text>

          <View style={themeStyles.overviewInfoContainer}>
            <View style={themeStyles.overviewInfoBox}>
              <View style={themeStyles.overviewInfoSubBox}>
                <Text style={themeStyles.overviewInfoLabel}>🔥</Text>
                <Text style={themeStyles.overviewInfo}>{streak}</Text>
              </View>
              <Text style={themeStyles.overviewInfoSubLabel}>
                <FormattedMessage id="dayStreak" />
              </Text>
            </View>
            <View style={themeStyles.overviewInfoBox}>
              <View style={themeStyles.overviewInfoSubBox}>
                <Text style={themeStyles.overviewInfoLabel}>⚡️</Text>
                <Text style={themeStyles.overviewInfo}>{totalXP}</Text>
              </View>
              <Text style={themeStyles.overviewInfoSubLabel}>
                <FormattedMessage id="totalXp" />
              </Text>
            </View>
            <View style={themeStyles.overviewInfoBox}>
              <View style={themeStyles.overviewInfoSubBox}>
                <Text style={themeStyles.overviewInfoLabel}>💎</Text>
                <Text style={themeStyles.overviewInfo}>{diamonds}</Text>
              </View>
              <Text style={themeStyles.overviewInfoSubLabel}>
                <FormattedMessage id="diamonds" />
              </Text>
            </View>
          </View>
        </View>

        <View style={themeStyles.section}>
          <Text style={themeStyles.sectionLabel}>
            <FormattedMessage id="achievements" />
          </Text>
          <View style={themeStyles.achievementContainer}>
            {userData.achievement?.streak_50 && (
              <Image source={Streak50} style={themeStyles.achievementImage} />
            )}
            {userData.achievement?.streak_100 && (
              <Image source={Streak100} style={themeStyles.achievementImage} />
            )}
            {userData.achievement?.xp_50 && (
              <Image source={XP50} style={themeStyles.achievementImage} />
            )}
            {userData.achievement?.xp_100 && (
              <Image source={XP100} style={themeStyles.achievementImage} />
            )}
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default Profile;
