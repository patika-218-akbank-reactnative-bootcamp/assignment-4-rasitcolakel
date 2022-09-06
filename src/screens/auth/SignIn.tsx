import {View, Text} from 'react-native';
import React from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamsList} from '.';

type Props = NativeStackScreenProps<AuthStackParamsList, 'SignIn'>;

const SignIn = ({navigation}: Props) => {
  return (
    <View>
      <Text onPress={() => navigation.push('SignUp')}>SignIn</Text>
    </View>
  );
};

export default SignIn;
