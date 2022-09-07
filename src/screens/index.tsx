/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
  useNavigationContainerRef,
} from '@react-navigation/native';
import AuthStack from '@src/screens/auth';
import {useFlipper} from '@react-navigation/devtools';
import {StatusBar, useColorScheme} from 'react-native';
import {useDispatch} from 'react-redux';
import {setLoading, setTheme} from '@src/store/slices/theme';
import {ThemeType} from '@src/assets/darkTheme';
import {useAppSelector} from '@src/store';
import LoadingIndicator from '@src/components/LoadingIndicator';
import AppStack from '@src/screens/app';
import {setUser} from '@src/store/slices/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {};

export default function Navigation({}: Props) {
  // we need to use the ref to access the navigation container via Flipper
  const navigationRef = useNavigationContainerRef();
  // and connect it to Flipper
  useFlipper(navigationRef);
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const theme = useAppSelector(state => state.theme);
  const {user, accessToken} = useAppSelector(state => state.user);

  // this will be called when the app starts and set the user if stored in async storage
  const checkUser = async () => {
    const _user = await AsyncStorage.getItem('user');
    if (_user) {
      dispatch(setUser(JSON.parse(_user)));
    }
  };

  useEffect(() => {
    try {
      dispatch(setLoading(true));
      dispatch(setTheme(colorScheme));
      checkUser();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [colorScheme, dispatch]);

  return (
    <NavigationContainer ref={navigationRef} theme={themeBuilder(theme)}>
      <StatusBar
        barStyle={theme.name === 'dark' ? 'light-content' : 'dark-content'}
      />
      <LoadingIndicator />
      {accessToken && user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

// it will return the theme based on the theme type
const themeBuilder = (theme: ThemeType): Theme => {
  const {name, colors} = theme;
  const navigationTheme = name === 'dark' ? DarkTheme : DefaultTheme;
  const themeColors: Theme = {
    ...navigationTheme,
    colors: {
      ...navigationTheme.colors,
      primary: colors.primary,
    },
  };

  return themeColors;
};
