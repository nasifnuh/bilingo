import React from "react";
import { SafeAreaView, ScrollView, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";

import Colors from "@constants/colors";
import { useTheme } from "@/context/ThemeContext";

import { styles } from "./styles";

const Layout = ({
  headerComponent,
  children,
  safeAreaStyle,
  contentContainerStyle,
  ...scrollViewProps
}) => {
  const { theme } = useTheme();
  const systemTheme = useColorScheme(); // Detect system theme
  const appliedTheme = theme || systemTheme; // Use app theme or fallback to system theme
  const themeColors = Colors[appliedTheme];

  return (
    <>
      <StatusBar
        style={appliedTheme === "dark" ? "light" : "dark"}
        backgroundColor={themeColors.background} // Set background color dynamically
      />
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: themeColors.background }]}
      >
        {headerComponent}
        <ScrollView
          contentContainerStyle={[
            styles.scrollViewContent,
            contentContainerStyle,
            { backgroundColor: themeColors.background },
          ]}
          {...scrollViewProps}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Layout;
