import React from "react";
import { View, Image } from "react-native";
import { useTheme } from "@/context/ThemeContext";

import { useIconTheme } from "@hooks/useIconTheme";
import Layout from "@/layout";
import BackButton from "@components/BackButton";
import Text from "@components/ui/Text";
import IconPicker from "@/components/IconPicker";

import defaultIcon from "@assets/images/appIcons/default.png";
import orangeTheme from "@assets/images/appIcons/orangeTheme.png";
import blueTheme from "@assets/images/appIcons/blueTheme.png";
import { styles } from "./styles";

const AppIcon = () => {
  const { iconTheme } = useIconTheme();
  const { theme } = useTheme();
  const themeStyles = styles(theme);

  const icons = {
    default: defaultIcon,
    orange: orangeTheme,
    blue: blueTheme,
  };

  return (
    <Layout
      headerComponent={
        <View style={themeStyles.header}>
          <BackButton />
          <Text style={themeStyles.headerLabel}>App Icon</Text>
        </View>
      }
    >
      <View style={themeStyles.container}>
        <View style={themeStyles.form}>
          <View
            style={[
              styles.settingItem,
              { flexDirection: "column", alignItems: "center" },
            ]}
          >
            <Text style={[styles.label, { marginBottom: 10 }]}>
              Selected App Icon
            </Text>
            <Image
              source={icons[iconTheme]}
              style={{ width: 80, height: 80, marginBottom: 10 }}
            />
            <IconPicker />
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default AppIcon;
