import React, {useEffect} from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
  useNavigationContainerRef,
} from '@react-navigation/native';
import AuthStack from './auth';
import {useFlipper} from '@react-navigation/devtools';
import {StatusBar, useColorScheme} from 'react-native';
import {useDispatch} from 'react-redux';
import {setTheme} from '../store/slices/theme';
import {ThemeType} from '../assets/darkTheme';
import {useAppSelector} from '../store';

type Props = {};

export default function Navigation({}: Props) {
  // we need to use the ref to access the navigation container via Flipper
  const navigationRef = useNavigationContainerRef();
  // and connect it to Flipper
  useFlipper(navigationRef);
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const theme = useAppSelector(state => state.theme);

  useEffect(() => {
    // set the default theme from useColorScheme
    dispatch(setTheme('dark'));
  }, [colorScheme, dispatch]);

  return (
    <NavigationContainer ref={navigationRef} theme={themeBuilder(theme)}>
      <StatusBar
        barStyle={theme.name === 'dark' ? 'light-content' : 'dark-content'}
      />
      <AuthStack />
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
