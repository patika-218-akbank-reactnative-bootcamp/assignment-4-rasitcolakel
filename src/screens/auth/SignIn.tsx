import {View, SafeAreaView} from 'react-native';
import React from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamsList} from '.';
import CustomText from '../../components/CustomText';
import {toogleTheme} from '../../store/slices/theme';
import {useDispatch} from 'react-redux';
import CustomButton from '../../components/CustomButton';

type Props = NativeStackScreenProps<AuthStackParamsList, 'SignIn'>;

const SignIn = ({navigation}: Props) => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView>
      <View>
        <CustomText onPress={() => navigation.push('SignUp')} title="Default" />
        <CustomText
          onPress={() => dispatch(toogleTheme())}
          title="Primary"
          variant="primary"
        />
        <CustomText
          onPress={() => dispatch(toogleTheme())}
          title="Secondary"
          variant="secondary"
        />
        <CustomButton title="Primary" onPress={() => {}} variant="primary" />
        <CustomButton
          title="Disabled"
          onPress={() => {}}
          variant="default"
          disabled
        />
        <CustomButton
          title="Transparent"
          onPress={() => {}}
          variant="transparent"
        />
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
