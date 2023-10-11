import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { StarIcon } from "react-native-heroicons/outline";

import { fallbackPersonImage } from "../constants/constant";
import { Review, ReviewProps } from "../utils/types";
import RatingModal from "./RatingModal";

const { width, height } = Dimensions.get("window");

const ReviewList: React.FC<ReviewProps> = ({ data }) => {
  const review = data?.results;
  const navigation: any = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [selectedRating, setSelectedRating] = useState(0); // State to store selected rating

  const toggleModal = () => {
    // setSelectedRating(review); // Set the selected review for rating
    setModalVisible(!isModalVisible);
  };

  const handleRatingSubmit = (rating) => {
    // Handle the submitted rating (e.g., send it to the server)
    console.log("User rating submitted:", rating);
    toggleModal();
  };

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
        <Text style={{ color: "white", fontSize: 24 }}>Review</Text>
        <View style={{ backgroundColor: "yellow", padding: 7, marginTop: 10, borderRadius: 10 }}>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={{ color: "black", fontWeight: "500" }}>Add Rating</Text>
          </TouchableOpacity>
        </View>
      </View>
      {review?.length && review.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
          {review &&
            review.map((item: Review) => {
              return (
                <TouchableWithoutFeedback
                  key={item.id}
                  style={{
                    margin: 10,
                    padding: 10,
                    backgroundColor: "white",
                    borderRadius: 5,
                    shadowColor: "gray",
                    shadowOffset: { width: 5, height: 5 },
                    shadowOpacity: 0.6,
                    shadowRadius: 3.84,
                    elevation: 5,
                    flexDirection: "column",
                    height: height * 0.22,
                    width: width * 0.9,
                  }}>
                  <View style={{ flexDirection: "row", backgroundColor: "#d9d5d4", borderRadius: 10 }}>
                    <View style={{ marginRight: 10 }}>
                      <Image
                        source={{
                          uri: item?.author_details.avatar_path
                            ? `https://image.tmdb.org/t/p/w500${item?.author_details.avatar_path}`
                            : fallbackPersonImage,
                        }}
                        style={{
                          width: 45,
                          height: 45,
                          borderRadius: 22.5,
                        }}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        {item.author_details.name ? item.author_details.name : "Anonymous"}
                      </Text>
                      {/* <Text>A review by {item.author_details.name ? item.author_details.name : "Anonymous"}</Text> */}
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ backgroundColor: "#f3d406", padding: 2, borderRadius: 5, marginRight: 10, flexDirection: "row" }}>
                          <StarIcon size={15} color={"black"} fill={"black"} />
                          <Text>{` ${item.author_details.rating ? item.author_details.rating?.toFixed(1) : "null"}`}</Text>
                        </View>
                        <Text>{`written at ${item.created_at.slice(0, 10)}`}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <Text>{item.content.length > 200 ? item.content.slice(0, 185) + "..." : item.content}</Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
        </ScrollView>
      ) : (
        <View
          style={{
            margin: 10,
            padding: 10,
            backgroundColor: "white",
            borderRadius: 5,
            shadowColor: "pink",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            flexDirection: "column",
            height: height * 0.22,
            width: width * 0.9,
          }}>
          <Image source={require("../assets/images/movieTime.png")} style={{ height: 100, width: 100, alignSelf: "center" }} />
          <Text style={{ color: "black", textAlign: "center", fontSize: 15, fontWeight: "500" }}>
            This movie doesnt have any review yet
          </Text>
        </View>
      )}
      <RatingModal isVisible={isModalVisible} onClose={toggleModal} onSubmit={handleRatingSubmit} />
    </View>
  );
};

export default ReviewList;
