import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { ProductCard } from "../components/ProductCard";
import { RatingStars } from "../components/RatingStars";
import { ReviewItem } from "../components/ReviewItem";

export const ProductDetailScreen: React.FC = () => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Ảnh sản phẩm */}
            <Image
                source={{ uri: "https://images.unsplash.com/photo-1518444027026-7ec5d140974f" }}
                style={styles.image}
            />

            {/* Giá + Đánh giá */}
            <View style={styles.rowBetween}>
                <Text style={styles.price}>$59</Text>
                <RatingStars rating={4.5} total={99} />
            </View>

            {/* Mô tả */}
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
                Quis occaecat magna elit magna do nisi ipsum amet excepteur tempor nisi exercitation qui...
            </Text>

            {/* Icon tiện ích */}
            <View style={styles.features}>
                <Text>🚚 Express</Text>
                <Text>↩️ 30-day free return</Text>
                <Text>⭐ Good review</Text>
                <Text>🏬 Authorized shop</Text>
            </View>

            {/* Reviews */}
            <View style={styles.section}>
                <View style={styles.rowBetween}>
                    <Text style={styles.sectionTitle}>Reviews</Text>
                    <Text style={styles.link}>See all</Text>
                </View>

                <RatingStars rating={4.5} total={99} />
                <ReviewItem
                    name="Jevon Raynor"
                    date="1 day ago"
                    comment="Deserunt minim incididunt cillum"
                    avatar="https://randomuser.me/api/portraits/men/10.jpg"
                />
                <ReviewItem
                    name="Jason D."
                    date="3 days ago"
                    comment="Magna pariatur sit et ullamco paria"
                    avatar="https://randomuser.me/api/portraits/men/11.jpg"
                />
            </View>

            {/* Sản phẩm liên quan */}
            <View style={styles.section}>
                <View style={styles.rowBetween}>
                    <Text style={styles.sectionTitle}>Relevant products</Text>
                    <Text style={styles.link}>See all</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <ProductCard
                        name="Headphone"
                        price={99}
                        rating={4.5}
                        image="https://images.unsplash.com/photo-1518444027026-7ec5d140974f"
                    />
                    <ProductCard
                        name="Headphone"
                        price={99}
                        rating={4.5}
                        image="https://images.unsplash.com/photo-1580894732444-8ecded7900cf"
                    />
                    <ProductCard
                        name="Headphone"
                        price={99}
                        rating={4.5}
                        image="https://images.unsplash.com/photo-1606813902775-9aabb9c1c5f0"
                    />
                </ScrollView>
            </View>

            {/* Thông báo khuyến mãi */}
            <View style={styles.switchBox}>
                <Text>🔔 Notify me of promotions</Text>
                <Switch />
            </View>

            {/* Nút mua hàng */}
            <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyText}>Buy Now</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16
    },
    image: {
        width: "100%",
        height: 220,
        borderRadius: 12
    },
    price: {
        fontSize: 22,
        fontWeight: "700"
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center", marginVertical: 10
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginTop: 16
    },
    description: {
        color: "#555",
        marginTop: 8
    },
    features: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
        marginTop: 10
    },
    section: {
        marginTop: 20
    },
    link: {
        color: "#00aaff"
    },
    switchBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderTopWidth: 1,
        borderColor: "#eee",
        marginTop: 20,
    },
    buyButton: {
        backgroundColor: "#00aaff",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 16,
    },
    buyText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 18
    },
});
