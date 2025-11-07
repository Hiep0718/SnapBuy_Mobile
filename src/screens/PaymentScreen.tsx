"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

// --- Mock Data ---
const paymentMethods = [
  {
    id: 1,
    type: "visa",
    name: "VISA",
    cardNumber: "****2334",
    logo: "card-outline",
    icon: require("../../assets/icon.png"),
  },
  {
    id: 2,
    type: "mastercard",
    name: "Mastercard",
    cardNumber: "****3774",
    logo: "card-outline",
    icon: require("../../assets/icon.png"),
  },
  {
    id: 3,
    type: "paypal",
    name: "PayPal",
    cardNumber: "abc@gmail.com",
    logo: "logo-paypal",
  },
]

// --- Component ---
const PaymentScreen: React.FC<{
  onPaymentSuccess?: () => void
  onBack?: () => void
}> = ({ onPaymentSuccess, onBack }) => {
  const [selectedPayment, setSelectedPayment] = useState(1)
  const [activeNav, setActiveNav] = useState("home")

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Main Content */}
      <View style={styles.container}>
        {/* Total Section */}
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>TOTAL</Text>
          <Text style={styles.totalAmount}>$3,080</Text>
        </View>

        {/* Payment Methods */}
        <View style={styles.paymentMethodsContainer}>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[styles.paymentCard, selectedPayment === method.id && styles.selectedPaymentCard]}
              onPress={() => setSelectedPayment(method.id)}
            >
              <View style={styles.paymentCardContent}>
                {method.type === "paypal" ? (
                  <Ionicons name="logo-paypal" size={28} color="#003087" />
                ) : method.type === "mastercard" ? (
                  <View style={styles.mastercardLogo}>
                    <View style={[styles.circle, { backgroundColor: "#EB001B" }]} />
                    <View style={[styles.circle, { backgroundColor: "#F79E1B", marginLeft: -10 }]} />
                  </View>
                ) : (
                  <View style={styles.visaLogo}>
                    <Text style={{ color: "#1434CB", fontWeight: "bold", fontSize: 12 }}>VISA</Text>
                  </View>
                )}
                <Text style={styles.cardNumber}>{method.cardNumber}</Text>
              </View>
              <View style={[styles.radioButton, selectedPayment === method.id && styles.radioButtonSelected]}>
                {selectedPayment === method.id && <View style={styles.radioButtonInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Pay Now Button */}
        <TouchableOpacity style={styles.payButton} onPress={onPaymentSuccess}>
          <Ionicons name="wallet-outline" size={20} color="#fff" />
          <Text style={styles.payButtonText}>Pay now</Text>
        </TouchableOpacity>

        {/* Add New Card */}
        <TouchableOpacity style={styles.addCardButton}>
          <Ionicons name="add-outline" size={20} color="#00BCD4" />
          <Text style={styles.addCardText}>Add new card</Text>
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
    paddingVertical: 24,
    justifyContent: "flex-start",
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
    textAlign: "center",
  },

  // Total Section
  totalSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#9E9E9E",
    letterSpacing: 1,
  },
  totalAmount: {
    fontSize: 36,
    fontWeight: "700",
    color: "#000",
    marginTop: 6,
  },

  // Payment Methods
  paymentMethodsContainer: {
    marginBottom: 32,
    gap: 12,
  },
  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#f0f0f0",
  },
  selectedPaymentCard: {
    borderColor: "#00BCD4",
    backgroundColor: "#f0fbfc",
  },
  paymentCardContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  visaLogo: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  mastercardLogo: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  cardNumber: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#d0d0d0",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: "#00BCD4",
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#00BCD4",
  },

  // Pay Button
  payButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    backgroundColor: "#00BCD4",
    borderRadius: 8,
    marginBottom: 16,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  // Add Card Button
  addCardButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 14,
  },
  addCardText: {
    color: "#00BCD4",
    fontSize: 14,
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

export default PaymentScreen
