import type React from "react"
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions, TextInput } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import ProductCard from "../components/ProductCard"
import { ASSET_PATHS } from "../constants/assetPaths"

const { width: screenWidth } = Dimensions.get("window")
const CARD_WIDTH = (screenWidth - 48) / 2

interface CategoryDetailScreenProps {
  category: {
    id: number
    name: string
    image: any
  }
  onViewProductDetail?: (product: any) => void
}

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  rating: number
  sold?: number
  image: any
  discount?: number
  isNew?: boolean
  isBestSeller?: boolean
}

const CategoryDetailScreen: React.FC<CategoryDetailScreenProps> = ({ category, onViewProductDetail }) => {
  // Mock products based on category
  const getCategoryProducts = (): Product[] => {
    const productMap: Record<number, Product[]> = {
      1: [
        // Electronics
        { 
          id: 101, 
          name: "Premium Tablet Pro", 
          price: 499, 
          originalPrice: 699,
          rating: 4.5, 
          sold: 2341,
          discount: 29,
          isBestSeller: true,
          image: ASSET_PATHS.PRODUCTS_ELECTRONICS.TABLET 
        },
        { 
          id: 102, 
          name: "Ultra Laptop 15\"", 
          price: 899, 
          originalPrice: 1299,
          rating: 4.8, 
          sold: 1567,
          discount: 31,
          isNew: true,
          image: ASSET_PATHS.PRODUCTS_ELECTRONICS.LAPTOP 
        },
        { 
          id: 103, 
          name: "Smart Watch Series 5", 
          price: 299, 
          rating: 4.3,
          sold: 3245,
          isBestSeller: true,
          image: ASSET_PATHS.PRODUCTS_ELECTRONICS.TABLET 
        },
        { 
          id: 104, 
          name: "Wireless Headphones", 
          price: 199, 
          originalPrice: 279,
          rating: 4.6,
          sold: 1890,
          discount: 29,
          image: ASSET_PATHS.PRODUCTS_ELECTRONICS.LAPTOP 
        },
        { 
          id: 105, 
          name: "Gaming Keyboard RGB", 
          price: 149, 
          rating: 4.7,
          sold: 987,
          isNew: true,
          image: ASSET_PATHS.PRODUCTS_ELECTRONICS.TABLET 
        },
        { 
          id: 106, 
          name: "4K Webcam Pro", 
          price: 129, 
          originalPrice: 199,
          rating: 4.5,
          sold: 654,
          discount: 35,
          image: ASSET_PATHS.PRODUCTS_ELECTRONICS.LAPTOP 
        },
      ],
      2: [
        // Fashion
        { 
          id: 201, 
          name: "Premium Cotton T-Shirt", 
          price: 29.99, 
          originalPrice: 49.99,
          rating: 4.4,
          sold: 5432,
          discount: 40,
          isBestSeller: true,
          image: ASSET_PATHS.PRODUCTS_ELECTRONICS.TABLET 
        },
        { 
          id: 202, 
          name: "Classic Blue Jeans", 
          price: 79.99, 
          rating: 4.7,
          sold: 2341,
          isNew: true,
          image: ASSET_PATHS.PRODUCTS_ELECTRONICS.LAPTOP 
        },
        { 
          id: 203, 
          name: "Leather Jacket Premium", 
          price: 129.99, 
          originalPrice: 199.99,
          rating: 4.5,
          sold: 876,
          discount: 35,
          image: ASSET_PATHS.PRODUCTS_ELECTRONICS.TABLET 
        },
        { 
          id: 204, 
          name: "Running Shoes Sport", 
          price: 89.99, 
          rating: 4.6,
          sold: 3456,
          isBestSeller: true,
          image: ASSET_PATHS.PRODUCTS_ELECTRONICS.LAPTOP 
        },
      ],
      3: [
        // Beauty
        { 
          id: 301, 
          name: "Hydrating Moisturizer", 
          price: 39.99, 
          originalPrice: 59.99,
          rating: 4.5,
          sold: 1234,
          discount: 33,
          image: ASSET_PATHS.PRODUCTS_BEAUTY.HYDRATINGMOISTURIZER
        },
        { 
          id: 302, 
          name: "Vitamin C Face Serum", 
          price: 49.99, 
          rating: 4.8,
          sold: 2890,
          isBestSeller: true,
          image: ASSET_PATHS.PRODUCTS_BEAUTY.VITAMINCFACESERUM
        },
        { 
          id: 303, 
          name: "Matte Lipstick Set", 
          price: 19.99, 
          originalPrice: 29.99,
          rating: 4.4,
          sold: 4567,
          discount: 33,
          isNew: true,
          image: ASSET_PATHS.PRODUCTS_BEAUTY.MATTELIPSTICK
        },
        { 
          id: 304, 
          name: "HD Foundation", 
          price: 34.99, 
          rating: 4.6,
          sold: 1567,
          image: ASSET_PATHS.PRODUCTS_BEAUTY.HDFOUNDATION
        },
      ],
      4: [
        // Fresh Fruits
        { 
          id: 401, 
          name: "Fresh Red Apple", 
          price: 3.99, 
          rating: 4.6,
          sold: 8976,
          isBestSeller: true,
          image: ASSET_PATHS.PRODUCTS_FRUITS.APPLE 
        },
        { 
          id: 402, 
          name: "Organic Pear", 
          price: 4.99, 
          originalPrice: 6.99,
          rating: 4.7,
          sold: 3456,
          discount: 29,
          isNew: true,
          image: ASSET_PATHS.PRODUCTS_FRUITS.PEAR 
        },
        { 
          id: 403, 
          name: "Yellow Banana Bundle", 
          price: 2.99, 
          rating: 4.5,
          sold: 12340,
          isBestSeller: true,
          image: ASSET_PATHS.PRODUCTS_FRUITS.APPLE 
        },
        { 
          id: 404, 
          name: "Sweet Orange", 
          price: 4.49, 
          rating: 4.6,
          sold: 6789,
          image: ASSET_PATHS.PRODUCTS_FRUITS.PEAR 
        },
      ],
      5: [
        // Home
        { 
          id: 501, 
          name: "Modern LED Lamp", 
          price: 49.99, 
          originalPrice: 79.99,
          rating: 4.4,
          sold: 1234,
          discount: 38,
          image: ASSET_PATHS.PRODUCTS_HOMES.MODENRNLEDLAMP
        },
        { 
          id: 502, 
          name: "Memory Foam Pillow", 
          price: 34.99, 
          rating: 4.7,
          sold: 2890,
          isBestSeller: true,
          image: ASSET_PATHS.PRODUCTS_HOMES.MEMORYFOAMPIILOW
        },
        { 
          id: 503, 
          name: "Soft Cotton Blanket", 
          price: 59.99, 
          originalPrice: 89.99,
          rating: 4.5,
          sold: 876,
          discount: 33,
          isNew: true,
          image: ASSET_PATHS.PRODUCTS_HOMES.SOFTCOTTONBLANKET
        },
        { 
          id: 504, 
          name: "Wall Mirror Large", 
          price: 44.99, 
          rating: 4.6,
          sold: 543,
          image: ASSET_PATHS.PRODUCTS_HOMES.WALLMIRRORLARGE
        },
      ],
    }
    return productMap[category.id] || []
  }

  const products = getCategoryProducts()

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Category Banner */}
        <View style={styles.bannerContainer}>
          <Image source={ASSET_PATHS.PRODUCTS_ELECTRONICS.BANNER} style={styles.bannerImage} resizeMode="cover" />
          <View style={styles.bannerGradient} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>{category.name}</Text>
            <Text style={styles.bannerSubtitle}>Explore our collection</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Browse All</Text>
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
          <Text style={styles.resultsText}>{products.length} Products Found</Text>
        </View>

        {/* Products Grid */}
        <View style={styles.productsGrid}>
          {products.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.productCard}
              onPress={() => onViewProductDetail?.(item)}
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
                  {item.sold && <Text style={styles.soldText}>Sold {item.sold}</Text>}
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

export default CategoryDetailScreen