import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from './SignIn';
import SignUp from './SignUp';

export type AuthStackParamsList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createStackNavigator<AuthStackParamsList>();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
          title: 'Sign In',
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: 'Sign Up',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
