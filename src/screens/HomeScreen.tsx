"use client"

import type React from "react"
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import ProductCard from "../components/ProductCard"
import { ASSET_PATHS } from "../constants/assetPaths"
import { SNAPBUY_COLORS } from "../constants/theme"

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
  onNavigateToCategory?: (category: any) => void
}> = ({ onViewProductDetail, onNavigateToCart, onNavigateToProfile, onNavigateToSearch, onNavigateToCategory }) => {
  const renderCategoryItem = (category: any) => (
    <TouchableOpacity key={category.id} style={styles.categoryItem} onPress={() => onNavigateToCategory?.(category)}>
      <View style={styles.categoryImageContainer}>
        <Image source={category.image} style={styles.categoryImage} resizeMode="cover" />
      </View>
      <Text style={styles.categoryName}>{category.name}</Text>
    </TouchableOpacity>
  )

  const filteredProducts = recommendedProducts

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <View style={styles.logoContainer}>
            <Image source={require("../../assets/app-icons/logo.png")} style={styles.logoImage} resizeMode="contain" />
          </View>
          <View>
            <Text style={styles.greetingText}>Hello 👋</Text>
            <Text style={styles.userName}>Welcome back!</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={onNavigateToCart}>
            <Ionicons name="cart-outline" size={24} color={SNAPBUY_COLORS.text.primary} />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.avatarButton} onPress={onNavigateToProfile}>
            <Image source={require("../../assets/avatars/user-3.jpg")} style={styles.avatar} resizeMode="cover" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <TouchableOpacity style={styles.searchBar} onPress={onNavigateToSearch} activeOpacity={0.7}>
          <Ionicons name="search-outline" size={20} color={SNAPBUY_COLORS.text.tertiary} />
          <Text style={styles.searchText}>Search for products...</Text>
        </TouchableOpacity>

        {/* Categories Section */}
        <View style={styles.section1}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
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
              <Text style={styles.mainBannerTitle}> </Text>
              <Text style={styles.mainBannerDiscount}></Text>
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
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productsScroll}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onPress={() => onViewProductDetail?.(product)} />
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

        {/* Trending Now */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Now</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.trendingContainer}>
            {[
              { id: 1, title: "Summer Collection", tag: "HOT", count: "2.3K" },
              { id: 2, title: "Gaming Gear", tag: "NEW", count: "1.8K" },
              { id: 3, title: "Beauty Essentials", tag: "TOP", count: "3.1K" },
            ].map((item) => (
              <TouchableOpacity key={item.id} style={styles.trendingCard} activeOpacity={0.8}>
                <View style={styles.trendingTag}>
                  <Text style={styles.trendingTagText}>{item.tag}</Text>
                </View>
                <Text style={styles.trendingTitle}>{item.title}</Text>
                <Text style={styles.trendingCount}>{item.count} items</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Limited Time Offers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⏰ Limited Time Offers</Text>
          <TouchableOpacity style={styles.limitedOfferCard} activeOpacity={0.9}>
            <View style={styles.limitedOfferLeft}>
              <Text style={styles.limitedOfferLabel}>MEGA SALE</Text>
              <Text style={styles.limitedOfferTitle}>Up to 70% OFF</Text>
              <View style={styles.limitedOfferTimer}>
                <View style={styles.timerBox}>
                  <Text style={styles.timerValue}>12</Text>
                  <Text style={styles.timerLabel}>H</Text>
                </View>
                <View style={styles.timerBox}>
                  <Text style={styles.timerValue}>45</Text>
                  <Text style={styles.timerLabel}>M</Text>
                </View>
                <View style={styles.timerBox}>
                  <Text style={styles.timerValue}>30</Text>
                  <Text style={styles.timerLabel}>S</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.shopLimitedButton}>
                <Text style={styles.shopLimitedButtonText}>Shop Now</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.limitedOfferRight}>
              <View style={styles.limitedOfferBadge}>
                <Text style={styles.badgeNumber}>70%</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Top Rated This Week */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>⭐ Top Rated This Week</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          <View>
            {[
              { id: 1, name: "Pro Wireless Earbuds", rating: 4.9, price: "$129" },
              { id: 2, name: "Premium Smartwatch", rating: 4.8, price: "$299" },
              { id: 3, name: "Ultra Laptop Pro", rating: 4.7, price: "$1299" },
            ].map((item, index) => (
              <TouchableOpacity key={item.id} style={styles.topRatedItem} activeOpacity={0.7}>
                <View style={styles.topRatedRank}>
                  <Text style={styles.topRatedRankText}>#{index + 1}</Text>
                </View>
                <View style={styles.topRatedInfo}>
                  <Text style={styles.topRatedName}>{item.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#FFB800" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                </View>
                <Text style={styles.topRatedPrice}>{item.price}</Text>
                <Ionicons name="chevron-forward" size={20} color={SNAPBUY_COLORS.primary} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Special Collections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Curated Collections</Text>
          <View style={styles.collectionsGrid}>
            {[
              { title: "Work From Home", icon: "💼" },
              { title: "Fitness & Health", icon: "💪" },
              { title: "Gaming Setup", icon: "🎮" },
              { title: "Smart Home", icon: "🏠" },
            ].map((col, idx) => (
              <TouchableOpacity key={idx} style={styles.collectionCard} activeOpacity={0.8}>
                <Text style={styles.collectionIcon}>{col.icon}</Text>
                <Text style={styles.collectionTitle}>{col.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Newsletter Signup */}
        <View style={styles.section}>
          <View style={styles.newsletterCard}>
            <View style={styles.newsletterContent}>
              <Text style={styles.newsletterTitle}>Get Special Deals</Text>
              <Text style={styles.newsletterSubtitle}>Subscribe to our newsletter for exclusive offers</Text>
              <View style={styles.newsletterInput}>
                <Ionicons name="mail-outline" size={18} color={SNAPBUY_COLORS.text.tertiary} />
                <Text style={styles.newsletterInputText}>Enter your email</Text>
              </View>
              <TouchableOpacity style={styles.newsletterButton}>
                <Text style={styles.newsletterButtonText}>Subscribe</Text>
                <Ionicons name="arrow-forward" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.newsletterIcon}>
              <Text style={{ fontSize: 48 }}>📧</Text>
            </View>
          </View>
        </View>

        {/* Why Choose SnapBuy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose SnapBuy?</Text>
          <View style={styles.featuresList}>
            {[
              { icon: "checkmark-circle", title: "Fast & Free Shipping", desc: "On orders over $50" },
              { icon: "shield-checkmark", title: "100% Secure", desc: "SSL encrypted checkout" },
              { icon: "arrow-undo", title: "Easy Returns", desc: "30-day return policy" },
              { icon: "headset", title: "24/7 Support", desc: "Always here to help" },
            ].map((feature, idx) => (
              <View key={idx} style={styles.featureItem}>
                <View style={styles.featureIconBox}>
                  <Ionicons name={feature.icon as any} size={24} color={SNAPBUY_COLORS.primary} />
                </View>
                <View style={styles.featureTextBox}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDesc}>{feature.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: SNAPBUY_COLORS.background,
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
    borderBottomColor: SNAPBUY_COLORS.border,
    backgroundColor: SNAPBUY_COLORS.surface,
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
    backgroundColor: SNAPBUY_COLORS.surfaceLight,
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
    color: SNAPBUY_COLORS.text.secondary,
    fontWeight: "500",
  },
  userName: {
    fontSize: 16,
    fontWeight: "700",
    color: SNAPBUY_COLORS.text.primary,
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
    backgroundColor: SNAPBUY_COLORS.accent,
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
    borderColor: SNAPBUY_COLORS.primary,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },

  // Search Bar
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: SNAPBUY_COLORS.surfaceLight,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: SNAPBUY_COLORS.text.primary,
    fontWeight: "500",
  },
  searchText: {
    flex: 1,
    fontSize: 14,
    color: SNAPBUY_COLORS.text.tertiary,
    fontWeight: "500",
  },

  // Section
  section1: {
    paddingHorizontal: 16,
  },
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
    color: SNAPBUY_COLORS.text.primary,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: SNAPBUY_COLORS.primary,
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
    backgroundColor: SNAPBUY_COLORS.surfaceLight,
    borderWidth: 2,
    borderColor: SNAPBUY_COLORS.border,
  },
  categoryImage: {
    width: "100%",
    height: "100%",
  },
  categoryName: {
    fontSize: 12,
    fontWeight: "600",
    color: SNAPBUY_COLORS.text.primary,
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
    color: SNAPBUY_COLORS.primary,
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
    color: SNAPBUY_COLORS.accent,
    marginBottom: 12,
  },
  shopNowButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: SNAPBUY_COLORS.primary,
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
    backgroundColor: SNAPBUY_COLORS.accent,
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
    backgroundColor: SNAPBUY_COLORS.surfaceLight,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: SNAPBUY_COLORS.border,
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
    color: SNAPBUY_COLORS.text.secondary,
  },

  // Trending Now
  trendingContainer: {
    flexDirection: "row",
    gap: 12,
  },
  trendingCard: {
    flex: 1,
    backgroundColor: SNAPBUY_COLORS.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: SNAPBUY_COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  trendingTag: {
    backgroundColor: SNAPBUY_COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 8,
  },
  trendingTagText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  trendingTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: SNAPBUY_COLORS.text.primary,
    textAlign: "center",
    marginBottom: 4,
  },
  trendingCount: {
    fontSize: 11,
    color: SNAPBUY_COLORS.text.secondary,
    fontWeight: "500",
  },

  // Limited Time Offers
  limitedOfferCard: {
    flexDirection: "row",
    backgroundColor: SNAPBUY_COLORS.primary,
    borderRadius: 18,
    padding: 20,
    marginTop: 12,
    alignItems: "center",
    overflow: "hidden",
  },
  limitedOfferLeft: {
    flex: 1,
    gap: 8,
  },
  limitedOfferLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFD700",
    letterSpacing: 1.5,
  },
  limitedOfferTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#fff",
  },
  limitedOfferTimer: {
    flexDirection: "row",
    gap: 8,
    marginVertical: 12,
  },
  timerBox: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: "center",
  },
  timerValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
  timerLabel: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "600",
  },
  shopLimitedButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  shopLimitedButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: SNAPBUY_COLORS.primary,
  },
  limitedOfferRight: {
    marginLeft: 20,
  },
  limitedOfferBadge: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.4)",
  },
  badgeNumber: {
    fontSize: 36,
    fontWeight: "900",
    color: "#fff",
  },

  // Top Rated This Week
  topRatedItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: SNAPBUY_COLORS.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: SNAPBUY_COLORS.border,
  },
  topRatedRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: SNAPBUY_COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  topRatedRankText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
  },
  topRatedInfo: {
    flex: 1,
  },
  topRatedName: {
    fontSize: 13,
    fontWeight: "700",
    color: SNAPBUY_COLORS.text.primary,
    marginBottom: 3,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "600",
    color: SNAPBUY_COLORS.text.secondary,
  },
  topRatedPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: SNAPBUY_COLORS.primary,
    marginRight: 10,
  },

  // Special Collections
  collectionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 12,
  },
  collectionCard: {
    width: (screenWidth - 60) / 2,
    aspectRatio: 1,
    backgroundColor: SNAPBUY_COLORS.surface,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: SNAPBUY_COLORS.border,
  },
  collectionIcon: {
    fontSize: 32,
  },
  collectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: SNAPBUY_COLORS.text.primary,
    textAlign: "center",
  },

  // Newsletter Signup
  newsletterCard: {
    flexDirection: "row",
    backgroundColor: SNAPBUY_COLORS.primary,
    borderRadius: 18,
    padding: 20,
    marginTop: 12,
    alignItems: "center",
    overflow: "hidden",
  },
  newsletterContent: {
    flex: 1,
    gap: 12,
  },
  newsletterTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
  },
  newsletterSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "500",
  },
  newsletterInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  newsletterInputText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    fontWeight: "500",
  },
  newsletterButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
  },
  newsletterButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: SNAPBUY_COLORS.primary,
  },
  newsletterIcon: {
    marginLeft: 20,
  },

  // Why Choose SnapBuy
  featuresList: {
    gap: 12,
    marginTop: 14,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: SNAPBUY_COLORS.surface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: SNAPBUY_COLORS.border,
  },
  featureIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(91, 95, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  featureTextBox: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: SNAPBUY_COLORS.text.primary,
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 12,
    color: SNAPBUY_COLORS.text.secondary,
    fontWeight: "500",
  },

  // Footer Info
  footerInfo: {
    alignItems: "center",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: SNAPBUY_COLORS.border,
    marginTop: 20,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: SNAPBUY_COLORS.text.primary,
    marginBottom: 4,
  },
  footerSubtitle: {
    fontSize: 12,
    color: SNAPBUY_COLORS.text.secondary,
    marginBottom: 12,
  },
  socialLinks: {
    flexDirection: "row",
    gap: 16,
  },
  socialButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: SNAPBUY_COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: SNAPBUY_COLORS.border,
  },
})

export default HomeScreen
