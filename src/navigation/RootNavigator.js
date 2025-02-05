import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "@navigation/AuthNavigator";
import AppStackNavigator from "@/navigation/AppStackNavigator";

const RootNavigator = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {userLoggedIn ? <AppStackNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
