import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
    rating: number;
    total?: number;
    setRating?: React.Dispatch<React.SetStateAction<number>>; // tùy chọn: có thì cho chọn sao
    size?: number; // cho phép chỉnh kích thước
}

export const RatingStars: React.FC<Props> = ({ rating, total, setRating, size = 28 }) => {
    const stars = [1, 2, 3, 4, 5];

    return (
        <View style={styles.row}>
            {stars.map((star) => (
                <TouchableOpacity
                    key={star}
                    disabled={!setRating} // nếu không có setRating thì không cho bấm
                    onPress={() => setRating && setRating(star)}
                    activeOpacity={0.7}
                >
                    <Text
                        style={[
                            styles.star,
                            { fontSize: size },
                            star <= rating ? styles.selected : styles.unselected,
                        ]}
                    >
                        ★
                    </Text>
                </TouchableOpacity>
            ))}

            {/* Hiển thị tổng số lượt đánh giá (nếu có) */}
            {total ? <Text style={styles.total}> ({total} reviews)</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    star: {
        marginHorizontal: 2,
    },
    selected: {
        color: "#f5c518",
    },
    unselected: {
        color: "#ccc",
    },
    total: {
        color: "gray",
        marginLeft: 4,
    },
});
