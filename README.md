[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=8367124&assignment_repo_type=AssignmentRepo)

# Assignment 4

## **Introduction**

This project presents a mobile app with the movie db.

# Important

You need to create config.ts file under the src/assets folder with the following content:

```typescript
export const config = {
  API_URL: 'http://192.168.1.6:3000/', // change this to your local IP
  MOVIE_API_URL: 'https://api.themoviedb.org/3/',
  API_KEY: '---', // change this to your API key
};
```

## Installing React Navigation

To install React Navigation, run the following command in the terminal:

```bash
npm install @react-navigation/native
```

Installing dependencies for a bare React Native app

```bash
npm install react-native-screens react-native-safe-area-context
```

**React Navigation configuration for Android**

```java
//MainActivity.java
import android.os.Bundle;


@Override
protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(null);
}
```

## Installing React Navigation Stack

```bash
npm install @react-navigation/stack

npm install react-native-gesture-handler
# it is needed for UIKit
npm install @react-native-masked-view/masked-view
```

Then import the following in the App.tsx file:

```typescript
import 'react-native-gesture-handler';
```

## Installing Bottom Tab Navigator

```bash
npm install @react-navigation/bottom-tabs
```

# Installing Redux

```bash
npm install react-redux
npm install @reduxjs/toolkit
```

## Redux with Flipper

Flipper is a desktop application for debugging mobile apps. It is available for both Android and iOS. It is a great tool for debugging Redux and React Native apps. To install it, follow the instructions on the [Flipper website](https://fbflipper.com/).

```bash
npm install redux-flipper react-native-flipper

# then update pods
pod install
# then run the app
yarn ios
```

## Connecting Redux with Flipper

```typescript
import {configureStore} from '@reduxjs/toolkit';
import {userSlice} from './slices/user';
// ...
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
  // devtools is enabled by default in development mode
  devTools: true,
  middleware: getDefaultMiddleware => {
    if (__DEV__) {
      // Redux devtools with flipper
      const createDebugger = require('redux-flipper').default;
      // We need to return the default middleware with redux-flipper
      return getDefaultMiddleware().concat(createDebugger());
    }

    return getDefaultMiddleware();
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
```

## Connecting React Navigation With Flipper

Installing devtools extension

```bash
npm install @react-navigation/devtools
```

Then change the following in the App.tsx file:

```typescript
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {useFlipper} from '@react-navigation/devtools';

export default function Navigation() {
  const navigationRef = useNavigationContainerRef();
  useFlipper(navigationRef);

  return (
    <NavigationContainer ref={navigationRef}>
      {...}
    </NavigationContainer>
  );
}
```

## Installing plugins for Flipper

![Screenshot](/screenshots/flipper.png)

## Redux Debugger

![Screenshot](/screenshots/redux-debugger.png)

## React Navigation Debugger

![Screenshot](/screenshots/react-navigation.png)

# Installing React Native Async Storage

```bash
npm install @react-native-async-storage/async-storage
# then update pods
cd ios && pod install
# or
npx pod-install
```

# Installing axios for HTTP requests

Axios is a promise-based HTTP client for the browser and node.js. It is used to make HTTP requests to fetch or save data.

```bash
npm install axios
```

## Usage of axios

```typescript
import axios from 'axios';

const api = axios.post(
  'https://api.themoviedb.org/3/authentication/token/new',
  {
    api_key: 'YOUR_API_KEY',
  },
);
```

# Installing React Native Vector Icons

```bash
npm install react-native-vector-icons
```

## Importing Fonts on iOS

To import fonts we need to add the following to the Info.plist file:

```xml
<key>UIAppFonts</key>
<array>
  <string>AntDesign.ttf</string>
  <string>Entypo.ttf</string>
  <string>EvilIcons.ttf</string>
  <string>Feather.ttf</string>
  <string>FontAwesome.ttf</string>
  <string>FontAwesome5_Brands.ttf</string>
  <string>FontAwesome5_Regular.ttf</string>
  <string>FontAwesome5_Solid.ttf</string>
  <string>Foundation.ttf</string>
  <string>Ionicons.ttf</string>
  <string>MaterialIcons.ttf</string>
  <string>MaterialCommunityIcons.ttf</string>
  <string>SimpleLineIcons.ttf</string>
  <string>Octicons.ttf</string>
  <string>Zocial.ttf</string>
  <string>Fontisto.ttf</string>
</array>
```

## Importing Fonts on Android

To import fonts we need to add the following to the **android/app/build.gradle:**

```java
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

# How to install absolute paths

```bash
npm install --save-dev babel-plugin-module-resolver
```

Then add the following to the **babel.config.js:**

```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'], // existing
  // add the following
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@src': './src',
        },
      },
    ],
  ],
};
```

Also add the following to the **tsconfig.json:**

```json
{
  "compilerOptions": {
    // ... existing
    "baseUrl": ".",
    "paths": {
      "@src/*": ["src/*"]
    }
  },
  "include": ["src/**/*", "./App.tsx"]
}
```

If the app gives the following error:

```bash
error: Error: Unable to resolve module
```

It means that app is not able to find the module. To fix this, we need to reset caches of the app while starting

```bash
yarn start --reset-cache
```

# How to start json-server

I added json-server-auth to the project to simulate a backend server. To start the server, run the following command:

```bash
cd server && json-server --host <YOUR_LOCAL_IP> db.json --watch -m ./node_modules/json-server-auth
```
