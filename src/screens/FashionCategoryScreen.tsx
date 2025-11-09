import type React from "react"
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions, TextInput } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { ASSET_PATHS } from "../constants/assetPaths"

const { width: screenWidth } = Dimensions.get("window")
const CARD_WIDTH = (screenWidth - 48) / 2

interface FashionCategoryScreenProps {
  onSelectClothing?: (clothing: any) => void
}

interface ClothingItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  rating: number
  sold: number
  image: any
  description: string
  colors: string[]
  sizes: string[]
  discount?: number
  isNew?: boolean
  isBestSeller?: boolean
}

const FashionCategoryScreen: React.FC<FashionCategoryScreenProps> = ({ onSelectClothing }) => {
  const fashionProducts: ClothingItem[] = [
    {
      id: 201,
      name: "Yellow Hoodie",
      price: 29.99,
      originalPrice: 49.99,
      rating: 4.5,
      sold: 1234,
      discount: 40,
      isBestSeller: true,
      image: ASSET_PATHS.PRODUCTS_FASHION.YELLOW_HOODIE,
      description: "Soft cotton hoodie with comfortable fit and stylish design. Perfect for daily wear.",
      colors: ["#FFD700", "#FF4500", "#000000"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 202,
      name: "Classic Blue Jeans",
      price: 79.99,
      rating: 4.7,
      sold: 856,
      isNew: true,
      image: ASSET_PATHS.PRODUCTS_FASHION.BULEJEANS,
      description: "Premium denim jeans with perfect fit and durability. Comfortable for everyday wear.",
      colors: ["#1E90FF", "#4169E1", "#000080"],
      sizes: ["28", "30", "32", "34", "36"],
    },
    {
      id: 203,
      name: "Leather Jacket",
      price: 129.99,
      originalPrice: 199.99,
      rating: 4.5,
      sold: 432,
      discount: 35,
      image: ASSET_PATHS.PRODUCTS_FASHION.LETHERJACKET,
      description: "Premium leather jacket with elegant design. Perfect for a stylish look.",
      colors: ["#000000", "#8B4513", "#2F4F4F"],
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
      id: 204,
      name: "Casual Sneakers",
      price: 89.99,
      rating: 4.6,
      sold: 2341,
      isBestSeller: true,
      image: ASSET_PATHS.PRODUCTS_FASHION.CASUALSHOES,
      description: "Comfortable casual sneakers with modern design. Great for daily activities.",
      colors: ["#FFFFFF", "#000000", "#FF1493"],
      sizes: ["6", "7", "8", "9", "10", "11", "12"],
    },
    {
      id: 205,
      name: "Cotton T-Shirt",
      price: 19.99,
      originalPrice: 29.99,
      rating: 4.4,
      sold: 3456,
      discount: 33,
      image: ASSET_PATHS.PRODUCTS_FASHION.TSHIFT,
      description: "100% cotton t-shirt with excellent breathability. Available in multiple colors.",
      colors: ["#FFFFFF", "#000000", "#FF6347", "#4169E1"],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: 206,
      name: "Elegant Dress",
      price: 99.99,
      rating: 4.8,
      sold: 567,
      isNew: true,
      image: ASSET_PATHS.PRODUCTS_FASHION.ELEPHANDRESS,
      description: "Beautiful elegant dress perfect for special occasions. Premium quality fabric.",
      colors: ["#000000", "#8B0000", "#4B0082"],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
  ]

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Category Banner */}
        <View style={styles.bannerContainer}>
          <Image source={ASSET_PATHS.PRODUCTS_FASHION.BANER} style={styles.bannerImage} resizeMode="cover" />
          <View style={styles.bannerGradient} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}></Text>
            <Text style={styles.bannerSubtitle}>Up to 50% OFF</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.quickFiltersContainer}
          contentContainerStyle={styles.quickFiltersContent}
        >
          <TouchableOpacity style={[styles.quickFilterChip, styles.quickFilterChipActive]}>
            <Text style={styles.quickFilterTextActive}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickFilterChip}>
            <Text style={styles.quickFilterText}>New Arrivals</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickFilterChip}>
            <Text style={styles.quickFilterText}>Best Sellers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickFilterChip}>
            <Text style={styles.quickFilterText}>On Sale</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickFilterChip}>
            <Text style={styles.quickFilterText}>Top Rated</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Filter Bar */}
        <View style={styles.filterBar}>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="funnel-outline" size={16} color="#666" />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
          <View style={styles.filterDivider} />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="swap-vertical-outline" size={16} color="#666" />
            <Text style={styles.filterText}>Sort</Text>
          </TouchableOpacity>
          <View style={styles.filterDivider} />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="grid-outline" size={16} color="#5B5FFF" />
          </TouchableOpacity>
        </View>

        {/* Results Count */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsText}>{fashionProducts.length} Products Found</Text>
        </View>

        {/* Products Grid */}
        <View style={styles.productsGrid}>
          {fashionProducts.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.productCard}
              onPress={() => onSelectClothing?.(item)}
              activeOpacity={0.7}
            >
              {/* Product Image */}
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.productImage} resizeMode="cover" />
                
                {/* Badges */}
                <View style={styles.badgesContainer}>
                  {item.discount && (
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>-{item.discount}%</Text>
                    </View>
                  )}
                  {item.isNew && (
                    <View style={styles.newBadge}>
                      <Text style={styles.newText}>NEW</Text>
                    </View>
                  )}
                  {item.isBestSeller && (
                    <View style={styles.bestSellerBadge}>
                      <Ionicons name="flame" size={10} color="#FFF" />
                      <Text style={styles.bestSellerText}>Best</Text>
                    </View>
                  )}
                </View>

                {/* Favorite Button */}
                <TouchableOpacity style={styles.favoriteButton}>
                  <Ionicons name="heart-outline" size={18} color="#666" />
                </TouchableOpacity>
              </View>

              {/* Product Info */}
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                
                {/* Rating & Sold */}
                <View style={styles.ratingRow}>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={12} color="#FFA726" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                  <Text style={styles.soldText}>Sold {item.sold}</Text>
                </View>

                {/* Price */}
                <View style={styles.priceContainer}>
                  <Text style={styles.currentPrice}>${item.price}</Text>
                  {item.originalPrice && (
                    <Text style={styles.originalPrice}>${item.originalPrice}</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFF",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  cartButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "#FF6B35",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "700",
  },

  // Banner
  bannerContainer: {
    height: 180,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  bannerGradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  bannerContent: {
    position: "absolute",
    left: 20,
    bottom: 20,
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFF",
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
    marginBottom: 12,
  },
  bannerButton: {
    backgroundColor: "#5B5FFF",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  bannerButtonText: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "700",
  },

  // Quick Filters
  quickFiltersContainer: {
    marginBottom: 12,
  },
  quickFiltersContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  quickFilterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginRight: 8,
  },
  quickFilterChipActive: {
    backgroundColor: "#5B5FFF",
    borderColor: "#6669fcff",
  },
  quickFilterText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
  },
  quickFilterTextActive: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFF",
  },

  // Filter Bar
  filterBar: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },
  filterButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  filterDivider: {
    width: 1,
    height: 20,
    backgroundColor: "#E0E0E0",
  },

  // Results
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F5F5F5",
  },
  resultsText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
  },

  // Products Grid
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    gap: 12,
    justifyContent: "space-between",
  },
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: "#FFF",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  // Product Image
  imageContainer: {
    width: "100%",
    height: CARD_WIDTH,
    position: "relative",
    backgroundColor: "#F5F5F5",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  badgesContainer: {
    position: "absolute",
    top: 8,
    left: 8,
    gap: 4,
  },
  discountBadge: {
    backgroundColor: "#5B5FFF",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  discountText: {
    color: "#FFF",
    fontSize: 11,
    fontWeight: "700",
  },
  newBadge: {
    backgroundColor: "#4ca8afff",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  newText: {
    color: "#FFF",
    fontSize: 11,
    fontWeight: "700",
  },
  bestSellerBadge: {
    backgroundColor: "#191dffff",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  bestSellerText: {
    color: "#FFF",
    fontSize: 11,
    fontWeight: "700",
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    backgroundColor: "#FFF",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  // Product Info
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
    marginBottom: 6,
    lineHeight: 18,
    height: 36,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  soldText: {
    fontSize: 11,
    color: "#999",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#272affff",
  },
  originalPrice: {
    fontSize: 12,
    fontWeight: "500",
    color: "#999",
    textDecorationLine: "line-through",
  },
})

export default FashionCategoryScreen