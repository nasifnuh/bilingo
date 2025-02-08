import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "@screens/Landing";
import Signup from "@screens/Signup";
import Login from "@screens/Login";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Landing" component={Landing} />
    <Stack.Screen name="Signup" component={Signup} />
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
);

export default AuthNavigator;
