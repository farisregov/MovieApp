import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ChevronLeftIcon, HeartIcon, StarIcon } from "react-native-heroicons/outline";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import Cast from "../components/cast";
import Loading from "../components/loading";
import MovieList from "../components/MovieList";
import ReviewList from "../components/review";
import { apiKey } from "../constants/constant";
import { Movie, MovieDetails, MoviesResponse, ReviewResponse } from "../utils/types";

const { width, height } = Dimensions.get("window");
const MovieScreen = ({ navigation }) => {
  const { params: item } = (useRoute() as { params: MovieDetails }) || {};
  const [loading, setLoading] = useState(true);
  const [isFavorite, toggleFavorite] = useState(false);
  const [cast, setCast] = useState(null);
  const [review, setReview] = useState<ReviewResponse | null>(null);

  const [similarMovies, setSimilarMovies] = useState<MoviesResponse | null>(null);
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  // const navigation = useNavigation();

  const fetchMovieDetails = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${item.id}?language=en-US`, options);
      const data: Movie = await response.json();
      // console.log("movie details", data);
      console.log(item.id);

      setMovieDetails(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSimilarMovies = async () => {
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
        `https://api.themoviedb.org/3/movie/${item.id}/similar?api_key=${apiKey}&language=en-US&page=1`,
        options,
      );
      const data = await response.json();
      // console.log("this is similar", data);
      // console.log("this is similarresults", data.results);
      if (data.results) {
        setSimilarMovies(data);
      } else {
        setSimilarMovies(null);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const fetchCreditMovies = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };
    try {
      await fetch(`https://api.themoviedb.org/3/movie/${item.id}/credits?api_key=${apiKey}&language=en-US`, options)
        .then((res) => res.json())
        .then((data) => {
          if (data.cast) {
            setCast(data.cast);
          } else {
            setCast(null);
          }
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };
    try {
      await fetch(`https://api.themoviedb.org/3/movie/${item.id}/reviews?language=en-US&page=1`, options)
        .then((res) => res.json())
        .then((data) => {
          if (data.results) {
            setReview(data);
            console.log("review", data);
          } else {
            setReview(null);
          }
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
    fetchSimilarMovies();
    fetchCreditMovies();
    fetchReviews();
  }, [item]);

  if (!movieDetails) {
    return null;
  }
  // console.log("MovieDetails", movieDetails);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 20,
        flexGrow: 1,
        backgroundColor: "black",
      }}>
      <View style={{}}>
        <SafeAreaView
          style={{
            position: "absolute",
            zIndex: 10,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
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
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={{ width, height: height * 0.55 }} />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              style={{
                width,
                height: height * 0.4,
                position: "absolute",
                bottom: 0,
              }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </View>
        )}
      </View>
      <View style={{ marginTop: -(height * 0.13), marginVertical: 24 }}>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 24,
            letterSpacing: 1,
            fontWeight: "bold",
          }}>
          {item.title}
        </Text>

        <Text
          style={{
            color: "#A0AEC0",
            fontWeight: "bold",
            fontSize: 16,
            textAlign: "center",
          }}>
          {movieDetails?.status} • {movieDetails?.release_date?.split("-")[0] || "N/A"} • {movieDetails?.runtime} min
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginHorizontal: 4,
          }}>
          {movieDetails?.genres?.map((genre, index) => {
            let showDot = index + 1 != movieDetails.genres.length;
            return (
              <Text
                key={index}
                style={{
                  color: "#A0AEC0",
                  fontWeight: "600",
                  fontSize: 16,
                  textAlign: "center",
                  marginBottom: 5,
                }}>
                {genre?.name} {showDot ? "•" : null}
              </Text>
            );
          })}
        </View>
        <View
          style={{
            backgroundColor: "#f3d406",
            padding: 2,
            borderRadius: 5,
            marginRight: 10,
            flexDirection: "row",
            height: 20,
            width: 50,
            alignSelf: "center",
          }}>
          <StarIcon size={15} color={"black"} fill={"black"} />
          <Text>{` ${movieDetails.vote_average ? movieDetails.vote_average?.toFixed(1) : "null"}`}</Text>
        </View>

        <Text
          style={{
            color: "#A0AEC0",
            marginHorizontal: 4,
            letterSpacing: 1,
            textAlign: "left",
            marginTop: 5,
          }}>
          {item.overview}
        </Text>
      </View>

      {cast && <Cast navigation={navigation} cast={cast} />}
      {review && <ReviewList data={review} />}
      {similarMovies && <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />}
    </ScrollView>
  );
};

export default MovieScreen;
