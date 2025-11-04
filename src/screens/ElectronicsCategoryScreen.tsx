import type React from "react"
import { useState } from "react"
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"

// --- Mock Data ---
const categoryCards = [
  { id: 1, name: "Phones", color: "#D8B4FF", icon: "phone-portrait-outline" },
  { id: 2, name: "Laptops", color: "#B3D9FF", icon: "laptop-outline" },
  { id: 3, name: "Tablets", color: "#FFD9B8", icon: "tablet-landscape-outline" },
]

const electronicsProducts = [
  { id: 1, name: "Smartphone", price: 899, rating: 4, image: require("../../assets/icon.png") },
  { id: 2, name: "Smartphone", price: 899, rating: 4, image: require("../../assets/icon.png") },
  { id: 3, name: "Smartphone", price: 789, rating: 4, image: require("../../assets/icon.png") },
  { id: 4, name: "Smartphone", price: 999, rating: 4, image: require("../../assets/icon.png") },
]

const bannerImage = require("../../assets/icon.png")

const { width: screenWidth } = Dimensions.get("window")

// --- Component ---
const ElectronicsCategoryScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("best-sales")
  const [activeNav, setActiveNav] = useState("home")

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

  const renderCategoryCard = (category: any) => (
    <TouchableOpacity key={category.id} style={[styles.categoryCard, { backgroundColor: category.color }]}>
      <View style={styles.categoryIconContainer}>
        <Ionicons name={category.icon} size={40} color="#000" />
      </View>
    </TouchableOpacity>
  )

  const renderListProduct = (product: any) => (
    <TouchableOpacity key={product.id} style={styles.listProductCard}>
      <View style={styles.listProductImageContainer}>
        <Image source={product.image} style={styles.listProductImage} />
      </View>
      <View style={styles.listProductContent}>
        <Text style={styles.listProductName}>{product.name}</Text>
        <View style={styles.listRatingContainer}>{renderRatingStars(product.rating)}</View>
      </View>
      <View style={styles.listProductRight}>
        <Text style={styles.listProductPrice}>${product.price}</Text>
        <TouchableOpacity style={styles.listAddButton}>
          <Ionicons name="add-circle-outline" size={24} color="#9E9E9E" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Electronics</Text>
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.cartIcon}>
            <Ionicons name="cart-outline" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.profileImageWrapper}>
            <Image source={require("../../assets/icon.png")} style={styles.profileImage} />
          </View>
        </View>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#9E9E9E" />
          <Text style={styles.searchPlaceholder}>Search</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color="#9E9E9E" />
          </TouchableOpacity>
        </View>

        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <View style={styles.categoriesHeader}>
            <Text style={styles.categoriesTitle}>Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
              <Ionicons name="chevron-forward" size={16} color="#9E9E9E" style={styles.chevron} />
            </TouchableOpacity>
          </View>
          <View style={styles.categoriesGrid}>{categoryCards.map((category) => renderCategoryCard(category))}</View>
        </View>

        {/* Tab Filters */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "best-sales" && styles.activeTab]}
            onPress={() => setActiveTab("best-sales")}
          >
            <Text style={[styles.tabText, activeTab === "best-sales" && styles.activeTabText]}>Best Sales</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "best-matched" && styles.activeTab]}
            onPress={() => setActiveTab("best-matched")}
          >
            <Text style={[styles.tabText, activeTab === "best-matched" && styles.activeTabText]}>Best Matched</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "popular" && styles.activeTab]}
            onPress={() => setActiveTab("popular")}
          >
            <Text style={[styles.tabText, activeTab === "popular" && styles.activeTabText]}>Popular</Text>
          </TouchableOpacity>
        </View>

        {/* Products List */}
        <View style={styles.productsListSection}>
          {electronicsProducts.map((product) => renderListProduct(product))}
        </View>

        {/* See All Button */}
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllButtonText}>See all</Text>
        </TouchableOpacity>

        {/* Banner Carousel */}
        <View style={styles.bannerContainer}>
          <Image source={bannerImage} style={styles.bannerImage} />
          <View style={styles.bannerDotsContainer}>
            {[0, 1, 2].map((_, index) => (
              <View key={index} style={[styles.bannerDot, index === 0 && styles.activeBannerDot]} />
            ))}
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Tab Navigation */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveNav("home")}>
          <Ionicons
            name={activeNav === "home" ? "home" : "home-outline"}
            size={24}
            color={activeNav === "home" ? "#00BCD4" : "#9E9E9E"}
          />
          <Text style={[styles.tabLabel, activeNav === "home" && styles.activeTabLabel]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveNav("search")}>
          <Ionicons
            name={activeNav === "search" ? "search" : "search-outline"}
            size={24}
            color={activeNav === "search" ? "#00BCD4" : "#9E9E9E"}
          />
          <Text style={[styles.tabLabel, activeNav === "search" && styles.activeTabLabel]}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveNav("favorites")}>
          <Ionicons
            name={activeNav === "favorites" ? "heart" : "heart-outline"}
            size={24}
            color={activeNav === "favorites" ? "#00BCD4" : "#9E9E9E"}
          />
          <Text style={[styles.tabLabel, activeNav === "favorites" && styles.activeTabLabel]}>Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveNav("inbox")}>
          <View style={styles.tabIconContainer}>
            <Ionicons
              name={activeNav === "inbox" ? "mail" : "mail-outline"}
              size={24}
              color={activeNav === "inbox" ? "#00BCD4" : "#9E9E9E"}
            />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </View>
          <Text style={[styles.tabLabel, activeNav === "inbox" && styles.activeTabLabel]}>Inbox</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveNav("account")}>
          <Ionicons
            name={activeNav === "account" ? "person" : "person-outline"}
            size={24}
            color={activeNav === "account" ? "#00BCD4" : "#9E9E9E"}
          />
          <Text style={[styles.tabLabel, activeNav === "account" && styles.activeTabLabel]}>Account</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 16,
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

  // Categories Section
  categoriesSection: {
    marginBottom: 20,
  },
  categoriesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  categoriesTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  seeAllText: {
    color: "#9E9E9E",
    fontSize: 12,
    fontWeight: "500",
  },
  chevron: {
    marginLeft: 2,
  },
  categoriesGrid: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  categoryCard: {
    flex: 1,
    aspectRatio: 1.2,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  categoryIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  // Tab Filters
  tabsContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  tab: {
    paddingBottom: 12,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#00BCD4",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#9E9E9E",
  },
  activeTabText: {
    color: "#00BCD4",
    fontWeight: "600",
  },

  // Products List
  productsListSection: {
    marginBottom: 12,
  },
  listProductCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: "#fafafa",
    borderRadius: 10,
    marginBottom: 12,
  },
  listProductImageContainer: {
    width: 70,
    height: 70,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  listProductImage: {
    width: 50,
    height: 50,
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
    marginBottom: 4,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 2,
  },
  listProductRight: {
    alignItems: "flex-end",
    gap: 8,
  },
  listProductPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
  listAddButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  // See All Button
  seeAllButton: {
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 20,
  },
  seeAllButtonText: {
    color: "#9E9E9E",
    fontSize: 14,
    fontWeight: "500",
  },

  // Banner
  bannerContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  bannerDotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 16,
  },
  bannerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
  },
  activeBannerDot: {
    backgroundColor: "#00BCD4",
    width: 20,
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

export default ElectronicsCategoryScreen
