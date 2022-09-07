import {View, Text} from 'react-native';
import React from 'react';
import {Movie} from '@src/store/slices/movies';

type Props = {
  movie: Movie;
};

const MovieCard = ({movie}: Props) => {
  return (
    <View
      style={{
        height: 150,
      }}>
      <Text>{movie.title}</Text>
    </View>
  );
};

export default MovieCard;
