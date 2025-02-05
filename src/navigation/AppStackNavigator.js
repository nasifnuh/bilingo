import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "@navigation/BottomTabNavigator";
import LessonScreen from "@screens/LessonScreen";

const Stack = createStackNavigator();

const AppStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="App" component={BottomTabNavigator} />
    <Stack.Screen name="Lesson" component={LessonScreen} />
  </Stack.Navigator>
);

export default AppStackNavigator;
