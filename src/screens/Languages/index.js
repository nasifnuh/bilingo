import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ref, onValue } from "firebase/database";
import { database } from "@services/firebaseConfig";

import Layout from "@/layout";
import Text from "@/components/ui/Text";
import LanguageCard from "@components/LanguageCard";

import MascotLearn from "@assets/images/mascot_learn.png";
import { styles } from "./styles";

const Languages = () => {
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
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={MascotLearn} style={styles.image} />
          <View style={styles.titleCard}>
            <Text style={styles.title}>
              What language would you like to learn?
            </Text>
          </View>
        </View>

        <View style={styles.languages}>
          {Object.values(languages).map((language, index) => (
            <LanguageCard
              key={index}
              icon={language.icon}
              name={language.name}
            />
          ))}
        </View>
      </View>
    </Layout>
  );
};

export default Languages;
