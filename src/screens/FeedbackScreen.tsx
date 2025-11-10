"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, FlatList, ScrollView } from "react-native"
import FeedbackTag from "../components/FeedbackTag"
import { RatingStars } from "../components/RatingStars"
import * as ImagePicker from "expo-image-picker"
import { Ionicons } from "@expo/vector-icons"

const feedbackOptions = [
  "Product Quality",
  "Fast Delivery",
  "Great Service",
  "Good Packaging",
  "Value for Money",
  "As Described",
]

const FeedbackScreen: React.FC<{
  onNavigateReviews?: () => void
  onBack?: () => void
  navigation?: any
}> = ({ onNavigateReviews, onBack, navigation }) => {
  const [mood, setMood] = useState<"sad" | "neutral" | "happy" | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [feedback, setFeedback] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [rating, setRating] = useState(5)

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    })
    if (!result.canceled && result.assets.length > 0) {
      setImages((prev) => [...prev, result.assets[0].uri])
    }
  }

  const removeImage = (uri: string) => {
    setImages((prev) => prev.filter((img) => img !== uri))
  }

  const handleSubmit = () => {
    const data = { mood, selectedTags, feedback, images, rating }
    console.log("Feedback submitted:", data)
    alert("Review submitted successfully!")
    onNavigateReviews?.()
  }

  const getMoodEmoji = (moodType: string) => {
    if (moodType === "sad") return "😞"
    if (moodType === "neutral") return "😐"
    return "😊"
  }

  const getMoodLabel = (moodType: string) => {
    if (moodType === "sad") return "Poor"
    if (moodType === "neutral") return "Good"
    return "Excellent"
  }

  return (
    <View style={styles.container}>
      

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Rating Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>How would you rate this product?</Text>
          <View style={styles.ratingContainer}>
            <RatingStars rating={rating} setRating={setRating} size={40} />
          </View>
          <Text style={styles.ratingText}>
            {rating === 5
              ? "Excellent!"
              : rating === 4
              ? "Very Good"
              : rating === 3
              ? "Good"
              : rating === 2
              ? "Fair"
              : "Poor"}
          </Text>
        </View>

        {/* Mood Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>How was your experience?</Text>
          <View style={styles.moodRow}>
            {["sad", "neutral", "happy"].map((m) => (
              <TouchableOpacity
                key={m}
                style={[styles.moodButton, mood === m && styles.moodButtonSelected]}
                onPress={() => setMood(m as any)}
              >
                <Text style={styles.moodEmoji}>{getMoodEmoji(m)}</Text>
                <Text style={[styles.moodLabel, mood === m && styles.moodLabelSelected]}>
                  {getMoodLabel(m)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tags */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>What did you like?</Text>
          <View style={styles.tagsContainer}>
            {feedbackOptions.map((tag) => (
              <FeedbackTag
                key={tag}
                label={tag}
                selected={selectedTags.includes(tag)}
                onPress={() => toggleTag(tag)}
              />
            ))}
          </View>
        </View>

        {/* Text input */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Share your thoughts</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Tell us more about your experience with this product..."
            placeholderTextColor="#999"
            value={feedback}
            onChangeText={setFeedback}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Images */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Add photos (Optional)</Text>
          <Text style={styles.cardSubtitle}>Help others by sharing photos of the product</Text>
          <FlatList
            horizontal
            data={[...images, "add"]}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) =>
              item === "add" ? (
                <TouchableOpacity style={styles.addBox} onPress={pickImage}>
                  <Ionicons name="camera-outline" size={32} color="#5B5FFF" />
                  <Text style={styles.addText}>Add Photo</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item }} style={styles.image} />
                  <TouchableOpacity style={styles.removeBtn} onPress={() => removeImage(item)}>
                    <Ionicons name="close" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              )
            }
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.imageList}
          />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Ionicons name="checkmark-circle-outline" size={22} color="#fff" style={styles.submitIcon} />
          <Text style={styles.submitText}>Submit Review</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default FeedbackScreen

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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 12,
    marginTop: -8,
  },
  ratingContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#5B5FFF",
    textAlign: "center",
  },
  moodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  moodButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#F8F9FA",
    borderWidth: 2,
    borderColor: "transparent",
  },
  moodButtonSelected: {
    backgroundColor: "#F0F1FF",
    borderColor: "#5B5FFF",
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
  },
  moodLabelSelected: {
    color: "#5B5FFF",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: "#1A1A1A",
    minHeight: 120,
    textAlignVertical: "top",
    backgroundColor: "#F8F9FA",
  },
  imageList: {
    gap: 12,
  },
  addBox: {
    width: 100,
    height: 100,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#5B5FFF",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F9FA",
  },
  addText: {
    fontSize: 12,
    color: "#5B5FFF",
    fontWeight: "600",
    marginTop: 4,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  removeBtn: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#FF3B30",
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  submitBtn: {
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
  submitIcon: {
    marginRight: 8,
  },
  submitText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
})