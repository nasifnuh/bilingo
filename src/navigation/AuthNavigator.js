import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AppProvider from "@/context/AppProvider";

import Landing from "@screens/Landing";
import Signup from "@screens/Signup";
import Login from "@screens/Login";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <AppProvider>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  </AppProvider>
);

export default AuthNavigator;
