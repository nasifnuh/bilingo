import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "@navigation/BottomTabNavigator";

import Lesson from "@screens/Lesson";
import Languages from "@screens/Languages";

const Stack = createStackNavigator();

const AppStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="App" component={BottomTabNavigator} />
    <Stack.Screen name="Lesson" component={Lesson} />
    <Stack.Screen name="Languages" component={Languages} />
  </Stack.Navigator>
);

export default AppStackNavigator;
