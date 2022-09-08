/* eslint-disable react-hooks/exhaustive-deps */
import {View, Animated, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamsList} from '.';
import {useAppSelector} from '@src/store';
import CustomText from '@src/components/CustomText';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {Cast} from '@src/store/slices/movies';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getCasts} from '@src/assets/api';
import {styles} from '@src/styles/MovieDetail.style';
import {GenreComponent} from '@src/components/GenreComponent';

type Props = NativeStackScreenProps<AppStackParamsList, 'MovieDetail'>;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/';
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
const HEADER_MIN = 150;

const MovieDetailScreen = ({route, navigation}: Props) => {
  const headerMaxHeight = Dimensions.get('window').height - HEADER_MIN - 130;
  const [casts, setCasts] = React.useState<Cast[]>([]);
  const {colors} = useAppSelector(state => state.theme);
  const movie = route.params?.movie;

  const getCastsByMovieId = async () => {
    if (!movie) {
      return;
    }
    const response = await getCasts(movie.id);
    setCasts(response.cast);
  };

  useEffect(() => {
    getCastsByMovieId();
  }, []);

  if (!movie) {
    return null;
  }

  const animatedHeaderValue = new Animated.Value(0);
  const animatedHeaderHeight = animatedHeaderValue.interpolate({
    inputRange: [0, headerMaxHeight - HEADER_MIN],
    outputRange: [headerMaxHeight, HEADER_MIN],
    extrapolate: 'clamp',
  });

  const animatedHeaderOpacity = animatedHeaderValue.interpolate({
    inputRange: [0, headerMaxHeight - HEADER_MIN],
    outputRange: [1, 0.3],
    extrapolate: 'clamp',
  });

  const renderHeader = () => (
    <View>
      <CustomText title={movie.title} size={25} style={styles.title} />
      <View style={styles.voteContainer}>
        <AntDesign name="star" size={30} color={colors.yellow} />
        <CustomText
          title={`${movie.vote_average} / 10`}
          variant="secondary"
          size={20}
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
      <CustomText
        title="Description"
        size={18}
        variant="primary"
        bold
        style={styles.titleSecond}
      />
      <CustomText title={movie.overview} size={18} variant="secondary" />
      <CustomText
        title="Casts"
        size={18}
        variant="primary"
        bold
        style={styles.titleSecond}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <AntDesign
        name="left"
        size={38}
        color={colors.primary}
        style={styles.goBack}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={[styles.header]}>
        <AnimatedFastImage
          style={[
            styles.image,
            {
              height: animatedHeaderHeight,
              opacity: animatedHeaderOpacity,
            },
          ]}
          source={{
            uri: IMAGE_BASE_URL + movie.poster_path,
            priority: FastImage.priority.high,
          }}
        />
      </View>
      <FlatList
        style={[
          styles.scrollContainer,
          {backgroundColor: colors.backgroundColor},
        ]}
        scrollEventThrottle={16}
        onScroll={e => {
          animatedHeaderValue.setValue(e.nativeEvent.contentOffset.y);
        }}
        data={casts}
        renderItem={({item}) => <CastComponent cast={item} />}
        numColumns={4}
        bounces={false}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={() => <View style={styles.bottomStyle} />}
      />
    </View>
  );
};
type RenderCastProps = {
  cast: Cast;
};
const CastComponent = ({cast}: RenderCastProps) => {
  const {name} = useAppSelector(state => state.theme);
  const defaultImage =
    name === 'dark'
      ? require('../../assets/user-dark.png')
      : require('../../assets/user-light.png');
  return (
    <View style={[styles.castContainer]}>
      <FastImage
        style={[styles.castImage]}
        source={{
          uri: IMAGE_BASE_URL + cast.profile_path,
          priority: FastImage.priority.high,
        }}
        resizeMode="cover"
        defaultSource={defaultImage}
      />
      <CustomText title={cast.name} size={13} style={styles.castText} />
    </View>
  );
};

export default MovieDetailScreen;
