import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Star } from "lucide-react-native";

export interface Review {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
}

interface Props {
    item: Review;
}

const ReviewItem: React.FC<Props> = ({ item }) => {
    const renderStars = (rating: number) => (
        <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    size={16}
                    color={i <= rating ? "#FFD700" : "#DADADA"}
                    fill={i <= rating ? "#FFD700" : "none"}
                />
            ))}
        </View>
    );

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.name}>{item.name}</Text>
                    {renderStars(item.rating)}
                </View>
                <Text style={styles.date}>{item.date}</Text>
            </View>

            <Text style={styles.comment}>{item.comment}</Text>
        </View>
    );
};

export default ReviewItem;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    starContainer: {
        flexDirection: "row",
        marginTop: 4,
    },
    date: {
        fontSize: 12,
        color: "#9CA3AF",
    },
    comment: {
        fontSize: 14,
        color: "#4B5563",
        lineHeight: 20,
    },
});
