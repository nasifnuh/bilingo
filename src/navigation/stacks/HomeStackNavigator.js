import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "@screens/HomeScreen";
// import LessonScreen from "@screens/LessonScreen";

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* <Stack.Screen name="Lesson" component={LessonScreen} /> */}
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
