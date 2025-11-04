import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, Text } from "react-native";
import ProductImageGallery from "../components/clothesDetail/ProductImageGallery";
import ProductInfo from "../components/clothesDetail/ProductInfo";
import ProductOptions from "../components/clothesDetail/ProductOptions";
import ProductQuantity from "../components/clothesDetail/ProductQuantity";
import SizeGuide from "../components/clothesDetail/SizeGuide";
import ProductReviews from "../components/clothesDetail/ProductReviews";

export default function ClothesDetailScreen() {
    const product = {
        id: "1",
        name: "Yellow Hoodie",
        price: 29.99,
        rating: 4.5,
        totalReviews: 112,
        colors: ["#FFD700", "#FF4500", "#000000"],
        sizes: ["S", "M", "L", "XL"],
        description:
            "Soft cotton hoodie with comfortable fit and stylish design. Perfect for daily wear.",
        images: [
            "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
            "https://images.unsplash.com/photo-1556906781-9a412961c28c",
            "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
        ],
    };

    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [selectedSize, setSelectedSize] = useState("M");
    const [quantity, setQuantity] = useState(1);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <ProductImageGallery images={product.images} />
            <ProductInfo product={product} />
            <ProductOptions
                colors={product.colors}
                sizes={product.sizes}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                onSelectColor={setSelectedColor}
                onSelectSize={setSelectedSize}
            />
            <SizeGuide />
            <ProductQuantity
                quantity={quantity}
                setQuantity={setQuantity}
                price={product.price}
            />
            <ProductReviews />
            <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyText}>🛒 Add to Cart</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 16 },
    buyButton: {
        backgroundColor: "#00BFFF",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
        marginBottom: 30,
    },
    buyText: { color: "#fff", fontWeight: "700", fontSize: 18 },
});
