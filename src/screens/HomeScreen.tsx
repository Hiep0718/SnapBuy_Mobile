import type React from "react"
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import ProductCard from "../components/ProductCard"
import { ASSET_PATHS } from "../constants/assetPaths"

const { width: screenWidth } = Dimensions.get("window")

// --- Mock Data ---
const categories = [
  { id: 1, name: "Electronics", image: require("../../assets/categories/electronics.jpg") },
  { id: 2, name: "Fashion", image: require("../../assets/categories/clothing.jpg") },
  { id: 3, name: "Beauty", image: require("../../assets/categories/beauty.jpg") },
  { id: 4, name: "Fresh Fruits", image: require("../../assets/categories/fresh-fruits.jpg") },
  { id: 5, name: "Home", image: require("../../assets/categories/home.jpg") },
]

const recommendedProducts = [
  { id: 1, name: "Tablet", price: 499, rating: 4.5, image: ASSET_PATHS.PRODUCTS_ELECTRONICS.TABLET },
  { id: 2, name: "Laptop", price: 899, rating: 4.8, image: ASSET_PATHS.PRODUCTS_ELECTRONICS.LAPTOP },
  { id: 3, name: "Pear", price: 4.99, rating: 4.7, image: ASSET_PATHS.PRODUCTS_FRUITS.PEAR },
  { id: 4, name: "Apple", price: 3.99, rating: 4.6, image: ASSET_PATHS.PRODUCTS_FRUITS.APPLE },
]

// --- Component ---
const HomeScreen: React.FC<{
  onViewProductDetail?: (product: any) => void
  onNavigateToCart?: () => void
  onNavigateToProfile?: () => void
  onNavigateToSearch?: () => void
}> = ({ onViewProductDetail, onNavigateToCart, onNavigateToProfile, onNavigateToSearch }) => {
  
  const renderCategoryItem = (category: any) => (
    <TouchableOpacity key={category.id} style={styles.categoryItem}>
      <View style={styles.categoryImageContainer}>
        <Image source={category.image} style={styles.categoryImage} resizeMode="cover" />
      </View>
      <Text style={styles.categoryName}>{category.name}</Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <View style={styles.logoContainer}>
            <Image 
              source={require("../../assets/app-icons/logo.png")} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text style={styles.greetingText}>Hello 👋</Text>
            <Text style={styles.userName}>Welcome back!</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={onNavigateToCart}>
            <Ionicons name="cart-outline" size={24} color="#000" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.avatarButton} onPress={onNavigateToProfile}>
            <Image 
              source={require("../../assets/avatars/user-3.jpg")} 
              style={styles.avatar}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <TouchableOpacity style={styles.searchBar} onPress={onNavigateToSearch}>
          <Ionicons name="search-outline" size={20} color="#9E9E9E" />
          <Text style={styles.searchText}>Search for products...</Text>
          <View style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color="#00BCD4" />
          </View>
        </TouchableOpacity>

        {/* Categories Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {categories.map((category) => renderCategoryItem(category))}
          </ScrollView>
        </View>

        {/* Main Promo Banner */}
        <TouchableOpacity style={styles.mainBanner} activeOpacity={0.9}>
          <Image 
            source={require("../../assets/banners/electronics-promo.jpg")}
            style={styles.mainBannerImage}
            resizeMode="cover"
          />
          <View style={styles.mainBannerOverlay}>
            <View style={styles.mainBannerContent}>
              <Text style={styles.mainBannerSubtitle}>Special Offer</Text>
              <Text style={styles.mainBannerTitle}>Electronics</Text>
              <Text style={styles.mainBannerDiscount}>Up to 50% Off</Text>
              <TouchableOpacity style={styles.shopNowButton}>
                <Text style={styles.shopNowButtonText}>Shop Now</Text>
                <Ionicons name="arrow-forward" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        {/* Sub Banners */}
        <View style={styles.subBannersContainer}>
          <TouchableOpacity style={styles.subBanner} activeOpacity={0.9}>
            <Image 
              source={require("../../assets/banners/flash-sale.jpg")}
              style={styles.subBannerImage}
              resizeMode="cover"
            />
            <View style={styles.subBannerOverlay}>
              <View style={styles.discountBadge}>
                <Text style={styles.discountBadgeText}>30% OFF</Text>
              </View>
              <Text style={styles.subBannerTitle}>Flash Sale</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.subBanner} activeOpacity={0.9}>
            <Image 
              source={require("../../assets/banners/fruits-promo.jpg")}
              style={styles.subBannerImage}
              resizeMode="cover"
            />
            <View style={styles.subBannerOverlay}>
              <View style={styles.discountBadge}>
                <Text style={styles.discountBadgeText}>25% OFF</Text>
              </View>
              <Text style={styles.subBannerTitle}>Fresh Fruits</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Recommended Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsScroll}
          >
            {recommendedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onPress={() => onViewProductDetail?.(product)} 
              />
            ))}
          </ScrollView>
        </View>

        {/* Featured Deals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Deals</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.featuredDealsContainer}>
            <TouchableOpacity style={styles.featuredDealCard} activeOpacity={0.9}>
              <Image 
                source={require("../../assets/banners/promo-banner-1.jpg")}
                style={styles.featuredDealImage}
                resizeMode="cover"
              />
              <View style={styles.featuredDealContent}>
                <Text style={styles.featuredDealTitle}>Best Sellers</Text>
                <Text style={styles.featuredDealSubtitle}>Top rated products</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featuredDealCard} activeOpacity={0.9}>
              <Image 
                source={require("../../assets/banners/promo-banner-2.jpg")}
                style={styles.featuredDealImage}
                resizeMode="cover"
              />
              <View style={styles.featuredDealContent}>
                <Text style={styles.featuredDealTitle}>New Arrivals</Text>
                <Text style={styles.featuredDealSubtitle}>Just for you</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },

  // Header
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  logoImage: {
    width: 38,
    height: 38,
  },
  greetingText: {
    fontSize: 12,
    color: "#9E9E9E",
    fontWeight: "500",
  },
  userName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    position: "relative",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#F44336",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
  avatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#00BCD4",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },

  // Search Bar
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 16,
    gap: 10,
  },
  searchText: {
    flex: 1,
    fontSize: 14,
    color: "#9E9E9E",
    fontWeight: "500",
  },
  filterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  // Section
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#00BCD4",
  },

  // Categories
  categoriesScroll: {
    paddingRight: 16,
    gap: 16,
  },
  categoryItem: {
    alignItems: "center",
    gap: 8,
  },
  categoryImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  categoryImage: {
    width: "100%",
    height: "100%",
  },
  categoryName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    maxWidth: 70,
  },

  // Main Banner
  mainBanner: {
    marginHorizontal: 16,
    marginTop: 24,
    height: 180,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  mainBannerImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  mainBannerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    padding: 20,
  },
  mainBannerContent: {
    gap: 4,
  },
  mainBannerSubtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#00BCD4",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  mainBannerTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#fff",
    marginBottom: 4,
  },
  mainBannerDiscount: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFD700",
    marginBottom: 12,
  },
  shopNowButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00BCD4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignSelf: "flex-start",
    gap: 6,
  },
  shopNowButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  // Sub Banners
  subBannersContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 12,
  },
  subBanner: {
    flex: 1,
    height: 140,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  subBannerImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  subBannerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    padding: 12,
    justifyContent: "space-between",
  },
  discountBadge: {
    backgroundColor: "#F44336",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  discountBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  subBannerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },

  // Products Scroll
  productsScroll: {
    paddingRight: 16,
    gap: 12,
  },

  // Featured Deals
  featuredDealsContainer: {
    gap: 12,
  },
  featuredDealCard: {
    height: 100,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    marginBottom: 12,
  },
  featuredDealImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  featuredDealContent: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  featuredDealTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  featuredDealSubtitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#E0E0E0",
  },
})

export default HomeScreen