// File: src/components/ProductCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string; // Tên file ảnh (giả định)
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <TouchableOpacity style={styles.card}>
    {/*  */}
    <View style={styles.imagePlaceholder} />
    
    <Text style={styles.name}>{product.name}</Text>
    <View style={styles.footer}>
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={12} color="#FFD700" />
        <Text style={styles.ratingText}>{product.rating}</Text>
      </View>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: 150,
    marginRight: 15,
    backgroundColor: '#fff',
  },
  imagePlaceholder: {
    height: 150,
    width: '100%',
    backgroundColor: '#f5f5f5', // Placeholder màu xám
    borderRadius: 8,
    marginBottom: 8,
    // Logic hiển thị ảnh thực tế cần được thêm vào (dùng <Image>)
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4682B4', // Màu xanh dương cho giá
  },
});

export default ProductCard;