import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RatingStars } from "../RatingStars";

interface Props {
    product: { name: string; price: number; rating: number; totalReviews: number; description: string };
}

const ProductInfo: React.FC<Props> = ({ product }) => (
    <View>
        <View style={styles.header}>
            <Text style={styles.price}>${product.price}</Text>
            <RatingStars rating={product.rating} total={product.totalReviews} />
        </View>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.desc}>{product.description}</Text>
    </View>
);

const styles = StyleSheet.create({
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 },
    price: { fontSize: 22, fontWeight: "700", color: "#00BFFF" },
    name: { fontSize: 20, fontWeight: "700", marginTop: 5 },
    desc: { color: "#555", marginTop: 5, lineHeight: 20 },
});

export default ProductInfo;
