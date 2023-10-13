import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";

import { apiKey } from "../constants/constant";

const LoginScreen = ({ navigation }) => {
  // const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const requestTokenResponse = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGQ5MmMyNjUyMjQwN2UyZWJkZDFkM2YzZWIyYWFjNCIsInN1YiI6IjY1MTJkNTE1MjZkYWMxMDEyZDVjZDk2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PL6TXXJWfTQ4Dy7LjoezIQ2cW3HdzmSbYQXObtbTOMY", // Replace with your TMDb API key
      },
    });

    if (requestTokenResponse.ok) {
      const requestTokenData = await requestTokenResponse.json();
      console.log("requestTokenResponse: ", requestTokenResponse);

      // Now you have the request token, validate it with the user's credentials
      const validateTokenResponse = await fetch(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          request_token: requestTokenData.request_token,
        }),
      });

      if (validateTokenResponse.ok) {
        const validateTokenData = await validateTokenResponse.json();
        console.log("Authentication successful:", validateTokenData);
        navigation.navigate("Dashboard");
      } else {
        console.error("Authentication failed", validateTokenResponse.status);
        navigation.navigate("Dashboard");
      }
    } else {
      console.error("Error obtaining request token");
    }
  };

  const handleDummyLogin = () => {
    navigation.navigate("Dashboard");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
        style={{ marginBottom: 10, padding: 10, borderWidth: 1, width: 200 }}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        style={{ marginBottom: 10, padding: 10, borderWidth: 1, width: 200 }}
      />
      <Button title="Login" onPress={handleDummyLogin} />
    </View>
  );
};

export default LoginScreen;
