import type React from "react"
import { useState } from "react"
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from "react-native"
import { Ionicons } from "@expo/vector-icons"

// --- Component ---
const FilterScreen: React.FC = () => {
  const [shippingOptions, setShippingOptions] = useState({
    instant: false,
    express: false,
    standard: false,
  })

  const [priceRange, setPriceRange] = useState({ min: 10, max: 1000 })
  const [expandedSections, setExpandedSections] = useState({
    shipping: true,
    price: true,
    review: true,
    others: true,
  })
  const [selectedReview, setSelectedReview] = useState(4)
  const [selectedOthers, setSelectedOthers] = useState<string[]>(["30-day"])

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const toggleShippingOption = (option: keyof typeof shippingOptions) => {
    setShippingOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }))
  }

  const toggleOtherOption = (option: string) => {
    setSelectedOthers((prev) => (prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]))
  }

  const renderRatingStars = (count: number) => (
    <View style={styles.starsRow}>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Ionicons key={i} name="star" size={16} color={i < count ? "#FFC107" : "#E0E0E0"} />
        ))}
    </View>
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Filter</Text>
        <TouchableOpacity>
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Shipping Options Section */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection("shipping")}>
            <Text style={styles.sectionTitle}>Shipping options</Text>
            <Ionicons name={expandedSections.shipping ? "chevron-up" : "chevron-down"} size={20} color="#000" />
          </TouchableOpacity>

          {expandedSections.shipping && (
            <View style={styles.sectionContent}>
              <View style={styles.checkboxRow}>
                <TouchableOpacity style={styles.checkbox} onPress={() => toggleShippingOption("instant")}>
                  {shippingOptions.instant && <View style={styles.checkboxInner} />}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>Instant (2 hours delivery)</Text>
              </View>

              <View style={styles.checkboxRow}>
                <TouchableOpacity style={styles.checkbox} onPress={() => toggleShippingOption("express")}>
                  {shippingOptions.express && <View style={styles.checkboxInner} />}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>Express (2 days delivery)</Text>
              </View>

              <View style={styles.checkboxRow}>
                <TouchableOpacity style={styles.checkbox} onPress={() => toggleShippingOption("standard")}>
                  {shippingOptions.standard && <View style={styles.checkboxInner} />}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>Standard (7- 10 days delivery)</Text>
              </View>
            </View>
          )}

          <View style={styles.divider} />
        </View>

        {/* Price Range Section */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection("price")}>
            <Text style={styles.sectionTitle}>Price range</Text>
            <Ionicons name={expandedSections.price ? "chevron-up" : "chevron-down"} size={20} color="#000" />
          </TouchableOpacity>

          {expandedSections.price && (
            <View style={styles.sectionContent}>
              <View style={styles.priceInputsRow}>
                <View style={styles.priceInputContainer}>
                  <Text style={styles.currencySymbol}>$</Text>
                  <TextInput
                    style={styles.priceInput}
                    value={priceRange.min.toString()}
                    onChangeText={(text) => setPriceRange((prev) => ({ ...prev, min: Number.parseInt(text) || 0 }))}
                    keyboardType="numeric"
                    placeholder="10"
                  />
                </View>

                <View style={styles.priceInputContainer}>
                  <Text style={styles.currencySymbol}>$</Text>
                  <TextInput
                    style={styles.priceInput}
                    value={priceRange.max.toString()}
                    onChangeText={(text) => setPriceRange((prev) => ({ ...prev, max: Number.parseInt(text) || 1000 }))}
                    keyboardType="numeric"
                    placeholder="1000"
                  />
                </View>
              </View>

              {/* Dual Slider */}
              <View style={styles.sliderContainer}>
                <View style={styles.sliderTrack}>
                  <View style={styles.sliderFill} />
                </View>
                <View style={styles.sliderHandlesContainer}>
                  <View style={[styles.sliderHandle, { left: "10%" }]} />
                  <View style={[styles.sliderHandle, { right: "0%" }]} />
                </View>
              </View>
            </View>
          )}

          <View style={styles.divider} />
        </View>

        {/* Average Review Section */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection("review")}>
            <Text style={styles.sectionTitle}>Average review</Text>
            <Ionicons name={expandedSections.review ? "chevron-up" : "chevron-down"} size={20} color="#000" />
          </TouchableOpacity>

          {expandedSections.review && (
            <View style={styles.sectionContent}>
              <View style={styles.reviewContainer}>
                {renderRatingStars(4)}
                <Text style={styles.reviewText}>& Up</Text>
              </View>
            </View>
          )}

          <View style={styles.divider} />
        </View>

        {/* Others Section */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection("others")}>
            <Text style={styles.sectionTitle}>Others</Text>
            <Ionicons name={expandedSections.others ? "chevron-up" : "chevron-down"} size={20} color="#000" />
          </TouchableOpacity>

          {expandedSections.others && (
            <View style={styles.sectionContent}>
              <View style={styles.othersGrid}>
                {/* 30-day Free Return */}
                <TouchableOpacity
                  style={[styles.otherCard, selectedOthers.includes("30-day") && styles.otherCardActive]}
                  onPress={() => toggleOtherOption("30-day")}
                >
                  <Ionicons name="swap-horizontal" size={24} color="#00BCD4" />
                  <Text style={styles.otherCardText}>30-day Free Return</Text>
                </TouchableOpacity>

                {/* Buyer Protection */}
                <TouchableOpacity
                  style={[styles.otherCard, selectedOthers.includes("protection") && styles.otherCardActive]}
                  onPress={() => toggleOtherOption("protection")}
                >
                  <Ionicons name="shield-checkmark-outline" size={24} color="#9E9E9E" />
                  <Text style={styles.otherCardText}>Buyer Protection</Text>
                </TouchableOpacity>

                {/* Best Deal */}
                <TouchableOpacity
                  style={[styles.otherCard, selectedOthers.includes("deal") && styles.otherCardActive]}
                  onPress={() => toggleOtherOption("deal")}
                >
                  <Ionicons name="pricetag-outline" size={24} color="#9E9E9E" />
                  <Text style={styles.otherCardText}>Best Deal</Text>
                </TouchableOpacity>

                {/* Ship to store */}
                <TouchableOpacity
                  style={[styles.otherCard, selectedOthers.includes("store") && styles.otherCardActive]}
                  onPress={() => toggleOtherOption("store")}
                >
                  <Ionicons name="location-outline" size={24} color="#9E9E9E" />
                  <Text style={styles.otherCardText}>Ship to store</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={styles.divider} />
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },

  // Section
  section: {
    marginVertical: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  sectionContent: {
    paddingBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
  },

  // Checkbox
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingLeft: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#9E9E9E",
    borderRadius: 4,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: "#00BCD4",
    borderRadius: 2,
  },
  checkboxLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },

  // Price Inputs
  priceInputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 16,
  },
  priceInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 6,
    paddingHorizontal: 8,
    height: 40,
  },
  currencySymbol: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9E9E9E",
    marginRight: 4,
  },
  priceInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },

  // Slider
  sliderContainer: {
    height: 40,
    justifyContent: "center",
    position: "relative",
  },
  sliderTrack: {
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    position: "relative",
  },
  sliderFill: {
    height: "100%",
    backgroundColor: "#00BCD4",
    borderRadius: 2,
    marginLeft: "10%",
    marginRight: "0%",
    width: "90%",
  },
  sliderHandlesContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  sliderHandle: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#00BCD4",
    top: "50%",
    marginTop: -10,
  },

  // Review
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingLeft: 8,
  },
  starsRow: {
    flexDirection: "row",
    gap: 4,
  },
  reviewText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },

  // Others Cards
  othersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingLeft: 8,
  },
  otherCard: {
    width: "48%",
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  otherCardActive: {
    backgroundColor: "#f0f9ff",
    borderColor: "#00BCD4",
  },
  otherCardText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
})

export default FilterScreen
