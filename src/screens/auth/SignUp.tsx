import {Alert, View} from 'react-native';
import React from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamsList} from '.';
import CustomButton from '../../components/CustomButton';
import {AuthStyle as styles} from '../../styles/Auth.style';
import {useAppSelector} from '../../store';
import CustomInput from '../../components/CustomInput';
import CustomText from '../../components/CustomText';
import CustomKeyboardAvoidingView from '../../components/CustomKeyboardAvoidingView';

type Props = NativeStackScreenProps<AuthStackParamsList, 'SignUp'>;

const SignUp = ({navigation}: Props) => {
  const {primary, backgroundColor} = useAppSelector(
    state => state.theme.colors,
  );
  const [values, setValues] = React.useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (name: string, value: string) => {
    setValues(prev => ({...prev, [name]: value}));
  };

  const handleSignUp = () => {
    if (values.password !== values.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
  };

  return (
    <CustomKeyboardAvoidingView>
      <View style={[styles.container, {shadowColor: primary, backgroundColor}]}>
        <CustomText
          title="Sign Up"
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
          placeholder="Username"
          value={values.username}
          onChangeText={text => handleChange('username', text)}
        />
        <CustomInput
          placeholder="Password"
          secureTextEntry={true}
          value={values.password}
          onChangeText={text => handleChange('password', text)}
        />
        <CustomInput
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={values.confirmPassword}
          onChangeText={text => handleChange('confirmPassword', text)}
        />

        <CustomButton
          title="Sign Up"
          onPress={handleSignUp}
          variant="primary"
          fullWidth
          disabled={Object.values(values).some(value => !value)}
        />
        <CustomButton
          title="Do you have an account? Sign In"
          onPress={() => navigation.goBack()}
          variant="transparent"
          fullWidth
        />
      </View>
    </CustomKeyboardAvoidingView>
  );
};

export default SignUp;
