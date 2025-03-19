import React from "react";
import { TouchableOpacity, ActivityIndicator, View } from "react-native";

import Text from "@/components/ui/Text";
import Colors from "@constants/colors";

import styles from "./styles";

const Button = ({
  label,
  variant = "contained", // 'contained' | 'outlined'
  onPress,
  loading = false,
  disabled = false,
  customBoxStyle = {},
  customLabelStyle = {},
}) => {
  const buttonStyle =
    variant === "contained"
      ? [styles.button, styles.contained]
      : [styles.button, styles.outlined];

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
      style={[buttonStyle, disabledStyle, customBoxStyle]}
    >
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator
            color={variant === "contained" ? Colors.white : Colors.silverGray}
          />
        </View>
      ) : (
        <Text style={[labelStyle, customLabelStyle]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
