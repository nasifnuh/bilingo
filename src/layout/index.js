import React from "react";
import { SafeAreaView, ScrollView, useColorScheme, StatusBar, Platform } from "react-native";
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
        barStyle={appliedTheme === "dark" ? "light-content" : "dark-content"} 
        backgroundColor={appliedTheme === "dark" ? Colors.charcoal : Colors.offWhite}
        translucent={true}
      />
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: appliedTheme === "dark" ? Colors.charcoal : Colors.offWhite }]}
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
