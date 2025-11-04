import React from "react";
import { View, Image, ScrollView, StyleSheet } from "react-native";

interface Props {
    images: string[];
}

const ProductImageGallery: React.FC<Props> = ({ images }) => (
    <View>
        <Image source={{ uri: images[0] }} style={styles.mainImage} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbnailList}>
            {images.map((img, index) => (
                <Image key={index} source={{ uri: img }} style={styles.thumbnail} />
            ))}
        </ScrollView>
    </View>
);

const styles = StyleSheet.create({
    mainImage: { width: "100%", height: 250, borderRadius: 10 },
    thumbnailList: { marginTop: 10 },
    thumbnail: { width: 70, height: 70, borderRadius: 10, marginRight: 10 },
});

export default ProductImageGallery;
