import React from 'react';
import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {useAppSelector} from '../store';
import {CustomButtonStyles as styles} from '../styles/CustomButton.style';

type Props = TouchableOpacityProps & {
  title: string;
  onPress: () => void;
  variant: 'default' | 'primary' | 'transparent';
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large' | 'xlarge' | number;
  bold?: boolean;
};

export default function CustomButton({
  title,
  onPress,
  variant,
  fullWidth,
  ...props
}: Props) {
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
  if (fullWidth) {
    style.push({width: '100%'});
  }

  if (props.disabled) {
    style.push({opacity: 0.4});
  }
  if (typeof props.size === 'number') {
    textStyle.push({fontSize: props.size});
  } else if (props.size === 'small') {
    textStyle.push({fontSize: 12});
  } else if (props.size === 'medium') {
    textStyle.push({fontSize: 16});
  } else if (props.size === 'large') {
    textStyle.push({fontSize: 18});
  } else if (props.size === 'xlarge') {
    textStyle.push({fontSize: 20});
  } else {
    textStyle.push({fontSize: 14});
  }

  if (props.style) {
    style.push(props.style);
  }
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}
