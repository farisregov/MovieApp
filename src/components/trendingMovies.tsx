import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

import { Movie, MovieCardProps, TrendingMoviesProps } from "../utils/types";

const { width, height } = Dimensions.get("window");

const MovieCard: React.FC<MovieCardProps> = ({ item, onPress }) => {
  const truncatedTitle = item.title.length > 14 ? item.title.slice(0, 14) + "..." : item.title;

  return (
    <TouchableWithoutFeedback onPress={() => onPress(item)}>
      <View
        style={{
          marginRight: 10,
          marginBottom: 10,
          borderRadius: 10,
          overflow: "hidden",
        }}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          style={{ width: width * 0.45, height: height * 0.4 }}
        />
        <Text
          style={{
            color: "white",
            fontSize: 16,
            textAlign: "center",
          }}>
          {truncatedTitle}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const TrendingMovies: React.FC<TrendingMoviesProps> = ({ data }) => {
  const trendingMovies = data?.results || [];
  const navigation: any = useNavigation();

  const handleMovieCardClick = (item: Movie) => {
    navigation.navigate("Movie", item);
  };

  return (
    <View style={{ marginBottom: 8 }}>
      <Text
        style={{
          color: "white",
          fontSize: 24,
          marginHorizontal: 4,
          marginBottom: 5,
        }}>
        Trending
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          alignItems: "flex-start",
        }}>
        {trendingMovies.map((item: Movie) => (
          <TouchableOpacity key={item.id}>
            <MovieCard item={item} onPress={handleMovieCardClick} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default TrendingMovies;
