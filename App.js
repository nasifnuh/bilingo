import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

import { loadFonts } from "@/utils/loadFonts";
import RootNavigator from "@/navigation/RootNavigator";

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    async function prepare() {
      await loadFonts();

      await SplashScreen.hideAsync();
    }
    prepare();
  }, []);

  return <RootNavigator />;
}
