import React from "react";
import { IntlProvider } from "react-intl";

import { FontSizeProvider } from "@context/FontSizeContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider, useLanguage } from "@context/LanguageContext";

import en from "@/locales/en";
import fr from "@/locales/fr";

const messages = { en, fr };

const IntlWrapper = ({ children }) => {
  const { language } = useLanguage();

  return (
    <IntlProvider locale={language} messages={messages[language]}>
      {children}
    </IntlProvider>
  );
};

const AppProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <FontSizeProvider>
        <LanguageProvider>
          <IntlWrapper>{children}</IntlWrapper>
        </LanguageProvider>
      </FontSizeProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
