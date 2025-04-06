import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
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
  const themeColors = Colors[theme];

  return (
    <>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
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
