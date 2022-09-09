import {ColorSchemeName, View} from 'react-native';
import React from 'react';
import CustomText from '@src/components/CustomText';
import {ProfileScreenStyle as styles} from '@src/styles/Profile.style';
import {darkTheme} from '@src/assets/darkTheme';
import {lightTheme} from '@src/assets/lightTheme';
import {useAppSelector} from '@src/store';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {setTheme} from '@src/store/slices/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsSecreen = () => {
  const {name, colors} = useAppSelector(state => state.theme);
  const dispatch = useDispatch();
  const handleThemeChange = async (theme: ColorSchemeName) => {
    if (theme === 'dark' && name !== 'dark') {
      dispatch(setTheme(theme));
    } else {
      dispatch(setTheme(theme));
    }
    await AsyncStorage.setItem('theme', JSON.stringify(theme));
  };

  return (
    <View style={styles.container}>
      <CustomText
        title="Choose Your theme"
        size="xlarge"
        style={styles.themeTitle}
      />
      <View style={styles.themeContainer}>
        <TouchableOpacity
          style={[
            styles.themeItem,
            {
              backgroundColor: darkTheme.colors.backgroundColor,
              borderColor:
                name === 'dark' ? colors.primary : colors.secondaryText,
            },
          ]}
          onPress={() => handleThemeChange('dark')}>
          <CustomText title="Dark" size="large" variant="primary" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.themeItem,
            {
              backgroundColor: lightTheme.colors.backgroundColor,
              borderColor:
                name === 'light' ? colors.primary : colors.secondaryText,
            },
          ]}
          onPress={() => handleThemeChange('light')}>
          <CustomText title="Light" size="large" variant="primary" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsSecreen;
