import React from 'react';
import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {useAppSelector} from '../store';
import {CustomButtonStyles as styles} from '../styles/CustomButton.style';

type Props = TouchableOpacityProps & {
  title: string;
  onPress: () => void;
  variant: 'default' | 'primary' | 'transparent';
};

export default function CustomButton({title, onPress, variant}: Props) {
  const {colors} = useAppSelector(state => state.theme);

  let style: any = [styles.button];
  let textStyle: any = [styles.title];

  if (variant === 'primary') {
    style.push({backgroundColor: colors.primary});
    textStyle.push({color: colors.white});
  } else if (variant === 'transparent') {
    style.push({backgroundColor: 'transparent'});
    textStyle.push({color: colors.primary});
  } else {
    style.push({backgroundColor: colors.primary, opacity: 0.3});
    textStyle.push({color: colors.white});
  }

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}
