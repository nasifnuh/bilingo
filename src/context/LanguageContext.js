import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const DEFAULT_LANGUAGE = "en";

const LanguageContext = createContext({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  DEFAULT_LANGUAGE,
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem("language");
        if (savedLanguage) {
          setLanguage(savedLanguage);
        }
      } catch (error) {
        console.error("Error loading language:", error);
      }
    };
    loadLanguage();
  }, []);

  useEffect(() => {
    const saveLanguage = async () => {
      try {
        await AsyncStorage.setItem("language", language);
      } catch (error) {
        console.error("Error setting language:", error);
      }
    };
    saveLanguage();
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, DEFAULT_LANGUAGE }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
