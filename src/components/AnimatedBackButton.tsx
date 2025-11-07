"use client"

import type React from "react"
import { useRef } from "react"
import { TouchableOpacity, Animated, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface AnimatedBackButtonProps {
  onPress: () => void
  color?: string
}

export const AnimatedBackButton: React.FC<AnimatedBackButtonProps> = ({ onPress, color = "#000" }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current
  const rotateAnim = useRef(new Animated.Value(0)).current

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.8,
        useNativeDriver: true,
        speed: 20,
        bounciness: 8,
      }),
      Animated.timing(rotateAnim, {
        toValue: -0.15,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 8,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [-0.15, 0],
    outputRange: ["-8deg", "0deg"],
  })

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }, { rotate: rotateInterpolate }],
        },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.button}
        activeOpacity={1}
      >
        <Ionicons name="arrow-back" size={24} color={color} />
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 8,
    borderRadius: 8,
  },
})
