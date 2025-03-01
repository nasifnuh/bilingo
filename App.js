import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";

import { loadFonts } from "@/utils/loadFonts";
import RootNavigator from "@/navigation/RootNavigator";

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "You need to enable notifications to use this feature."
      );
      return false;
    }
    return true;
  };

  useEffect(() => {
    requestNotificationPermissions();

    const notificationSubscription =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received:", notification);
      });

    return () => notificationSubscription.remove();
  }, []);

  useEffect(() => {
    async function prepare() {
      await loadFonts();

      await SplashScreen.hideAsync();
    }
    prepare();
  }, []);

  return <RootNavigator />;
}
