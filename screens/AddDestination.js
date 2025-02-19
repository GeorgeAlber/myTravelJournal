import React, { useState, useContext } from "react";
import { View, TextInput, StyleSheet, Text, ScrollView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setDestinations } from "../redux/destinationSlice";
import ImagePicker from "../components/ImagePicker";
import Button from "../components/ui/Button";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../context/ThemeContext";
import { lightTheme, darkTheme } from "../theme/colors";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  capital: Yup.string().required("Capital is required"),
  region: Yup.string().required("Region is required"),
  image: Yup.string().required("Image is required"),
});

const AddDestination = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const currentTheme = theme === "light" ? lightTheme : darkTheme;
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleAddDestination = async (values) => {
    const newDestination = {
      name: values.name,
      capital: values.capital,
      region: values.region,
      image: values.image,
    };

    try {
      // Retrieve existing destinations from AsyncStorage
      const storedDestinations = await AsyncStorage.getItem("destinations");
      let destinations = storedDestinations
        ? JSON.parse(storedDestinations)
        : [];

      // Add the new destination to the array
      destinations = [...destinations, newDestination];

      // Save updated destinations back to AsyncStorage
      await AsyncStorage.setItem("destinations", JSON.stringify(destinations));

      // Update Redux state with the new destinations list
      dispatch(setDestinations(destinations));

      // Navigate back to the home screen
      navigation.goBack();
    } catch (error) {
      console.error("Error adding destination:", error);
      setError("Failed to add destination.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
          name: "",
          capital: "",
          region: "",
          image: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleAddDestination}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <View style={styles.titleContainer}>
              <Ionicons
                style={[styles.titleIcon, { color: currentTheme.secondary }]}
                name="airplane"
                size={50}
              />
              <Text style={[styles.title, { color: currentTheme.text }]}>
                New Destination
              </Text>
            </View>
            <Text style={[styles.label, { color: currentTheme.primary }]}>
              Country:
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: currentTheme.secondary,
                  color: currentTheme.text,
                },
              ]}
              placeholder="Name"
              placeholderTextColor={currentTheme.text}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            {errors.name && (
              <Text style={[styles.error, { color: currentTheme.error }]}>
                {errors.name}
              </Text>
            )}

            <Text style={[styles.label, { color: currentTheme.primary }]}>
              Capital:
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: currentTheme.secondary,
                  color: currentTheme.text,
                },
              ]}
              placeholder="Capital"
              placeholderTextColor={currentTheme.text}
              onChangeText={handleChange("capital")}
              onBlur={handleBlur("capital")}
              value={values.capital}
            />
            {errors.capital && (
              <Text style={[styles.error, { color: currentTheme.error }]}>
                {errors.capital}
              </Text>
            )}
            <Text style={[styles.label, { color: currentTheme.primary }]}>
              Region:
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: currentTheme.secondary,
                  color: currentTheme.text,
                },
              ]}
              placeholder="Region"
              placeholderTextColor={currentTheme.text}
              onChangeText={handleChange("region")}
              onBlur={handleBlur("region")}
              value={values.region}
            />
            {errors.region && (
              <Text style={[styles.error, { color: currentTheme.error }]}>
                {errors.region}
              </Text>
            )}
            {errors.image && (
              <Text style={[styles.error, { color: currentTheme.error }]}>
                {errors.image}
              </Text>
            )}
            <ImagePicker onChangeImage={handleChange("image")} />
            <Button icon="chevron-back-circle-sharp" onPress={handleSubmit}>
              Add Destination
            </Button>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default AddDestination;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  titleIcon: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    marginVertical: 8,
    padding: 8,
    borderRadius: 8,
    fontSize: 16,
  },
  error: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 8,
  },
});
