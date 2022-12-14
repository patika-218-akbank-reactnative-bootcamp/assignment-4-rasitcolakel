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
import axios from 'axios';
import {setLoading} from '@src/store/slices/theme';
import {setUser} from '@src/store/slices/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {config} from '@src/assets/config';

type Props = NativeStackScreenProps<AuthStackParamsList, 'SignIn'>;

const SignIn = ({navigation}: Props) => {
  const dispatch = useDispatch();
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

  const handleLogIn = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(config.API_URL + 'login', values);
      // store the user in the async storage
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
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
          title="Sign In"
          variant="primary"
          size={25}
          style={styles.title}
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
          placeholder="Password"
          secureTextEntry={true}
          value={values.password}
          onChangeText={text => handleChange('password', text)}
        />

        <CustomButton
          title="Log In"
          onPress={handleLogIn}
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
