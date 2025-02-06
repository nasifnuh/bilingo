import React, { useState } from "react";
import {
  View,
  Text,
  TextInput as DefaultTextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "@constants/colors";

import styles from "./styles";

const TextInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  disabled = false,
  error,
  style = {},
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const toggleSecureText = () => {
    setIsSecure((prevState) => !prevState);
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, error && styles.errorLabel]}>{label}</Text>
      )}
      <View style={styles.inputContainer}>
        <DefaultTextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          editable={!disabled}
          placeholderTextColor={error ? Colors.crimsonRed : Colors.silverGray}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={toggleSecureText} style={styles.icon}>
            <Ionicons
              name={isSecure ? "eye-off" : "eye"}
              size={24}
              color={Colors.silverGray}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TextInput;
