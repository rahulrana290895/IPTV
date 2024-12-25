import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import an icon library
import Apps from './src/component/Apps';
import Movies from './src/component/Movies';
import Series from './src/component/Series';
import LiveTV from './src/component/LiveTV';

const Tab = createBottomTabNavigator();


const HomeScreen = ({ route, navigation }) => {
  const { user } = route.params || {};

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken'); // Clear token
    navigation.replace('Login'); // Navigate back to Login screen
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Movies') {
            iconName = 'movie';
          } else if (route.name === 'Series') {
            iconName = 'live-tv';
          } else if (route.name === 'Apps') {
            iconName = 'apps';
          } else if (route.name === 'Live TV') {
            iconName = 'tv';
          }

          // Return the icon component
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff141b',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: 'black',  // Set the background color of the tab bar to black
        },

      })}
    >
      <Tab.Screen name="Live TV" component={LiveTV} />
      <Tab.Screen name="Movies" component={Movies} />
      <Tab.Screen name="Series" component={Series} />
      <Tab.Screen name="Apps" component={Apps} />
    </Tab.Navigator>
  );
};

export default HomeScreen;