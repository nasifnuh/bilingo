import React from "react";
import { View } from "react-native";
import Slider from "@react-native-community/slider";

import { useFontSize } from "@/context/FontSizeContext";

import Layout from "@/layout";
import Text from "@/components/ui/Text";
import BackButton from "@/components/BackButton";

import { styles } from "./styles";

const Accessibility = () => {
  const { scale, setScale } = useFontSize();

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
          <Text style={styles.label}>Font Scale: {scale.toFixed(2)}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0.8}
            maximumValue={1.5}
            step={0.1}
            value={scale}
            onValueChange={(value) => setScale(value)}
          />
        </View>
      </View>
    </Layout>
  );
};

export default Accessibility;
