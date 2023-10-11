import React from "react";
import { Dimensions, View } from "react-native";
import * as Progress from "react-native-progress";

const { height, width } = Dimensions.get("window");

const Loading = () => {
  return (
    <View style={{ position: "absolute", flexDirection: "row", justifyContent: "center", alignItems: "center", width, height }}>
      <Progress.CircleSnail thickness={12} size={160} color={"yellow"} />
    </View>
  );
};

export default Loading;
