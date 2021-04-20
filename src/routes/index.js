import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../pages/HomeScreen';
import SearchScreen from '../pages/SearchScreen';
import PlansScreen from '../pages/PlansScreen';
import MapScreen from '../pages/MapScreen';

const AppNavigator = createStackNavigator();

const AppRoutes = () => {
  return (
    <NavigationContainer>
      <AppNavigator.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <AppNavigator.Screen name="HomeScreen" component={HomeScreen} />
        <AppNavigator.Screen name="SearchScreen" component={SearchScreen} />
        <AppNavigator.Screen name="PlansScreen" component={PlansScreen} />
        <AppNavigator.Screen name="MapScreen" component={MapScreen} />
      </AppNavigator.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
