import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/outline";

import Loading from "../components/loading";
import MovieList from "../components/MovieList";
import { apiKey } from "../constants/constant";
import { Cast, MoviesResponse } from "../utils/types";

const { width, height } = Dimensions.get("window");

const PersonScreen = () => {
  const { params: item } = (useRoute() as { params: Cast }) || {};
  const navigation = useNavigation();
  const [isFavorite, toggleFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState<Cast | null>(null);
  const [personMovies, setPersonMovies] = useState<MoviesResponse | null>(null);

  const getPersonDetails = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };
    try {
      const response = await fetch(`https://api.themoviedb.org/3/person/${item.id}?api_key=${apiKey}&language=en-US`, options);
      const data: Cast = await response.json();
      console.log("personDetails", data);

      if (data) {
        setPerson(data);
      } else {
        setPerson(null);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getPersonMovies = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/${item.id}/movie_credits?api_key=${apiKey}&language=en-US`,
        options,
      );
      const data: MoviesResponse = await response.json();
      console.log("personMovies", data);

      if (data) {
        setPersonMovies(data);
      } else {
        setPersonMovies(null);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    console.log("person", item.id);
    getPersonDetails();
    getPersonMovies();
  }, [item]);

  return (
    <ScrollView style={{ paddingBottom: 20, flex: 1, backgroundColor: "black" }}>
      <SafeAreaView
        style={{
          zIndex: 10,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 16,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ borderRadius: 10, padding: 2, backgroundColor: "#eab308" }}>
          <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)}>
          <HeartIcon size={35} fill={isFavorite ? "#eab308" : "white"} color={isFavorite ? "#eab308" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              shadowColor: "gray",
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }}>
            <View
              style={{
                alignItems: "center",
                overflow: "hidden",
                height: 250,
                width: 250,
                borderRadius: 125,
                borderColor: "gray",
                borderWidth: 2,
              }}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${person?.profile_path}` }}
                style={{ height: height * 0.43, width: width * 0.74 }}
              />
            </View>
          </View>
          <View style={{ marginTop: 18 }}>
            <Text style={{ color: "white", fontSize: 30, fontWeight: "bold", textAlign: "center" }}>{person?.name}</Text>
            <Text style={{ color: "gray", fontSize: 16, textAlign: "center" }}>{person?.place_of_birth}</Text>
          </View>
          <View
            style={{
              marginVertical: 12,
              marginTop: 20,
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#333333",
              padding: 14,
              borderRadius: 50,
              flexDirection: "row",
            }}>
            <View style={{ borderRightWidth: 2, borderColor: "#a3a3a3", paddingHorizontal: 8, alignItems: "center", paddingRight: 5 }}>
              <Text style={{ color: "white", fontWeight: "500" }}>Gender</Text>
              <Text style={{ color: "#d4d4d4", fontSize: 14 }}>{person?.gender == 1 ? "Female" : "Male"}</Text>
            </View>
            <View style={{ borderRightWidth: 2, borderColor: "#a3a3a3", paddingHorizontal: 8, alignItems: "center" }}>
              <Text style={{ color: "white", fontWeight: "500" }}>Birthday</Text>
              <Text style={{ color: "#d4d4d4", fontSize: 14 }}>{person?.birthday || "N/A"}</Text>
            </View>
            <View style={{ borderRightWidth: 2, borderColor: "#a3a3a3", paddingHorizontal: 8, alignItems: "center" }}>
              <Text style={{ color: "white", fontWeight: "500" }}>Known for</Text>
              <Text style={{ color: "#d4d4d4", fontSize: 14 }}>{person?.known_for_department}</Text>
            </View>
            <View style={{ paddingHorizontal: 8, alignItems: "center" }}>
              <Text style={{ color: "white", fontWeight: "500" }}>Popularity</Text>
              <Text style={{ color: "#d4d4d4", fontSize: 14 }}>{`${person?.popularity?.toFixed(2)} %`}</Text>
            </View>
          </View>
          <View style={{ marginVertical: 24, marginHorizontal: 8, marginTop: 8 }}>
            <Text style={{ color: "white", fontSize: 18 }}>Biography</Text>
            <Text style={{ color: "#a3a3a3", letterSpacing: 1 }}>{person?.biography || "N/A"}</Text>
          </View>
          {personMovies && <MovieList title="Movies" hideSeeAll={true} data={personMovies} />}
        </View>
      )}
    </ScrollView>
  );
};

export default PersonScreen;
