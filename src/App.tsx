import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';



import ProductListingGridScreen from './screens/ProductListingScreen';

export default function App() {
  return (
    <View style={styles.container}>

      <ProductListingGridScreen />

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
