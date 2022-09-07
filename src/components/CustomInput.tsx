import {View, TextInputProps} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {CustomInputStyles as styles} from '../styles/CustomInput.style';
import {useAppSelector} from '../store';

type Props = TextInputProps & {};

const CustomInput = (props: Props) => {
  const [focused, setFocused] = React.useState(false);
  const {colors} = useAppSelector(state => state.theme);
  const containerStyle: any[] = [
    styles.container,
    {borderColor: focused ? colors.primary : colors.secondaryText},
  ];
  const inputStyle: any[] = [
    styles.input,
    {color: focused ? colors.primary : colors.secondaryText},
  ];

  if (props.style) {
    inputStyle.push(props.style);
  }

  return (
    <View style={containerStyle}>
      <TextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        selectionColor={colors.primary}
        placeholderTextColor={focused ? colors.primary : colors.secondaryText}
        style={inputStyle}
        {...props}
      />
    </View>
  );
};

export default CustomInput;
