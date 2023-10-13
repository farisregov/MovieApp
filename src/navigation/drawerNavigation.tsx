import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { Fragment } from "react";
import { Platform } from "react-native";

import { DrawerContent } from "../components/DrawerContent";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import MovieScreen from "../screens/MovieScreen";
import PersonScreen from "../screens/PersonScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import WatchlistScreen from "../screens/WatchlistScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigation: React.FC = () => {
  // const drawerIcon = ({ focused, size }, name) => {
  //   return <Icon name={name} size={size} color={focused ? "#fff" : "#eee"} />;
  // };
  const defaultOptions = {
    headerShown: false,
    drawerActiveBackgroundColor: "transparent",
    drawerInactiveBackgroundColor: "transparent",
    drawerActiveTintColor: "#fff",
    drawerInactiveTintColor: "#eee",
    drawerHideStatusBarOnOpen: Platform.OS === "ios" ? true : false,
    overlayColor: "transparent",
  };
  return (
    <Fragment>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        {/* Define your screens here */}
        {/* For example: */}
        <Drawer.Screen name="Home" component={HomeScreen} options={{ ...defaultOptions }} />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ ...defaultOptions }} />
        <Drawer.Screen name="Watchlist" component={WatchlistScreen} options={{ ...defaultOptions }} />
        <Drawer.Screen name="Login" component={LoginScreen} options={{ ...defaultOptions }} />

        <Drawer.Screen name="Movie" options={{ headerShown: false }} component={MovieScreen} />
        <Drawer.Screen name="Person" options={{ headerShown: false }} component={PersonScreen} />
        <Drawer.Screen name="Search" options={{ headerShown: false }} component={SearchScreen} />
      </Drawer.Navigator>
    </Fragment>
  );
};

export default DrawerNavigation;
