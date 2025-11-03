import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

interface ProductCardProps {
    name: string;
    price: number;
    rating: number;
    image: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ name, price, rating, image }) => (
    <TouchableOpacity style={styles.card}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.rating}>⭐ {rating}</Text>
        <Text style={styles.price}>${price}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    card: { width: 120, marginRight: 12 },
    image: { width: 120, height: 120, borderRadius: 10 },
    name: { fontWeight: "600", marginTop: 6 },
    rating: { color: "gray" },
    price: { fontWeight: "700" },
});
