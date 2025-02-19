import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";
import { lightTheme, darkTheme } from "../theme/colors";

const Card = ({ destination, onPress }) => {
  const { theme } = useContext(ThemeContext);
  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: currentTheme.card,
            shadowColor: currentTheme.text,
          },
        ]}
      >
        <View style={styles.card_content}>
          <View>
            <Image source={{ uri: destination.image }} style={styles.image} />
          </View>
          <View style={styles.text_content}>
            <View style={styles.title_container}>
              <Ionicons
                name="location-sharp"
                size={20}
                color={currentTheme.primary}
              />
              <Text style={[styles.title, { color: currentTheme.primary }]}>
                {destination.name}
              </Text>
            </View>
            <View style={styles.description_container}>
              <Ionicons
                name="locate-sharp"
                size={20}
                color={currentTheme.secondary}
              />
              <Text
                style={[styles.description, { color: currentTheme.secondary }]}
              >
                {destination.capital}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  card_content: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  text_content: {
    justifyContent: "center",
  },
  title_container: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description_container: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  description: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
