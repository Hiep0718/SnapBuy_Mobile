"use client"

import type React from "react"
import { useState } from "react"
import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Ionicons } from "@expo/vector-icons"

// Import all screens
import HomeScreen from "./screens/HomeScreen"
import SearchScreen from "./screens/SearchScreen"
import FilterScreen from "./screens/FilterScreen"
import ProductDetailScreen from "./screens/ProductDetailScreen"
import ProductGridView from "./screens/ProductListingScreen"
import NotificationScreen from "./screens/NotificationScreen"
import AccountScreen from "./screens/AccountScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import CheckoutScreen from "./screens/CheckoutScreen"
import PaymentScreen from "./screens/PaymentScreen"
import PaymentSuccessScreen from "./screens/PaymentSuccessScreen"
import ReviewListScreen from "./screens/ReviewListScreen"
import FeedbackScreen from "./screens/FeedbackScreen"

interface TabScreenProps {
  name: string
  component: React.ComponentType<any>
  icon: string
  label: string
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("home")
  const [currentAuthScreen, setCurrentAuthScreen] = useState<"login" | "register" | null>(null)
  const [navigationStack, setNavigationStack] = useState<string[]>([])
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const tabScreens: TabScreenProps[] = [
    {
      name: "home",
      component: HomeScreen,
      icon: "home",
      label: "Home",
    },
    {
      name: "search",
      component: SearchScreen,
      icon: "search",
      label: "Search",
    },
    {
      name: "products",
      component: ProductGridView,
      icon: "grid",
      label: "Products",
    },
    {
      name: "notifications",
      component: NotificationScreen,
      icon: "notifications",
      label: "Notifications",
    },
    {
      name: "account",
      component: AccountScreen,
      icon: "person",
      label: "Account",
    },
  ]

  // Auth handlers
  const handleNavigateToLogin = () => {
    setCurrentAuthScreen("login")
  }

  const handleNavigateToRegister = () => {
    setCurrentAuthScreen("register")
  }

  const handleBackFromAuth = () => {
    setCurrentAuthScreen(null)
    setActiveTab("home")
  }

  // Navigation stack handlers
  const handleProductSelected = (product: any) => {
    setSelectedProduct(product)
    setNavigationStack([...navigationStack, "productDetail"])
  }

  const handleBackNavigation = () => {
    setNavigationStack(navigationStack.slice(0, -1))
  }

  const pushScreen = (screenName: string) => {
    setNavigationStack([...navigationStack, screenName])
  }

  const handlePaymentSuccessToHome = () => {
    setNavigationStack([])
    setActiveTab("home")
  }

  const currentScreen = navigationStack[navigationStack.length - 1]

  // Auth screens
  if (currentAuthScreen === "login") {
    return (
      <SafeAreaView style={styles.authContainer}>
        <LoginScreen onNavigate={handleNavigateToRegister} onSignInSuccess={handleBackFromAuth} />
      </SafeAreaView>
    )
  }

  if (currentAuthScreen === "register") {
    return (
      <SafeAreaView style={styles.authContainer}>
        <RegisterScreen onNavigate={handleNavigateToLogin} />
      </SafeAreaView>
    )
  }

  // Detail screens stack
  if (currentScreen === "productDetail") {
    return (
      <SafeAreaView style={styles.screenOverlay}>
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={handleBackNavigation}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.detailTitle}>Product Detail</Text>
          <View style={{ width: 24 }} />
        </View>
        <ProductDetailScreen
          onNavigateCheckout={() => pushScreen("checkout")}
          onNavigateReviews={() => pushScreen("reviews")}
        />
      </SafeAreaView>
    )
  }

  if (currentScreen === "checkout") {
    return (
      <SafeAreaView style={styles.screenOverlay}>
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={handleBackNavigation}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.detailTitle}>Checkout</Text>
          <View style={{ width: 24 }} />
        </View>
        <CheckoutScreen onNavigatePayment={() => pushScreen("payment")} onBack={handleBackNavigation} />
      </SafeAreaView>
    )
  }

  if (currentScreen === "payment") {
    return (
      <SafeAreaView style={styles.screenOverlay}>
        <PaymentScreen onPaymentSuccess={() => pushScreen("paymentSuccess")} onBack={handleBackNavigation} />
      </SafeAreaView>
    )
  }

  if (currentScreen === "paymentSuccess") {
    return (
      <SafeAreaView style={styles.screenOverlay}>
        <PaymentSuccessScreen onBackHome={handlePaymentSuccessToHome} />
      </SafeAreaView>
    )
  }

  if (currentScreen === "reviews") {
    return (
      <SafeAreaView style={styles.screenOverlay}>
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={handleBackNavigation}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.detailTitle}>Reviews</Text>
          <View style={{ width: 24 }} />
        </View>
        <ReviewListScreen onNavigateFeedback={() => pushScreen("feedback")} />
      </SafeAreaView>
    )
  }

  if (currentScreen === "feedback") {
    return (
      <SafeAreaView style={styles.screenOverlay}>
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={handleBackNavigation}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.detailTitle}>Write a Review</Text>
          <View style={{ width: 24 }} />
        </View>
        <FeedbackScreen onNavigateReviews={handleBackNavigation} />
      </SafeAreaView>
    )
  }

  if (showFilterModal) {
    return (
      <SafeAreaView style={styles.screenOverlay}>
        <View style={styles.detailHeader}>
          <View style={{ width: 24 }} />
          <Text style={styles.detailTitle}>Filter</Text>
          <TouchableOpacity onPress={() => setShowFilterModal(false)}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <FilterScreen />
      </SafeAreaView>
    )
  }

  // Main tab navigation
  const activeScreen = tabScreens.find((screen) => screen.name === activeTab)
  const ActiveComponent = activeScreen?.component || HomeScreen

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenContainer}>
        <ActiveComponent
          onNavigateLogin={handleNavigateToLogin}
          onNavigateRegister={handleNavigateToRegister}
          onViewProductDetail={handleProductSelected}
          onShowFilter={() => setShowFilterModal(true)}
          onHideFilter={() => setShowFilterModal(false)}
        />
      </View>

      <View style={styles.bottomTabBar}>
        {tabScreens.map((screen) => (
          <TouchableOpacity key={screen.name} style={styles.tabItem} onPress={() => setActiveTab(screen.name)}>
            <Ionicons
              name={activeTab === screen.name ? screen.icon : `${screen.icon}-outline`}
              size={24}
              color={activeTab === screen.name ? "#00BCD4" : "#9E9E9E"}
            />
            <Text style={[styles.tabLabel, activeTab === screen.name && styles.activeTabLabel]}>{screen.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  screenContainer: {
    flex: 1,
  },
  authContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  screenOverlay: {
    flex: 1,
    backgroundColor: "#fff",
  },
  detailHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  bottomTabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingVertical: 8,
    paddingBottom: 12,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    gap: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#9E9E9E",
    marginTop: 2,
  },
  activeTabLabel: {
    color: "#00BCD4",
    fontWeight: "700",
  },
})

export default App
