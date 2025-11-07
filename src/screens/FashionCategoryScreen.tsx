import type React from "react"
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { ASSET_PATHS } from "../constants/assetPaths"

const { width: screenWidth } = Dimensions.get("window")

interface FashionCategoryScreenProps {
  onSelectClothing?: (clothing: any) => void
}

interface ClothingItem {
  id: number
  name: string
  price: number
  rating: number
  image: any
  description: string
  colors: string[]
  sizes: string[]
}

const FashionCategoryScreen: React.FC<FashionCategoryScreenProps> = ({ onSelectClothing }) => {
  const fashionProducts: ClothingItem[] = [
    {
      id: 201,
      name: "Yellow Hoodie",
      price: 29.99,
      rating: 4.5,
      image: ASSET_PATHS.PRODUCTS_ELECTRONICS.TABLET,
      description: "Soft cotton hoodie with comfortable fit and stylish design. Perfect for daily wear.",
      colors: ["#FFD700", "#FF4500", "#000000"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 202,
      name: "Classic Blue Jeans",
      price: 79.99,
      rating: 4.7,
      image: ASSET_PATHS.PRODUCTS_ELECTRONICS.LAPTOP,
      description: "Premium denim jeans with perfect fit and durability. Comfortable for everyday wear.",
      colors: ["#1E90FF", "#4169E1", "#000080"],
      sizes: ["28", "30", "32", "34", "36"],
    },
    {
      id: 203,
      name: "Leather Jacket",
      price: 129.99,
      rating: 4.5,
      image: ASSET_PATHS.PRODUCTS_ELECTRONICS.TABLET,
      description: "Premium leather jacket with elegant design. Perfect for a stylish look.",
      colors: ["#000000", "#8B4513", "#2F4F4F"],
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
      id: 204,
      name: "Casual Sneakers",
      price: 89.99,
      rating: 4.6,
      image: ASSET_PATHS.PRODUCTS_ELECTRONICS.LAPTOP,
      description: "Comfortable casual sneakers with modern design. Great for daily activities.",
      colors: ["#FFFFFF", "#000000", "#FF1493"],
      sizes: ["6", "7", "8", "9", "10", "11", "12"],
    },
    {
      id: 205,
      name: "Cotton T-Shirt",
      price: 19.99,
      rating: 4.4,
      image: ASSET_PATHS.PRODUCTS_ELECTRONICS.TABLET,
      description: "100% cotton t-shirt with excellent breathability. Available in multiple colors.",
      colors: ["#FFFFFF", "#000000", "#FF6347", "#4169E1"],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: 206,
      name: "Elegant Dress",
      price: 99.99,
      rating: 4.8,
      image: ASSET_PATHS.PRODUCTS_ELECTRONICS.LAPTOP,
      description: "Beautiful elegant dress perfect for special occasions. Premium quality fabric.",
      colors: ["#000000", "#8B0000", "#4B0082"],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
  ]

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image source={ASSET_PATHS.PRODUCTS_ELECTRONICS.TABLET} style={styles.bannerImage} resizeMode="cover" />
          <View style={styles.bannerOverlay} />
          <View style={styles.bannerContent}>
            <Text style={styles.categoryTitle}>Fashion</Text>
            <Text style={styles.categoryDescription}>Discover our latest collection</Text>
          </View>
        </View>

        {/* Filter and Sort */}
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={18} color="#00BCD4" />
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sortButton}>
            <Ionicons name="swap-vertical" size={18} color="#00BCD4" />
            <Text style={styles.sortButtonText}>Sort</Text>
          </TouchableOpacity>
          <View style={styles.resultCount}>
            <Text style={styles.resultCountText}>{fashionProducts.length} items</Text>
          </View>
        </View>

        {/* Clothing Cards Grid */}
        <View style={styles.productsGrid}>
          {fashionProducts.map((item) => (
            <TouchableOpacity key={item.id} style={styles.clothingCard} onPress={() => onSelectClothing?.(item)}>
              <Image source={item.image} style={styles.clothingImage} resizeMode="cover" />
              <View style={styles.cardContent}>
                <Text style={styles.clothingName}>{item.name}</Text>
                <Text style={styles.clothingPrice}>${item.price}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },

  // Banner
  bannerContainer: {
    height: 200,
    backgroundColor: "#f5f5f5",
    position: "relative",
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  bannerOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  bannerContent: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
  categoryTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    fontWeight: "500",
    color: "#E0E0E0",
  },

  // Filter
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
    alignItems: "center",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    gap: 6,
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    gap: 6,
  },
  sortButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
  resultCount: {
    marginLeft: "auto",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  resultCountText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },

  // Clothing Cards
  productsGrid: {
    paddingHorizontal: 12,
    gap: 12,
  },
  clothingCard: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  clothingImage: {
    width: 120,
    height: 140,
    backgroundColor: "#e8e8e8",
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: "space-between",
  },
  clothingName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  clothingPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#00BCD4",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
})

export default FashionCategoryScreen
