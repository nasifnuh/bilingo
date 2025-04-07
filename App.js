import React, { useEffect, useState } from "react";
import { View } from "react-native";
import * as SplashScreenNative from "expo-splash-screen";
import * as Notifications from "expo-notifications";

import { loadFonts } from "@/utils/loadFonts";
import AppProvider from "@/context/AppProvider";
import RootNavigator from "@/navigation/RootNavigator";
import SplashScreen from "@/screens/Splash";

import ShakeToReportModal from "src/components/ShakeToReport/ShakeToReportModal";


SplashScreenNative.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showCustomSplash, setShowCustomSplash] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

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
      try {
        await loadFonts();
      } catch (error) {
        console.error("Error loading assets", error);
      } finally {
        setAppIsReady(true);
        await SplashScreenNative.hideAsync();
      }
    }
    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <AppProvider>
      <View style={{ flex: 1 }}>
        <RootNavigator />
        {showCustomSplash && (
          <SplashScreen
            onLoadComplete={() =>
              setTimeout(() => {
                setShowCustomSplash(false);
              }, 1500)
            }
          />
        )}
      </View>

      <ShakeToReportModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
      />
    </AppProvider>
  );
}
