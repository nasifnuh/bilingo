import React from "react";
import { Text as RNText, StyleSheet } from "react-native";

import { useFontSize, BASE_FONT_SIZE } from "@/context/FontSizeContext";

const Text = ({ style, children, ...props }) => {
  const { scale } = useFontSize();

  const flattenedStyle = StyleSheet.flatten(style);
  const fontSize = flattenedStyle?.fontSize || BASE_FONT_SIZE;

  const scaledFontSize = fontSize * scale;

  return (
    <RNText {...props} style={[style, { fontSize: scaledFontSize }]}>
      {children}
    </RNText>
  );
};

export default Text;
