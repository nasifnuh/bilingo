import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";

import colors from "@constants/colors";

import styles from "./styles";

const Button = ({
  label,
  variant = "contained", // 'contained' | 'outlined'
  onPress,
  loading = false,
  disabled = false,
  style = {},
}) => {
  const buttonStyle =
    variant === "contained"
      ? [styles.button, styles.contained, style]
      : [styles.button, styles.outlined, style];

  const labelStyle =
    variant === "contained"
      ? [styles.label]
      : disabled && variant === "outlined"
      ? [styles.label, styles.labelOutlinedDisabled]
      : [styles.label, styles.labelOutlined];

  const disabledStyle =
    disabled || loading
      ? [
          styles.disabled,
          variant === "contained"
            ? styles.containedDisabled
            : styles.outlinedDisabled,
        ]
      : {};

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[buttonStyle, disabledStyle]}
    >
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator
            color={variant === "contained" ? colors.white : colors.silverGray}
          />
        </View>
      ) : (
        <Text style={labelStyle}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
