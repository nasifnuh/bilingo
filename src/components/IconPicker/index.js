import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

import { useIconTheme } from "@hooks/useIconTheme";
import { useTheme } from "@/context/ThemeContext"; // Import useTheme
import defaultIcon from "@assets/images/appIcons/default.png";
import orangeTheme from "@assets/images/appIcons/orangeTheme.png";
import blueTheme from "@assets/images/appIcons/blueTheme.png";

const icons = {
  default: defaultIcon,
  orange: orangeTheme,
  blue: blueTheme,
};

export default function IconPicker() {
  const { iconTheme, changeTheme } = useIconTheme();
  const { theme } = useTheme(); // Get the current theme

  return (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <Text
        style={{
          fontSize: 14,
          fontFamily: "BalooChettan-B",
          marginBottom: 10,
          color: theme === "dark" ? "white" : "black", // Apply theme-based color
        }}
      >
        Choose Your App Icon:
      </Text>
      <View style={{ flexDirection: 'row' }}>
        {Object.keys(icons).map((themeKey) => (
          <TouchableOpacity
            key={themeKey}
            onPress={() => changeTheme(themeKey)}
            style={{
              margin: 10,
              borderWidth: iconTheme === themeKey ? 2 : 0,
              borderColor: theme === "dark" ? "lightblue" : "dodgerblue", // Apply theme-based border color
              borderRadius: 10,
              padding: 5,
            }}
          >
            <Image source={icons[themeKey]} style={{ width: 60, height: 60 }} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
