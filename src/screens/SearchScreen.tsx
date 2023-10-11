import { useNavigation } from "@react-navigation/native";
import { debounce } from "lodash";
import React, { useCallback, useState } from "react";
import { Dimensions, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { ScrollView, TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { XMarkIcon } from "react-native-heroicons/outline";

import Loading from "../components/loading";
import { apiKey } from "../constants/constant";
import { Movie, MoviesResponse } from "../utils/types";

const { height, width } = Dimensions.get("window");

const SearchScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Movie[] | null>(null);
  const [search, setSearch] = useState<MoviesResponse | null>(null);

  const movieName = "The ant-man and the wasp";

  const searchMovies = async (params) => {
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&query=${params}&language=en-US`, options);
      const data = await response.json();
      console.log("got data", data);
      setSearch(data);
      return data;
    } catch (error) {
      console.error(error);
      return {};
    }
  };

  const handleSearch = (search: string) => {
    if (search && search.length > 2) {
      setLoading(true);
      searchMovies(search).then((data: MoviesResponse) => {
        console.log("got search results", data.results);
        setLoading(false);

        if (data && data.results) {
          setResults(data.results);
        }
      });
    } else {
      setLoading(false);
      setResults(null);
    }
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <View
        style={{
          marginHorizontal: 14,
          marginBottom: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#262626",
          borderWidth: 1,
          borderColor: "#737373",
          borderRadius: 20,
          marginTop: 15,
        }}>
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          style={{
            paddingBottom: 4,
            paddingLeft: 24,
            flex: 1,
            fontSize: 16,
            fontWeight: "500",
            letterSpacing: 1,
            color: "white",
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
          style={{ padding: 10, backgroundColor: "gray", borderRadius: 30, margin: 1 }}>
          <XMarkIcon size="25" color="white" />
          {/* <Text>{item1}</Text> */}
          {/* <Text>{lo}</Text> */}
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loading />
      ) : results?.length && results.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }} style={{ marginTop: 3 }}>
          <Text style={{ color: "white", fontWeight: "500", marginLeft: 4 }}>{`Results (${results?.length})`}</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>
            {results?.map((item: Movie, index) => {
              return (
                <TouchableWithoutFeedback key={index} onPress={() => navigation.push("Movie", item)}>
                  <View style={{ marginVertical: 5, marginBottom: 16 }}>
                    <Image
                      style={{ borderRadius: 10, width: width * 0.44, height: height * 0.3 }}
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                      }}
                    />
                    <Text style={{ color: "white", marginLeft: 4 }}>
                      {item.title.length > 20 ? item.title.slice(0, 20) + "..." : item.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image source={require("../assets/images/movieTime.png")} style={{ height: 400, width: 400 }} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
