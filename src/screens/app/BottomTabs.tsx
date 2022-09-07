import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabParamList} from '.';
import HomeScreen from './HomeScreen';
import ProfileStack from './profile';
import SearchScreen from './SearchScreen';

const BottomNav = createBottomTabNavigator<BottomTabParamList>();
const BottomTabs = () => {
  return (
    <BottomNav.Navigator>
      <BottomNav.Screen name="Home" component={HomeScreen} />
      <BottomNav.Screen name="Search" component={SearchScreen} />
      <BottomNav.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          headerShown: false,
        }}
      />
    </BottomNav.Navigator>
  );
};

export default BottomTabs;
