import React from "react";
import { View } from "react-native";
import Slider from "@react-native-community/slider";
import { FormattedMessage } from "react-intl";

import { useFontSize } from "@/context/FontSizeContext";
import { useTheme } from "@/context/ThemeContext";

import Layout from "@/layout";
import BackButton from "@/components/BackButton";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";

import { styles } from "./styles";

const Accessibility = () => {
  const { scale, setScale } = useFontSize();
  const { theme } = useTheme(); // Get the current theme
  const themeStyles = styles(theme); // Apply theme styles dynamically

  const resetToDefault = () => {
    setScale(1);
  };

  return (
    <Layout
      headerComponent={
        <View style={themeStyles.header}>
          <BackButton />
          <Text style={themeStyles.headerLabel}>
            <FormattedMessage id="accessibility" />
          </Text>
        </View>
      }
    >
      <View style={themeStyles.container}>
        <View style={themeStyles.form}>
          <Text style={themeStyles.label}>
            <FormattedMessage id="fontScale" />: {scale.toFixed(2)}
          </Text>
          <Slider
            style={themeStyles.slider}
            minimumValue={0.8}
            maximumValue={1.5}
            step={0.1}
            value={scale}
            onValueChange={(value) => setScale(value)}
          />
          <Button
            variant="contained"
            label={<FormattedMessage id="resetToDefault" />}
            onPress={resetToDefault}
          />
        </View>
      </View>
    </Layout>
  );
};

export default Accessibility;
