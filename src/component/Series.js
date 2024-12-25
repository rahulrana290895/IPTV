import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image
} from "react-native";

const Series = () => {
  const [categories, setCategories] = useState([]);
  const [latestWebseries, setLatestWebseries] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://buddybonding.com/more/IPTV/api/topcategory.php"); // Replace with your API URL
        const data = await response.json();
        setCategories(data); // Update categories state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);


  useEffect(() => {
    const latestWebseries = async () => {
      try {
        const webserieresponse = await fetch("https://buddybonding.com/more/IPTV/api/latestwebseries.php"); // Replace with your API URL
        const webseriesdata = await webserieresponse.json();
        setLatestWebseries(webseriesdata); // Update categories state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    latestWebseries();
  }, []);

  return (
    <ScrollView style={styles.body}>
 
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false} // Hides the scrollbar
          contentContainerStyle={styles.scrollView}
        >
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.pill}>
              <Text style={styles.pillText}>{category.name}</Text>
            </TouchableOpacity>
          ))}

            <TouchableOpacity key="0" style={styles.pill}>
              <Text style={styles.pillText}>See All</Text>
            </TouchableOpacity>

        </ScrollView>
      </View>



      <View style={styles.container}>
        <Text style={styles.title}>New Released WebSeries</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false} // Hides the horizontal scroll indicator
          contentContainerStyle={styles.scrollView}
        >
          {latestWebseries.map((res) => (
            <Image key={res.id} source={{ uri: res.img }} style={styles.poster} />
          ))}
        </ScrollView>
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
    borderWidth: 2,
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
    color: "#ffffff", // Space between images
    fontSize:18,
  },
  poster: {
    width: 130, // Set the width for the images
    height: 160, // Set the height for the images
    borderRadius: 10, // Optional: rounded corners for the images
    marginRight: 10, // Space between images
  },

});

export default Series;
