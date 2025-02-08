import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "@screens/Home";

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={Home} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
