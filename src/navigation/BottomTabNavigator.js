import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import HomeScreen from "@screens/HomeScreen";
import HomeStackNavigator from "@navigation/stacks/HomeStackNavigator";
import FavoritesScreen from "@screens/FavoritesScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    {/* Keeps the bottom tab navigation visible even when navigating deep within HomeStack.
    Remove this if it is not needed and delete the files under @navigation/stacks */}
    <Tab.Screen name="HomeStack" component={HomeStackNavigator} />
    {/* <Tab.Screen name="HomeStack" component={HomeScreen} /> */}

    <Tab.Screen name="FavoritesStack" component={FavoritesScreen} />
  </Tab.Navigator>
);

export default BottomTabNavigator;
