import { DrawerContentScrollView } from "@react-navigation/drawer";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { HeartIcon, HomeIcon, UserIcon } from "react-native-heroicons/outline";

import ButtonLogin from "../utils/ButtonLogin";

const DrawerContent = ({ navigation }) => {
  // Get user information (You can get it from Redux, context, etc.)
  const user = "Faris"; // Replace this with actual user data

  const menuItems = [
    { title: "Home", screen: "Home", icon: <HomeIcon size={30} color={"#fff"} /> },
    { title: "Profile", screen: "Profile", icon: <UserIcon size={30} color={"#fff"} /> },
    { title: "Watchlist", screen: "Watchlist", icon: <HeartIcon size={30} color={"#fff"} /> },
  ];

  return (
    <DrawerContentScrollView contentContainerStyle={{ flex: 1, backgroundColor: "#0a0a0a" }}>
      <View style={{ paddingVertical: 20, paddingEnd: 20, paddingStart: 10 }}>
        {/* User Info */}
        <View
          style={{
            marginBottom: 20,
            backgroundColor: "#292928",
            padding: 10,
            borderRadius: 10,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}>
          <UserIcon size={30} color={"#fff"} />

          <Text style={{ fontSize: 18, color: "white", fontWeight: "bold", marginLeft: 5 }}>Hi, {user}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}>
            <ButtonLogin isLoggedIn={false} onLogout={true} onLogin={true} />
          </TouchableOpacity>
        </View>
        {/* Menu Items */}
        <View style={{ borderRadius: 10, backgroundColor: "#292928" }}>
          {menuItems.map((item, index) => (
            <View style={{ borderColor: "#0a0a0a", borderBottomWidth: 1 }}>
              <TouchableOpacity
                key={item.title}
                style={{ marginVertical: 20, marginLeft: 15 }}
                onPress={() => {
                  navigation.navigate(item.screen);
                }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {item.icon}
                  <Text style={{ fontSize: 20, color: "white", marginLeft: 10, fontWeight: "bold", letterSpacing: 1 }}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export { DrawerContent };
