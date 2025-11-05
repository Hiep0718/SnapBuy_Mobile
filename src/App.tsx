// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";



// import HomeScreen from './screens/HomeScreen';
// import { ProductDetailScreen } from './screens/ProductDetailScreen';
// import ClothesDetailScreen from './screens/ClothesDetailScreen';
// import FeedbackScreen from './screens/FeedbackScreen';

// export default function App() {
//   const Stack = createStackNavigator();
//   return (
//     <View style={styles.container}>

//       {/* <HomeScreen /> */}
//       {/* <ProductDetailScreen /> */}
//       {/* <ClothesDetailScreen /> */}
//       {/* <FeedbackScreen /> */}
//       <NavigationContainer>
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="ClothesDetail" component={ClothesDetailScreen} />
//           <Stack.Screen name="Feedback" component={FeedbackScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import ClothesDetailScreen from './screens/ClothesDetailScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import PaymentScreen from './screens/PaymentScreen';


export default function App() {
  return (
    <PaymentScreen />
  );
}