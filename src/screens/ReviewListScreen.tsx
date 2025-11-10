import type React from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import ReviewItem, { type Review } from "../components/ListReviewItem"

const reviews: Review[] = [
  {
    id: "1",
    name: "Emily Johnson",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    date: "2025-10-30",
    comment: "Absolutely love these headphones! The noise cancellation is incredible and the sound quality is pristine. Worth every penny!",
  },
  {
    id: "2",
    name: "David Nguyen",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    rating: 4,
    date: "2025-10-28",
    comment: "Great product overall. The battery life is amazing and they're very comfortable for long listening sessions. Minor connectivity issues occasionally.",
  },
  {
    id: "3",
    name: "Sophia Tran",
    avatar: "https://randomuser.me/api/portraits/women/19.jpg",
    rating: 5,
    date: "2025-10-25",
    comment: "Best purchase I've made this year! The audio quality exceeded my expectations. Fast shipping and excellent packaging too.",
  },
  {
    id: "4",
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    date: "2025-10-22",
    comment: "Solid build quality and impressive ANC technology. The companion app works seamlessly. Would recommend to audiophiles!",
  },
  {
    id: "5",
    name: "Jessica Williams",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 5,
    date: "2025-10-20",
    comment: "Perfect for my daily commute. The transparency mode is a game-changer and the fit is incredibly secure yet comfortable.",
  },
]

const ReviewListScreen: React.FC<{
  onNavigateFeedback?: () => void
  onBack?: () => void
}> = ({ onNavigateFeedback, onBack }) => {
  // Calculate average rating
  const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
  
  return (
    <View style={styles.container}>


      {/* Rating Summary */}
      <View style={styles.summaryCard}>
        <View style={styles.ratingContainer}>
          <Text style={styles.averageRating}>{averageRating}</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name={star <= Math.round(parseFloat(averageRating)) ? "star" : "star-outline"}
                size={20}
                color="#FFB800"
              />
            ))}
          </View>
          <Text style={styles.totalReviews}>Based on {reviews.length} reviews</Text>
        </View>
      </View>

      {/* Reviews List */}
      <View style={styles.listHeader}>
        <Text style={styles.sectionTitle}>Customer Reviews</Text>
        <Text style={styles.reviewCount}>{reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</Text>
      </View>

      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReviewItem item={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Write Review Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => onNavigateFeedback?.()}
        >
          <Ionicons name="create-outline" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.addButtonText}>Write a Review</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ReviewListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#5B5FFF",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  placeholder: {
    width: 40,
  },
  summaryCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  ratingContainer: {
    alignItems: "center",
  },
  averageRating: {
    fontSize: 48,
    fontWeight: "700",
    color: "#5B5FFF",
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 8,
  },
  totalReviews: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  reviewCount: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  separator: {
    height: 12,
  },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  addButton: {
    backgroundColor: "#5B5FFF",
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#5B5FFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonIcon: {
    marginRight: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
})