import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";

import { styles } from "./styles";

const SplashScreen = ({ onLoadComplete }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onLoadComplete();
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../../../assets/images/splash-icon.png")}
        style={[
          styles.logo,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      />
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        Bilingo
      </Animated.Text>
    </View>
  );
};

export default SplashScreen;
