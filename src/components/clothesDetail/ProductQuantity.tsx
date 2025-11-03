import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
    quantity: number;
    setQuantity: (value: number) => void;
    price: number;
}

const ProductQuantity: React.FC<Props> = ({ quantity, setQuantity, price }) => (
    <View>
        <Text style={styles.sectionTitle}>Quantity</Text>
        <View style={styles.row}>
            <TouchableOpacity onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} style={styles.btn}>
                <Text style={styles.text}>-</Text>
            </TouchableOpacity>
            <Text style={styles.number}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.btn}>
                <Text style={styles.text}>+</Text>
            </TouchableOpacity>
            <Text style={styles.total}>Total: ${(price * quantity).toFixed(2)}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    sectionTitle: { fontSize: 18, fontWeight: "600", marginTop: 15 },
    row: { flexDirection: "row", alignItems: "center", marginTop: 8 },
    btn: { width: 35, height: 35, backgroundColor: "#f2f2f2", alignItems: "center", justifyContent: "center", borderRadius: 8 },
    text: { fontSize: 20, fontWeight: "700" },
    number: { fontSize: 18, fontWeight: "600", marginHorizontal: 12 },
    total: { marginLeft: 20, fontWeight: "700", color: "#333" },
});

export default ProductQuantity;
