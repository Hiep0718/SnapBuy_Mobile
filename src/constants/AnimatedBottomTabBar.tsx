// AnimatedBottomTabBar.tsx - Tạo file mới này
import type React from "react"
import { useEffect, useRef } from "react"
import { View, StyleSheet, TouchableOpacity, Text, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { SNAPBUY_COLORS } from "./theme"

interface TabItemProps {
  screen: {
    name: string
    icon: string
    label: string
  }
  isActive: boolean
  onPress: () => void
}

const AnimatedTabItem: React.FC<TabItemProps> = ({ screen, isActive, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current
  const translateYAnim = useRef(new Animated.Value(0)).current
  const iconScaleAnim = useRef(new Animated.Value(1)).current
  const rippleAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (isActive) {
      Animated.sequence([
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1.05,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
          }),
          Animated.spring(translateYAnim, {
            toValue: -3,
            friction: 4,
            tension: 40,
            useNativeDriver: true,
          }),
          Animated.spring(iconScaleAnim, {
            toValue: 1.1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
          }),
        ]),
      ]).start()

      Animated.sequence([
        Animated.timing(rippleAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(rippleAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.spring(translateYAnim, {
          toValue: 0,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(iconScaleAnim, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [isActive])

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start()

    onPress()
  }

  const rippleScale = rippleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 2.5],
  })

  const rippleOpacity = rippleAnim.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [0.4, 0.2, 0],
  })

  return (
    <TouchableOpacity
      style={styles.tabItem}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Animated.View
        style={[
          styles.tabItemContent,
          {
            transform: [
              { scale: scaleAnim },
              { translateY: translateYAnim },
            ],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.ripple,
            {
              transform: [{ scale: rippleScale }],
              opacity: rippleOpacity,
            },
          ]}
        />

        {isActive && (
          <Animated.View
            style={[
              styles.activeDot,
              {
                opacity: rippleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.6],
                }),
              },
            ]}
          />
        )}

        <Animated.View
          style={{
            transform: [{ scale: iconScaleAnim }],
          }}
        >
          <Ionicons
            name={isActive ? screen.icon : `${screen.icon}-outline`}
            size={24}
            color={isActive ? SNAPBUY_COLORS.primary : SNAPBUY_COLORS.text.tertiary}
          />
        </Animated.View>

        <Animated.Text
          style={[
            styles.tabLabel,
            isActive && styles.activeTabLabel,
          ]}
        >
          {screen.label}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

interface AnimatedBottomTabBarProps {
  activeTab: string
  tabScreens: Array<{
    name: string
    icon: string
    label: string
  }>
  onTabPress: (tabName: string) => void
}

export const AnimatedBottomTabBar: React.FC<AnimatedBottomTabBarProps> = ({
  activeTab,
  tabScreens,
  onTabPress,
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current
  const tabBarOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const activeIndex = tabScreens.findIndex(screen => screen.name === activeTab)
    Animated.spring(slideAnim, {
      toValue: activeIndex,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start()
  }, [activeTab, tabScreens])

  useEffect(() => {
    Animated.timing(tabBarOpacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start()
  }, [])

  const indicatorTranslateX = slideAnim.interpolate({
    inputRange: tabScreens.map((_, i) => i),
    outputRange: tabScreens.map((_, i) => i * (100 / tabScreens.length)),
  })

  return (
    <Animated.View
      style={[
        styles.bottomTabBar,
        {
          opacity: tabBarOpacity,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.activeIndicator,
          {
            width: `${100 / tabScreens.length}%`,
            transform: [
              {
                translateX: indicatorTranslateX.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '500%'],
                }),
              },
            ],
          },
        ]}
      />

      {tabScreens.map((screen) => (
        <AnimatedTabItem
          key={screen.name}
          screen={screen}
          isActive={activeTab === screen.name}
          onPress={() => onTabPress(screen.name)}
        />
      ))}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  bottomTabBar: {
    flexDirection: "row",
    backgroundColor: SNAPBUY_COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: SNAPBUY_COLORS.border,
    paddingVertical: 8,
    paddingBottom: 12,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 10,
  },
  activeIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 3,
    backgroundColor: SNAPBUY_COLORS.primary,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabItemContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    gap: 4,
    position: "relative",
  },
  ripple: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: SNAPBUY_COLORS.primary,
  },
  activeDot: {
    position: "absolute",
    top: -6,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: SNAPBUY_COLORS.primary,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: SNAPBUY_COLORS.text.tertiary,
    marginTop: 2,
  },
  activeTabLabel: {
    color: SNAPBUY_COLORS.primary,
    fontWeight: "700",
  },
})

export default AnimatedBottomTabBar