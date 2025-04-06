import React from "react";
import { View, Image, Platform, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@/context/ThemeContext"; // Import theme context

// import HomeScreen from "@screens/HomeScreen";
import HomeStackNavigator from "@navigation/stacks/HomeStackNavigator";
import Favorite from "@screens/Favorite";
import Stats from "@screens/Stats";
import Profile from "@screens/Profile";

import Colors from "@constants/colors";

const icons = {
  home: require("../../assets/images/icons/home.png"),
  favorites: require("../../assets/images/icons/heart.png"),
  stats: require("../../assets/images/icons/pie.png"),
  profile: require("../../assets/images/icons/man.png"),
};

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { theme } = useTheme(); // Get the current theme

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: () => null,
        tabBarStyle: {
          height: Platform.OS === "ios" ? 85 : 54,
          paddingTop: 5,
          // borderTopWidth: 3,
          backgroundColor: Colors[theme].background // Dynamic background color
          // borderTopColor: Colors[theme].border, // Dynamic border color
        },
        tabBarActiveTintColor: "transparent",
        tabBarInactiveTintColor: "transparent",
        tabBarIcon: ({ focused }) => {
          const icon = icons[route.name.toLowerCase()];
          return (
            <View
              style={[
                styles.tabBarIcon,
                focused && styles.tabBarIconFocused,
                { backgroundColor: focused ? Colors[theme].buttonBackground : "transparent" }, // Dynamic icon background
              ]}
            >
              <Image source={icon} style={styles.icon} />
            </View>
          );
        },
      })}
    >
      {/* Keeps the bottom tab navigation visible even when navigating deep within HomeStack.
    Remove this if it is not needed and delete the files under @navigation/stacks */}
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      {/* <Tab.Screen name="HomeStack" component={HomeScreen} /> */}

      <Tab.Screen name="Favorites" component={Favorite} />
      <Tab.Screen name="Stats" component={Stats} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  tabBarIcon: {
    borderRadius: 8,
    padding: 4,
  },
  tabBarIconFocused: {
    borderWidth: 1,
    borderColor: Colors.royalPurple,
  },
});

export default BottomTabNavigator;
