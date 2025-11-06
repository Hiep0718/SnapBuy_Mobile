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
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

// --- Mock Data ---
const carouselImages = [
  require("../../assets/icon.png"),
  require("../../assets/icon.png"),
  require("../../assets/icon.png"),
  require("../../assets/icon.png"),
]

const gridProducts = [
  { id: 1, name: "Pear", price: 3, rating: 4 },
  { id: 2, name: "Avocado", price: 4, rating: 4 },
  { id: 3, name: "Cherry", price: 10, rating: 5 },
  { id: 4, name: "Orange", price: 7, rating: 5 },
]

const relevantProducts = [
  { id: 5, name: "Peach", price: 15, rating: 4 },
  { id: 6, name: "Pomegranate", price: 23, rating: 4 },
]

const { width: screenWidth } = Dimensions.get("window")

// --- Component ---
const ProductListingScreen: React.FC<{
  onViewProductDetail?: () => void
}> = ({ onViewProductDetail }) => {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("home")
  const [activeNav, setActiveNav] = useState("home")

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x
    const currentIndex = Math.round(contentOffsetX / screenWidth)
    setCarouselIndex(currentIndex)
  }

  const renderRatingStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Ionicons key={i} name={i < rating ? "star" : "star-outline"} size={13} color="#FFC107" />
          ))}
      </View>
    )
  }

  const renderGridProduct = (product: any) => (
    <TouchableOpacity style={styles.gridProductCard} onPress={onViewProductDetail}>
      <View style={styles.productImageContainer}>
        <Image source={require("../../assets/icon.png")} style={styles.productImage} />
      </View>
      <Text style={styles.productName}>{product.name}</Text>
      <View style={styles.ratingRow}>{renderRatingStars(product.rating)}</View>
      <View style={styles.priceAddRow}>
        <Text style={styles.productPrice}>${product.price}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={22} color="#9E9E9E" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )

  const renderRelevantProduct = (product: any) => (
    <TouchableOpacity style={styles.relevantProductCard} key={product.id} onPress={onViewProductDetail}>
      <View style={styles.relevantImageContainer}>
        <Image source={require("../../assets/icon.png")} style={styles.relevantImage} />
      </View>
      <View style={styles.relevantContent}>
        <Text style={styles.relevantName}>{product.name}</Text>
        {renderRatingStars(product.rating)}
        <Text style={styles.relevantPrice}>${product.price}</Text>
      </View>
      <TouchableOpacity style={styles.relevantAddButton}>
        <Ionicons name="add-circle-outline" size={22} color="#9E9E9E" />
      </TouchableOpacity>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fresh Fruits</Text>
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
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#9E9E9E" />
          <Text style={styles.searchPlaceholder}>Search</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color="#9E9E9E" />
          </TouchableOpacity>
        </View>

        <View style={styles.carouselContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={styles.carouselScroll}
          >
            {carouselImages.map((img, index) => (
              <Image key={index} source={img} style={[styles.carouselImage, { width: screenWidth - 32 }]} />
            ))}
          </ScrollView>

          <View style={styles.dotsContainer}>
            {carouselImages.map((_, index) => (
              <View key={index} style={[styles.dot, index === carouselIndex && styles.activeDot]} />
            ))}
          </View>
        </View>

        <View style={styles.gridSection}>
          <FlatList
            data={gridProducts}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.gridWrapper}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderGridProduct(item)}
          />
        </View>

        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllButtonText}>See all</Text>
        </TouchableOpacity>

        <View style={styles.relevantSection}>
          <View style={styles.relevantHeader}>
            <Text style={styles.relevantTitle}>Relevant products</Text>
            <TouchableOpacity style={styles.seeAllLink}>
              <Text style={styles.seeLinkText}>See all</Text>
              <Ionicons name="chevron-forward" size={14} color="#9E9E9E" style={styles.chevronIcon} />
            </TouchableOpacity>
          </View>

          <View>{relevantProducts.map((product) => renderRelevantProduct(product))}</View>
        </View>

        {/* Bottom spacing to avoid tab bar overlap */}
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

  // Carousel
  carouselContainer: {
    marginBottom: 20,
  },
  carouselScroll: {
    marginBottom: 12,
  },
  carouselImage: {
    height: 200,
    borderRadius: 10,
    marginRight: 0,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
  },
  activeDot: {
    backgroundColor: "#00BCD4",
    width: 20,
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
    height: 150,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 6,
  },
  ratingRow: {
    marginBottom: 8,
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

  // Relevant Products Section
  relevantSection: {
    marginBottom: 12,
  },
  relevantHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  relevantTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  seeAllLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  seeLinkText: {
    color: "#9E9E9E",
    fontSize: 12,
    fontWeight: "500",
  },
  chevronIcon: {
    marginTop: 2,
  },
  relevantProductCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: "#fafafa",
    borderRadius: 8,
    marginBottom: 10,
  },
  relevantImageContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  relevantImage: {
    width: 45,
    height: 45,
  },
  relevantContent: {
    flex: 1,
  },
  relevantName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  relevantPrice: {
    fontSize: 13,
    fontWeight: "700",
    color: "#000",
    marginTop: 4,
  },
  relevantAddButton: {
    width: 24,
    height: 24,
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
