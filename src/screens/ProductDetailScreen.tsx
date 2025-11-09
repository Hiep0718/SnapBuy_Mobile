import type React from "react"
import { useState, useRef } from "react"
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Dimensions,
  Animated,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { ProductCard } from "../components/Product_Detail_Card"
import { RatingStars } from "../components/RatingStars"
import { ReviewItem } from "../components/ReviewItem"

const { width } = Dimensions.get("window")

// Primary color theme
const PRIMARY_COLOR = "#5B5FFF"
const PRIMARY_LIGHT = "#E8E9FF"
const PRIMARY_DARK = "#4A4DCC"

const COLORS = {
  primary: PRIMARY_COLOR,
  primaryLight: PRIMARY_LIGHT,
  primaryDark: PRIMARY_DARK,
  text: {
    primary: "#1A1A1A",
    secondary: "#6B7280",
    tertiary: "#9CA3AF",
  },
  background: "#FFFFFF",
  surface: "#F8F9FA",
  border: "#E5E7EB",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
}

export const ProductDetailScreen: React.FC<{
  onNavigateCheckout?: () => void
  onNavigateReviews?: () => void
}> = ({ onNavigateCheckout, onNavigateReviews }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [notifyPromo, setNotifyPromo] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const scrollY = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(1)).current

  const productImages = [
    require("../../assets/products/electronics/laptop.jpg"),
    require("../../assets/products/electronics/smartphone-1.jpg"),
    require("../../assets/products/electronics/smartphone-2.jpg"),
  ]

  const handleFavoritePress = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1.3,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start()
    setIsFavorite(!isFavorite)
  }

  const features = [
    { icon: "flash", label: "Express Delivery", color: "#5B5FFF" },
    { icon: "return-down-back", label: "30-day Return", color: "#8B5FFF" },
    { icon: "star", label: "Top Rated", color: "#5B8FFF" },
    { icon: "shield-checkmark", label: "Authorized", color: "#5BAFFF" },
  ]

  const specs = [
    { label: "Brand", value: "TechPro" },
    { label: "Model", value: "TP-2024" },
    { label: "Warranty", value: "2 Years" },
    { label: "Color", value: "Space Gray" },
  ]

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
      >
        {/* Hero Image Section with Carousel */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width)
              setSelectedImageIndex(index)
            }}
          >
            {productImages.map((img, idx) => (
              <Image key={idx} source={img} style={styles.heroImage} />
            ))}
          </ScrollView>

          {/* Image Indicators */}
          <View style={styles.imageIndicators}>
            {productImages.map((_, idx) => (
              <View
                key={idx}
                style={[styles.indicator, selectedImageIndex === idx && styles.activeIndicator]}
              />
            ))}
          </View>

          {/* Floating Action Buttons */}
          <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={isFavorite ? PRIMARY_COLOR : "#fff"}
              />
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-social-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Content Section */}
        <View style={styles.contentContainer}>
          {/* Product Title & Price */}
          <View style={styles.titleSection}>
            <View style={styles.titleWrapper}>
              <Text style={styles.productTitle}>Premium Wireless Headphones</Text>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>Electronics</Text>
              </View>
            </View>

            <View style={styles.priceRow}>
              <View>
                <Text style={styles.currentPrice}>$59.00</Text>
                <Text style={styles.originalPrice}>$89.00</Text>
              </View>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>-34%</Text>
              </View>
            </View>
          </View>

          {/* Rating Summary */}
          <TouchableOpacity style={styles.ratingSection} onPress={onNavigateReviews}>
            <RatingStars rating={4.5} total={99} />
            <View style={styles.ratingDetail}>
              <Text style={styles.ratingNumber}>4.5</Text>
              <Text style={styles.ratingCount}>(99 reviews)</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.text.tertiary} />
          </TouchableOpacity>

          {/* Features Grid */}
          <View style={styles.featuresGrid}>
            {features.map((feature, idx) => (
              <View key={idx} style={styles.featureCard}>
                <View style={[styles.featureIcon, { backgroundColor: `${feature.color}15` }]}>
                  <Ionicons name={feature.icon as any} size={20} color={feature.color} />
                </View>
                <Text style={styles.featureLabel}>{feature.label}</Text>
              </View>
            ))}
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              Experience premium audio quality with our latest wireless headphones. Featuring active noise
              cancellation, 30-hour battery life, and premium comfort padding. Perfect for music lovers and
              professionals alike.
            </Text>
          </View>

          {/* Specifications */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Specifications</Text>
            <View style={styles.specsContainer}>
              {specs.map((spec, idx) => (
                <View key={idx} style={styles.specRow}>
                  <Text style={styles.specLabel}>{spec.label}</Text>
                  <Text style={styles.specValue}>{spec.value}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Reviews Preview */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Customer Reviews</Text>
              <TouchableOpacity onPress={onNavigateReviews}>
                <Text style={styles.seeAllLink}>See all</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.reviewsContainer}>
              <ReviewItem
                name="Jevon Raynor"
                date="1 day ago"
                comment="Amazing product! The sound quality is incredible and battery lasts for days."
                avatar="https://randomuser.me/api/portraits/men/10.jpg"
              />
              <ReviewItem
                name="Jason D."
                date="3 days ago"
                comment="Best purchase I've made this year. Highly recommend!"
                avatar="https://randomuser.me/api/portraits/men/11.jpg"
              />
            </View>
          </View>

          {/* Related Products */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>You May Also Like</Text>
              <Text style={styles.seeAllLink}>See all</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.relatedProducts}>
              <ProductCard
                name="Wireless Earbuds"
                price={49}
                rating={4.3}
                image={require("../../assets/products/electronics/smartphone-1.jpg")}
              />
              <ProductCard
                name="Smart Watch"
                price={129}
                rating={4.7}
                image={require("../../assets/products/electronics/smartphone-2.jpg")}
              />
              <ProductCard
                name="Phone Case"
                price={19}
                rating={4.5}
                image={require("../../assets/products/electronics/smartphone-3.jpg")}
              />
            </ScrollView>
          </View>

          {/* Notification Toggle */}
          <View style={styles.notificationCard}>
            <View style={styles.notificationContent}>
              <View style={styles.notificationIcon}>
                <Ionicons name="notifications" size={20} color={PRIMARY_COLOR} />
              </View>
              <View style={styles.notificationText}>
                <Text style={styles.notificationTitle}>Price Drop Alerts</Text>
                <Text style={styles.notificationSubtitle}>Get notified about promotions</Text>
              </View>
            </View>
            <Switch
              value={notifyPromo}
              onValueChange={setNotifyPromo}
              trackColor={{ false: "#D1D5DB", true: PRIMARY_LIGHT }}
              thumbColor={notifyPromo ? PRIMARY_COLOR : "#f4f3f4"}
            />
          </View>

          <View style={{ height: 100 }} />
        </View>
      </Animated.ScrollView>

      {/* Floating Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomBarContent}>
          <View style={styles.priceInfo}>
            <Text style={styles.bottomPrice}>$59.00</Text>
            <Text style={styles.stockInfo}>In Stock</Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.addToCartButton}>
              <Ionicons name="cart-outline" size={22} color={PRIMARY_COLOR} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buyNowButton} onPress={onNavigateCheckout}>
              <Text style={styles.buyNowText}>Buy Now</Text>
              <Ionicons name="arrow-forward" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: width,
    height: 380,
    backgroundColor: COLORS.surface,
    position: "relative",
  },
  heroImage: {
    width: width,
    height: 380,
    resizeMode: "cover",
  },
  imageIndicators: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  activeIndicator: {
    backgroundColor: PRIMARY_COLOR,
    width: 24,
  },
  favoriteButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  shareButton: {
    position: "absolute",
    top: 68,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  titleSection: {
    marginBottom: 16,
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text.primary,
    flex: 1,
    lineHeight: 32,
  },
  categoryBadge: {
    backgroundColor: PRIMARY_LIGHT,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: PRIMARY_COLOR,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  currentPrice: {
    fontSize: 32,
    fontWeight: "800",
    color: PRIMARY_COLOR,
  },
  originalPrice: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text.tertiary,
    textDecorationLine: "line-through",
    marginTop: 2,
  },
  discountBadge: {
    backgroundColor: PRIMARY_LIGHT,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  discountText: {
    fontSize: 16,
    fontWeight: "700",
    color: PRIMARY_COLOR,
  },
  ratingSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
  },
  ratingDetail: {
    flexDirection: "row",
    alignItems: "baseline",
    marginLeft: 12,
    flex: 1,
  },
  ratingNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text.primary,
    marginRight: 4,
  },
  ratingCount: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  featureCard: {
    width: (width - 48) / 2,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  featureLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text.primary,
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text.primary,
  },
  seeAllLink: {
    fontSize: 14,
    fontWeight: "600",
    color: PRIMARY_COLOR,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.text.secondary,
  },
  specsContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  specLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text.secondary,
  },
  specValue: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  reviewsContainer: {
    gap: 12,
  },
  relatedProducts: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  notificationCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: PRIMARY_LIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  notificationSubtitle: {
    fontSize: 13,
    color: COLORS.text.secondary,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  bottomBarContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceInfo: {
    flex: 1,
  },
  bottomPrice: {
    fontSize: 24,
    fontWeight: "800",
    color: PRIMARY_COLOR,
  },
  stockInfo: {
    fontSize: 13,
    color: COLORS.success,
    fontWeight: "600",
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  addToCartButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: PRIMARY_LIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  buyNowButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 24,
    gap: 8,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buyNowText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
})

export default ProductDetailScreen