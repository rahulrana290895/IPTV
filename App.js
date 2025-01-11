import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import CategoryMovies from './CategoryMovies';
import CategoryWebseries from './CategoryWebseries';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          setIsLoggedIn(true); // Persist login
        }
      } catch (error) {
        console.error('Error loading token:', error);
      } finally {
        setLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  if (loading) {
    return null; // You can add a loading spinner here
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen name="Home" options={{ headerShown: false }}>
            {props => <HomeScreen {...props} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        )}

          <Stack.Screen name="CategoryMovies" options={{ headerTitle: 'SparkWave',headerStyle: { backgroundColor: '#000' },headerTintColor: '#fff', }}>
            {props => <CategoryMovies {...props}  />}
          </Stack.Screen>

          <Stack.Screen name="CategoryWebseries" options={{ headerTitle: 'SparkWave',headerStyle: { backgroundColor: '#000' },headerTintColor: '#fff', }}>
            {props => <CategoryWebseries {...props}  />}
          </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
