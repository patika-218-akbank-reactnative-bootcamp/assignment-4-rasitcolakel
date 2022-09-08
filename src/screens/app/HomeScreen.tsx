/* eslint-disable react-hooks/exhaustive-deps */
import {View, ScrollView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamsList} from '@src/screens/app';
import {useDispatch} from 'react-redux';
import {movieRequest} from '@src/assets/api';
import {MovieType, setMovies} from '@src/store/slices/movies';
import {HomeStyles as styles} from '@src/styles/Home.style';
import CustomButton from '@src/components/CustomButton';
import {setLoading} from '@src/store/slices/theme';
import {useAppSelector} from '@src/store';
import {BaseParams} from '@src/types/APITypes';
import MovieCard from '@src/components/MovieCard';
type Props = NativeStackScreenProps<AppStackParamsList, 'BottomTabs'>;

type MovieButtonsType = {
  title: string;
  type: MovieType;
};
const MovieButtons: MovieButtonsType[] = [
  {
    title: 'Popular',
    type: 'popular',
  },
  {
    title: 'Top Rated',
    type: 'topRated',
  },
  {
    title: 'Upcoming',
    type: 'upcoming',
  },
  {
    title: 'Now Playing',
    type: 'nowPlaying',
  },
];

const HomeScreen = (props: Props) => {
  const [selectedMovieType, setSelectedMovieType] =
    useState<MovieType>('popular');
  const dispatch = useDispatch();
  const movies = useAppSelector(state => state.movies);
  const getMovies = async (type: MovieType, params?: BaseParams) => {
    try {
      dispatch(setLoading(true));
      const data = await movieRequest(type, params);
      dispatch(setMovies({type, data}));
    } catch (error: any) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (movies[selectedMovieType].results.length === 0) {
      getMovies(selectedMovieType);
    }
  }, [selectedMovieType]);

  const moviesData = movies[selectedMovieType].results;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {MovieButtons.map(item => (
          <CustomButton
            title={item.title}
            onPress={() => setSelectedMovieType(item.type)}
            variant={
              selectedMovieType === item.type ? 'primary' : 'transparent'
            }
            size="medium"
            style={styles.scrollItem}
            key={item.type}
          />
        ))}
      </ScrollView>
      <FlatList
        data={moviesData}
        renderItem={({item}) => (
          <MovieCard
            movie={item}
            onPress={() =>
              props.navigation.navigate('MovieDetail', {movie: item})
            }
          />
        )}
        keyExtractor={item => selectedMovieType + '-' + item.id.toString()}
        maxToRenderPerBatch={10}
        // performance improvement
        initialNumToRender={5}
        onEndReached={() => {
          getMovies(selectedMovieType, {
            page: movies[selectedMovieType].page + 1,
          });
        }}
      />
    </View>
  );
};

export default HomeScreen;
