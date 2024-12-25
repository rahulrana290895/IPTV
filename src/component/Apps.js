import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image
} from "react-native";

const Apps = () => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchChannnels = async () => {
      try {
        const channelresponse = await fetch("https://buddybonding.com/more/IPTV/api/apps.php"); // Replace with your API URL
        const channeldata = await channelresponse.json();
        setChannels(channeldata); // Update categories state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchChannnels();
  }, []);




  return (
    <ScrollView style={styles.body}>

    <Text style={styles.title}>Explore Apps</Text>

    <View style={styles.gridContainer}>

      {channels.map((image) => (
        <Image key={image.id} source={{ uri: image.img }} style={styles.image} />
      ))}

    </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "black",
    flexDirection: "column", // Make sure pills are placed horizontally
  },
  container: {
    padding: 10,
  },
  title: {
    color: "#ffffff",
    fontSize:18,
    margin: 10,
  },
  scrollView: {
    flexDirection: "row", // Make sure pills are placed horizontally
    paddingVertical: 10,
  },
  image: {
    width: '30%', // You can set a fixed width or use percentage to create columns
    height: 72,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5

  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10
  },

});

export default Apps;
