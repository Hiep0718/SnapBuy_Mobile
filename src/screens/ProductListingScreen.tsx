"use client"

import type React from "react"
import { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  TextInput,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { ASSET_PATHS } from "../constants/assetPaths"

const allProducts = [
  // Electronics
  {
    id: 1,
    name: "Smartphone Pro",
    price: 899,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.SMARTPHONE_1,
    category: "electronics",
  },
  {
    id: 2,
    name: "Smartphone Max",
    price: 1099,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.SMARTPHONE_2,
    category: "electronics",
  },
  {
    id: 3,
    name: "Smartphone Plus",
    price: 799,
    rating: 4,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.SMARTPHONE_3,
    category: "electronics",
  },
  {
    id: 4,
    name: "Smartphone Lite",
    price: 599,
    rating: 4,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.SMARTPHONE_4,
    category: "electronics",
  },
  {
    id: 5,
    name: "Laptop Pro 15",
    price: 1999,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.LAPTOP,
    category: "electronics",
  },
  {
    id: 6,
    name: "Tablet Air",
    price: 599,
    rating: 4,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.TABLET,
    category: "electronics",
  },
  {
    id: 7,
    name: "Wireless Earbuds",
    price: 299,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.ACCESSORIES,
    category: "electronics",
  },
  {
    id: 8,
    name: "USB-C Cable",
    price: 49,
    rating: 4,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.ACCESSORIES,
    category: "electronics",
  },
  {
    id: 16,
    name: "Bluetooth Speaker",
    price: 149,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.ACCESSORIES,
    category: "electronics",
  },
  {
    id: 17,
    name: "Wireless Mouse",
    price: 79,
    rating: 4,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.ACCESSORIES,
    category: "electronics",
  },
  {
    id: 18,
    name: "USB Hub 7-Port",
    price: 59,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.ACCESSORIES,
    category: "electronics",
  },
  {
    id: 19,
    name: "HDMI Cable 2M",
    price: 29,
    rating: 4,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.ACCESSORIES,
    category: "electronics",
  },
  {
    id: 20,
    name: "Screen Protector",
    price: 19,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.ACCESSORIES,
    category: "electronics",
  },
  {
    id: 21,
    name: "Phone Case Premium",
    price: 39,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.ACCESSORIES,
    category: "electronics",
  },
  {
    id: 22,
    name: "Laptop Stand",
    price: 89,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.ACCESSORIES,
    category: "electronics",
  },
  {
    id: 23,
    name: "External SSD 1TB",
    price: 149,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.ACCESSORIES,
    category: "electronics",
  },
  {
    id: 24,
    name: "USB-C Hub 8-in-1",
    price: 99,
    rating: 4,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.ACCESSORIES,
    category: "electronics",
  },
  {
    id: 25,
    name: "Monitor 27 inch 4K",
    price: 599,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.LAPTOP,
    category: "electronics",
  },
  {
    id: 26,
    name: "Keyboard Mechanical RGB",
    price: 179,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.ACCESSORIES,
    category: "electronics",
  },
  {
    id: 27,
    name: "Gaming Headset Pro",
    price: 249,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.ACCESSORIES,
    category: "electronics",
  },
  {
    id: 28,
    name: "Webcam 1080P HD",
    price: 129,
    rating: 4,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.ACCESSORIES,
    category: "electronics",
  },
  {
    id: 29,
    name: "Power Bank 30000mAh",
    price: 99,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.ACCESSORIES,
    category: "electronics",
  },
  {
    id: 30,
    name: "Phone Charger Fast",
    price: 49,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.ACCESSORIES,
    category: "electronics",
  },
  {
    id: 31,
    name: "Smart Watch Ultra",
    price: 399,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.ACCESSORIES,
    category: "electronics",
  },
  {
    id: 32,
    name: "Portable Projector",
    price: 799,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.ACCESSORIES,
    category: "electronics",
  },
  {
    id: 33,
    name: "Camera Tripod",
    price: 79,
    rating: 4,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.ACCESSORIES,
    category: "electronics",
  },
  {
    id: 34,
    name: "Ring Light LED",
    price: 69,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.ACCESSORIES,
    category: "electronics",
  },
  {
    id: 35,
    name: "Microphone Studio",
    price: 129,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.ACCESSORIES,
    category: "electronics",
  },
  {
    id: 36,
    name: "Drone 4K",
    price: 1299,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.ACCESSORIES,
    category: "electronics",
  },
  {
    id: 37,
    name: "Camera DSLR Professional",
    price: 1899,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.ACCESSORIES,
    category: "electronics",
  },
  {
    id: 38,
    name: "Lens 50mm Prime",
    price: 299,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.ACCESSORIES,
    category: "electronics",
  },
  {
    id: 39,
    name: "Memory Card 256GB",
    price: 89,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.ACCESSORIES,
    category: "electronics",
  },
  {
    id: 40,
    name: "Gaming Console PS5",
    price: 499,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_ELECTRONICS.ACCESSORIES,
    category: "electronics",
  },

  // Fruits
  { id: 9, name: "Fresh Apple", price: 5, rating: 5, image: ASSET_PATHS.PRODUCTS_FRUITS.APPLE, category: "fruits" },
  { id: 10, name: "Organic Pear", price: 6, rating: 4, image: ASSET_PATHS.PRODUCTS_FRUITS.PEAR, category: "fruits" },
  { id: 11, name: "Ripe Avocado", price: 8, rating: 5, image: ASSET_PATHS.PRODUCTS_FRUITS.AVOCADO, category: "fruits" },
  { id: 12, name: "Sweet Cherry", price: 12, rating: 5, image: ASSET_PATHS.PRODUCTS_FRUITS.CHERRY, category: "fruits" },
  { id: 13, name: "Juicy Orange", price: 7, rating: 4, image: ASSET_PATHS.PRODUCTS_FRUITS.ORANGE, category: "fruits" },
  { id: 14, name: "Peach Delight", price: 9, rating: 5, image: ASSET_PATHS.PRODUCTS_FRUITS.PEACH, category: "fruits" },
  {
    id: 15,
    name: "Pomegranate",
    price: 10,
    rating: 4,
    image: ASSET_PATHS.PRODUCTS_FRUITS.POMEGRANATE,
    category: "fruits",
  },
  { id: 41, name: "Banana Bunch", price: 4, rating: 5, image: ASSET_PATHS.PRODUCTS_FRUITS.APPLE, category: "fruits" },
  { id: 42, name: "Mango Sweet", price: 8, rating: 5, image: ASSET_PATHS.PRODUCTS_FRUITS.ORANGE, category: "fruits" },
  {
    id: 43,
    name: "Pineapple Fresh",
    price: 7,
    rating: 4,
    image: ASSET_PATHS.PRODUCTS_FRUITS.PEACH,
    category: "fruits",
  },
  {
    id: 44,
    name: "Watermelon Large",
    price: 15,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_FRUITS.APPLE,
    category: "fruits",
  },
  { id: 45, name: "Papaya Ripe", price: 6, rating: 4, image: ASSET_PATHS.PRODUCTS_FRUITS.ORANGE, category: "fruits" },
  {
    id: 46,
    name: "Blueberry Fresh",
    price: 12,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_FRUITS.CHERRY,
    category: "fruits",
  },
  {
    id: 47,
    name: "Strawberry Pack",
    price: 10,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_FRUITS.CHERRY,
    category: "fruits",
  },
  {
    id: 48,
    name: "Raspberry Organic",
    price: 11,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_FRUITS.CHERRY,
    category: "fruits",
  },
  { id: 49, name: "Lemon Fresh", price: 5, rating: 4, image: ASSET_PATHS.PRODUCTS_FRUITS.ORANGE, category: "fruits" },
  { id: 50, name: "Lime Organic", price: 6, rating: 4, image: ASSET_PATHS.PRODUCTS_FRUITS.ORANGE, category: "fruits" },
  {
    id: 51,
    name: "Grapefruit Pink",
    price: 8,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_FRUITS.APPLE,
    category: "fruits",
  },
  {
    id: 52,
    name: "Kiwi Fruit Fresh",
    price: 7,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_FRUITS.PEACH,
    category: "fruits",
  },
  { id: 53, name: "Coconut Young", price: 9, rating: 5, image: ASSET_PATHS.PRODUCTS_FRUITS.APPLE, category: "fruits" },
  { id: 54, name: "Dragon Fruit", price: 10, rating: 4, image: ASSET_PATHS.PRODUCTS_FRUITS.APPLE, category: "fruits" },
  { id: 55, name: "Passion Fruit", price: 9, rating: 5, image: ASSET_PATHS.PRODUCTS_FRUITS.PEACH, category: "fruits" },
  {
    id: 56,
    name: "Durian Premium",
    price: 25,
    rating: 4,
    image: ASSET_PATHS.PRODUCTS_FRUITS.APPLE,
    category: "fruits",
  },
  { id: 57, name: "Guava Sweet", price: 6, rating: 5, image: ASSET_PATHS.PRODUCTS_FRUITS.APPLE, category: "fruits" },
  { id: 58, name: "Lychee Fresh", price: 14, rating: 5, image: ASSET_PATHS.PRODUCTS_FRUITS.CHERRY, category: "fruits" },
  { id: 59, name: "Rambutan Red", price: 12, rating: 5, image: ASSET_PATHS.PRODUCTS_FRUITS.CHERRY, category: "fruits" },
  {
    id: 60,
    name: "Mangostan Purple",
    price: 16,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_FRUITS.APPLE,
    category: "fruits",
  },
  { id: 61, name: "Fig Dried", price: 13, rating: 4, image: ASSET_PATHS.PRODUCTS_FRUITS.APPLE, category: "fruits" },
  { id: 62, name: "Date Palm", price: 11, rating: 5, image: ASSET_PATHS.PRODUCTS_FRUITS.APPLE, category: "fruits" },
  {
    id: 63,
    name: "Grape Red Seedless",
    price: 9,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_FRUITS.APPLE,
    category: "fruits",
  },
  { id: 64, name: "Plum Fresh", price: 8, rating: 4, image: ASSET_PATHS.PRODUCTS_FRUITS.APPLE, category: "fruits" },
  {
    id: 65,
    name: "Nectarine Sweet",
    price: 10,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_FRUITS.PEACH,
    category: "fruits",
  },
  { id: 66, name: "Apricot Fresh", price: 9, rating: 4, image: ASSET_PATHS.PRODUCTS_FRUITS.PEACH, category: "fruits" },
  {
    id: 67,
    name: "Tangerine Pack",
    price: 7,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_FRUITS.ORANGE,
    category: "fruits",
  },
  {
    id: 68,
    name: "Clementine Sweet",
    price: 8,
    rating: 5,
    image: ASSET_PATHS.PRODUCTS_FRUITS.ORANGE,
    category: "fruits",
  },
  { id: 69, name: "Pomelo Fresh", price: 12, rating: 5, image: ASSET_PATHS.PRODUCTS_FRUITS.APPLE, category: "fruits" },
  { id: 70, name: "Tamarind Pod", price: 10, rating: 4, image: ASSET_PATHS.PRODUCTS_FRUITS.APPLE, category: "fruits" },
]

const sortOptions = [
  { id: "best-sales", label: "Best Sales" },
  { id: "best-matched", label: "Best Matched" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "rating", label: "Top Rated" },
]

const { width: screenWidth } = Dimensions.get("window")

// --- Component ---
const ProductListingScreen: React.FC<{
  onViewProductDetail?: (product: any) => void
}> = ({ onViewProductDetail }) => {
  const [searchText, setSearchText] = useState("")
  const [activeSort, setActiveSort] = useState("best-sales")
  const [activeNav, setActiveNav] = useState("home")
  const [displayMode, setDisplayMode] = useState<"grid" | "list">("grid")

  const getSortedProducts = () => {
    const filteredProducts = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.category.toLowerCase().includes(searchText.toLowerCase()),
    )

    const products = [...filteredProducts]
    switch (activeSort) {
      case "price-low":
        return products.sort((a, b) => a.price - b.price)
      case "price-high":
        return products.sort((a, b) => b.price - a.price)
      case "rating":
        return products.sort((a, b) => b.rating - a.rating)
      case "best-matched":
      case "best-sales":
      default:
        return products
    }
  }

  const sortedProducts = getSortedProducts()

  const renderRatingStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Ionicons key={i} name={i < rating ? "star" : "star-outline"} size={12} color="#FFC107" />
          ))}
      </View>
    )
  }

  const renderGridProduct = (product: any) => (
    <TouchableOpacity style={styles.gridProductCard} onPress={() => onViewProductDetail?.(product)}>
      <View style={styles.productImageContainer}>
        <Image source={product.image} style={styles.productImage} resizeMode="cover" />
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.productName} numberOfLines={2}>
        {product.name}
      </Text>
      <View style={styles.ratingRow}>
        {renderRatingStars(product.rating)}
        <Text style={styles.ratingText}>({product.rating})</Text>
      </View>
      <View style={styles.priceAddRow}>
        <Text style={styles.productPrice}>${product.price}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={22} color="#00BCD4" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )

  const renderListProduct = (product: any) => (
    <TouchableOpacity style={styles.listProductCard} key={product.id} onPress={() => onViewProductDetail?.(product)}>
      <View style={styles.listProductImageContainer}>
        <Image source={product.image} style={styles.listProductImage} resizeMode="cover" />
      </View>
      <View style={styles.listProductContent}>
        <Text style={styles.listProductName} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.listRatingContainer}>{renderRatingStars(product.rating)}</View>
        <Text style={styles.listProductPrice}>${product.price}</Text>
      </View>
      <TouchableOpacity style={styles.listAddButton}>
        <Ionicons name="add-circle-outline" size={24} color="#00BCD4" />
      </TouchableOpacity>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <View style={styles.profileImageWrapper}>
            <Image source={require("../../assets/icon.png")} style={styles.profileImage} />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Products</Text>
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.cartIcon}>
            <Ionicons name="cart-outline" size={24} color="#000" />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#9E9E9E" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor="#9E9E9E"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText("")}>
              <Ionicons name="close-circle" size={18} color="#9E9E9E" />
            </TouchableOpacity>
          )}
        </View>

        {/* Sort & View Mode Controls */}
        <View style={styles.controlsContainer}>
          <View style={styles.sortContainer}>
            <Ionicons name="arrow-down-outline" size={16} color="#9E9E9E" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sortScroll}>
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[styles.sortButton, activeSort === option.id && styles.activeSortButton]}
                  onPress={() => setActiveSort(option.id)}
                >
                  <Text style={[styles.sortButtonText, activeSort === option.id && styles.activeSortButtonText]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Display Mode Toggle */}
          <View style={styles.displayModeContainer}>
            <TouchableOpacity
              style={[styles.displayModeButton, displayMode === "grid" && styles.activeDisplayMode]}
              onPress={() => setDisplayMode("grid")}
            >
              <Ionicons name="grid-outline" size={20} color={displayMode === "grid" ? "#00BCD4" : "#9E9E9E"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.displayModeButton, displayMode === "list" && styles.activeDisplayMode]}
              onPress={() => setDisplayMode("list")}
            >
              <Ionicons name="list-outline" size={20} color={displayMode === "list" ? "#00BCD4" : "#9E9E9E"} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Products Count */}
        <View style={styles.productsCountContainer}>
          {searchText.length > 0 ? (
            <Text style={styles.productsCountText}>
              Found {sortedProducts.length} results for "<Text style={{ fontWeight: "700" }}>{searchText}</Text>"
            </Text>
          ) : (
            <Text style={styles.productsCountText}>Showing {sortedProducts.length} products</Text>
          )}
        </View>

        {/* Products Grid */}
        {displayMode === "grid" ? (
          <View style={styles.gridSection}>
            <FlatList
              data={sortedProducts}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.gridWrapper}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => renderGridProduct(item)}
            />
          </View>
        ) : (
          <View style={styles.listSection}>{sortedProducts.map((product) => renderListProduct(product))}</View>
        )}

        
      </ScrollView>

      {/* Bottom Tab Navigation */}
    </SafeAreaView>
  )
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 30,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  // Header
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    flex: 1,
    textAlign: "center",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  cartIcon: {
    width: 24,
    height: 24,
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#F44336",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
  profileImageWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },

  // Search Bar
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 12,
    marginBottom: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  searchPlaceholder: {
    flex: 1,
    marginLeft: 8,
    color: "#9E9E9E",
    fontSize: 14,
  },
  filterButton: {
    padding: 4,
  },

  // Controls Container
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sortContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  sortScroll: {
    marginLeft: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    marginRight: 8,
  },
  activeSortButton: {
    backgroundColor: "#E0F7FA",
  },
  sortButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#9E9E9E",
  },
  activeSortButtonText: {
    color: "#00BCD4",
    fontWeight: "600",
  },
  displayModeContainer: {
    flexDirection: "row",
    gap: 4,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 4,
  },
  displayModeButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  activeDisplayMode: {
    backgroundColor: "#fff",
  },

  // Products Count
  productsCountContainer: {
    marginBottom: 12,
  },
  productsCountText: {
    fontSize: 12,
    color: "#9E9E9E",
    fontWeight: "500",
  },

  // Grid Products
  gridSection: {
    marginBottom: 12,
  },
  gridWrapper: {
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 12,
  },
  gridProductCard: {
    width: "48%",
  },
  productImageContainer: {
    width: "100%",
    height: 180,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    position: "relative",
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  productName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 11,
    color: "#9E9E9E",
  },
  starsContainer: {
    flexDirection: "row",
    gap: 2,
  },
  priceAddRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
  addButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  // List Products
  listSection: {
    marginBottom: 12,
  },
  listProductCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: "#fafafa",
    borderRadius: 8,
    marginBottom: 12,
  },
  listProductImageContainer: {
    width: 80,
    height: 80,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    overflow: "hidden",
  },
  listProductImage: {
    width: "100%",
    height: "100%",
  },
  listProductContent: {
    flex: 1,
  },
  listProductName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 6,
  },
  listRatingContainer: {
    marginBottom: 6,
  },
  listProductPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
  listAddButton: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },

  // Bottom Tab Bar
  bottomTabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingVertical: 8,
    paddingBottom: 12,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    gap: 4,
  },
  tabIconContainer: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -8,
    backgroundColor: "#F44336",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "500",
    color: "#9E9E9E",
  },
  activeTabLabel: {
    color: "#00BCD4",
  },
})

export default ProductListingScreen
