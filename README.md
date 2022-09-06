[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=8367124&assignment_repo_type=AssignmentRepo)

# Assignment 4

## **Introduction**

This project presents a mobile app with the movie db.

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
