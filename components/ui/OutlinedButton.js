import React, { useContext } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../../context/ThemeContext";
import { lightTheme, darkTheme } from "../../theme/colors";

const OutlinedButton = ({ onPress, icon, children }) => {
  const { theme } = useContext(ThemeContext);
  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        { borderColor: currentTheme.button },
      ]}
      onPress={onPress}
    >
      <Ionicons
        style={styles.icon}
        name={icon}
        size={25}
        color={currentTheme.button}
      />
      <Text style={{ color: currentTheme.button }}>{children}</Text>
    </Pressable>
  );
};

export default OutlinedButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
});
