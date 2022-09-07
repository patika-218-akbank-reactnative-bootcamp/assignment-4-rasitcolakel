/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MovieDetailScreen from '@src/screens/app/MovieDetailScreen';
import BottomTabs from '@src/screens/app/BottomTabs';
import {NavigatorScreenParams} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setGenres} from '@src/store/slices/genres';
import {GenreRequest} from '@src/assets/api';
import {setLoading} from '@src/store/slices/theme';

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
  const dispatch = useDispatch();
  const getGenres = async () => {
    try {
      dispatch(setLoading(true));
      const data = await GenreRequest();
      dispatch(setGenres(data.genres));
    } catch (error: any) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getGenres();
  }, []);

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
