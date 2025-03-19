import React, { useState, useCallback } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { ref, get } from "firebase/database";
import { auth, database } from "@services/firebaseConfig";

import Layout from "@/layout";
import Text from "@/components/ui/Text";

import Colors from "@constants/colors";
import { styles } from "./styles";

import Avatar from "@assets/images/mascot_excited.png";

const Profile = () => {
  const navigation = useNavigation();

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
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate("Settings")}
          >
            <FontAwesome name="gear" size={30} color={Colors.darkGray} />
          </TouchableOpacity>
          <Image source={Avatar} style={styles.avatar} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{userData.name}</Text>
          <Text style={styles.sectionSubLabel}>
            Joined&nbsp;
            {new Date(userData.joinedDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Overview</Text>

          <View style={styles.overviewInfoContainer}>
            <View style={styles.overviewInfoBox}>
              <View style={styles.overviewInfoSubBox}>
                <Text style={styles.overviewInfoLabel}>🔥</Text>
                <Text style={styles.overviewInfo}>{streak}</Text>
              </View>
              <Text style={styles.overviewInfoSubLabel}>Day Streak</Text>
            </View>
            <View style={styles.overviewInfoBox}>
              <View style={styles.overviewInfoSubBox}>
                <Text style={styles.overviewInfoLabel}>⚡️</Text>
                <Text style={styles.overviewInfo}>{totalXP}</Text>
              </View>
              <Text style={styles.overviewInfoSubLabel}>Total XP</Text>
            </View>
            <View style={styles.overviewInfoBox}>
              <View style={styles.overviewInfoSubBox}>
                <Text style={styles.overviewInfoLabel}>💎</Text>
                <Text style={styles.overviewInfo}>{diamonds}</Text>
              </View>
              <Text style={styles.overviewInfoSubLabel}>Diamonds</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Achievements</Text>
          <Text style={styles.sectionSubLabel}>Coming soon!</Text>
        </View>
      </View>
    </Layout>
  );
};

export default Profile;
