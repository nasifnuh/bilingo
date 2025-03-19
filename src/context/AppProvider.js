import React from "react";
import { FontSizeProvider } from "@/context/FontSizeContext";

const AppProvider = ({ children }) => {
  return <FontSizeProvider>{children}</FontSizeProvider>;
};

export default AppProvider;
