import React from "react";
import { View, Text, Image } from "react-native";

import Layout from "@/layout";
import LanguageCard from "@components/LanguageCard";

import MascotLearn from "@assets/images/mascot_learn.png";
import { styles } from "./styles";

const Languages = () => {
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
          {[
            { id: "1", name: "french", icon: "france" },
            { id: "2", name: "chinese", icon: "china" },
          ].map((language) => (
            <LanguageCard
              key={language.id}
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
