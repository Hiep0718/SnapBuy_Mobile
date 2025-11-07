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
    comment: "Rất hài lòng với chất lượng sản phẩm! Giao hàng nhanh, đóng gói cẩn thận.",
  },
  {
    id: "2",
    name: "David Nguyen",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    rating: 4,
    date: "2025-10-28",
    comment: "Sản phẩm ổn, màu sắc đẹp như hình. Tuy nhiên giao hơi chậm một chút.",
  },
  {
    id: "3",
    name: "Sophia Tran",
    avatar: "https://randomuser.me/api/portraits/women/19.jpg",
    rating: 3,
    date: "2025-10-25",
    comment: "Giá hợp lý, chất lượng tạm ổn. Hy vọng shop cải thiện giao hàng nhanh hơn.",
  },
]

const ReviewListScreen: React.FC<{
  onNavigateFeedback?: () => void
}> = ({ onNavigateFeedback }) => {
  return (
    <View style={styles.container}>
    

      {/* --- LIST --- */}
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReviewItem item={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />

      {/* --- ADD BUTTON --- */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          onNavigateFeedback?.()
        }}
      >
        <Text style={styles.addButtonText}>Write a Review</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ReviewListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  backButton: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
  },
  separator: {
    height: 12,
  },
  addButton: {
    backgroundColor: "#00c2ff",
    borderRadius: 24,
    paddingVertical: 12,
    marginTop: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})
