import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Calculators from '../Screens/Calculators';
import Calculator from '../Screens/CalculatorSimple';
import HomeScreen from '../Screens/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Calculator" component={Calculator} />
        <Stack.Screen name="Calculators" component={Calculators} />
      </Stack.Navigator>
  );
}
