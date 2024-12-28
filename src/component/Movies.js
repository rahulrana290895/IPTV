import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity,  ScrollView,  StyleSheet,  Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Movies = () => {
  const [categories, setCategories] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [Movies, setMovies] = useState([]);
  const navigation = useNavigation();

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
    const Movies = async () => {
      try {
        const moviesres = await fetch("https://buddybonding.com/more/IPTV/api/categoryMovies.php"); // Replace with your API URL
        const moviesd = await moviesres.json();
        setMovies(moviesd); // Update categories state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    Movies();
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
            <TouchableOpacity key={category.id} style={styles.pill} onPress={() => navigation.navigate('CategoryMovies', {categoryId: category.id})}>
              <Text style={styles.pillText}>{category.name}</Text>
            </TouchableOpacity>
          ))}

            <TouchableOpacity key="0" style={styles.pill}>
              <Text style={styles.pillText}>See All</Text>
            </TouchableOpacity>

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


      {Movies.map((res) => (
  <View style={styles.container} key={res.id}>
    <View style={styles.titleheader}>
      <Text style={styles.title}>{res.name} Movies</Text>
      <TouchableOpacity style={styles.linkContainer} onPress={() => navigation.navigate('CategoryMovies', {categoryId: res.id})}>
        <Text style={styles.seeall}>See All</Text>
      </TouchableOpacity>
    </View>
    
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false} // Hides the horizontal scroll indicator
      contentContainerStyle={styles.scrollView}
    >
      {res.movies.map((movie) => (
        <Image 
          key={movie.id} 
          source={{ uri: movie.img }} 
          style={styles.poster} 
        />
      ))}
    </ScrollView>
  </View>
))}



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
  seeall: {
    color: "#ff141b", // Space between images
    fontSize:16,
  },
  titleheader: {
    flexDirection: 'row',  // Aligns title and link horizontally
    justifyContent: 'space-between',  // Pushes the title to the left and link to the right
    alignItems: 'center',
    width: '100%',
    paddingRight: 10.
  },
  linkContainer: {
  }

});

export default Movies;