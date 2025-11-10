"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from "react-native"
import CheckoutItem from "../components/CheckoutItem"

interface Product {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  image: any
}

const CheckoutScreen: React.FC<{
  onNavigatePayment?: () => void
  onBack?: () => void
  navigation?: any
  cart?: any[]
}> = ({ onNavigatePayment, onBack, navigation, cart }) => {
  const products = cart && cart.length > 0 ? cart : [
    {
      id: "1",
      name: "Sony WH-1000XM5 Wireless Headphones",
      description: "Premium noise-cancelling over-ear headphones with 30-hour battery life",
      price: 399,
      quantity: 1,
      image: require("../../assets/products/electronics/smartphone-1.jpg"),
    },
    {
      id: "2",
      name: "Apple AirPods Pro (2nd Generation)",
      description: "Active noise cancellation with adaptive transparency mode",
      price: 249,
      quantity: 2,
      image: require("../../assets/products/electronics/smartphone-2.jpg"),
    },
    {
      id: "3",
      name: "Samsung Galaxy Buds2 Pro",
      description: "360 audio with intelligent ANC and Hi-Fi sound quality",
      price: 199,
      quantity: 1,
      image: require("../../assets/products/electronics/smartphone-2.jpg"),
    },
  ]

  const [voucher, setVoucher] = useState("")

  const subtotal = products.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = 0
  const total = subtotal - discount

  return (
    <View style={styles.container}>

      {/* Products List */}
      <View style={styles.content}>
        <View style={styles.orderHeader}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <Text style={styles.itemCount}>{products.length} {products.length === 1 ? 'item' : 'items'}</Text>
        </View>
        <FlatList
          data={products}
          renderItem={({ item }) => <CheckoutItem {...item} navigation={navigation} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        {/* Voucher Section */}
        <View style={styles.voucherSection}>
          <Text style={styles.sectionTitle}>Promo Code</Text>
          <View style={styles.voucherInputContainer}>
            <TextInput
              placeholder="Enter voucher code"
              placeholderTextColor="#999"
              style={styles.voucherInput}
              value={voucher}
              onChangeText={setVoucher}
            />
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Price Summary */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal ({products.length} items)</Text>
            <Text style={styles.summaryValue}>${subtotal.toLocaleString()}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.freeText}>FREE</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Discount</Text>
            <Text style={styles.discountValue}>-${discount.toLocaleString()}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>${total.toLocaleString()}</Text>
          </View>
        </View>
      </View>

      {/* Bottom Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            console.log("[v0] Next button pressed, onNavigatePayment:", onNavigatePayment)
            onNavigatePayment?.()
          }}
        >
          <Text style={styles.nextText}>Proceed to Payment</Text>
          <Text style={styles.nextIcon}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CheckoutScreen

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
  backButtonHeader: {
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  itemCount: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  listContent: {
    paddingBottom: 10,
  },
  voucherSection: {
    marginTop: 24,
    marginBottom: 24,
  },
  voucherInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 4,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  voucherInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: "#1A1A1A",
  },
  applyButton: {
    backgroundColor: "#5B5FFF",
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  applyText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  summarySection: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 15,
    color: "#666",
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 15,
    color: "#1A1A1A",
    fontWeight: "600",
  },
  freeText: {
    fontSize: 15,
    color: "#00C851",
    fontWeight: "700",
  },
  discountValue: {
    fontSize: 15,
    color: "#5B5FFF",
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#5B5FFF",
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  nextButton: {
    backgroundColor: "#5B5FFF",
    borderRadius: 16,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#5B5FFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  nextText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    marginRight: 8,
  },
  nextIcon: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
})