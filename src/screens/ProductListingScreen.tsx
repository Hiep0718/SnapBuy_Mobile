import type React from "react"
import { useState, useEffect } from "react"
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
  ActivityIndicator,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { ASSET_PATHS } from "../constants/assetPaths"

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
  const [allProducts, setAllProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch products from MockAPI
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('https://6910b9337686c0e9c20b7f71.mockapi.io/Products')
        
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        
        const data = await response.json()
        setAllProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const getSortedProducts = () => {
    const filteredProducts = allProducts.filter(
      (product) =>
        product.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchText.toLowerCase()),
    )

    const products = [...filteredProducts]
    switch (activeSort) {
      case "price-low":
        return products.sort((a, b) => (a.price || 0) - (b.price || 0))
      case "price-high":
        return products.sort((a, b) => (b.price || 0) - (a.price || 0))
      case "rating":
        return products.sort((a, b) => (b.rating || 0) - (a.rating || 0))
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

  const getProductImage = (product: any) => {
    // Nếu product có image URL từ API, dùng nó
    if (product.image && typeof product.image === 'string' && product.image.startsWith('http')) {
      return { uri: product.image }
    }
    
    // Fallback về local assets dựa trên category
    if (product.category === 'electronics') {
      return ASSET_PATHS.PRODUCTS_ELECTRONICS.ACCESSORIES
    } else if (product.category === 'fruits') {
      return ASSET_PATHS.PRODUCTS_FRUITS.APPLE
    }
    
    // Default fallback
    return require("../../assets/icon.png")
  }

  const renderGridProduct = (product: any) => (
    <TouchableOpacity style={styles.gridProductCard} onPress={() => onViewProductDetail?.(product)}>
      <View style={styles.productImageContainer}>
        <Image source={getProductImage(product)} style={styles.productImage} resizeMode="cover" />
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.productName} numberOfLines={2}>
        {product.name || 'Unnamed Product'}
      </Text>
      <View style={styles.ratingRow}>
        {renderRatingStars(product.rating || 0)}
        <Text style={styles.ratingText}>({product.rating || 0})</Text>
      </View>
      <View style={styles.priceAddRow}>
        <Text style={styles.productPrice}>${product.price || 0}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={22} color="#5B5FFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )

  const renderListProduct = (product: any) => (
    <TouchableOpacity style={styles.listProductCard} key={product.id} onPress={() => onViewProductDetail?.(product)}>
      <View style={styles.listProductImageContainer}>
        <Image source={getProductImage(product)} style={styles.listProductImage} resizeMode="cover" />
      </View>
      <View style={styles.listProductContent}>
        <Text style={styles.listProductName} numberOfLines={2}>
          {product.name || 'Unnamed Product'}
        </Text>
        <View style={styles.listRatingContainer}>{renderRatingStars(product.rating || 0)}</View>
        <Text style={styles.listProductPrice}>${product.price || 0}</Text>
      </View>
      <TouchableOpacity style={styles.listAddButton}>
        <Ionicons name="add-circle-outline" size={24} color="#5B5FFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  )

  // Loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#5B5FFF" />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      </SafeAreaView>
    )
  }

  // Error state
  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#F44336" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => {
              setLoading(true)
              setError(null)
              // Re-trigger fetch by changing a state that useEffect depends on
              // Or you can extract fetch logic to a separate function and call it here
            }}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

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
              <Ionicons name="grid-outline" size={20} color={displayMode === "grid" ? "#5B5FFF" : "#9E9E9E"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.displayModeButton, displayMode === "list" && styles.activeDisplayMode]}
              onPress={() => setDisplayMode("list")}
            >
              <Ionicons name="list-outline" size={20} color={displayMode === "list" ? "#5B5FFF" : "#9E9E9E"} />
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
              keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#9E9E9E',
    fontWeight: '500',
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#F44336',
    fontWeight: '500',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#5B5FFF',
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
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
    color: "#5B5FFF",
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