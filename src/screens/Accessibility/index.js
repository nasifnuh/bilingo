import React from "react";
import { View } from "react-native";
import Slider from "@react-native-community/slider";

import Layout from "@/layout";
import Text from "@/components/ui/Text";
import BackButton from "@/components/BackButton";

import { styles } from "./styles";

const Accessibility = () => {

  return (
    <Layout
      headerComponent={
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.headerLabel}>Accessibility</Text>
        </View>
      }
    >
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.label}>Font Scale:</Text>
          <Slider
            style={styles.slider}
            minimumValue={0.5}
            maximumValue={2.0}
            step={0.1}
            value={scale}
            onValueChange={(value) => console.log('valku: ', value)}
          />
        </View>
      </View>
    </Layout>
  );
};

export default Accessibility;
