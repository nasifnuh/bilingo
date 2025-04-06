import React from "react";
import { FontSizeProvider } from "@/context/FontSizeContext";
import { IntlProvider } from "react-intl";

import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
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
    <FontSizeProvider>
      <LanguageProvider>
        <IntlWrapper>{children}</IntlWrapper>
      </LanguageProvider>
    </FontSizeProvider>
  );
};

export default AppProvider;
