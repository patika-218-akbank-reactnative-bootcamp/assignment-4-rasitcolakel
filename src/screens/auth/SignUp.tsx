import {Alert, View} from 'react-native';
import React from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamsList} from '@src/screens/auth/';
import CustomButton from '@src/components/CustomButton';
import {AuthStyle as styles} from '@src/styles/Auth.style';
import {useAppSelector} from '@src/store';
import CustomInput from '@src/components/CustomInput';
import CustomText from '@src/components/CustomText';
import CustomKeyboardAvoidingView from '@src/components/CustomKeyboardAvoidingView';
import {useDispatch} from 'react-redux';
import {setLoading} from '@src/store/slices/theme';
import axios from 'axios';
import {setUser} from '@src/store/slices/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {config} from '@src/assets/config';

type Props = NativeStackScreenProps<AuthStackParamsList, 'SignUp'>;

const SignUp = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const {primary, backgroundColor} = useAppSelector(
    state => state.theme.colors,
  );
  const [values, setValues] = React.useState({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (name: string, value: string) => {
    setValues(prev => ({...prev, [name]: value}));
  };

  const handleSignUp = async () => {
    try {
      const {email, username, password, confirmPassword, firstName, lastName} =
        values;
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
      dispatch(setLoading(true));
      const response = await axios.post(config.API_URL + 'register', {
        email,
        username,
        password,
        firstName,
        lastName,
      });
      // store the user in the async storage
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
      dispatch(setUser(response.data));
      dispatch(setUser(response.data));
    } catch (error: any) {
      Alert.alert('Error', error.response.data);
    } finally {
      dispatch(setLoading(false));
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
          placeholder="First Name"
          value={values.firstName}
          onChangeText={text => handleChange('firstName', text)}
        />
        <CustomInput
          placeholder="Last Name"
          value={values.lastName}
          onChangeText={text => handleChange('lastName', text)}
        />
        <CustomInput
          placeholder="Email"
          value={values.email}
          onChangeText={text => handleChange('email', text)}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <CustomInput
          placeholder="Username"
          value={values.username}
          onChangeText={text => handleChange('username', text)}
          textContentType="username"
          keyboardType="default"
          autoCapitalize="none"
        />
        <CustomInput
          placeholder="Password"
          secureTextEntry={true}
          value={values.password}
          onChangeText={text => handleChange('password', text)}
          textContentType={'password'}
        />
        <CustomInput
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={values.confirmPassword}
          onChangeText={text => handleChange('confirmPassword', text)}
          textContentType={'password'}
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
