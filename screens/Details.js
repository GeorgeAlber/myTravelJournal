import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { ThemeContext } from "../context/ThemeContext";
import { lightTheme, darkTheme } from "../theme/colors";
import { useContext } from "react";

const Details = ({ route }) => {
  const { destination } = route.params;
  const { theme } = useContext(ThemeContext);
  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <>
      <Animated.View style={[styles.container]} entering={FadeIn.duration(500)}>
        <Image source={{ uri: destination.image }} style={styles.image} />
      </Animated.View>
      <Animated.View
        style={[styles.container]}
        entering={FadeIn.duration(1000)}
      >
        <View
          style={[
            styles.description_container,
            {
              backgroundColor: currentTheme.card,
              shadowColor: currentTheme.text,
            },
          ]}
        >
          <View style={styles.description}>
            <Ionicons
              name="location-sharp"
              size={20}
              color={currentTheme.secondary}
            />
            <Text style={[styles.title, { color: currentTheme.text }]}>
              {destination.name}
            </Text>
          </View>
          <View style={styles.description}>
            <Ionicons
              name="locate-sharp"
              size={20}
              color={currentTheme.secondary}
            />
            <Text style={[styles.title, { color: currentTheme.text }]}>
              {destination.capital}
            </Text>
          </View>
          <View style={styles.description}>
            <Ionicons
              name="navigate-sharp"
              size={20}
              color={currentTheme.secondary}
            />
            <Text style={[styles.title, { color: currentTheme.text }]}>
              {destination.region}
            </Text>
          </View>
        </View>
      </Animated.View>
    </>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 8,
  },
  description_container: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    margin: 10,
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
});
