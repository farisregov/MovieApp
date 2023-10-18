import { useNavigation } from "@react-navigation/native";
import React, { Fragment } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";

import { Movie, MoviesProps } from "../utils/types";

const { width, height } = Dimensions.get("window");

const MovieList: React.FC<MoviesProps> = ({ title, data, hideSeeAll }) => {
  const Movies = data?.results || data?.cast || [];
  const imageStyle = title === "Trending" ? { width: width * 0.45, height: height * 0.4 } : { width: width * 0.33, height: height * 0.22 };

  const navigation: any = useNavigation();

  return (
    <View style={{ marginBottom: 8, paddingVertical: 4 }}>
      <View
        style={{
          marginHorizontal: 4,
          marginBottom: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Text style={{ color: "white", fontSize: 24 }}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={{ color: "yellow" }}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
        {Movies.map((item: Movie) => {
          const truncatedTitle = item.title.length > 14 ? item.title.slice(0, 14) + "..." : item.title;
          return (
            <TouchableWithoutFeedback key={item.id} onPress={() => navigation.navigate("Movie", item)}>
              <View style={{ paddingVertical: 1, marginRight: 10 }}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                  style={[imageStyle, { borderRadius: 10 }]}
                />
                <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>{truncatedTitle}</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;
