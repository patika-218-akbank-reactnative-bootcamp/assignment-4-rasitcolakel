import {View, ScrollView} from 'react-native';
import React from 'react';
import {Movie} from '@src/store/slices/movies';
import {MovieCardStyles as styles} from '@src/styles/MovieCard.style';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useAppSelector} from '@src/store';
import CustomText from './CustomText';
import {hexToRGB} from '@src/assets/utils';
type Props = {
  movie: Movie;
};

type GenreProps = {
  id: number;
};

const GenreComponent = ({id}: GenreProps) => {
  const {colors} = useAppSelector(state => state.theme);
  const genre = useAppSelector(state =>
    state.genres.data.find(g => g.id === id),
  );
  if (!genre) {
    return null;
  }

  return (
    <View
      style={[
        styles.genreStyle,
        {backgroundColor: hexToRGB(colors.primary, 0.3)},
      ]}>
      <CustomText
        style={[styles.genreText, {color: colors.primary}]}
        title={genre.name}
      />
    </View>
  );
};

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/';

const MovieCard = ({movie}: Props) => {
  const {colors} = useAppSelector(state => state.theme);
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.imageContainer,
          {
            shadowColor: colors.primary,
            backgroundColor: colors.backgroundColor,
          },
        ]}>
        <FastImage
          style={styles.image}
          source={{
            uri: IMAGE_BASE_URL + movie.poster_path,
            priority: FastImage.priority.high,
          }}
        />
      </View>
      <View style={styles.rightContainer}>
        <CustomText title={movie.title} size="xlarge" />
        <View style={styles.voteContainer}>
          <AntDesign name="star" size={22} color={colors.yellow} />
          <CustomText
            title={`${movie.vote_average} / 10`}
            variant="secondary"
            size={16}
            style={styles.voteText}
          />
        </View>
        <ScrollView
          contentContainerStyle={styles.genreContainer}
          style={styles.genreScrollStyle}
          showsHorizontalScrollIndicator={false}
          horizontal>
          {movie.genre_ids.map(id => (
            <GenreComponent key={id} id={id} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default MovieCard;
