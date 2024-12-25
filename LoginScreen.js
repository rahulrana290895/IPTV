import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = ({ setIsLoggedIn }) => {
  const [number, setNumber] = useState('');
  const navigation = useNavigation();

  const onSubmit = async () => {
    const data = { number };
    const url = "https://buddybonding.com/more/IPTV/api/login.php";

    try {
      let result = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      result = await result.json();

      console.log(result);

      if (result.status === "success") {
        // Save user data to AsyncStorage
        setIsLoggedIn(true); // Update the login state
        navigation.navigate('Home', { user: result.user }); // Navigate to Home
      } else {
        Alert.alert('Login Failed', result.message || 'Invalid login credentials');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('./assets/logo.png')} style={styles.image} />
      </View>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        value={number}
        onChangeText={(text) => setNumber(text.replace(/[^0-9]/g, ''))}
        keyboardType="numeric"
        placeholder="Enter Number"
      />
      <Button title="Login" onPress={onSubmit} color="#ff141b" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#ff141b',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ff141b',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: '#ff141b',
  },
  image: {
    width: 150,
    height: 150,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});

export default LoginScreen;