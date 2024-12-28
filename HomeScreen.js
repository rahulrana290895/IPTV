import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import an icon library
import Apps from './src/component/Apps';
import Movies from './src/component/Movies';
import Series from './src/component/Series';
import LiveTV from './src/component/LiveTV';
import { View, Image, TouchableOpacity, Text } from 'react-native'; // For custom header components

const Tab = createBottomTabNavigator();

const HomeScreen = ({ route, navigation }) => {
  const { user } = route.params || {};

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken'); // Clear token
    navigation.replace('Login'); // Navigate back to Login screen
  };

  const handleSearch = () => {
    // Handle search action here
    console.log('Search icon pressed');
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
        headerStyle: {
          backgroundColor: 'black',  // Set the header background color to black
        },
        headerTintColor: 'white',  // Set the header text color to white
        headerLeft: () => (
          <View style={{ paddingLeft: 15 }}>
            {/* Logo on the left */}
            <Image
              source={require('./assets/avatar.png')}  // Replace with your logo image path
              style={{ width: 40, height: 40 }}
            />
          </View>
        ),
        headerTitle: () => (
          <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', marginLeft: '10' }}>
              SkyStarTv
            </Text>
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={handleSearch} style={{ paddingRight: 15 }}>
            {/* Search icon on the right */}
            <Icon name="search" size={30} color="white" />
          </TouchableOpacity>
        ),
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
