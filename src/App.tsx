import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';




import ElectronicsCategoryScreen from './screens/ElectronicsCategoryScreen';
import FilterScreen from './screens/FilterScreen';
import SearchScreen from './screens/SearchScreen';


export default function App() {
  return (
    <View style={styles.container}>


      {/* <HomeScreen /> */}
      {/* <ProductDetailScreen /> */}
      <SearchScreen />
      {/* <ElectronicsCategoryScreen /> */}

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
