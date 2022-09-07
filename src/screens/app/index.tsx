import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MovieDetailScreen from './MovieDetailScreen';
import BottomTabs from './BottomTabs';
import {NavigatorScreenParams} from '@react-navigation/native';

export type AppStackParamsList = {
  MovieDetail: undefined;
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
};

export type BottomTabParamList = {
  Home: undefined;
  ProfileStack: NavigatorScreenParams<ProfileScreenParamsList>;
  Search: undefined;
};

export type ProfileScreenParamsList = {
  Profile: undefined;
  EditProfile: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<AppStackParamsList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
