import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface AccountScreenProps {
  onNavigateLogin?: () => void
  onNavigateRegister?: () => void
}

const AccountScreen: React.FC<AccountScreenProps> = ({ onNavigateLogin, onNavigateRegister }) => {
  const [isLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Account</Text>
          </View>

          {/* Empty State Illustration */}
          <View style={styles.illustrationContainer}>
            <View style={styles.illustrationCircle}>
              <Ionicons name="person-outline" size={80} color="#00BCD4" />
            </View>
          </View>

          {/* Message */}
          <View style={styles.messageContainer}>
            <Text style={styles.messageTitle}>No Account Yet?</Text>
            <Text style={styles.messageSubtitle}>Sign in or create an account to access your profile and orders</Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={onNavigateLogin}>
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerButton} onPress={onNavigateRegister}>
              <Text style={styles.registerButtonText}>Create Account</Text>
            </TouchableOpacity>
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>Benefits of creating an account:</Text>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Faster Checkout</Text>
                <Text style={styles.featureDescription}>Save your shipping and payment info</Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Track Orders</Text>
                <Text style={styles.featureDescription}>View your order history and status</Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Exclusive Offers</Text>
                <Text style={styles.featureDescription}>Get special deals and rewards</Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Account</Text>
        <Text>Logged In User Content</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },

  // Header
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
  },

  // Illustration
  illustrationContainer: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 16,
  },
  illustrationCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f0f9fa",
    justifyContent: "center",
    alignItems: "center",
  },

  // Message
  messageContainer: {
    marginBottom: 32,
    alignItems: "center",
  },
  messageTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
    textAlign: "center",
  },
  messageSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#9E9E9E",
    textAlign: "center",
    lineHeight: 20,
  },

  // Buttons
  buttonsContainer: {
    gap: 12,
    marginBottom: 32,
  },
  loginButton: {
    paddingVertical: 14,
    backgroundColor: "#00BCD4",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  registerButton: {
    paddingVertical: 14,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  registerButtonText: {
    color: "#00BCD4",
    fontSize: 16,
    fontWeight: "700",
  },

  // Features
  featuresContainer: {
    gap: 16,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  featureItem: {
    flexDirection: "row",
    gap: 12,
  },
  featureIcon: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 12,
    fontWeight: "400",
    color: "#9E9E9E",
  },
})

export default AccountScreen
