import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Pencil } from "lucide-react-native";

interface ItemProps {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: any;
    navigation: any;
}

const CheckoutItem: React.FC<ItemProps> = ({
    id,
    name,
    description,
    price,
    quantity,
    image,
    navigation,
}) => {
    return (
        <View style={styles.card}>
            <Image source={image} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.price}>${price}</Text>
            </View>
            <View style={styles.rightColumn}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("ClothesDetail")}
                    style={styles.editIcon}
                >
                    <Pencil color="#007aff" size={20} />
                </TouchableOpacity>
                <Text style={styles.quantity}>x{quantity}</Text>
            </View>

        </View>
    );
};

export default CheckoutItem;

const styles = StyleSheet.create({
    rightColumn: {
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 8,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        padding: 10,
        marginBottom: 12,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
    },
    description: {
        fontSize: 12,
        color: "#777",
    },
    price: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 4,
    },
    editIcon: {
        padding: 6,
    },
    quantity: {
        fontSize: 14,
        fontWeight: "500",
        color: "#333",
    },
});
