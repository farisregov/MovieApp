import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { MovieCastProps } from "../utils/types";

const Cast: React.FC<MovieCastProps> = ({ cast, navigation }) => {
  const personName = "Keanu Reaves";
  const characterName = "John Wick";
  return (
    <View style={{ marginVertical: 6 }}>
      <Text
        style={{
          color: "white",
          fontSize: 18,
          marginHorizontal: 4,
          marginBottom: 10,
        }}>
        Top Cast
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
        {cast &&
          cast.map((person, index: number) => {
            return (
              <TouchableOpacity
                key={person.id}
                style={{ marginRight: 4, alignItems: "center" }}
                onPress={() => navigation.navigate("Person", person)}>
                <View
                  style={{
                    overflow: "hidden",
                    borderRadius: 40,
                    height: 80,
                    width: 80,
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: "gray",
                    borderWidth: 1,
                  }}>
                  <Image
                    style={{ borderRadius: 40, height: 80, width: 80 }}
                    //   source={require("../assets/images/moviePoster1.png")}
                    source={{ uri: `https://image.tmdb.org/t/p/w185${person?.profile_path}` }}
                  />
                </View>

                <Text style={{ color: "white", marginTop: 1, fontSize: 12 }}>
                  {person?.character.length > 10 ? person.character.slice(0, 10) + "..." : person?.character}
                </Text>
                <Text style={{ color: "#A0AEC0", marginTop: 1, fontSize: 12 }}>
                  {person?.original_name.length > 10 ? person.original_name.slice(0, 10) + "..." : person?.original_name}{" "}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};
export default Cast;
