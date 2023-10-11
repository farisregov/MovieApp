// AppNavigation.js
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import HomeScreen from "../screens/HomeScreen";
import MovieScreen from "../screens/MovieScreen";
import PersonScreen from "../screens/PersonScreen";
import SearchScreen from "../screens/SearchScreen";

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Login" options={{ headerShown: false, animationEnabled: true }} component={LoginScreen} /> */}

        <Stack.Screen name="Home" options={{ headerShown: false, animationEnabled: true }} component={HomeScreen} />
        <Stack.Screen name="Movie" options={{ headerShown: false, animationEnabled: true }} component={MovieScreen} />
        <Stack.Screen name="Person" options={{ headerShown: false, animationEnabled: true }} component={PersonScreen} />
        <Stack.Screen name="Search" options={{ headerShown: false, animationEnabled: true }} component={SearchScreen} />
      </Stack.Navigator>
      {/* <DrawerNavigation /> */}
    </NavigationContainer>
  );
};

export default AppNavigation;
