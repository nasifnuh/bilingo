import React, { useEffect } from "react";
import { View, Image, Text } from "react-native"; // Import Text component
import { useNavigation } from "@react-navigation/native";
import { ref, update } from "firebase/database";
import { auth, database } from "@services/firebaseConfig";
import Layout from "@/layout";
import Button from "@/components/ui/Button";
import Streak50 from "@assets/images/achievement-badges/streak-50.png";
import Streak100 from "@assets/images/achievement-badges/streak-100.png";
import XP50 from "@assets/images/achievement-badges/xp-50.png";
import XP100 from "@assets/images/achievement-badges/xp-100.png";
import { styles } from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "@/context/ThemeContext"; // Import useTheme

const Achievements = ({ route }) => {
  const navigation = useNavigation();
  const { isDaysFirstLesson, userData, streak } = route.params;
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  const { theme } = useTheme(); 
  const themeStyles = styles(theme); 

  const xpData = userData.xp || {};
  let totalXP = 10;
  for (const language in xpData) {
    for (const date in xpData[language]) {
      totalXP += xpData[language][date];
    }
  }

  // Collect all unlocked achievements
  const achievements = [
    { key: "streak_100", condition: streak === 100, image: Streak100 },
    { key: "streak_50", condition: streak === 50, image: Streak50 },
    { key: "xp_100", condition: totalXP === 100, image: XP100 },
    { key: "xp_50", condition: totalXP === 50, image: XP50 },
  ];

  const unlockedAchievements = achievements.filter(
    ({ key, condition }) => condition && !userData.achievement[key]
  );

  useEffect(() => {
    if (unlockedAchievements.length === 0) {
      navigation.replace("LessonComplete", {
        isDaysFirstLesson,
        ...(isDaysFirstLesson && { streak: streak }),
      });
    }
  }, [navigation, isDaysFirstLesson, unlockedAchievements]);

  const handleContinue = async () => {
    if (userId && unlockedAchievements.length > 0) {
      const userRef = ref(database, `users/${userId}/achievement`);
      
      // Prepare updates for all unlocked achievements
      const updates = {};
      unlockedAchievements.forEach(({ key }) => {
        updates[key] = true;
      });

      await update(userRef, updates);
    }
    navigation.replace("LessonComplete", {
      isDaysFirstLesson,
      ...(isDaysFirstLesson && { streak: streak }),
    });
  };

  return unlockedAchievements.length > 0 ? (
    <Layout>
      <ScrollView>
        <View style={themeStyles.container}>
          <View style={themeStyles.achievementsContainer}>
            <Text style={themeStyles.title}>
              Congratulations! You unlocked a new achievement
            </Text>
            {unlockedAchievements.map(({ key, image }) => (
              <Image key={key} source={image} style={themeStyles.image} />
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={themeStyles.buttonContainer}>
        <Button label="Continue" onPress={handleContinue} />
      </View>
    </Layout>
  ) : null;
};

export default Achievements;