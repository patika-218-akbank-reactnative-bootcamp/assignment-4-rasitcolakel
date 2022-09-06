import React from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import AuthStack from './auth';
import {useFlipper} from '@react-navigation/devtools';

type Props = {};

export default function Navigation({}: Props) {
  // we need to use the ref to access the navigation container via Flipper
  const navigationRef = useNavigationContainerRef();
  // and connect it to Flipper
  useFlipper(navigationRef);

  return (
    <NavigationContainer ref={navigationRef}>
      <AuthStack />
    </NavigationContainer>
  );
}
