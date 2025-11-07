import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface Product {
  id: number
  name: string
  price: number
  rating: number
  image: any // Changed to accept Image source (require result)
}

interface ProductCardProps {
  product: Product
  onPress?: () => void // add onPress callback
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={product.image} style={styles.productImage} />

    <Text style={styles.name}>{product.name}</Text>
    <View style={styles.footer}>
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={12} color="#FFD700" />
        <Text style={styles.ratingText}>{product.rating}</Text>
      </View>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  card: {
    width: 150,
    marginRight: 15,
    backgroundColor: "#fff",
  },
  productImage: {
    height: 150,
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: "cover",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    color: "#888",
    marginLeft: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4682B4",
  },
})

export default ProductCard
