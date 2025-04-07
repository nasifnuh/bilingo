import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

import { useIconTheme } from "@hooks/useIconTheme";
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

  return (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Choose Your App Icon:</Text>
      <View style={{ flexDirection: 'row' }}>
        {Object.keys(icons).map((theme) => (
          <TouchableOpacity
            key={theme}
            onPress={() => changeTheme(theme)}
            style={{
              margin: 10,
              borderWidth: iconTheme === theme ? 2 : 0,
              borderColor: 'dodgerblue',
              borderRadius: 10,
              padding: 5,
            }}
          >
            <Image source={icons[theme]} style={{ width: 60, height: 60 }} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
