import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface Product {
  id: number
  name: string
  price: number
  rating: number
  image: any
}

interface GridProductCardProps {
  product: Product
  columnWidth: number
}

export const GridProductCard: React.FC<GridProductCardProps> = ({ product, columnWidth }) => {
  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    return (
      <View style={styles.starsContainer}>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Ionicons
              key={i}
              name={i < fullStars ? "star" : i < rating ? "star-half" : "star-outline"}
              size={12}
              color="#FFC107"
            />
          ))}
      </View>
    )
  }

  return (
    <TouchableOpacity style={[styles.gridProductCard, { width: columnWidth }]}>
      <View style={styles.gridProductImageContainer}>
        <Image source={product.image} style={styles.gridProductImage} />
      </View>
      <Text style={styles.gridProductName} numberOfLines={2}>
        {product.name}
      </Text>
      <View style={styles.gridProductFooter}>
        <View style={styles.ratingAndPrice}>
          {renderRatingStars(product.rating)}
          <Text style={styles.gridProductPrice}>${product.price}</Text>
        </View>
        <TouchableOpacity style={styles.gridAddButton}>
          <Ionicons name="add-circle-outline" size={20} color="#9E9E9E" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  gridProductCard: {
    backgroundColor: "#fafafa",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 4,
  },
  gridProductImageContainer: {
    width: "100%",
    height: 140,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  gridProductImage: {
    width: 80,
    height: 80,
  },
  gridProductName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
    paddingHorizontal: 10,
    paddingTop: 8,
    minHeight: 32,
  },
  gridProductFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    paddingBottom: 10,
    gap: 8,
  },
  ratingAndPrice: {
    flexDirection: "column",
    gap: 4,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 2,
  },
  gridProductPrice: {
    fontSize: 13,
    fontWeight: "700",
    color: "#000",
  },
  gridAddButton: {
    width: 20,
    height: 20,
  },
})
