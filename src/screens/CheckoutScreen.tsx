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
      name: "Headphone",
      description: "Consequat ex eu",
      price: 500,
      quantity: 1,
      image: { uri: "https://via.placeholder.com/100?text=Headphone1" },
    },
    {
      id: "2",
      name: "Headphone",
      description: "Consequat ex eu",
      price: 300,
      quantity: 1,
      image: { uri: "https://via.placeholder.com/100?text=Headphone2" },
    },
  ]

  const [voucher, setVoucher] = useState("")

  const total = products.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      <FlatList
        data={products}
        renderItem={({ item }) => <CheckoutItem {...item} navigation={navigation} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Voucher input */}
      <View style={styles.voucherContainer}>
        <Text style={styles.voucherLabel}>Voucher</Text>
        <View style={styles.voucherInputContainer}>
          <TextInput
            placeholder="Enter voucher code"
            style={styles.voucherInput}
            value={voucher}
            onChangeText={setVoucher}
          />
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Total section */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>TOTAL</Text>
        <Text style={styles.totalAmount}>${total.toLocaleString()}</Text>
      </View>

      {/* Next button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => {
          console.log("[v0] Next button pressed, onNavigatePayment:", onNavigatePayment)
          onNavigatePayment?.()
        }}
      >
        <Text style={styles.nextText}>Next →</Text>
      </TouchableOpacity>

      {/* Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          console.log("[v0] Back button pressed, onBack:", onBack)
          onBack?.()
        }}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CheckoutScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  voucherContainer: {
    marginTop: 16,
  },
  voucherLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  voucherInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  voucherInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  applyButton: {
    backgroundColor: "#f3f3ff",
    marginLeft: 8,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  applyText: {
    color: "#8a8aff",
    fontWeight: "600",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "700",
  },
  nextButton: {
    backgroundColor: "#00c2ff",
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 30,
    alignItems: "center",
  },
  nextText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    backgroundColor: "#eee",
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 10,
    alignItems: "center",
  },
  backText: {
    color: "#555",
    fontSize: 16,
    fontWeight: "500",
  },
})
