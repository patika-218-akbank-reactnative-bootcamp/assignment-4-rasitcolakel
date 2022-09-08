import {hexToRGB} from '@src/assets/utils';
import {useAppSelector} from '@src/store';
import {MovieCardStyles as styles} from '@src/styles/MovieCard.style';
import React from 'react';
import {View} from 'react-native';
import CustomText from './CustomText';

type Props = {
  id: number;
};

export const GenreComponent = ({id}: Props) => {
  const {colors} = useAppSelector(state => state.theme);
  const genre = useAppSelector(state =>
    state.genres.data.find(g => g.id === id),
  );
  if (!genre) {
    return null;
  }

  return (
    <View
      onStartShouldSetResponder={() => true}
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
