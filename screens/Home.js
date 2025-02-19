import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setDestinations } from "../redux/destinationSlice";
import Card from "../components/Card";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../context/ThemeContext";
import { lightTheme, darkTheme } from "../theme/colors";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const destinations = useSelector((state) => state.destinations);
  const { theme } = useContext(ThemeContext);
  const currentTheme = theme === "light" ? lightTheme : darkTheme;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AsyncStorage.clear();
    const fetchDestinations = async () => {
      try {
        // First, try loading from AsyncStorage
        const storedDestinations = await AsyncStorage.getItem("destinations");

        if (storedDestinations) {
          // If we have stored destinations, use them
          dispatch(setDestinations(JSON.parse(storedDestinations)));
          setLoading(false);
        } else {
          // If no stored data, fetch from API
          const response = await axios.get(
            "https://restcountries.com/v3.1/all"
          );

          // Extract relevant data
          const data = response.data.map((country) => ({
            name: country.name.common,
            capital: country.capital ? country.capital[0] : "N/A",
            region: country.region,
            image: country.flags.png,
          }));

          data.sort((a, b) => b - a);

          // Update Redux state
          dispatch(setDestinations(data));

          // Save the fetched data to AsyncStorage
          await AsyncStorage.setItem("destinations", JSON.stringify(data));

          // Set loading to false after fetch is complete
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching or loading destinations: ", error);
        setError("Failed to load destinations.");
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [dispatch, navigation]);

  const renderItem = ({ item }) => (
    <Card
      destination={item}
      onPress={() => navigation.navigate("Details", { destination: item })}
    />
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={[styles.errorText, { color: currentTheme.error }]}>
          {error}
        </Text>
      ) : (
        <FlatList
          data={destinations}
          keyExtractor={(item) => item.name}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
  },
});
