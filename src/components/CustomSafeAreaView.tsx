import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useAppSelector} from '../store';

type Props = {
  children: React.ReactNode;
};

export default function CustomSafeAreaView({children}: Props) {
  const {backgroundColor} = useAppSelector(state => state.theme.colors);
  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
