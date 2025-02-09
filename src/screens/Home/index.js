import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ref, onValue } from "firebase/database";

import Layout from "@/layout";
import HomePanel from "@components/HomePanel";
import CourseUnit from "@/components/CourseUnit";
import { database } from "@services/firebaseConfig";

import { styles } from "./styles";

const Home = () => {
  const [units, setUnits] = useState([]);

  useEffect(() => {
    const unitsRef = ref(database, "courses/english/chapters/");

    const unsubscribe = onValue(unitsRef, (snapshot) => {
      const data = snapshot.val();
      setUnits(data ? Object.values(data) : []);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Layout headerComponent={<HomePanel />}>
      <View style={styles.container}>
        <CourseUnit units={units} />
      </View>
    </Layout>
  );
};

export default Home;
