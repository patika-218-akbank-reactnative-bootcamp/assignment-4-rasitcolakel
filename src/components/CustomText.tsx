import {Text, TextProps} from 'react-native';
import React from 'react';
import {useAppSelector} from '../store';

type Props = TextProps & {
  title: string;
  variant?: 'default' | 'primary' | 'secondary';
};

const CustomText = (props: Props) => {
  const {colors} = useAppSelector(state => state.theme);
  let styles = [];
  if (props.variant === 'primary') {
    styles.push({color: colors.primary});
  } else if (props.variant === 'secondary') {
    styles.push({color: colors.secondaryText});
  } else {
    styles.push({color: colors.text});
  }
  return (
    <Text style={styles} {...props}>
      {props.title}
    </Text>
  );
};

export default CustomText;
