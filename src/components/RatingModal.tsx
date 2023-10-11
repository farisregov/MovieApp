import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import StarRating from "react-native-star-rating";

const RatingModal = ({ isVisible, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0); // State to store the rating value

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        onClose(); // Close the modal when the back button is pressed
      }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
        <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, width: 300, alignItems: "center" }}>
          <Text style={{ fontSize: 18, marginBottom: 20 }}>Give Rating</Text>
          {/* Star Rating component */}
          <StarRating
            disabled={false}
            maxStars={10}
            rating={rating}
            selectedStar={(rating) => setRating(rating)}
            fullStarColor={"gold"}
            starSize={40}
          />
          <TouchableOpacity
            style={{ marginTop: 20, paddingVertical: 10, paddingHorizontal: 30, backgroundColor: "blue", borderRadius: 5 }}
            onPress={() => {
              onSubmit(rating); // Pass the rating value to the onSubmit function
              onClose(); // Close the modal after submission
            }}>
            <Text style={{ color: "white" }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default RatingModal;
