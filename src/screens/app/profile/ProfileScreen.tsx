import {Image, View} from 'react-native';
import React from 'react';
import CustomButton from '@src/components/CustomButton';
import {useDispatch} from 'react-redux';
import {logOut} from '@src/store/slices/user';
import {ProfileScreenStyle as styles} from '@src/styles/Profile.style';
import CustomText from '@src/components/CustomText';
import {useAppSelector} from '@src/store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileScreenParamsList} from '..';

type Props = NativeStackScreenProps<ProfileScreenParamsList, 'Profile'>;

const ProfileScreen = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const {user} = useAppSelector(state => state.user);
  const {name} = useAppSelector(state => state.theme);
  if (!user) {
    return null;
  }
  const defaultImage =
    name === 'dark'
      ? require('../../../assets/user-dark.png')
      : require('../../../assets/user-light.png');
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image style={styles.image} source={defaultImage} />
        <CustomText title={user.firstName + ' ' + user.lastName} size="large" />
        <CustomButton
          title="Edit Profile"
          onPress={() => navigation.push('EditProfile')}
          variant="primary"
          fullWidth
          size="medium"
        />
        <CustomButton
          title="Change Theme"
          onPress={() => navigation.push('Settings')}
          variant="primary"
          fullWidth
          size="medium"
        />
      </View>
      <CustomButton
        title="Sign Out"
        onPress={() => dispatch(logOut())}
        variant="transparent"
        size="medium"
      />
    </View>
  );
};

export default ProfileScreen;
