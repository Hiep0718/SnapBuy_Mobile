import React from "react";
import { View, Text } from "react-native";

interface Props {
    rating: number;
    total?: number;
}

export const RatingStars: React.FC<Props> = ({ rating, total }) => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>⭐ {rating}</Text>
        {total ? <Text style={{ color: "gray" }}> ({total} reviews)</Text> : null}
    </View>
);
