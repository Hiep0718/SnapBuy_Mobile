import React from "react"
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface Notification {
  id: string
  title: string
  message: string
  timestamp: string
  icon: string
  read: boolean
  type: "order" | "promo" | "system"
}

const NotificationScreen: React.FC = () => {
  const [notifications] = React.useState<Notification[]>([
    {
      id: "1",
      title: "Order Confirmed",
      message: "Your order #12345 has been confirmed",
      timestamp: "2 hours ago",
      icon: "checkmark-circle",
      read: false,
      type: "order",
    },
    {
      id: "2",
      title: "Special Offer",
      message: "Get 20% off on fresh fruits this week!",
      timestamp: "5 hours ago",
      icon: "gift",
      read: false,
      type: "promo",
    },
    {
      id: "3",
      title: "Shipment On Way",
      message: "Your order is being shipped. Track it now",
      timestamp: "1 day ago",
      icon: "cube-outline",
      read: true,
      type: "order",
    },
    {
      id: "4",
      title: "Flash Sale",
      message: "Electronics sale starts in 3 hours",
      timestamp: "2 days ago",
      icon: "flash",
      read: true,
      type: "promo",
    },
    {
      id: "5",
      title: "Delivery Completed",
      message: "Your order has been successfully delivered",
      timestamp: "3 days ago",
      icon: "checkmark-done-circle",
      read: true,
      type: "order",
    },
  ])

  const getIconColor = (type: string) => {
    switch (type) {
      case "order":
        return "#00BCD4"
      case "promo":
        return "#FF9800"
      case "system":
        return "#9E9E9E"
      default:
        return "#9E9E9E"
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Notifications</Text>
          {unreadCount > 0 && <Text style={styles.unreadBadge}>{unreadCount} new</Text>}
        </View>
        <TouchableOpacity style={styles.clearButton}>
          <Ionicons name="trash-outline" size={22} color="#9E9E9E" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {notifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Ionicons name="notifications-none-outline" size={64} color="#E0E0E0" />
            </View>
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptyMessage}>You're all caught up!</Text>
          </View>
        ) : (
          <View>
            {notifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[styles.notificationCard, !notification.read && styles.notificationCardUnread]}
              >
                <View style={[styles.iconContainer, { backgroundColor: getIconColor(notification.type) + "20" }]}>
                  <Ionicons name={notification.icon} size={24} color={getIconColor(notification.type)} />
                </View>

                <View style={styles.contentContainer}>
                  <View style={styles.titleRow}>
                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                    {!notification.read && <View style={styles.unreadDot} />}
                  </View>
                  <Text style={styles.notificationMessage}>{notification.message}</Text>
                  <Text style={styles.timestamp}>{notification.timestamp}</Text>
                </View>

                <TouchableOpacity style={styles.moreButton}>
                  <Ionicons name="ellipsis-vertical" size={18} color="#9E9E9E" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  unreadBadge: {
    fontSize: 12,
    fontWeight: "600",
    color: "#00BCD4",
  },
  clearButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },

  // Container
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 80,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    fontWeight: "500",
    color: "#9E9E9E",
  },

  // Notification Card
  notificationCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginVertical: 4,
    backgroundColor: "#fff",
    borderRadius: 8,
    gap: 12,
  },
  notificationCardUnread: {
    backgroundColor: "#f9fafb",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },

  // Content
  contentContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00BCD4",
  },
  notificationMessage: {
    fontSize: 13,
    fontWeight: "500",
    color: "#555",
    marginBottom: 6,
    lineHeight: 18,
  },
  timestamp: {
    fontSize: 12,
    fontWeight: "500",
    color: "#9E9E9E",
  },

  // More Button
  moreButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default NotificationScreen
