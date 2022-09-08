import {View, TextInputProps} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {CustomInputStyles as styles} from '@src/styles/CustomInput.style';
import {useAppSelector} from '@src/store';
import {IconProps} from 'react-native-vector-icons/Icon';

type Props = TextInputProps & {
  iconComponent?: React.ElementType;
  iconComponentProps?: IconProps;
};

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
  const {iconComponent: Icon} = props;

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
      {props.iconComponent && Icon && (
        <Icon
          {...props.iconComponentProps}
          color={focused ? colors.primary : colors.secondaryText}
        />
      )}
    </View>
  );
};

export default CustomInput;
