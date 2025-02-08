import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";

import Colors from "@constants/colors";

import { styles } from "./styles";

const Layout = ({
  headerComponent,
  children,
  safeAreaStyle,
  contentContainerStyle,
  ...scrollViewProps
}) => {
  return (
    <>
      <StatusBar style="dark" backgroundColor={Colors.white} />
      <SafeAreaView style={styles.safeArea}>
        {headerComponent}
        <ScrollView
          contentContainerStyle={[
            styles.scrollViewContent,
            contentContainerStyle,
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
