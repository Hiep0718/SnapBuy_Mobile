import type React from "react"
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import ProductCard from "../components/ProductCard"
import { ASSET_PATHS } from "../constants/assetPaths"

const { width: screenWidth } = Dimensions.get("window")

interface CategoryDetailScreenProps {
  category: {
    id: number
    name: string
    image: any
  }
  onViewProductDetail?: (product: any) => void
}

const CategoryDetailScreen: React.FC<CategoryDetailScreenProps> = ({ category, onViewProductDetail }) => {
  // Mock products based on category
  const getCategoryProducts = () => {
    const productMap: Record<number, any[]> = {
      1: [
        // Electronics
        { id: 101, name: "Tablet", price: 499, rating: 4.5, image: ASSET_PATHS.PRODUCTS_ELECTRONICS.TABLET },
        { id: 102, name: "Laptop", price: 899, rating: 4.8, image: ASSET_PATHS.PRODUCTS_ELECTRONICS.LAPTOP },
        { id: 103, name: "Smartwatch", price: 299, rating: 4.3, image: ASSET_PATHS.PRODUCTS_ELECTRONICS.TABLET },
        { id: 104, name: "Headphones", price: 199, rating: 4.6, image: ASSET_PATHS.PRODUCTS_ELECTRONICS.LAPTOP },
      ],
      2: [
        // Fashion
        { id: 201, name: "T-Shirt", price: 29.99, rating: 4.4, image: ASSET_PATHS.PRODUCTS_ELECTRONICS.TABLET },
        { id: 202, name: "Jeans", price: 79.99, rating: 4.7, image: ASSET_PATHS.PRODUCTS_ELECTRONICS.LAPTOP },
        { id: 203, name: "Jacket", price: 129.99, rating: 4.5, image: ASSET_PATHS.PRODUCTS_ELECTRONICS.TABLET },
        { id: 204, name: "Shoes", price: 89.99, rating: 4.6, image: ASSET_PATHS.PRODUCTS_ELECTRONICS.LAPTOP },
      ],
      3: [
        // Beauty
        { id: 301, name: "Moisturizer", price: 39.99, rating: 4.5, image: ASSET_PATHS.PRODUCTS_ELECTRONICS.TABLET },
        { id: 302, name: "Face Serum", price: 49.99, rating: 4.8, image: ASSET_PATHS.PRODUCTS_ELECTRONICS.LAPTOP },
        { id: 303, name: "Lipstick", price: 19.99, rating: 4.4, image: ASSET_PATHS.PRODUCTS_ELECTRONICS.TABLET },
        { id: 304, name: "Foundation", price: 34.99, rating: 4.6, image: ASSET_PATHS.PRODUCTS_ELECTRONICS.LAPTOP },
      ],
      4: [
        // Fresh Fruits
        { id: 401, name: "Apple", price: 3.99, rating: 4.6, image: ASSET_PATHS.PRODUCTS_FRUITS.APPLE },
        { id: 402, name: "Pear", price: 4.99, rating: 4.7, image: ASSET_PATHS.PRODUCTS_FRUITS.PEAR },
        { id: 403, name: "Banana", price: 2.99, rating: 4.5, image: ASSET_PATHS.PRODUCTS_FRUITS.APPLE },
        { id: 404, name: "Orange", price: 4.49, rating: 4.6, image: ASSET_PATHS.PRODUCTS_FRUITS.PEAR },
      ],
      5: [
        // Home
        { id: 501, name: "Lamp", price: 49.99, rating: 4.4, image: ASSET_PATHS.PRODUCTS_ELECTRONICS.TABLET },
        { id: 502, name: "Pillow", price: 34.99, rating: 4.7, image: ASSET_PATHS.PRODUCTS_ELECTRONICS.LAPTOP },
        { id: 503, name: "Blanket", price: 59.99, rating: 4.5, image: ASSET_PATHS.PRODUCTS_ELECTRONICS.TABLET },
        { id: 504, name: "Mirror", price: 44.99, rating: 4.6, image: ASSET_PATHS.PRODUCTS_ELECTRONICS.LAPTOP },
      ],
    }
    return productMap[category.id] || []
  }

  const products = getCategoryProducts()

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Category Banner */}
        <View style={styles.bannerContainer}>
          <Image source={category.image} style={styles.bannerImage} resizeMode="cover" />
          <View style={styles.bannerOverlay} />
          <View style={styles.bannerContent}>
            <Text style={styles.categoryTitle}>{category.name}</Text>
            <Text style={styles.categoryDescription}>Browse our collection</Text>
          </View>
        </View>

        {/* Filter and Sort Options */}
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
            <Text style={styles.resultCountText}>{products.length} items</Text>
          </View>
        </View>

        {/* Products Grid */}
        <View style={styles.productsGrid}>
          {products.map((product) => (
            <View key={product.id} style={styles.productWrapper}>
              <ProductCard product={product} onPress={() => onViewProductDetail?.(product)} />
            </View>
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

  // Products Grid
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 8,
    gap: 8,
  },
  productWrapper: {
    width: "48%",
  },
})

export default CategoryDetailScreen
