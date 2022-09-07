import {View, Text} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabParamList} from '.';

type Props = NativeStackScreenProps<BottomTabParamList, 'Home'>;

const HomeScreen = (props: Props) => {
  console.log(props);
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
