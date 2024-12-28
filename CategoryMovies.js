import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

const CategoryMovies = () => {
  const route = useRoute();
  const { categoryId } = route.params || {};
  const [Movies, setMovies] = useState([]);

  useEffect(() => {
    const Movies = async () => {
      try {
        const response = await fetch(`https://buddybonding.com/more/IPTV/api/moviesbycategoryid.php?categoryId=${categoryId}`);
        const data = await response.json();
        setMovies(data);  // Set the movies for the selected category
      } catch (error) {
        console.error("Error fetching category movies:", error);
      }
    };

    if (categoryId) {
      Movies();
    }
  }, [categoryId]);


  return (
        <ScrollView style={styles.body}>
      {Movies.map((res) => (
        <View><Text style={styles.title}>Explore {res.name} Movies</Text>
    
        <View style={styles.gridContainer}>
    

      {res.movies.map((movie) => (
              <Image 
                key={movie.id} 
                source={{ uri: movie.img }} 
                style={styles.image} 
              />
            ))}


        </View>

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
    height: 160,
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


export default CategoryMovies;