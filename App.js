import React, { useContext, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import StackNavigator from "./screens/StackNavigator";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider>
          <StackNavigator />
        </ThemeProvider>
      </Provider>
    </>
  );
}
