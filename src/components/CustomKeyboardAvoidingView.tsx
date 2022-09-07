import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import CustomSafeAreaView from './CustomSafeAreaView';

type Props = {
  children: React.ReactNode;
};

const CustomKeyboardAvoidingView = ({children}: Props) => {
  return (
    <CustomSafeAreaView>
      <KeyboardAvoidingView
        style={[styles.container]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            style={styles.container}>
            {children}
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default CustomKeyboardAvoidingView;
