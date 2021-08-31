// Librairies
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../constants/Colors";

// Navigator
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Ecrans
import HomeScreen from "../screens/Home";
import ParametresScreen from "../screens/Parametres";
import ScoresScreen from "../screens/Scores";

// AppTabNavigator
const TabNavigator = createBottomTabNavigator();

export const AppTabNavigator = () => {
  return (
    <TabNavigator.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "TabHome") {
            iconName = focused ? "game-controller" : "game-controller-outline";
          } else if (route.name === "TabScores") {
            iconName = focused ? "beer" : "beer-outline";
          } else if (route.name === "TabParametres") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: Colors.primary,
        headerShown: false, // retirer le header de la tab
      })}
    >
      <TabNavigator.Screen
        name="TabHome"
        component={HomeScreen}
        options={{ title: "Jouer" }}
      />
      <TabNavigator.Screen
        name="TabScores"
        component={ScoresScreen}
        options={{ title: "Historique" }}
      />
      <TabNavigator.Screen
        name="TabParametres"
        component={ParametresScreen}
        options={{ title: "Paramètres" }}
      />
    </TabNavigator.Navigator>
  );
};
