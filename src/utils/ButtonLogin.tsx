import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon } from "react-native-heroicons/outline";

const ButtonLogin = ({ isLoggedIn, onLogout, onLogin }) => {
  const navigation: any = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
      <View>{isLoggedIn ? <ArrowLeftOnRectangleIcon size={30} /> : <ArrowRightOnRectangleIcon size={30} />}</View>
    </TouchableOpacity>
  );
};

export default ButtonLogin;
