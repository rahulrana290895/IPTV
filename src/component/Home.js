import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image
} from "react-native";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [channels, setChannels] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
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
    const fetchChannnels = async () => {
      try {
        const channelresponse = await fetch("https://buddybonding.com/more/IPTV/api/topchannels.php"); // Replace with your API URL
        const channeldata = await channelresponse.json();
        setChannels(channeldata); // Update categories state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchChannnels();
  }, []);

  useEffect(() => {
    const latestMovies = async () => {
      try {
        const moviesresponse = await fetch("https://buddybonding.com/more/IPTV/api/latestmovies.php"); // Replace with your API URL
        const moviesdata = await moviesresponse.json();
        setLatestMovies(moviesdata); // Update categories state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    latestMovies();
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

  const series = [
    {
      id: 1,
      source: {
        uri: "https://upload.wikimedia.org/wikipedia/en/4/4c/The_Night_Manager_%28Indian_TV_series%29.jpg",
      },
    },
    {
        id: 2,
        source: {
          uri: "https://static.toiimg.com/photo/msid-110387887/110387887.jpg?19578",
        },
      },
      {
        id: 3,
        source: {
          uri: "https://m.media-amazon.com/images/S/pv-target-images/8a2ef59045d0cdb9b6a4232d595fd4343c1814d43f92e0c88a5174d2f0dca9f4.__SX340__SY454__QL60__._TTW_.jpg",
        },
      },
];

const movies = [
    {
      id: 1,
      source: {
        uri: "https://m.media-amazon.com/images/M/MV5BZjAyYjZmMjQtNGZlNi00ZGQ0LTkxNTUtNWQ2YzA3MWJjYjc2XkEyXkFqcGc@._V1_.jpg",
      },
    },
    {
        id: 2,
        source: {
          uri: "https://m.media-amazon.com/images/M/MV5BYjMwNjQ1MWItMjIzZS00YTg5LThlMjItMTA0NmVkYTUyYWY3XkEyXkFqcGc@._V1_.jpg",
        },
      },
      {
        id: 3,
        source: {
          uri: "https://upload.wikimedia.org/wikipedia/en/7/7b/Kill_poster.jpeg",
        },
      },
      {
        id: 4,
        source: {
          uri: "https://m.media-amazon.com/images/M/MV5BZjI2NGQxMGMtYzQ5Mi00NTBjLWJhYzktMjE2ZDkxOTU3YWZjXkEyXkFqcGc@._V1_.jpg",
        },
      },
      {
        id: 5,
        source: {
          uri: "https://m.media-amazon.com/images/M/MV5BZjI2NGQxMGMtYzQ5Mi00NTBjLWJhYzktMjE2ZDkxOTU3YWZjXkEyXkFqcGc@._V1_.jpg",
        },
      },
];

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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false} // Hides the horizontal scroll indicator
          contentContainerStyle={styles.scrollView}
        >
          {channels.map((image) => (
            <Image key={image.id} source={{ uri: image.img }} style={styles.image} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>New Released Movies</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false} // Hides the horizontal scroll indicator
          contentContainerStyle={styles.scrollView}
        >
          {latestMovies.map((res) => (
            <Image key={res.id} source={{ uri: res.img }} style={styles.poster} />
          ))}
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

      <View style={styles.container}>
        <Text style={styles.title}>Popular Series</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false} // Hides the horizontal scroll indicator
          contentContainerStyle={styles.scrollView}
        >
          {series.map((image) => (
            <Image key={image.id} source={image.source} style={styles.poster} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Popular Movies</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false} // Hides the horizontal scroll indicator
          contentContainerStyle={styles.scrollView}
        >
          {movies.map((image) => (
            <Image key={image.id} source={image.source} style={styles.poster} />
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
  image: {
    width: 128, // Set the width for the images
    height: 72, // Set the height for the images
    borderRadius: 10, // Optional: rounded corners for the images
    marginRight: 10, // Space between images
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

export default Home;
