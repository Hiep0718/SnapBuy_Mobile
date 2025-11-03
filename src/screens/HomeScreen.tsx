import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Giả sử dùng Expo
import CategoryItem from '../components/CategoryItem';
import ProductCard from '../components/ProductCard';

// --- (1) Dữ liệu giả định (Mock Data) -----------------------------------------------------

const categories = [
  { name: 'Electronics', iconName: 'phone-portrait-outline' as const, color: '#9370DB' },
  { name: 'Fashion', iconName: 'shirt-outline' as const, color: '#4169E1' },
  { name: 'Beauty', iconName: 'color-palette-outline' as const, color: '#FF7F50' },
  { name: 'Fresh Produce', iconName: 'leaf-outline' as const, color: '#DC143C' },
];

const recommendedProducts = [
  { id: 1, name: 'Shoes', price: 299, rating: 4.5, image: 'shoes' },
  { id: 2, name: 'Tablet', price: 499, rating: 4.2, image: 'tablet' },
  { id: 3, name: 'Pear', price: 4.99, rating: 4.7, image: 'pear' },
];

// --- (2) Component ---------------------------------------------------------------------

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        {/* Thanh Header: Back, Title, Cart, Profile */}
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Deals</Text>
        <View style={styles.rightIcons}>
          <Ionicons name="cart-outline" size={24} color="#000" style={styles.icon} />
          {/*  */}
          {/* Thực tế sẽ là 1 component Avatar */}
        </View>
      </View>

      <ScrollView style={styles.container}>
        {/* Thanh Tìm kiếm */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#999" />
          <Text style={styles.searchText}>Search for product</Text>
          <TouchableOpacity style={styles.filterIcon}>
             <Ionicons name="options-outline" size={24} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Danh mục (Categories) */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((cat, index) => (
            <CategoryItem key={index} name={cat.name} iconName={cat.iconName} color={cat.color} />
          ))}
        </ScrollView>
        
        {/* Banner Khuyến mãi Lớn (Shoes) */}
        <View style={styles.mainBanner}>
            <View style={styles.bannerLeft}>
                <Text style={styles.bannerTitle}>Shoes</Text>
                <Text style={styles.bannerSubtitle}>50% off</Text>
                <TouchableOpacity style={styles.buyButton}>
                    <Text style={styles.buyButtonText}>Buy now</Text>
                </TouchableOpacity>
            </View>
            {/*  */}
        </View>

        {/* Banners Khuyến mãi Phụ */}
        <View style={styles.subBannersContainer}>
            <View style={styles.subBanner}>
                <Text style={styles.discountBadge}>30%</Text>
                {/*  */}
            </View>
            <View style={styles.subBanner}>
                <Text style={styles.discountBadge}>30%</Text>
                {/*  */}
            </View>
        </View>

        {/* Sản phẩm Đề xuất */}
        <View style={styles.recommendedHeader}>
            <Text style={styles.recommendedTitle}>Recommended for you</Text>
            <TouchableOpacity>
                <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recommendedScroll}>
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ScrollView>
        
        {/* Khoảng cách cuối để tránh tab bar */}
        <View style={{ height: 100 }} /> 
      </ScrollView>

      {/* Lưu ý: Bottom Tab Bar thường được tạo trong file navigation/BottomTabNavigator.tsx */}
    </SafeAreaView>
  );
};

// --- (3) Styles ---------------------------------------------------------------------

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 16,
  },
  
  // Header
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },

  // Search Bar
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    marginVertical: 15,
  },
  searchText: {
    flex: 1,
    marginLeft: 10,
    color: '#999',
  },
  filterIcon: {
    paddingLeft: 10,
  },

  // Categories
  categoryScroll: {
    marginBottom: 20,
  },

  // Main Banner (Shoes)
  mainBanner: {
    backgroundColor: '#f5f5f5', // Màu nền banner
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginBottom: 20,
    // Cần thêm logic xử lý hình ảnh sản phẩm (Red Shoe)
  },
  bannerLeft: {
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#333',
  },
  bannerSubtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'red',
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: 120,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: '700',
  },

  // Sub Banners
  subBannersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  subBanner: {
    width: '48%', // Chiếm khoảng 1/2 màn hình
    backgroundColor: '#f5f5f5', 
    borderRadius: 10,
    height: 150, // Chiều cao cố định
    justifyContent: 'flex-start',
    padding: 10,
    // Cần thêm logic xử lý hình ảnh nền (Handbag, Tablet)
  },
  discountBadge: {
    backgroundColor: 'red',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },

  // Recommended Products
  recommendedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  recommendedTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  viewAllText: {
    color: '#888',
    fontWeight: '600',
  },
  recommendedScroll: {
    paddingBottom: 20,
  }
});

export default HomeScreen;