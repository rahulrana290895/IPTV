import React from 'react';
import { View, Text} from 'react-native';
import { useRoute } from '@react-navigation/native';

const PlayChannel = () => {
  const route = useRoute();
  const { url } = route.params || {};
  return (
        <View>
          <Text>Explore {url} Webseries</Text>
          </View>
  );
};

export default PlayChannel;