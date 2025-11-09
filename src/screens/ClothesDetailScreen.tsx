import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Text,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import ProductImageGallery from "../components/clothesDetail/ProductImageGallery";
import ProductInfo from "../components/clothesDetail/ProductInfo";
import ProductOptions from "../components/clothesDetail/ProductOptions";
import ProductQuantity from "../components/clothesDetail/ProductQuantity";
import SizeGuide from "../components/clothesDetail/SizeGuide";
import ProductReviews from "../components/clothesDetail/ProductReviews";

// 🧩 Khai báo danh sách màn hình trong stack
type RootStackParamList = {
    ClothesDetail: undefined;
    Feedback: undefined;
};

// 🧩 Kiểu dữ liệu cho navigation prop
type ClothesDetailScreenNavProp = StackNavigationProp<
    RootStackParamList,
    "ClothesDetail"
>;

// 🧩 Props của màn hình
type Props = {
    navigation: ClothesDetailScreenNavProp;
    onAddToCart: (item: any) => void;
    onNavigateFeedback?: () => void;
    onNavigateReviews?: () => void;
};

export default function ClothesDetailScreen({ navigation, onAddToCart, onNavigateFeedback, onNavigateReviews }: Props) {
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
            require("../../assets/products/fashions/yellowHoodie.jpg"),
            require("../../assets/products/fashions/Cotton_T-Shirt.jpg"),
            require("../../assets/products/fashions/classisbulejean.jpg"),
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
            <ProductReviews onNavigateReviews={onNavigateReviews} />

            <TouchableOpacity
                style={styles.buyButton}
                onPress={() =>
                    onAddToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: quantity,
                        color: selectedColor,
                        size: selectedSize,
                        image: product.images[0],
                    })
                }
            >
                <Text style={styles.buyText}>🛒 Add to Cart</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.feedbackButton}
                onPress={() => onNavigateFeedback?.()}
            >
                <Text style={styles.feedbackText}>💬 Gửi Feedback</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 16 },
    buyButton: {
        backgroundColor: "#5B5FFF",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    buyText: { color: "#fff", fontWeight: "700", fontSize: 18 },
    feedbackButton: {
        backgroundColor: "#eee",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 12,
        marginBottom: 30,
    },
    feedbackText: {
        color: "#333",
        fontWeight: "600",
        fontSize: 16,
    },
});
