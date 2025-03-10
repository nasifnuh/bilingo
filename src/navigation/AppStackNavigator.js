import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "@navigation/BottomTabNavigator";

import Lesson from "@screens/Lesson";
import LessonComplete from "@/screens/LessonComplete";
import StreakComplete from "@/screens/StreakComplete";
import Languages from "@screens/Languages";
import Settings from "@screens/Settings";
import ProfileInfo from "@screens/ProfileInfo";
import Notification from "@/screens/Notification";

const Stack = createStackNavigator();

const AppStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="App" component={BottomTabNavigator} />
    <Stack.Screen name="Lesson" component={Lesson} />
    <Stack.Screen name="LessonComplete" component={LessonComplete} />
    <Stack.Screen name="StreakComplete" component={StreakComplete} />
    <Stack.Screen name="Languages" component={Languages} />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="ProfileInfo" component={ProfileInfo} />
    <Stack.Screen name="Notification" component={Notification} />
  </Stack.Navigator>
);

export default AppStackNavigator;
