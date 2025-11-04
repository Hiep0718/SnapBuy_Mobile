import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SizeGuide: React.FC = () => {
    const sizeData = [
        { size: "S", chest: "86-91 cm", length: "64 cm" },
        { size: "M", chest: "92-97 cm", length: "66 cm" },
        { size: "L", chest: "98-104 cm", length: "68 cm" },
        { size: "XL", chest: "105-112 cm", length: "70 cm" },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📏 Size Guide</Text>
            <View style={styles.tableHeader}>
                <Text style={[styles.cell, styles.headerCell]}>Size</Text>
                <Text style={[styles.cell, styles.headerCell]}>Chest</Text>
                <Text style={[styles.cell, styles.headerCell]}>Length</Text>
            </View>
            {sizeData.map((item) => (
                <View key={item.size} style={styles.tableRow}>
                    <Text style={styles.cell}>{item.size}</Text>
                    <Text style={styles.cell}>{item.chest}</Text>
                    <Text style={styles.cell}>{item.length}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginTop: 20, backgroundColor: "#f9f9f9", borderRadius: 10, padding: 12 },
    title: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
    tableHeader: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#ccc", paddingBottom: 6 },
    tableRow: { flexDirection: "row", paddingVertical: 6 },
    cell: { flex: 1, fontSize: 14, textAlign: "center" },
    headerCell: { fontWeight: "700" },
});

export default SizeGuide;
