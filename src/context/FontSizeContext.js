import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FontSizeContext = createContext();

export const BASE_FONT_SIZE = 16;

export const FontSizeProvider = ({ children }) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const loadFontScale = async () => {
      try {
        const savedScale = await AsyncStorage.getItem("fontScale");
        if (savedScale !== null) {
          setScale(parseFloat(savedScale));
        }
      } catch (error) {
        console.error("Error loading font scale:", error);
      }
    };
    loadFontScale();
  }, []);

  useEffect(() => {
    const saveFontScale = async () => {
      try {
        await AsyncStorage.setItem("fontScale", scale.toString());
      } catch (error) {
        console.error("Error saving font scale:", error);
      }
    };
    saveFontScale();
  }, [scale]);

  return (
    <FontSizeContext.Provider value={{ scale, setScale, BASE_FONT_SIZE }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => useContext(FontSizeContext);
