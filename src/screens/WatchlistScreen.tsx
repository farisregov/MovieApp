import React, { useState } from "react";
import { Platform, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";

import Loading from "../components/loading";

const ios = Platform.OS === "ios";

const WatchlistScreen = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <SafeAreaView style={{ marginBottom: ios ? -2 : 3 }}>
        <StatusBar barStyle="light-content" />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 4,
          }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>

          <Text style={{ color: "white", fontWeight: "bold", fontSize: 36 }}>
            <Text style={{ color: "yellow" }}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color={"white"} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <Text style={{ color: "white", fontSize: 30 }}>WatchList</Text> // Pass the entire trending object
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default WatchlistScreen;
