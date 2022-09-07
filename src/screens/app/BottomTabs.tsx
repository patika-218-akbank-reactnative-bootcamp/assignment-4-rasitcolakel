import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabParamList} from '.';
import HomeScreen from './HomeScreen';
import ProfileStack from './profile';
import SearchScreen from './SearchScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomNav = createBottomTabNavigator<BottomTabParamList>();
const BottomTabs = () => {
  return (
    <BottomNav.Navigator>
      <BottomNav.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({size, color}) => (
            <MaterialCommunityIcons
              name="movie-roll"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <BottomNav.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({size, color}) => (
            <MaterialCommunityIcons
              name="movie-search"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <BottomNav.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({size, color}) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </BottomNav.Navigator>
  );
};

export default BottomTabs;
