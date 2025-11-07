import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons"; // nếu đã cài icon lib
import { RatingStars } from "../RatingStars"; // hoặc file bạn đang dùng

type ProductReviewsProps = {
    onNavigateReviews?: () => void;
};

export default function ProductReviews({ onNavigateReviews }: ProductReviewsProps) {
    const reviews = [
        { id: 1, name: "Lina M.", date: "2 days ago", comment: "Áo đẹp, chất vải tốt!" },
        { id: 2, name: "Thomas D.", date: "5 days ago", comment: "Form chuẩn, giao hàng nhanh." },
    ];

    return (
        <View style={styles.section}>
            {/* Tiêu đề + mũi tên */}
            <View style={styles.header}>
                <Text style={styles.title}>Reviews</Text>
                <TouchableOpacity style={styles.linkButton} onPress={() => onNavigateReviews?.()}>
                    <Text style={styles.linkText}>See all </Text>
                    {/* Nếu có icon lib thì dùng: <Icon name="chevron-forward" size={18} color="#00BFFF" /> */}
                    <Text style={{ color: "#00BFFF", fontSize: 16 }}>➜</Text>
                </TouchableOpacity>
            </View>

            {/* Hiển thị điểm trung bình */}
            <RatingStars rating={4.5} total={112} />

            {/* Danh sách đánh giá giả */}
            {reviews.map((r) => (
                <View key={r.id} style={styles.reviewBox}>
                    <Text style={styles.name}>{r.name}</Text>
                    <Text style={styles.comment}>{r.comment}</Text>
                    <Text style={styles.date}>{r.date}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        marginTop: 24,
        borderTopWidth: 1,
        borderColor: "#eee",
        paddingTop: 12,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
    },
    linkButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    linkText: {
        color: "#00BFFF",
        fontWeight: "500",
    },
    reviewBox: {
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        padding: 10,
        marginTop: 10,
    },
    name: {
        fontWeight: "600",
        marginBottom: 2,
    },
    comment: {
        color: "#555",
    },
    date: {
        fontSize: 12,
        color: "#999",
        marginTop: 4,
    },
});
