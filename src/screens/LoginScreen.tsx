import React, { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";

import { createSessionId, getAccountId, getSessionToken, validateLogin } from "../auth/auth";

const LoginScreen = ({ navigation }) => {
  // const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (username !== "" && password !== "") {
      const token = await getSessionToken();
      const validatedToken = await validateLogin(token, username, password);
      const validatedSessionId = await createSessionId(validatedToken);
      const accountId = await getAccountId(validatedSessionId);

      // save to context
      // await handleUpdateSessionIdAccountId(validatedSessionId, accountId);
      setUsername("");
      setPassword("");
      // setShowPassword(true);
      navigation.navigate("Dashboard");
    } else {
      Alert.alert("Invalid credentials");
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
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
