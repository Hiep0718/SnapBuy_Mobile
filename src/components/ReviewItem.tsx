import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface ReviewItemProps {
    name: string;
    date: string;
    comment: string;
    avatar: string;
}

export const ReviewItem: React.FC<ReviewItemProps> = ({ name, date, comment, avatar }) => (
    <View style={styles.container}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
            <View style={styles.row}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
            <Text style={styles.comment}>{comment}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { flexDirection: "row", marginVertical: 10 },
    avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
    row: { flexDirection: "row", justifyContent: "space-between" },
    name: { fontWeight: "600" },
    date: { color: "gray", fontSize: 12 },
    comment: { color: "#333" },
});
