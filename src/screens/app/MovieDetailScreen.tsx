import {View, ScrollView, StyleSheet, Animated} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamsList} from '.';
import {useAppSelector} from '@src/store';
import CustomText from '@src/components/CustomText';
type Props = NativeStackScreenProps<AppStackParamsList, 'MovieDetail'>;

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/';
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
const MovieDetailScreen = ({route}: Props) => {
  const {colors} = useAppSelector(state => state.theme);
  const movie = route.params?.movie;
  if (!movie) {
    return null;
  }

  const animatedHeaderValue = new Animated.Value(0);
  const HEADER_MAX = 600;
  const HEADER_MIN = 120;
  const animatedHeaderHeight = animatedHeaderValue.interpolate({
    inputRange: [0, HEADER_MAX - HEADER_MIN],
    outputRange: [HEADER_MAX, HEADER_MIN],
    extrapolate: 'clamp',
  });
  const animatedHeaderOpacity = animatedHeaderValue.interpolate({
    inputRange: [100, 700],
    outputRange: [1, 0.6],
    extrapolate: 'extend',
  });

  return (
    <View style={styles.container}>
      <View style={[styles.header, {backgroundColor: colors.primary}]}>
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
      <ScrollView
        style={[
          styles.scrollContainer,
          {backgroundColor: colors.backgroundColor},
        ]}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {y: animatedHeaderValue},
              },
            },
          ],
          {useNativeDriver: false},
        )}>
        <View style={styles.scrollStyle}>
          <CustomText title={movie.title} size={30} />
          <CustomText title={movie.overview} size={20} />
          <CustomText title={movie.overview} size={20} />
          <CustomText title={movie.overview} size={20} />
          <CustomText title={movie.overview} size={20} />
          <CustomText title={movie.overview} size={20} />
          <CustomText title={movie.overview} size={20} />
          <CustomText title={movie.overview} size={20} />
          <CustomText title={movie.overview} size={20} />
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: -30,
  },
  scrollStyle: {
    padding: 30,
    paddingVertical: 30,
  },
  header: {
    width: '100%',
    left: 0,
    right: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
