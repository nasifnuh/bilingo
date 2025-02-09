import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Layout from "@/layout";
import HomePanel from "@components/HomePanel";
import CourseUnit from "@/components/CourseUnit";

import { styles } from "./styles";

const Home = () => {
  const navigation = useNavigation();

  return (
    <Layout headerComponent={<HomePanel />}>
      <View style={styles.container}>
        <CourseUnit units={[1, 2, 3]} />
      </View>
    </Layout>
  );
};

export default Home;
