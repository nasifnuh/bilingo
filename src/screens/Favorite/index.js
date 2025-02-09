import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Layout from "@/layout";
import BackButton from "@components/BackButton";
import CourseUnit from "@/components/CourseUnit";

import { styles } from "./styles";

const Header = () => {
  return (
    <View style={styles.header}>
      <BackButton />
      <Text style={styles.headerLabel}>Saved lessons</Text>
    </View>
  );
};

const Favorite = () => {
  const navigation = useNavigation();

  return (
    <Layout headerComponent={<Header />}>
      <View style={styles.container}>
        <CourseUnit units={[1, 2, 3]} />
      </View>
    </Layout>
  );
};

export default Favorite;
