import {useAppSelector} from '@src/store';
import {Cast} from '@src/store/slices/movies';
import {styles} from '@src/styles/MovieDetail.style';
import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from './CustomText';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/';

type Props = {
  cast: Cast;
};
export const CastComponent = ({cast}: Props) => {
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
