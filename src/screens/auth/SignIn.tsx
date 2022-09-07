import {View} from 'react-native';
import React from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamsList} from '.';
import CustomButton from '../../components/CustomButton';
import {AuthStyle as styles} from '../../styles/Auth.style';
import {useAppSelector} from '../../store';
import CustomInput from '../../components/CustomInput';
import CustomText from '../../components/CustomText';
import CustomKeyboardAvoidingView from '../../components/CustomKeyboardAvoidingView';

type Props = NativeStackScreenProps<AuthStackParamsList, 'SignIn'>;

const SignIn = ({navigation}: Props) => {
  const {primary, backgroundColor} = useAppSelector(
    state => state.theme.colors,
  );
  const [values, setValues] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (name: string, value: string) => {
    setValues(prev => ({...prev, [name]: value}));
  };

  return (
    <CustomKeyboardAvoidingView>
      <View style={[styles.container, {shadowColor: primary, backgroundColor}]}>
        <CustomText
          title="Sign In"
          variant="primary"
          size={25}
          style={styles.title}
        />
        <CustomInput
          placeholder="Email"
          value={values.email}
          onChangeText={text => handleChange('email', text)}
        />
        <CustomInput
          placeholder="Password"
          secureTextEntry={true}
          value={values.password}
          onChangeText={text => handleChange('password', text)}
        />

        <CustomButton
          title="Log In"
          onPress={() => {}}
          variant="primary"
          fullWidth
          disabled={Object.values(values).some(value => !value)}
        />
        <CustomButton
          title="Don't have an account? Create one"
          onPress={() => navigation.push('SignUp')}
          variant="transparent"
          fullWidth
        />
      </View>
    </CustomKeyboardAvoidingView>
  );
};

export default SignIn;
