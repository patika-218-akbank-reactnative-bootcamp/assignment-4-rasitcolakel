import {Alert, View} from 'react-native';
import React from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import CustomButton from '@src/components/CustomButton';
import {AuthStyle as styles} from '@src/styles/Auth.style';
import {useAppSelector} from '@src/store';
import CustomInput from '@src/components/CustomInput';
import CustomText from '@src/components/CustomText';
import CustomKeyboardAvoidingView from '@src/components/CustomKeyboardAvoidingView';
import {useDispatch} from 'react-redux';
import {setLoading} from '@src/store/slices/theme';
import axios from 'axios';
import {updateUser} from '@src/store/slices/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {config} from '@src/assets/config';
import {ProfileScreenParamsList} from '..';

type Props = NativeStackScreenProps<ProfileScreenParamsList, 'EditProfile'>;

const EditProfileScreen = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const {user} = useAppSelector(state => state.user);
  const {primary, backgroundColor} = useAppSelector(
    state => state.theme.colors,
  );
  const [values, setValues] = React.useState({
    username: user?.username,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    password: '',
  });

  const handleChange = (name: string, value: string) => {
    setValues(prev => ({...prev, [name]: value}));
  };

  const handleEditProfileScreen = async () => {
    try {
      const {username, firstName, lastName, email, password} = values;
      dispatch(setLoading(true));
      const response = await axios.put(config.API_URL + 'users/' + user?.id, {
        email,
        password,
        username,
        firstName,
        lastName,
      });
      console.log(response.data);
      // store the user in the async storage
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
      delete response.data.password;
      dispatch(updateUser(response.data));
      navigation.goBack();
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
          title="Edit Profile"
          variant="primary"
          size={25}
          style={styles.title}
        />
        <CustomInput
          placeholder="Email"
          value={values.email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          editable={false}
        />
        <CustomInput
          placeholder="Password"
          secureTextEntry={true}
          value={values.password}
          onChangeText={text => handleChange('password', text)}
          textContentType={'password'}
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
          placeholder="Username"
          value={values.username}
          onChangeText={text => handleChange('username', text)}
          textContentType="username"
          keyboardType="default"
          autoCapitalize="none"
        />

        <CustomButton
          title="Save"
          onPress={handleEditProfileScreen}
          variant="primary"
          fullWidth
          disabled={Object.values(values).some(value => !value)}
        />
      </View>
    </CustomKeyboardAvoidingView>
  );
};

export default EditProfileScreen;
