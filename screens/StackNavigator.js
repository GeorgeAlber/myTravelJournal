import React, { useContext } from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Details from "./Details";
import AddDestination from "./AddDestination";
import IconButton from "../components/ui/IconButton";
import { lightTheme, darkTheme } from "../theme/colors";
import { ThemeContext } from "../context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import Button from "../components/ui/Button";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <NavigationContainer theme={theme === "light" ? DefaultTheme : DarkTheme}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: currentTheme.background,
            },
            headerTintColor: currentTheme.text,
            contentStyle: { backgroundColor: currentTheme.background },
          }}
          initialRouteName="Countries"
        >
          <Stack.Screen
            name="Countries"
            component={Home}
            options={({ navigation }) => ({
              title: "All Destinations",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddDestination")}
                />
              ),
            })}
          />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen
            name="AddDestination"
            component={AddDestination}
            options={{
              title: "Add a new Destination",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Button onPress={toggleTheme}>Change Theme</Button>
    </>
  );
};

export default StackNavigator;
