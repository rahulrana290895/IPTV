import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LiveTV = () => {
  const [categories, setCategories] = useState([]);  // To store genres
  const [channels, setChannels] = useState([]);     // To store channels
  const [selectedCategory, setSelectedCategory] = useState([0]); // To track selected category
  const navigation = useNavigation();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://buddybonding.com/more/IPTV/api/genres.php"); // Replace with your API URL
        const data = await response.json();
        setCategories(data); // Update categories state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch channels when a genre is selected
  useEffect(() => {
    if (selectedCategory) {
      const fetchChannels = async () => {
        try {
          const channelresponse = await fetch(`https://buddybonding.com/more/IPTV/api/channels.php?genre_id=${selectedCategory}`); // Add selected category ID in the API call
          const channeldata = await channelresponse.json();
          setChannels(channeldata); // Update channels state
        } catch (error) {
          console.error("Error fetching channels:", error);
        }
      };

      fetchChannels();
    }
  }, [selectedCategory]); // Fetch channels whenever selectedCategory changes

  return (
    <ScrollView style={styles.body}>
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false} // Hides the scrollbar
          contentContainerStyle={styles.scrollView}
        >
          <TouchableOpacity
            key="0"
            style={styles.pill}
            onPress={() => setSelectedCategory(0)} // "See All" button clears the selection
          >
            <Text style={styles.pillText}>See All</Text>
          </TouchableOpacity>

          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.pill}
              onPress={() => setSelectedCategory(category.id)} // Update selected category on click
            >
              <Text style={styles.pillText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Text style={styles.title}>Explore Channels</Text>

      <View style={styles.gridContainer}>
        {channels.map((channel) => (
          <TouchableOpacity key={channel.url} style={styles.pill} onPress={() => navigation.navigate('PlayChannel', { url: channel.url })}>
            <Image
              key={channel.id}
              source={{ uri: channel.img }}
              style={styles.image}
            />
          </TouchableOpacity>
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
  scrollView: {
    flexDirection: "row", // Make sure pills are placed horizontally
    paddingVertical: 10,
  },
  pill: {
    borderWidth: 1,
    borderColor: "#ff141b",
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10, // Space between pills
  },
  pillText: {
    color: "#ff141b",
    fontSize: 14,
    fontWeight: "bold",
  },
  title: {
    color: "#ffffff",
    fontSize: 18,
    margin: 10,
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

export default LiveTV;
