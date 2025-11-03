import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
    colors: string[];
    sizes: string[];
    selectedColor: string;
    selectedSize: string;
    onSelectColor: (color: string) => void;
    onSelectSize: (size: string) => void;
}

const ProductOptions: React.FC<Props> = ({
    colors,
    sizes,
    selectedColor,
    selectedSize,
    onSelectColor,
    onSelectSize,
}) => (
    <View>
        <Text style={styles.sectionTitle}>Color</Text>
        <View style={styles.colorRow}>
            {colors.map((color) => (
                <TouchableOpacity
                    key={color}
                    onPress={() => onSelectColor(color)}
                    style={[
                        styles.colorCircle,
                        { backgroundColor: color },
                        selectedColor === color && styles.colorSelected,
                    ]}
                />
            ))}
        </View>

        <Text style={styles.sectionTitle}>Size</Text>
        <View style={styles.sizeRow}>
            {sizes.map((size) => (
                <TouchableOpacity
                    key={size}
                    onPress={() => onSelectSize(size)}
                    style={[
                        styles.sizeButton,
                        selectedSize === size && styles.sizeButtonSelected,
                    ]}
                >
                    <Text
                        style={[
                            styles.sizeText,
                            selectedSize === size && styles.sizeTextSelected,
                        ]}
                    >
                        {size}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
);

const styles = StyleSheet.create({
    sectionTitle: { fontSize: 18, fontWeight: "600", marginTop: 15 },
    colorRow: { flexDirection: "row", marginTop: 8 },
    colorCircle: { width: 30, height: 30, borderRadius: 15, marginRight: 10, borderWidth: 2, borderColor: "#eee" },
    colorSelected: { borderColor: "#00BFFF", borderWidth: 3 },
    sizeRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 8 },
    sizeButton: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, paddingVertical: 6, paddingHorizontal: 14, marginRight: 10, marginBottom: 10 },
    sizeButtonSelected: { backgroundColor: "#00BFFF", borderColor: "#00BFFF" },
    sizeText: { fontSize: 16, color: "#333" },
    sizeTextSelected: { color: "#fff", fontWeight: "700" },
});

export default ProductOptions;
