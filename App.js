// Librairie
import React from "react";

// composant
import AppNavigator from "./navigation/AppNavigator";

// Redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import gameReducer from "./store/reducers/games";

const store = createStore(gameReducer);

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
