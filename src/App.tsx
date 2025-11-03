import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


import HomeScreen from './screens/HomeScreen';
import { ProductDetailScreen } from './screens/ProductDetailScreen';
import ClothesDetailScreen from './screens/ClothesDetailScreen';

export default function App() {
  return (
    <View style={styles.container}>

      {/* <HomeScreen /> */}
      {/* <ProductDetailScreen /> */}
      <ClothesDetailScreen />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
