import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileScreenParamsList} from '..';
import ProfileScreen from './ProfileScreen';
import SettingsSecreen from './SettingsSecreen';
import EditProfileScreen from './EditProfileScreen';

const Stack = createStackNavigator<ProfileScreenParamsList>();

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: 'Edit Profile',
        }}
      />
      <Stack.Screen name="Settings" component={SettingsSecreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
