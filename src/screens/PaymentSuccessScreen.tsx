import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { RatingStars } from "../components/RatingStars"

const PaymentSuccessScreen: React.FC<{
  onBackHome?: () => void
}> = ({ onBackHome }) => {
  const [rating, setRating] = useState(0)
  const [activeNav, setActiveNav] = useState("home")

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.checkmarkCircle}>
            <Ionicons name="checkmark" size={48} color="#fff" />
          </View>
        </View>

        {/* Success Message */}
        <Text style={styles.successTitle}>Order placed successfully!</Text>
        <Text style={styles.successSubtitle}>Commodo eu ut sunt qui minim{"\n"}fugiat elit nisi enim</Text>

        {/* Order Summary */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>$2,800</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax (10%)</Text>
            <Text style={styles.summaryValue}>$280</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Fees</Text>
            <Text style={styles.summaryValue}>$0</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Card Info */}
          <View style={styles.cardRow}>
            <Text style={styles.summaryLabel}>Card</Text>
            <View style={styles.cardInfo}>
              <View style={styles.visaLogoSmall}>
                <Text style={styles.visaText}>VISA</Text>
              </View>
              <Text style={styles.cardNumber}>****** 2334</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Total */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <View style={styles.totalContainer}>
              <Text style={styles.successLabel}>Success</Text>
              <Text style={styles.totalAmount}>$3,080</Text>
            </View>
          </View>
        </View>

        {/* Experience Rating */}
        <View style={styles.ratingSection}>
          <Text style={styles.ratingQuestion}>How was your experience?</Text>
          <RatingStars rating={rating} setRating={setRating} size={32} />
        </View>

        {/* Back to Home Button */}
        <TouchableOpacity style={styles.backButton} onPress={onBackHome}>
          <Ionicons name="home" size={20} color="#fff" />
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>

      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: "center",
  },

  // Success Icon
  iconContainer: {
    marginBottom: 24,
  },
  checkmarkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#27AE60",
    justifyContent: "center",
    alignItems: "center",
  },

  // Success Message
  successTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#5B5FFF",
    marginBottom: 8,
    textAlign: "center",
  },
  successSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#999",
    textAlign: "center",
    marginBottom: 28,
    lineHeight: 20,
  },

  // Summary Section
  summarySection: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  // Card Row
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  visaLogoSmall: {
    width: 28,
    height: 28,
    backgroundColor: "#fff",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  visaText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1434CB",
  },
  cardNumber: {
    fontSize: 13,
    fontWeight: "500",
    color: "#666",
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 8,
  },

  // Total Row
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  successLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#27AE60",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },

  // Rating Section
  ratingSection: {
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },
  ratingQuestion: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    marginBottom: 16,
  },

  // Back Button
  backButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    backgroundColor: "#5B5FFF",
    borderRadius: 8,
    marginBottom: 16,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
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

export default PaymentSuccessScreen
