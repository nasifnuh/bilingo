import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@services/firebaseConfig";
import { FontSizeProvider } from "@/context/FontSizeContext";

import AuthNavigator from "@navigation/AuthNavigator";
import AppStackNavigator from "@/navigation/AppStackNavigator";

const RootNavigator = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return null;

  return (
    <FontSizeProvider>
      <NavigationContainer>
        {user ? <AppStackNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </FontSizeProvider>
  );
};

export default RootNavigator;
