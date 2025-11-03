// File: src/components/CategoryItem.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CategoryItemProps {
  name: string;
  iconName: 'phone-portrait-outline' | 'shirt-outline' | 'color-palette-outline' | 'leaf-outline'; // Ví dụ
  color: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ name, iconName, color }) => (
  <TouchableOpacity style={styles.container}>
    <Ionicons name={iconName} size={30} color="#fff" style={[styles.icon, { backgroundColor: color }]} />
    <Text style={styles.name}>{name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    borderRadius: 999,
    padding: 20,
    marginBottom: 5,
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
});

export default CategoryItem;