import type React from "react"
import { useState } from "react"
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { GridProductCard } from "../components/GridProductCard"

// --- Mock Data ---
const searchHistory = ["iPhone 15", "Samsung Galaxy", "iPad Pro", "MacBook"]

const popularSearches = ["Smartphone", "Laptop", "Tablet", "Headphones", "Camera", "Watch"]

const searchResults = [
  { id: 1, name: "iPhone 15 Pro", price: 1099, rating: 5, image: require("../../assets/icon.png") },
  { id: 2, name: "Samsung Galaxy S24", price: 899, rating: 4.5, image: require("../../assets/icon.png") },
  { id: 3, name: "Google Pixel 8", price: 799, rating: 4, image: require("../../assets/icon.png") },
  { id: 4, name: "OnePlus 12", price: 699, rating: 4.5, image: require("../../assets/icon.png") },
  { id: 5, name: "Xiaomi 14", price: 599, rating: 4, image: require("../../assets/icon.png") },
  { id: 6, name: "Motorola Edge", price: 549, rating: 3.5, image: require("../../assets/icon.png") },
]

const { width: screenWidth } = Dimensions.get("window")
const columnWidth = (screenWidth - 48) / 2

// --- Component ---
const SearchScreen: React.FC = () => {
  const [searchText, setSearchText] = useState("")
  const [activeNav, setActiveNav] = useState("search")
  const [filterModalVisible, setFilterModalVisible] = useState(false)

  const renderGridProduct = (product: any) => (
    <GridProductCard key={product.id} product={product} columnWidth={columnWidth} />
  )

  const renderSearchHistoryItem = (item: string, index: number) => (
    <TouchableOpacity key={index} style={styles.historyItem}>
      <Ionicons name="time-outline" size={16} color="#9E9E9E" />
      <Text style={styles.historyText}>{item}</Text>
      <Ionicons name="arrow-forward-outline" size={14} color="#9E9E9E" />
    </TouchableOpacity>
  )

  const renderPopularSearch = (search: string, index: number) => (
    <TouchableOpacity key={index} style={styles.popularSearchTag}>
      <Text style={styles.popularSearchText}>{search}</Text>
    </TouchableOpacity>
  )

  const hasSearchResults = searchText.length > 0

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.searchBarContainer}>
          <Ionicons name="search-outline" size={20} color="#9E9E9E" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor="#9E9E9E"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText("")}>
              <Ionicons name="close-circle" size={20} color="#9E9E9E" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.filterButton} onPress={() => setFilterModalVisible(!filterModalVisible)}>
          <Ionicons name="options-outline" size={20} color="#00BCD4" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {!hasSearchResults ? (
          <>
            {/* Search History Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Searches</Text>
                <TouchableOpacity>
                  <Text style={styles.clearText}>Clear all</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.historyList}>
                {searchHistory.map((item, index) => renderSearchHistoryItem(item, index))}
              </View>
            </View>

            {/* Popular Searches Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Popular Searches</Text>
              <View style={styles.popularSearchContainer}>
                {popularSearches.map((search, index) => renderPopularSearch(search, index))}
              </View>
            </View>

            {/* Suggested Categories Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Suggested for You</Text>
              <View style={styles.suggestedGrid}>
                {[
                  { title: "Electronics", icon: "phone-portrait-outline", color: "#FFE5CC" },
                  { title: "Fashion", icon: "shirt-outline", color: "#CCE5FF" },
                  { title: "Home", icon: "home-outline", color: "#E5CCFF" },
                  { title: "Sports", icon: "football-outline", color: "#CCFFCC" },
                ].map((item, index) => (
                  <TouchableOpacity key={index} style={[styles.suggestedCard, { backgroundColor: item.color }]}>
                    <Ionicons name={item.icon as any} size={32} color="#000" />
                    <Text style={styles.suggestedCardText}>{item.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        ) : (
          <>
            {/* Search Results Header */}
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsText}>
                Found {searchResults.length} results for "<Text style={styles.searchTermHighlight}>{searchText}</Text>"
              </Text>
            </View>

            {/* Search Results Grid */}
            <View style={styles.gridContainer}>{searchResults.map((product) => renderGridProduct(product))}</View>
          </>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Tab Navigation */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveNav("home")}>
          <Ionicons
            name={activeNav === "home" ? "home" : "home-outline"}
            size={24}
            color={activeNav === "home" ? "#00BCD4" : "#9E9E9E"}
          />
          <Text style={[styles.tabLabel, activeNav === "home" && styles.activeTabLabel]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveNav("search")}>
          <Ionicons
            name={activeNav === "search" ? "search" : "search-outline"}
            size={24}
            color={activeNav === "search" ? "#00BCD4" : "#9E9E9E"}
          />
          <Text style={[styles.tabLabel, activeNav === "search" && styles.activeTabLabel]}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveNav("favorites")}>
          <Ionicons
            name={activeNav === "favorites" ? "heart" : "heart-outline"}
            size={24}
            color={activeNav === "favorites" ? "#00BCD4" : "#9E9E9E"}
          />
          <Text style={[styles.tabLabel, activeNav === "favorites" && styles.activeTabLabel]}>Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveNav("inbox")}>
          <View style={styles.tabIconContainer}>
            <Ionicons
              name={activeNav === "inbox" ? "mail" : "mail-outline"}
              size={24}
              color={activeNav === "inbox" ? "#00BCD4" : "#9E9E9E"}
            />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </View>
          <Text style={[styles.tabLabel, activeNav === "inbox" && styles.activeTabLabel]}>Inbox</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveNav("account")}>
          <Ionicons
            name={activeNav === "account" ? "person" : "person-outline"}
            size={24}
            color={activeNav === "account" ? "#00BCD4" : "#9E9E9E"}
          />
          <Text style={[styles.tabLabel, activeNav === "account" && styles.activeTabLabel]}>Account</Text>
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
  },

  // Header
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },

  // Section
  section: {
    marginVertical: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  clearText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#00BCD4",
  },

  // Search History
  historyList: {
    gap: 8,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  historyText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },

  // Popular Searches
  popularSearchContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  popularSearchTag: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  popularSearchText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
  },

  // Suggested Categories
  suggestedGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  suggestedCard: {
    width: (screenWidth - 48) / 2,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  suggestedCardText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
  },

  // Search Results
  resultsHeader: {
    marginVertical: 16,
  },
  resultsText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#9E9E9E",
  },
  searchTermHighlight: {
    fontWeight: "700",
    color: "#000",
  },

  // Grid Products
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
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

export default SearchScreen
