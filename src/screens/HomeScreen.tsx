import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Platform, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";

import Loading from "../components/loading";
import MovieList from "../components/MovieList";
import TrendingMovies from "../components/trendingMovies";
import { apiKey } from "../constants/constant";
import { MoviesResponse } from "../utils/types";

const ios = Platform.OS === "ios";

const HomeScreen: React.FC = () => {
  const [trending, setTrending] = useState<MoviesResponse | null>(null); // Use the correct type
  const [loading, setLoading] = useState<boolean>(true);
  const [upcoming, setUpcoming] = useState<MoviesResponse | null>(null); // Use the correct type
  const [topRated, setTopRated] = useState<MoviesResponse | null>(null); // Use the correct type
  const navigation: any = useNavigation();

  const handleSetData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    try {
      const response = await fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US", options);
      const dataTrending: MoviesResponse = await response.json();

      const responseUpcoming = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`, options);
      const dataUpcoming: MoviesResponse = await responseUpcoming.json();

      const responseTopRated = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options);
      const dataTopRated: MoviesResponse = await responseTopRated.json();

      if (dataTrending && dataUpcoming && dataTopRated) {
        setTrending(dataTrending);
        setUpcoming(dataUpcoming);
        setTopRated(dataTopRated);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // const newItem = {
  //   item1: {
  //     lo: "asd",
  //     los: "asd",
  //   },
  //   kill: "po",
  //   item2: "sad",
  //   item3: "sad",
  //   item4: "sad",
  // };

  // const newArr = [{ item1: "opppppp", item4: "asd" }, { item2: "paid" }];

  // const { item1, item2, kill } = newItem;
  // const { lo } = item1;

  // const [firstObj, secondObj] = newArr; //DESTRUCTURING ARRAY
  // firstObj.item1;
  // console.log("firstObj.item2", firstObj.item4);

  useEffect(() => {
    if (trending === null && upcoming === null && topRated === null) {
      handleSetData();
    }
  }, [trending, upcoming, topRated]);

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
            trending && <TrendingMovies data={trending} /> // Pass the entire trending object
          )}
          {/* <Text style={{ color: "white" }}>{item1.lo}</Text>
          <Text style={{ color: "white" }}>{lo}</Text>
          <Text style={{ color: "white" }}>{firstObj.item1}</Text>
          <Text style={{ color: "white" }}>{firstObj.item2}</Text> */}
          <MovieList title="Upcoming" data={upcoming} />
          <MovieList title="Top Rated" data={topRated} />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
